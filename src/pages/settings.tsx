import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  Text,
  Flex,
  Box,
  Button,
  Collapse,
  FormHelperText,
  FormLabel,
  Heading,
  IconButton,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Tag,
  FormControl,
  Input,
  Code,
  Select,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { ImSpoonKnife } from "react-icons/im";
import BodyMetricsForm from "../components/BodyMetricsForm";
import { Page } from "../components/layouts";
import NutritionBar from "../components/NutritionBar";
import { Store, ACTIONS, useStore } from "../store";
import { readFile } from "../util/dom";
import { computeCaloricNeeds, computeMacroFromCalories, macroCombination } from "../util/nutrition";
import { capitalize, roundToTens } from "../util/primitives";

type GoalTypes = keyof typeof macroCombination;
export default function SettingsPage() {
  const { dispatch, ...store } = useStore();
  const [expand, setExpand] = useState(false);
  const [showDataOptions, setShowDataOptions] = useState(false);
  const [goalCalories, setGoalCalories] = useState<number>();
  const [goalType, setGoalType] = useState<GoalTypes>();
  const [isSliderDisabled, setIsSliderDisabled] = useState(true);

  const { body, goal, logs } = store;
  const { bmr, caloricNeeds } = useMemo(() => computeCaloricNeeds(body), [body]);
  const daysOfData = Object.keys(logs).length;

  useEffect(() => {
    const calories = goalCalories ?? goal.nutrition.calories;
    const diet = goalType ?? goal.diet;
    dispatch({
      type: ACTIONS.SET_GOAL,
      payload: {
        nutrition: computeMacroFromCalories(calories, macroCombination[diet].macros),
        diet,
      },
    });
  }, [goalCalories, goalType]);

  const goalInfo = getGoalInfo(goal.nutrition.calories || caloricNeeds.calories, caloricNeeds.calories);
  const goalDiet = goalType || goal.diet;

  const hasComputedCaloricNeeds = caloricNeeds.calories !== 0 || !!body.height || !!body.weight;

  return (
    <Page heading="Settings">
      <Box mb="12" as="section">
        <Heading size="lg" mb="4" display="flex" justifyContent="space-between" alignItems="center">
          Maintenance Needs
          {hasComputedCaloricNeeds && (
            <IconButton
              isRound
              variant="ghost"
              aria-label={expand ? "Collapse" : "Expand"}
              onClick={() => setExpand(!expand)}
              icon={expand ? <ChevronUpIcon /> : <ChevronDownIcon />}
            />
          )}
        </Heading>
        <FormControl>
          <FormHelperText>
            These are your daily caloric needs in order to maintain your body weight, based on your body metrics.
          </FormHelperText>
        </FormControl>

        <Collapse in={expand || !hasComputedCaloricNeeds}>
          <BodyMetricsForm metrics={body} onChange={(payload) => dispatch({ type: ACTIONS.SET_BODY, payload })} />
        </Collapse>
        {hasComputedCaloricNeeds && (
          <Flex mt="4" align="center" justify={["center", "flex-start"]}>
            <NutritionBar nutrition={caloricNeeds} showLegend border={false} />
          </Flex>
        )}
      </Box>

      {hasComputedCaloricNeeds && (
        <Box mb="12" as="section">
          <Heading size="lg" my="4" justifyContent="space-between" alignItems="center" display="flex">
            Your Goal
            <Tag size="sm" textTransform="uppercase" color={goalInfo.color}>
              {goalInfo.text}
            </Tag>
          </Heading>
          <Text fontSize="sm">{goalInfo.description}</Text>

          <FormControl mt={4} mb={4}>
            <FormLabel fontSize="md" display="flex" alignItems="center" pr="0" mt="2" justifyContent="space-between">
              <Text fontWeight="bold">Water</Text>
              <Text>{goal.water} mL</Text>
            </FormLabel>
            <FormHelperText>
              For {body.gender}s, recommended water intake (excluding water content of foods) is {goal.water} mL
            </FormHelperText>
          </FormControl>

          <FormControl my={4}>
            <Flex justify="space-between" align="center">
              <FormLabel fontSize="md" mt="2" flex={0.4} fontWeight="bold">
                Diet
              </FormLabel>
              <Select
                size="sm"
                variant="flushed"
                width="auto"
                onChange={(e) => setGoalType(e.currentTarget.value as GoalTypes)}
                defaultValue={goalDiet}
              >
                {(Object.keys(macroCombination) as GoalTypes[]).map((k) => (
                  <Box as="option" value={k}>
                    {macroCombination[k].name}
                  </Box>
                ))}
              </Select>
            </Flex>
            <FormHelperText my={2}>{macroCombination[goalDiet].description}</FormHelperText>
            <FormHelperText>
              <Box>
                {Object.keys(macroCombination[goalDiet].macros).map(
                  (m, i, arr) =>
                    `${capitalize(m)} - ${
                      // @ts-ignore
                      macroCombination[goalDiet].macros[m] * 100
                    }% ${i !== arr.length - 1 ? " · " : ""}`
                )}
              </Box>
            </FormHelperText>
          </FormControl>

          <FormControl my={4}>
            <FormLabel display="flex" alignItems="center" pr="0" mt="2" justifyContent="space-between">
              <Text fontSize="md" textTransform="capitalize" fontWeight="bold">
                Calories
              </Text>
              <Box fontSize="sm">
                <Button
                  onClick={() => setIsSliderDisabled(!isSliderDisabled)}
                  size="sm"
                  variant={isSliderDisabled ? "ghost" : "solid"}
                  colorScheme={isSliderDisabled ? undefined : "green"}
                >
                  {isSliderDisabled ? "Edit" : "Done"}
                </Button>
              </Box>
            </FormLabel>
          </FormControl>

          <Collapse in={!isSliderDisabled}>
            <Box py={2}>
              <Slider
                step={10}
                defaultValue={goal.nutrition.calories || caloricNeeds.calories}
                value={goalCalories}
                onChange={setGoalCalories}
                isDisabled={isSliderDisabled}
                min={roundToTens(bmr * 1.05)}
                max={roundToTens(2 * caloricNeeds.calories - bmr)}
              >
                <SliderTrack>
                  <SliderFilledTrack bg={goalInfo.color} />
                </SliderTrack>
                <SliderThumb boxSize={6} bg={goalInfo.color}>
                  <ImSpoonKnife color="white" size="12" />
                </SliderThumb>
              </Slider>
            </Box>
          </Collapse>
          <Flex mt="4" justify={["center", "flex-start"]} align="center">
            <NutritionBar nutrition={goal.nutrition} showLegend border={false} />
          </Flex>
        </Box>
      )}
      <Box mb="12" as="section">
        <Heading size="lg" display="flex" my="4" justifyContent="space-between" alignItems="center">
          Your Data
          <IconButton
            isRound
            variant="ghost"
            aria-label={showDataOptions ? "Collapse" : "Expand"}
            onClick={() => setShowDataOptions(!showDataOptions)}
            icon={showDataOptions ? <ChevronUpIcon /> : <ChevronDownIcon />}
          />
        </Heading>

        <FormControl>
          <FormHelperText mb="6">All your data is stored locally on your device.</FormHelperText>
        </FormControl>
        <Collapse in={showDataOptions}>
          <Flex direction={["column", "row"]}>
            <Button
              my="2"
              colorScheme="blue"
              mr={[0, "2"]}
              onClick={() => {
                const downloadLink = URL.createObjectURL(
                  new Blob([JSON.stringify(store)], {
                    type: "application/json",
                  })
                );
                const $a = document.createElement("a");
                $a.href = downloadLink;
                $a.download = "my-calow-data.json";
                document.body.appendChild($a);
                $a.click();
                document.body.removeChild($a);
                window.URL.revokeObjectURL(downloadLink);
              }}
            >
              Export as <Code variant="ghost">.json</Code>
            </Button>
            <Button
              colorScheme="teal"
              onClick={() => document.querySelector<HTMLInputElement>("#import-file-input")?.click()}
            >
              Import from <Code variant="ghost">.json</Code>
            </Button>
            <Input
              hidden
              id="import-file-input"
              type="file"
              accept=".json"
              onChange={async (e) => {
                try {
                  if (e.target && e.target.files) {
                    const content = await readFile(e.target?.files?.[0]);
                    const json: Store = JSON.parse(content);

                    if (!json.goal || !json.body || !json.logs) {
                      throw new Error("Invalid file");
                    }

                    dispatch({
                      type: ACTIONS.SET,
                      payload: {
                        goal: json.goal,
                        logs: json.logs,
                        body: json.body,
                        bookmarks: json.bookmarks,
                      },
                    });
                    alert("Successfully imported!");
                  } else {
                    throw new Error("No file selected");
                  }
                } catch (err) {
                  alert((err as Error).message);
                }
              }}
            />
            <Button
              my="2"
              ml={[0, "2"]}
              variant="solid"
              colorScheme="red"
              onClick={() => {
                if (
                  window.confirm(`Are you sure? You'll lose data of ${daysOfData} day${daysOfData === 1 ? "" : "s"}.`)
                ) {
                  dispatch({ type: ACTIONS.RESET });
                }
              }}
            >
              Delete My Data
            </Button>
          </Flex>
        </Collapse>
      </Box>
    </Page>
  );
}

SettingsPage.pageTitle = "Settings";

function getGoalInfo(goal: number, needs: number) {
  let description =
    "You've set a goal within the limits of your maintenance needs. You would continue to have same weight if you maintain your lifestyle.";
  let color = "gray.500";
  let text = "maintenance";
  const range = 50;

  if (goal < needs - range) {
    description =
      "You've set a goal lower than your maintenance needs. You would lose weight if you continue to stay calorie deficit.";
    color = "red.500";
    text = "deficit";
  } else if (goal > needs + range) {
    description =
      "You've set a goal higher than your maintenance needs. You would gain weight if you continue to stay calorie surplus.";
    color = "green.500";
    text = "surplus";
  }

  return { description, color, text };
}

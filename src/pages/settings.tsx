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
import BodyMetricsForm from "../components/BodyMetricsForm";
import { Page } from "../components/layouts";
import NutritionBar from "../components/NutritionBar";
import { Store, ACTIONS, useStore } from "../store";
import { readFile } from "../util/dom";
import {
  computeCaloricNeeds,
  computeMacroFromCalories,
  macroCombination,
} from "../util/nutrition";
import { capitalize } from "../util/string";

type GoalTypes = keyof typeof macroCombination;
export default function SettingsPage() {
  const { dispatch, ...store } = useStore();
  const [expand, setExpand] = useState(false);
  const [showDataOptions, setShowDataOptions] = useState(false);
  const [goalCalories, setGoalCalories] = useState<number>();
  const [goalType, setGoalType] = useState<GoalTypes>("neutral");
  const [isSliderDisabled, setIsSliderDisabled] = useState(true);

  const { body, goal, logs } = store;
  const { bmr, caloricNeeds } = useMemo(() => computeCaloricNeeds(body), [
    body,
  ]);
  const daysOfData = Object.keys(logs).length;

  useEffect(() => {
    const calories = goalCalories ?? goal.nutrition.calories;
    dispatch({
      type: ACTIONS.SET_GOAL,
      payload: {
        nutrition: computeMacroFromCalories(
          calories,
          macroCombination[goalType].macros
        ),
        diet: goalType,
      },
    });
  }, [goalCalories, goalType]);

  const goalInfo = getGoalInfo(
    goal.nutrition.calories || caloricNeeds.calories,
    caloricNeeds.calories
  );

  const hasComputedCaloricNeeds =
    caloricNeeds.calories !== 0 || !!body.height || !!body.weight;

  return (
    <Page heading="Settings">
      <Box mb="6" as="section">
        <Heading
          size="lg"
          d="flex"
          justifyContent="space-between"
          alignItems="center"
        >
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
            These are your daily caloric needs in order to maintain your body
            weight, based on your body metrics.
          </FormHelperText>
        </FormControl>

        <Collapse in={expand || !hasComputedCaloricNeeds}>
          <BodyMetricsForm
            metrics={body}
            onChange={(payload) =>
              dispatch({ type: ACTIONS.SET_BODY, payload })
            }
          />
        </Collapse>
        {hasComputedCaloricNeeds && (
          <Flex mt="4" align="center" justify={["center", "flex-start"]}>
            <NutritionBar nutrition={caloricNeeds} showLegend />
          </Flex>
        )}
      </Box>

      {hasComputedCaloricNeeds && (
        <Box mb="6" as="section">
          <Heading
            size="lg"
            my="2"
            justifyContent="space-between"
            alignItems="center"
            d="flex"
          >
            Your Goal
            <Tag size="sm" textTransform="uppercase" color={goalInfo.color}>
              {goalInfo.text}
            </Tag>
          </Heading>
          <FormControl>
            <FormHelperText>{goalInfo.description}</FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel
              fontSize="sm"
              d="flex"
              alignItems="center"
              pr="0"
              mt="2"
              justifyContent="space-between"
            >
              Water {goal.water} mL
            </FormLabel>
          </FormControl>

          <FormControl>
            <FormLabel
              fontSize="sm"
              textTransform="capitalize"
              d="flex"
              alignItems="center"
              pr="0"
              mt="2"
              justifyContent="space-between"
            >
              Calories {goal.nutrition.calories || caloricNeeds.calories}kCal
              <Button
                onClick={() => setIsSliderDisabled(!isSliderDisabled)}
                size="xs"
                variant={isSliderDisabled ? "ghost" : "solid"}
                colorScheme={isSliderDisabled ? undefined : "green"}
              >
                {isSliderDisabled ? "Edit" : "Done"}
              </Button>
            </FormLabel>
          </FormControl>

          <Box py={2}>
            <FormControl>
              <FormLabel fontSize="sm" d="flex" pr="0" mt="2">
                Diet
              </FormLabel>
              <Select
                onChange={(e) =>
                  setGoalType(e.currentTarget.value as GoalTypes)
                }
                value={goalType}
              >
                {(Object.keys(macroCombination) as GoalTypes[]).map((k) => (
                  <Box as="option" value={k}>
                    {macroCombination[k].name}
                  </Box>
                ))}
              </Select>
              <Text my={2}>{macroCombination[goalType].description}</Text>
              <FormHelperText>
                <Box>
                  {Object.keys(macroCombination[goalType].macros).map(
                    (m, i, arr) =>
                      `${capitalize(m)} - ${
                        // @ts-ignore
                        macroCombination[goalType].macros[m] * 100
                      }% ${i !== arr.length - 1 ? " · " : ""}`
                  )}
                </Box>
              </FormHelperText>
            </FormControl>
          </Box>

          <Collapse in={!isSliderDisabled}>
            <Box py={2}>
              <Slider
                step={10}
                defaultValue={goal.nutrition.calories || caloricNeeds.calories}
                value={goalCalories}
                onChange={setGoalCalories}
                isDisabled={isSliderDisabled}
                min={bmr}
                max={2 * caloricNeeds.calories - bmr}
              >
                <SliderTrack>
                  <SliderFilledTrack bg={goalInfo.color} />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </Box>
          </Collapse>
          <Flex mt="4" justify={["center", "flex-start"]} align="center">
            <NutritionBar nutrition={goal.nutrition} showLegend />
          </Flex>
        </Box>
      )}
      <Box as="section">
        <Heading
          size="lg"
          d="flex"
          justifyContent="space-between"
          alignItems="center"
        >
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
          <FormHelperText mb="6">
            All your data is stored locally on your device.
          </FormHelperText>
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
              onClick={() =>
                document
                  .querySelector<HTMLInputElement>("#import-file-input")
                  ?.click()
              }
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
                      },
                    });
                    alert("Successfully imported!");
                  } else {
                    throw new Error("No file selected");
                  }
                } catch (err) {
                  alert(err.message);
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
                  window.confirm(
                    `Are you sure? You'll lose data of ${daysOfData} day${
                      daysOfData === 1 ? "" : "s"
                    }.`
                  )
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

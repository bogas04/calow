import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  Text,
  Link,
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
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ImSpoonKnife } from "react-icons/im";
import BodyMetricsForm from "../components/BodyMetricsForm";
import { Page } from "../components/layouts";
import NutritionBar from "../components/NutritionBar";
import { useGeminiApiKey } from "../components/useGeminiApiKey";
import { Store, ACTIONS, useStore } from "../store";
import { readFile } from "../util/dom";
import { computeCaloricNeeds, computeMacroFromCalories, macroCombination } from "../util/nutrition";
import { capitalize, roundToTens } from "../util/primitives";

type GoalTypes = keyof typeof macroCombination;
export default function SettingsPage() {
  const { dispatch, ...store } = useStore();
  const [expand, setExpand] = useState(false);
  const [showDataOptions, setShowDataOptions] = useState(false);
  const [showGeminiOptions, setShowGeminiOptions] = useState(false);
  const [goalCalories, setGoalCalories] = useState<number>();
  const [goalType, setGoalType] = useState<GoalTypes>();
  const [isSliderDisabled, setIsSliderDisabled] = useState(true);
  const [geminiKeyDraft, setGeminiKeyDraft] = useState("");
  const [geminiKeyError, setGeminiKeyError] = useState<string | null>(null);
  const { apiKey: geminiKey, clearApiKey, saveApiKey } = useGeminiApiKey();

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
  }, [dispatch, goal.diet, goal.nutrition.calories, goalCalories, goalType]);

  const goalInfo = getGoalInfo(goal.nutrition.calories || caloricNeeds.calories, caloricNeeds.calories);
  const goalDiet = goalType || goal.diet;

  const hasComputedCaloricNeeds = caloricNeeds.calories !== 0 || !!body.height || !!body.weight;

  const saveGeminiKey = useCallback(() => {
    const key = geminiKeyDraft.trim();
    if (!key) {
      setGeminiKeyError("Enter your Gemini API key.");
      return;
    }

    saveApiKey(key);
    setGeminiKeyDraft("");
    setGeminiKeyError(null);
  }, [geminiKeyDraft, saveApiKey]);

  const clearGeminiKey = useCallback(() => {
    clearApiKey();
    setGeminiKeyDraft("");
    setGeminiKeyError(null);
  }, [clearApiKey]);

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
                  <Box as="option" value={k} key={macroCombination[k].name}>
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

          <Flex mt="4" justify={["center", "flex-start"]} align="center">
            <NutritionBar nutrition={goal.nutrition} showLegend border={false} />
          </Flex>

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
        </Box>
      )}
      <Box mb="12" as="section">
        <Heading size="lg" display="flex" my="4" justifyContent="space-between" alignItems="center">
          Gemini API Key
          <IconButton
            isRound
            variant="ghost"
            aria-label={showGeminiOptions ? "Collapse" : "Expand"}
            onClick={() => setShowGeminiOptions(!showGeminiOptions)}
            icon={showGeminiOptions ? <ChevronUpIcon /> : <ChevronDownIcon />}
          />
        </Heading>
        <FormControl>
          <FormHelperText mb="6">
            {geminiKey ? "Gemini meal estimates are enabled." : "Add a Gemini key to enable meal estimates."}
          </FormHelperText>
        </FormControl>
        <Collapse in={showGeminiOptions}>
          <Box mb={4} color="gray.600" fontSize="sm">
            <Text>
              1. Create a new API key in{" "}
              <Link href="https://aistudio.google.com/app/apikey" color="blue.500" isExternal>
                Google AI Studio
              </Link>
              .
            </Text>
            <Text>2. Open this Settings page.</Text>
            <Text>3. Paste the new API key below.</Text>
          </Box>
          <FormControl mb={4}>
            <FormLabel>Enter your Gemini API key</FormLabel>
            <Input
              type="password"
              value={geminiKeyDraft}
              onChange={(e) => setGeminiKeyDraft(e.currentTarget.value)}
              placeholder={geminiKey ? "Replace your Gemini key" : "Enter your Gemini key"}
              autoComplete="new-password"
            />
            <FormHelperText>
              Your Gemini API key is stored locally in browser storage only. If you don’t have one yet, get it from{" "}
              <Link href="https://aistudio.google.com/app/apikey" color="blue.500" isExternal>
                Google AI Studio
              </Link>
              .
            </FormHelperText>
          </FormControl>
          {geminiKeyError && (
            <Text color="red.500" mb={4}>
              {geminiKeyError}
            </Text>
          )}
          <Flex gap={3} flexWrap="wrap">
            <Button colorScheme="green" onClick={saveGeminiKey}>
              Save Key
            </Button>
            {geminiKey && (
              <Button variant="outline" colorScheme="red" onClick={clearGeminiKey}>
                Clear / Change Key
              </Button>
            )}
          </Flex>
        </Collapse>
      </Box>
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

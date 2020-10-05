import {
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
} from "@chakra-ui/core";
import React, { useEffect, useMemo, useState } from "react";
import BodyMetricsForm from "../components/BodyMetricsForm";
import { Page } from "../components/layouts";
import NutritionBar from "../components/NutritionBar";
import { ACTIONS, useStore } from "../store";
import { computeCaloricNeeds } from "../util/nutrition";

export default function SettingsPage() {
  const { dispatch, ...store } = useStore();
  const [expand, setExpand] = useState(false);
  const [showDataOptions, setShowDataOptions] = useState(false);
  const [goalCalories, setGoalCalories] = useState<number>();

  const { body, goal, logs } = store;
  const { bmr, caloricNeeds } = useMemo(() => computeCaloricNeeds(body), [
    body,
  ]);
  const daysOfData = Object.keys(logs).length;

  useEffect(() => {
    if (goalCalories) {
      dispatch({
        type: ACTIONS.SET_GOAL_FROM_CALORIES,
        payload: goalCalories,
      });
    }
  }, [goalCalories]);

  const goalInfo = getGoalInfo(
    goal.calories || caloricNeeds.calories,
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
              icon={expand ? "chevron-up" : "chevron-down"}
            />
          )}
        </Heading>
        <FormHelperText>
          These are your daily caloric needs in order to maintain your body
          weight, based on your body metrics.
        </FormHelperText>

        <Collapse isOpen={expand || !hasComputedCaloricNeeds}>
          <BodyMetricsForm
            metrics={body}
            onChange={(payload) =>
              dispatch({ type: ACTIONS.SET_BODY, payload })
            }
          />
        </Collapse>
        {hasComputedCaloricNeeds && (
          <Box
            mt="6"
            d="flex"
            alignItems="center"
            justifyContent={["center", "flex-start"]}
          >
            <NutritionBar nutrition={caloricNeeds} />
          </Box>
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
          <FormHelperText>{goalInfo.description}</FormHelperText>
          <FormLabel fontSize="sm" textTransform="capitalize">
            Calories {goal.calories || caloricNeeds.calories}kCal
          </FormLabel>
          <Slider
            step={10}
            defaultValue={goal.calories || caloricNeeds.calories}
            value={goalCalories}
            onChange={setGoalCalories}
            min={bmr}
            max={2 * caloricNeeds.calories - bmr}
          >
            <SliderTrack />
            <SliderFilledTrack bg={goalInfo.color} />
            <SliderThumb />
          </Slider>
          <Box
            mt="6"
            d="flex"
            justifyContent={["center", "flex-start"]}
            alignItems="center"
          >
            <NutritionBar nutrition={goal} />
          </Box>
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
            icon={showDataOptions ? "chevron-up" : "chevron-down"}
          />
        </Heading>
        <FormHelperText mb="6">
          All your data is stored locally on your device.
        </FormHelperText>
        <Collapse isOpen={showDataOptions}>
          <Box d="flex" flexDirection={["column", "row"]}>
            <Button
              my="2"
              variantColor="blue"
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
              Export My Data
            </Button>
            <Button
              my="2"
              ml={[0, "2"]}
              variant="solid"
              variantColor="red"
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
          </Box>
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

import {
  Box,
  Button,
  Collapse,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Radio,
  RadioGroup,
  Select,
} from "@chakra-ui/core";
import * as React from "react";
import { Page } from "../components/layouts";
import { Meter } from "../components/Meter";
import NutritionBar from "../components/NutritionBar";
import {
  ACTIONS,
  BodyMetrics,
  Nutrition,
  nutritionKeys,
  useStore,
} from "../store";
import {
  computeCaloricNeeds,
  computeMacroFromCalories,
} from "../util/nutrition";

export default function SettingsPage() {
  const { body, goal, dispatch } = useStore();
  const [expand, setExpand] = React.useState(false);

  const caloricNeeds = computeCaloricNeeds(body);
  const hasComputedCaloricNeeds =
    caloricNeeds.calories !== 0 || !!body.height || !!body.weight;

  function setGoalFromCalories(calories: number) {
    dispatch({
      type: ACTIONS.SET_GOAL_FROM_CALORIES,
      payload: calories,
    });
  }

  return (
    <Page heading="Settings">
      <Collapse isOpen={expand || !hasComputedCaloricNeeds}>
        <BodyMetricForm
          metrics={body}
          onChange={(payload) => dispatch({ type: ACTIONS.SET_BODY, payload })}
        />
      </Collapse>
      {hasComputedCaloricNeeds && (
        <Box mb="6">
          <Heading size="lg" mb="6">
            Your Daily Needs
          </Heading>
          <Box
            d="flex"
            justifyContent="center"
            alignItems="center"
            fontWeight="bold"
          >
            <NutritionBar nutrition={caloricNeeds} />
          </Box>
          <FormHelperText onClick={() => setExpand(!expand)}>
            Based on your body metrics.
            <IconButton
              isRound
              variant="ghost"
              aria-label={expand ? "Collapse" : "Expand"}
              onClick={() => setExpand(!expand)}
              icon={expand ? "chevron-up" : "chevron-down"}
            />
          </FormHelperText>
        </Box>
      )}
      {hasComputedCaloricNeeds && (
        <Box as="section">
          <Heading size="lg" my="2">
            Your Goal
          </Heading>
          <FormControl pb="3">
            <FormLabel textTransform="capitalize">Calories</FormLabel>
            <Input
              inputMode="numeric"
              value={goal.calories}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setGoalFromCalories(Number(e.currentTarget.value))
              }
            />
          </FormControl>
          <Meter goal={caloricNeeds} nutrition={goal} />
        </Box>
      )}
    </Page>
  );
}

SettingsPage.pageTitle = "Settings";

function BodyMetricForm({
  metrics,
  onChange,
}: {
  metrics: BodyMetrics;
  onChange: (n: BodyMetrics) => void;
}) {
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const {
      activity: { value: activity },
      gender: { value: gender },
      age: { value: age },
      weight: { value: weight },
      height: { value: height },
    } = e.currentTarget;

    onChange({ activity, gender, age, weight, height });
  }

  return (
    <Box as="section" mb="10%">
      <Heading size="lg" my="2">
        Your Caloric Needs
      </Heading>
      <form onSubmit={onSubmit}>
        <FormControl
          d="flex"
          flexDirection="column"
          justifyContent="space-between"
          my="2"
        >
          <FormLabel>Gender</FormLabel>
          <RadioGroup
            d="flex"
            justifyContent="space-between"
            name="gender"
            defaultValue={metrics.gender}
          >
            <Radio value="female">🙍‍♀️ Female</Radio>
            <Radio mr="2" value="male">
              🙍‍♂️ Male
            </Radio>
          </RadioGroup>
        </FormControl>
        <FormControl my="2">
          <FormLabel>Age</FormLabel>
          <Input
            inputMode="numeric"
            defaultValue={metrics.age || undefined}
            placeholder="Age in years"
            name="age"
            isRequired
          />
        </FormControl>
        <Box d="flex" justifyContent="space-between" alignItems="center" my="2">
          <FormControl>
            <FormLabel>Height</FormLabel>
            <Input
              w="95%"
              defaultValue={metrics.height || undefined}
              inputMode="numeric"
              placeholder="Height in centimeters"
              isRequired
              name="height"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Weight</FormLabel>
            <Input
              w="95%"
              inputMode="numeric"
              defaultValue={metrics.weight || undefined}
              placeholder="Weight in kilograms"
              isRequired
              name="weight"
            />
          </FormControl>
        </Box>
        <FormControl my="2">
          <FormLabel>Activity</FormLabel>
          <Select
            name="activity"
            isRequired
            defaultValue={metrics.activity || undefined}
            placeholder="Select your daily activity"
          >
            <option value="1.2">Little to no exercise</option>
            <option value="1.375">Light exercise (1-3 days per week)</option>
            <option value="1.55">Moderate exercise (3-5 days per week)</option>
            <option value="1.725">Heavy exercise (6-7 days per week)</option>
            <option value="1.9">
              Very heavy exercise (twice per day, extra heavy workouts)
            </option>
          </Select>
        </FormControl>
        <Button mt="6" type="submit">
          Calculate
        </Button>
      </form>
    </Box>
  );
}

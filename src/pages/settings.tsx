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
  Tag,
} from "@chakra-ui/core";
import * as React from "react";
import { Page } from "../components/layouts";
import NutritionBar from "../components/NutritionBar";
import { ACTIONS, BodyMetrics, useStore } from "../store";
import { computeCaloricNeeds } from "../util/nutrition";

export default function SettingsPage() {
  const { dispatch, ...store } = useStore();
  const [expand, setExpand] = React.useState(false);

  const { body, goal, logs } = store;
  const daysOfData = Object.keys(logs).length;

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
          <BodyMetricForm
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
            <Tag
              size="sm"
              textTransform="uppercase"
              color={
                goal.calories < caloricNeeds.calories ? "red.500" : "green.500"
              }
            >
              {goal.calories < caloricNeeds.calories ? "deficit" : "surplus"}
            </Tag>
          </Heading>
          <FormHelperText>
            {goal.calories < caloricNeeds.calories
              ? "You've set a goal lower than your maintenance needs. You would lose weight if you continue to stay calorie deficit"
              : "You've set a goal higher than your maintenance needs. You would gain weight if you continue to stay calorie surplus."}
          </FormHelperText>

          <form
            onSubmit={(e) => {
              e.preventDefault();

              const form = e.currentTarget;
              const {
                calories: { value: calories },
              } = form;

              setGoalFromCalories(Number(calories));
            }}
          >
            <FormControl
              py="3"
              d="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <FormLabel fontSize="sm" textTransform="capitalize">
                Calories (kCal)
              </FormLabel>
              <Input
                w="40%"
                inputMode="numeric"
                defaultValue={caloricNeeds.calories}
                name="calories"
                size="sm"
              />
              <Button size="sm" type="submit">
                Save
              </Button>
            </FormControl>
          </form>
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
        <Heading size="lg">Your Data</Heading>
        <FormHelperText mb="6">
          All your data is stored locally on your device.
        </FormHelperText>
        <Box d="flex" flexDirection={["column", "row"]}>
          <Button
            my="2"
            variantColor="blue"
            mr={[0, "2"]}
            onClick={() => {
              window.open(
                URL.createObjectURL(
                  new Blob([JSON.stringify(store)], {
                    type: "application/json",
                  })
                )
              );
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
      </Box>
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
        <FormControl mr="1">
          <FormLabel>Height</FormLabel>
          <Input
            defaultValue={metrics.height || undefined}
            inputMode="numeric"
            placeholder="Height in centimeters"
            isRequired
            name="height"
          />
        </FormControl>
        <FormControl ml="1">
          <FormLabel>Weight</FormLabel>
          <Input
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
  );
}

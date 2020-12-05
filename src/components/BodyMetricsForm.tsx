import {
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Input,
  Box,
  Grid,
  Select,
  Button,
} from "@chakra-ui/react";
import React, { memo } from "react";

import { BodyMetrics } from "../store";

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
        px={1}
        as="fieldset"
        d="flex"
        flexDirection="column"
        justifyContent="space-between"
        my="2"
      >
        <FormLabel as="legend">Gender</FormLabel>
        <RadioGroup
          d="flex"
          justifyContent="space-between"
          name="gender"
          defaultValue={metrics.gender}
        >
          <Radio name="gender" value="female">
            🙍‍♀️ Female
          </Radio>
          <Radio name="gender" value="male">
            🙍‍♂️ Male
          </Radio>
        </RadioGroup>
      </FormControl>
      <FormControl my="2" px={1}>
        <FormLabel>Age</FormLabel>
        <Input
          inputMode="numeric"
          defaultValue={metrics.age || undefined}
          placeholder="Age in years"
          name="age"
          isRequired
        />
      </FormControl>
      <Grid my="2" templateColumns="repeat(2,1fr)" gap={1} px={1}>
        <FormControl>
          <FormLabel>Height</FormLabel>
          <Input
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
            inputMode="numeric"
            defaultValue={metrics.weight || undefined}
            placeholder="Weight in kilograms"
            isRequired
            name="weight"
          />
        </FormControl>
      </Grid>
      <FormControl my="2" px={1}>
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
      <Box px={1} pt={6}>
        <Button type="submit">Calculate</Button>
      </Box>
    </form>
  );
}
export default memo(BodyMetricForm);

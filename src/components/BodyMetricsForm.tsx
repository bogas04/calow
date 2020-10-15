import {
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Input,
  Box,
  Select,
  Button,
} from "@chakra-ui/core";
import { memo } from "react";

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
export default memo(BodyMetricForm);

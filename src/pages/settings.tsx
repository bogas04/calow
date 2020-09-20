import { Box, Heading, Input, Text } from "@chakra-ui/core";
import * as React from "react";
import { ACTIONS, Nutrition, nutritionKeys, useStore } from "../store";

export default function SettingsPage() {
  const { goal, dispatch } = useStore();
  const getChangeHandler = (k: keyof Nutrition) => {
    const handler: React.FormEventHandler<HTMLInputElement> = (e) => {
      dispatch({
        type: ACTIONS.SET_GOAL,
        payload: {
          [k]: Number(e.currentTarget.value),
        },
      });
    };

    return handler;
  };
  return (
    <Box py="2" px="4">
      <Heading my="6">Your Goal</Heading>
      {nutritionKeys.map((k) => (
        <Box>
          <Text textTransform="capitalize">{k}</Text>{" "}
          <Input
            inputMode="numeric"
            value={goal[k]}
            onChange={getChangeHandler(k)}
          />
        </Box>
      ))}
    </Box>
  );
}

SettingsPage.pageTitle = "Settings";

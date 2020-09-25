import { Box, FormControl, FormLabel, Heading, Input } from "@chakra-ui/core";
import * as React from "react";
import { Page } from "../components/layouts";
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
    <Page heading="Settings">
      <Box as="section">
        <Heading size="lg" my="2">
          Your Goal
        </Heading>
        {nutritionKeys.map((k) => (
          <FormControl pb="3">
            <FormLabel textTransform="capitalize">{k}</FormLabel>
            <Input
              inputMode="numeric"
              value={goal[k]}
              onChange={getChangeHandler(k)}
            />
          </FormControl>
        ))}
      </Box>
    </Page>
  );
}

SettingsPage.pageTitle = "Settings";

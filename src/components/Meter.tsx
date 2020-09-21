import { Box, theme } from "@chakra-ui/core";
import * as React from "react";

import { Nutrition, nutritionColors, nutritionKeys } from "../store";
import NutritionBar from "./NutritionBar";

export function Meter({
  nutrition,
  goal,
}: {
  nutrition: Nutrition;
  goal: Nutrition;
}) {
  const radius = {
    fat: 10,
    carbohydrates: 15,
    protein: 20,
    calories: 25,
  };

  const common = {
    cx: 50,
    cy: 50,
    fill: "transparent",
    strokeLinecap: "round",
    strokeWidth: 2,
    style: { transition: "all ease-in-out 0.5s" },
  } as const;

  const strokeDashArray: Nutrition = nutritionKeys.reduce(
    (o, k) => ({
      ...o,
      [k]: (nutrition[k] / goal[k]) * 2 * Math.PI * radius[k] + " 999",
    }),
    {} as Nutrition
  );

  const hasGoalBeenMet = nutritionKeys.every((k) => nutrition[k] >= goal[k]);

  return (
    <Box
      d="flex"
      justifyContent="center"
      alignItems="center"
      mt="2"
      mb="6"
      flexDirection="column"
    >
      <svg
        viewBox="0 0 100 100"
        width="100%"
        height="300"
        style={{ margin: "-50px 0" }}
      >
        {nutritionKeys.map((k) => (
          <circle
            key={k}
            {...common}
            r={radius[k]}
            strokeDasharray={1}
            stroke={theme.colors.gray["200"]}
          />
        ))}
        {nutritionKeys.map((k) => (
          <circle
            key={k}
            {...common}
            r={radius[k]}
            strokeDasharray={strokeDashArray[k]}
            stroke={nutritionColors[k]}
          />
        ))}
        {hasGoalBeenMet && (
          <text
            x={common.cx - 7.5}
            y={common.cy + 5}
            fontSize={theme.fontSizes.sm}
          >
            🤚
          </text>
        )}
      </svg>
      <Box fontWeight="bold">
        <NutritionBar nutrition={nutrition} />
      </Box>
    </Box>
  );
}

import { Box, theme } from "@chakra-ui/core";
import React, { useEffect, useState } from "react";

import {
  Nutrition,
  nutritionColors,
  nutritionColorsRaw,
  nutritionKeys,
} from "../store";
import { mapNutrition } from "../util/nutrition";
import NutritionBar from "./NutritionBar";

const start = 10;
const diff = 7.5;
const radius = {
  fat: start + diff * 0,
  carbohydrates: start + diff * 1,
  protein: start + diff * 2,
  calories: start + diff * 3,
};

const common = {
  cx: 50,
  cy: 50,
  fill: "transparent",
  strokeLinecap: "round",
  strokeWidth: 2,
  style: { transition: "all ease-in-out 0.5s" },
} as const;

export function Meter({
  nutrition,
  goal,
}: {
  nutrition: Nutrition;
  goal: Nutrition;
}) {
  const isAndroid_FIXME_USE_SVG_HEART_INSTEAD = useAndroid_FIXME_USE_SVG_HEART_INSTEAD();
  const circlePoint = mapNutrition(nutrition, (key, value) => {
    const degree = 360 * Number(Number(value / goal[key]).toFixed(2));
    const theta = Number(Number((Math.PI * degree) / 180).toFixed(2));
    return {
      theta,
      degree,
      x: common.cx + radius[key] * Math.cos(theta),
      y: common.cy + radius[key] * Math.sin(theta),
    };
  });

  const strokeDashArray = mapNutrition(nutrition, (key, value) => {
    const multiplier = 2 * Math.PI * radius[key];
    return {
      pending: (value / goal[key]) * multiplier + " 999",
      completed: ((value - goal[key]) / goal[key]) * multiplier + " 999",
    };
  });

  return (
    <Box
      d="flex"
      justifyContent="center"
      alignItems="center"
      mt="2"
      mb="6"
      flexDirection="column"
      h={["auto", "30vh"]}
    >
      <svg
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
        style={{ margin: "-50px 0" }}
      >
        {nutritionKeys.map((k) => {
          const goalMet = nutrition[k] > goal[k];

          return (
            <React.Fragment key={k}>
              <circle
                // this is a gray curve shown behind completed line
                {...common}
                r={radius[k]}
                strokeDasharray={1}
                stroke={theme.colors.gray["200"]}
              />
              <circle
                // This is the completed line, with a color
                {...common}
                r={radius[k]}
                strokeDasharray={strokeDashArray[k].pending}
                stroke={nutritionColors[k]}
              />
              {goalMet && (
                <>
                  <circle
                    // This is a darker line shown on top of completed line
                    {...common}
                    r={radius[k]}
                    strokeDasharray={strokeDashArray[k].completed}
                    stroke={nutritionColorsRaw[k]["600"]}
                  />
                  <circle
                    // This is a circle shown at the end of the line
                    {...common}
                    cx={circlePoint[k].x}
                    cy={circlePoint[k].y}
                    r={1.5}
                    strokeWidth={3}
                    stroke={nutritionColorsRaw[k]["500"]}
                  />
                  <path
                    // This is a tick mark contained within the circle shown at end of the line
                    d={`M ${circlePoint[k].x - 0.5},${
                      circlePoint[k].y + 0.8
                    } l -0.8,-0.8 m 0.8,0.8 l 1.8,-1.5`}
                    stroke="white"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth={0.5}
                    style={{ transition: common.style.transition }}
                  />
                </>
              )}
            </React.Fragment>
          );
        })}
        <text
          x={common.cx - 6}
          y={common.cy + 5}
          fontSize={theme.fontSizes.xs}
          style={{
            transform: isAndroid_FIXME_USE_SVG_HEART_INSTEAD
              ? `translateX(-1.5px)`
              : undefined,
            opacity: Math.max(
              Math.min(nutrition.calories / goal.calories, 1),
              0.1
            ),
          }}
        >
          {nutrition.calories > goal.calories ? "💘" : "❤️"}
        </text>
      </svg>
      <Box fontWeight="bold">
        <NutritionBar nutrition={nutrition} />
      </Box>
    </Box>
  );
}

function useAndroid_FIXME_USE_SVG_HEART_INSTEAD() {
  const [isAndroid, setAndroid] = useState(false);

  useEffect(() => {
    if (navigator.userAgent.toLowerCase().includes("android")) {
      setAndroid(true);
    }
  }, []);

  return isAndroid;
}

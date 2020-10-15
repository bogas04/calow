import { Box, Text } from "@chakra-ui/core";
import { memo } from "react";
import {
  Nutrition,
  nutritionColors,
  nutritionKeys,
  nutritionShortNames,
} from "../store";

export interface NutritionBarProps {
  nutrition: Nutrition;
  border?: boolean;
}

function NutritionBar({ nutrition, border = true }: NutritionBarProps) {
  return (
    <Box
      d="flex"
      {...(border ? { boxShadow: "sm", borderRadius: 50, p: 4 } : {})}
    >
      {nutritionKeys.map((k, i) => {
        const value = nutrition[k];
        return (
          <Box
            d="flex"
            key={i}
            textTransform="capitalize"
            color={nutritionColors[k]}
          >
            <Text fontSize="xs" whiteSpace="nowrap">
              {Number.isInteger(value) ? value : value.toFixed(2)}{" "}
              {nutritionShortNames[k]}
            </Text>
            {i !== nutritionKeys.length - 1 && (
              <Box
                minW="1px"
                maxW="1px"
                width="1px"
                backgroundColor="grey"
                flex="1"
                mx="2"
              />
            )}
          </Box>
        );
      })}
    </Box>
  );
}

export default memo(NutritionBar);

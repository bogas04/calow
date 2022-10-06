import { Flex, Grid, Text } from "@chakra-ui/react";
import { memo } from "react";
import { Nutrition, nutritionColors, nutritionKeys, nutritionShortNames, nutritionShortUnits } from "../store";

export interface NutritionBarProps {
  nutrition: Nutrition;
  border?: boolean;
  showLegend?: boolean;
}

function NutritionBar({ nutrition, border = true, showLegend = !border }: NutritionBarProps) {
  return (
    <Grid
      gridTemplateColumns="repeat(4, auto)"
      gridGap={border ? 4 : 6}
      {...(border
        ? {
            boxShadow: "md",
            borderRadius: 50,
            p: 4,
            px: showLegend && border ? 6 : 4,
          }
        : {})}
    >
      {nutritionKeys.map((k, i) => {
        const value = nutrition[k];
        return (
          <Flex direction="column" key={i} textTransform="capitalize" justify="center" align="flex-start">
            <Text color={nutritionColors[k]} fontWeight="600" fontSize="xs">
              {Number.isInteger(value) ? value : value.toFixed(2)}
              {nutritionShortUnits[k]}
            </Text>
            {showLegend && <Text fontSize="xs">{nutritionShortNames[k]}</Text>}
          </Flex>
        );
      })}
    </Grid>
  );
}

export default memo(NutritionBar);

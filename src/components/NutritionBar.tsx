import { Flex, Grid, Text } from "@chakra-ui/react";
import { memo } from "react";
import {
  MicroNutrition,
  Nutrition,
  nutritionColors,
  nutritionKeys,
  nutritionShortNames,
  nutritionShortUnits,
} from "../store";

export interface NutritionBarProps {
  nutrition: Nutrition;
  border?: boolean;
  showLegend?: boolean;
  micro?: MicroNutrition;
}

function NutritionBar({ micro, nutrition, border = true, showLegend = !border }: NutritionBarProps) {
  return (
    <div className="flex flex-col">
      <Grid
        gridTemplateColumns="repeat(4, auto)"
        zIndex={1}
        gridGap={border ? 4 : 6}
        bg="white"
        {...(border
          ? {
              boxShadow: "md",
              rounded: "3xl",
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
      {micro && chosenMicros.some((x) => micro[x]) ? (
        <div className="-mt-5  flex justify-center gap-4 overflow-x-auto rounded-b-3xl bg-gray-100 pt-7 pb-2">
          {chosenMicros.map((x) => {
            const value = micro[x];

            if (value) {
              return (
                <div className="flex items-center gap-1" key={x}>
                  <p className="text-center text-sm text-gray-800">{value}g</p>
                  <p className="text-sm capitalize text-gray-500">{x}</p>
                </div>
              );
            }
            return undefined;
          })}
        </div>
      ) : null}
    </div>
  );
}

/** Important to me and my partner, but we can consider adding a setting for these */
const chosenMicros = ["fiber", "saturated fats"];

export default memo(NutritionBar);

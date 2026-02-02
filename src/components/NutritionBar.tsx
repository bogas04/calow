import { Flex, Grid, Text } from "@chakra-ui/react";
import { memo } from "react";
import {
  MicroNutrition,
  Nutrition,
  importantMicros,
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
  transparentBg?: boolean;
}

function NutritionBar({
  micro,
  nutrition,
  border = true,
  showLegend = !border,
  transparentBg = false,
}: NutritionBarProps) {
  return (
    <div className="flex flex-col">
      <Grid
        gridTemplateColumns="repeat(4, auto)"
        zIndex={0}
        gridGap={border ? 4 : 6}
        bg={transparentBg ? "transparent" : "white"}
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
      {micro && importantMicros.some((x) => micro[x]) ? (
        <div
          className={
            border
              ? "-mt-5 flex justify-center gap-4 rounded-b-3xl bg-gray-100! pt-7 pb-2"
              : "-mt-5 flex gap-2 overflow-x-auto pt-7 pb-2"
          }
        >
          {importantMicros
            .filter((x) => micro[x])
            .map((x, i, { length }) => {
              const isLast = length - 1 === i;
              const value = micro[x];

              if (value) {
                return (
                  <>
                    <div className="flex items-center gap-1 text-xs">
                      <p className="text-center text-gray-800">{value.toFixed(2)}g</p>
                      <p className="capitalize text-gray-500">{x}</p>
                    </div>
                    {!border ? (isLast ? "" : "/") : null}
                  </>
                );
              }
              return undefined;
            })}
        </div>
      ) : null}
    </div>
  );
}

export default memo(NutritionBar);

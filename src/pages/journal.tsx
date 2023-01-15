import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { memo, useMemo, useState } from "react";
import { Page } from "../components/layouts";
import NutritionBar from "../components/NutritionBar";
import { Nutrition, nutritionColors, nutritionKeys, nutritionShortUnits, Store, useStore } from "../store";
import { computeMacroNutritionFromLog, createNutrition, mapNutrition } from "../util/nutrition";
import {
  compareDate,
  formatShortDateWithoutYear,
  formatTimeOfDay,
  getDateFromDateKey,
  getDateKey,
  getShortMonth,
} from "../util/time";

export default function Journal() {
  const { logs, goal } = useStore();
  const [selectedMacro, setSelectedMacro] = useState<keyof Nutrition>("calories");

  const sortedLogsKeys = useMemo(
    () =>
      Object.keys(logs)
        // sort them by date (descending)
        .sort(compareDate(false))
        .slice(0, 7)
        .sort(compareDate(true)),
    [logs]
  );
  const macrosForLogs = useMemo(
    () => sortedLogsKeys.map((log) => ({ nutrition: computeMacroNutritionFromLog(logs[log]), dateKey: log })),
    [logs, sortedLogsKeys]
  );

  const weeklyAverage = useMemo(
    () =>
      macrosForLogs.reduce(
        (avg, macro) => {
          return mapNutrition(avg, (key, value) => (value + (macro.nutrition[key] || goal.nutrition[key])) / 2);
        },
        createNutrition(() => 0)
      ),
    [goal.nutrition, macrosForLogs]
  );

  const topMealsForMacro = useMemo(() => {
    return sortedLogsKeys
      .flatMap((key) => logs[key])
      .sort((a, b) => b.nutrition[selectedMacro] - a.nutrition[selectedMacro])
      .slice(0, 5);
  }, [sortedLogsKeys, logs, selectedMacro]);

  return (
    <Page heading="Journal">
      <Flex flexDir="column" gap={2}>
        <Flex rounded="xl" bg="gray.100" px="4" py="2" gap={2} align="center">
          {weeklyAverage.calories < goal.nutrition.calories ? (
            <>
              <Text fontSize={"32"} display="inline">
                🏆
              </Text>
              <Text>{"Congrats! You've been hitting your goals."}</Text>
            </>
          ) : (
            <>
              <Text fontSize={"32"} display="inline">
                💪
              </Text>
              <Text>{"Don't worry, keep trying, you'll get there."}</Text>
            </>
          )}
        </Flex>
        <div className="my-4 grid gap-2">
          <div>
            <p className="font-semibold text-sm">Weekly Average</p>
            <NutritionBar nutrition={weeklyAverage} showLegend={true} border={false} />
          </div>
          <div>
            <p className="font-semibold text-sm">Goal</p>
            <NutritionBar nutrition={goal.nutrition} showLegend={true} border={false} />
          </div>
        </div>
      </Flex>

      <Box position="relative" flex={1} mt="12" pl="2" bg="gray.50">
        <Box position="absolute" top={0} zIndex={999} w="100%">
          <Box w="100%" borderBottom="dotted" h="2" borderColor={nutritionColors[selectedMacro]} mt={-2} />
          <Text textAlign={"right"} fontSize="9">
            {goal.nutrition[selectedMacro]} {nutritionShortUnits[selectedMacro]}
          </Text>
        </Box>
        <BarGraph macrosForLogs={macrosForLogs} selectedMacro={selectedMacro} goal={goal} />
      </Box>

      <Flex justify={"space-between"} mt="8" mb="4">
        {nutritionKeys.map((n) => (
          <Button
            key={n}
            onClick={() => setSelectedMacro(n)}
            variant={n === selectedMacro ? "solid" : "outline"}
            size="sm"
          >
            {n}
          </Button>
        ))}
      </Flex>

      <Box>
        <Flex gap="1">
          <Text fontSize="16" fontWeight="bold">
            Meals with most amount of
          </Text>
          <Text
            fontWeight="bold"
            fontSize="16"
            display="inline"
            textTransform={"capitalize"}
            color={nutritionColors[selectedMacro]}
          >
            {selectedMacro}
          </Text>
        </Flex>
        {topMealsForMacro.map((meal, index) => {
          const mealDateKey = getDateKey(meal.timestamp);
          const mealDate = new Date(meal.timestamp);
          return (
            <Link key={index} href={`/?date=${mealDateKey}`}>
              <Box my="4">
                <Flex justify="space-between">
                  <Text fontWeight="semibold" fontSize={14} flex="1">
                    {meal.name}
                  </Text>
                  <Text fontSize="10" color="gray.600" align="right">
                    {formatTimeOfDay(mealDate)}, {formatShortDateWithoutYear(mealDate)}
                  </Text>
                </Flex>
                <NutritionBar nutrition={meal.nutrition} showLegend={true} border={false} />
              </Box>
            </Link>
          );
        })}
      </Box>
    </Page>
  );
}

Journal.pageTitle = "Journal";

const BarGraph = memo(function BarGraph({
  macrosForLogs,
  goal,
  selectedMacro,
}: {
  macrosForLogs: { nutrition: Nutrition; dateKey: string }[];
  goal: Store["goal"];
  selectedMacro: keyof Nutrition;
}) {
  return (
    <Flex justify="space-between" align="flex-end" height={200} width="95%">
      {macrosForLogs.map(({ nutrition, dateKey }) => {
        const multiplier = nutrition[selectedMacro] / goal.nutrition[selectedMacro];
        const mealDate = getDateFromDateKey(dateKey);
        const dateString = mealDate ? formatShortDateWithoutYear(mealDate) : null;
        return (
          <Link key={dateKey} href={`/?date=${dateKey}`}>
            <Box display="flex" alignItems="flex-end" justifyContent="space-between" w="100%" position="relative">
              <Box key={dateKey} bg={nutritionColors[selectedMacro]} w="3" h={Math.min(multiplier * 200, 250)} />
              {dateString ? (
                <Text fontSize="xs" position="absolute" bottom={-5} left={-2}>
                  {dateString}
                </Text>
              ) : null}
            </Box>
          </Link>
        );
      })}
    </Flex>
  );
});

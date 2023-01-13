import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import { memo, useMemo, useState } from "react";
import { Page } from "../components/layouts";
import NutritionBar from "../components/NutritionBar";
import { Nutrition, nutritionColors, nutritionKeys, nutritionShortUnits, Store, useStore } from "../store";
import { computeMacroNutritionFromLog, createNutrition, mapNutrition } from "../util/nutrition";
import { compareDate, getDateFromDateKey, getShortMonth } from "../util/time";

export default function Journal() {
  const { logs, goal } = useStore();
  const [selectedMacro, setSelectedMacro] = useState<keyof Nutrition>("calories");

  const sortedLogs = useMemo(
    () =>
      Object.keys(logs)
        // sort them by date (descending)
        .sort(compareDate(false))
        .slice(0, 7)
        .sort(compareDate(true)),
    [logs]
  );
  const macrosForLogs = useMemo(
    () => sortedLogs.map((log) => ({ nutrition: computeMacroNutritionFromLog(logs[log]), dateKey: log })),
    [logs, sortedLogs]
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

  return (
    <Page heading="Journal">
      <Flex justify={"space-between"} mb="20">
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
      <Box position="relative" flex={1} my={12}>
        <Box position="absolute" top={0} zIndex={999} w="100%">
          <Box w="100%" borderBottom="dotted" h="2" borderColor={nutritionColors[selectedMacro]} mt={-2} />
          <Text textAlign={"right"} fontSize="9">
            {goal.nutrition[selectedMacro]} {nutritionShortUnits[selectedMacro]}
          </Text>
        </Box>
        <BarGraph macrosForLogs={macrosForLogs} selectedMacro={selectedMacro} goal={goal} />
      </Box>
      <Flex flexDir="column" gap={2}>
        <Flex rounded="xl" bg="gray.100" px="4" py="2" gap={2}>
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
        <Flex mt={4} flexDirection="column" gap={3}>
          <Box>
            <Text fontSize={14}>Average</Text>
            <NutritionBar nutrition={weeklyAverage} showLegend={true} border={false} />
          </Box>
          <Box>
            <Text fontSize={14}>Goal</Text>
            <NutritionBar nutrition={goal.nutrition} showLegend={true} border={false} />
          </Box>
        </Flex>
      </Flex>
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
        return (
          <Link key={dateKey} href={`/?date=${dateKey}`}>
            <Box display="flex" alignItems="flex-end" justifyContent="space-between" w="100%" position="relative">
              <Box key={dateKey} bg={nutritionColors[selectedMacro]} w="3" h={Math.min(multiplier * 200, 250)} />
              <Text fontSize="xs" position="absolute" bottom={-5} left={-2}>
                {getDateFromDateKey(dateKey).getDate()} {getShortMonth(getDateFromDateKey(dateKey).getMonth())}
              </Text>
            </Box>
          </Link>
        );
      })}
    </Flex>
  );
});

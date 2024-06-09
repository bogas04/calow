import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { memo, useMemo, useReducer, useState } from "react";
import { Page } from "../components/layouts";
import NutritionBar from "../components/NutritionBar";
import {
  importantMicros,
  microGoals,
  MicroNutrition,
  Nutrition,
  nutritionColors,
  nutritionKeys,
  nutritionShortUnits,
  Store,
  useStore,
} from "../store";
import {
  computeMacroNutritionFromLog,
  computeMicroNutritionFromLog,
  createNutrition,
  mapNutrition,
} from "../util/nutrition";
import { formatShortDateWithoutYear, formatTimeOfDay, getDateFromDateKey, getDateKey } from "../util/time";

const getLastDateKeys = (from = new Date(), limit = 7) =>
  [...Array(limit).keys()]
    .map((x) => {
      const d = new Date(from.getTime());
      d.setDate(d.getDate() - x);
      return getDateKey(d.getTime());
    })
    .reverse();

export default function Journal() {
  const { logs, goal } = useStore();
  const [selectedMacroOrMicro, setSelectedMacroOrMicro] = useState<keyof Nutrition>("calories");
  const [date, updateDate] = useReducer((state: Date, action: "next" | "previous") => {
    return {
      next: () => {
        const newDate = new Date(state.getTime());
        newDate.setDate(state.getDate() + 7);
        return newDate;
      },
      previous: () => {
        const newDate = new Date(state.getTime());
        newDate.setDate(state.getDate() - 7);
        return newDate;
      },
    }[action]();
  }, new Date());

  const sortedLogsKeys = useMemo(() => getLastDateKeys(date), [date]);

  const infoForLogs = useMemo(
    () =>
      sortedLogsKeys.map((log) => ({
        nutrition: computeMacroNutritionFromLog(logs[log] || []),
        micro: computeMicroNutritionFromLog(logs[log] || []),
        dateKey: log,
      })),
    [logs, sortedLogsKeys]
  );

  const weeklyAverage = useMemo(
    () =>
      infoForLogs.reduce(
        (avg, info) => {
          return {
            ...mapNutrition(avg, (key, value) => (value + (info.nutrition[key] || goal.nutrition[key])) / 2),
            // @ts-expect-error need to change base type of avg
            ...Object.fromEntries(importantMicros.map((key) => [key, ((avg?.[key] || 0) + info.micro[key]) / 2])),
          };
        },
        createNutrition(() => 0)
      ),
    [goal.nutrition, infoForLogs]
  );

  const topMealsForMacro = useMemo(() => {
    return sortedLogsKeys
      .flatMap((key) => logs[key] || [])
      .sort((a, b) => {
        if (importantMicros.includes(selectedMacroOrMicro)) {
          return (b.micro?.[selectedMacroOrMicro] || 0) - (a.micro?.[selectedMacroOrMicro] || 0);
        }
        return b.nutrition[selectedMacroOrMicro] - a.nutrition[selectedMacroOrMicro];
      })
      .slice(0, 5);
  }, [sortedLogsKeys, logs, selectedMacroOrMicro]);

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
            <p className="text-sm font-semibold">Weekly Average</p>
            <NutritionBar
              nutrition={weeklyAverage}
              showLegend={true}
              border={false}
              // @ts-expect-error
              micro={Object.fromEntries(importantMicros.map((key) => [key, weeklyAverage[key]]))}
            />
          </div>
          <div>
            <p className="text-sm font-semibold">Goal</p>
            <NutritionBar nutrition={goal.nutrition} showLegend={true} border={false} micro={microGoals} />
          </div>
        </div>
      </Flex>

      <Box position="relative" flex={1} mt="12" pl="2" bg="gray.50">
        <Box position="absolute" top={0} zIndex={999} w="100%">
          <Box w="100%" borderBottom="dotted" h="2" borderColor={nutritionColors[selectedMacroOrMicro]} mt={-2} />
          <Text textAlign={"right"} fontSize="9">
            {goal.nutrition[selectedMacroOrMicro]} {nutritionShortUnits[selectedMacroOrMicro]}
          </Text>
        </Box>
        <BarGraph macrosForLogs={infoForLogs} selectedMacro={selectedMacroOrMicro} goal={goal} />
      </Box>

      <div className="mt-12 flex justify-between">
        <Button variant="outline" onClick={() => updateDate("previous")}>
          Previous Week
        </Button>
        <Button variant="outline" onClick={() => updateDate("next")}>
          Next Week
        </Button>
      </div>

      <div className="mt-8 mb-4 flex justify-between gap-2 overflow-x-auto">
        {
          // @ts-expect-error need to change selectedMacro to selected key or somethingyy
          nutritionKeys.concat(importantMicros).map((n) => (
            <Button
              key={n}
              flexShrink={0}
              onClick={() => setSelectedMacroOrMicro(n)}
              variant={n === selectedMacroOrMicro ? "solid" : "outline"}
              size="sm"
            >
              {n}
            </Button>
          ))
        }
      </div>

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
            color={nutritionColors[selectedMacroOrMicro]}
          >
            {selectedMacroOrMicro}
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
                <NutritionBar nutrition={meal.nutrition} micro={meal.micro} showLegend={true} border={false} />
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
  macrosForLogs: { nutrition: Nutrition; micro: MicroNutrition; dateKey: string }[];
  goal: Store["goal"];
  selectedMacro: keyof Nutrition;
}) {
  return (
    <Flex justify="space-between" align="flex-end" height={200} width="95%">
      {macrosForLogs.map(({ nutrition, micro, dateKey }) => {
        let multiplier = nutrition[selectedMacro] / goal.nutrition[selectedMacro];

        if (importantMicros.includes(selectedMacro)) {
          // @ts-expect-error need to change selectedMacro to selected key or somethingyy
          multiplier = micro[selectedMacro] / microGoals[selectedMacro];
        }
        const mealDate = getDateFromDateKey(dateKey);
        const isToday = mealDate ? getDateKey(mealDate.getTime()) === getDateKey(Date.now()) : false;

        const dateString = mealDate ? formatShortDateWithoutYear(mealDate) : null;
        return (
          <Link key={dateKey} href={`/?date=${dateKey}`}>
            <Box display="flex" alignItems="flex-end" justifyContent="space-between" w="100%" position="relative">
              <Box
                key={dateKey}
                bg={nutritionColors[selectedMacro] ?? "brown"}
                w="3"
                h={Math.min(multiplier * 200, 250)}
              />
              {dateString ? (
                <Text fontSize="xs" position="absolute" bottom={-5} left={-2} fontWeight={isToday ? "bold" : undefined}>
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

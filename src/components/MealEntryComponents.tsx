import { Button, Flex, Heading, HStack, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { memo, MouseEventHandler, useMemo } from "react";
import { BiHistory } from "react-icons/bi";
import { ItemEntry, MealEntry, useStore } from "../store";
import { compareDate } from "../util/time";
import NutritionBar from "./NutritionBar";

const FramerHStack = motion(HStack);

export const IngredientSuggestions = memo(function IngredientSuggestions({ onAdd }: { onAdd(item: ItemEntry): void }) {
  const {
    logs,
    mealEntry: { addedItems },
  } = useStore();

  const recentlyUsedIngredients = useMemo(() => {
    const currentlyAddedItemNames = addedItems.map((x) => x.name);
    const map =
      // get all logs
      Object.keys(logs)
        // sort them by date (descending)
        .sort(compareDate(false))
        // flat out all items (make sure we make a copy of array)
        .flatMap((date) => [...logs[date]].reverse().flatMap((log) => log.items))
        // remove items that are already in current list
        .filter((item) => !currentlyAddedItemNames.includes(item.name))
        // pick first 10
        .slice(0, 10)
        // convert it into a map
        .reduce((map, item) => {
          if (map.has(item.name)) {
            return map;
          }
          map.set(item.name, item);
          return map;
        }, new Map<string, ItemEntry>());

    return Array.from(map.values());
  }, [addedItems, logs]);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    const index = Number(e.currentTarget?.dataset.index);
    if (typeof index === "number" && !isNaN(index)) {
      onAdd(recentlyUsedIngredients[index]);
    }
  };

  if (recentlyUsedIngredients.length === 0) {
    return null;
  }

  return (
    <FramerHStack
      as={UnorderedList}
      listStyleType="none"
      display="flex"
      overflow="auto"
      w="100%"
      m="0"
      px="4"
      py="2"
      spacing={4}
      borderBottom={"1px solid"}
      borderBottomColor="gray.200"
      initial={{ translateY: 100 }}
      bg="gray.50"
      animate={{ translateY: 0 }}
      transition={{ duration: 0.1 }}
    >
      <ListItem>
        <Text colorScheme="gray" fontWeight="normal" size="sm" aria-label="Recently added items">
          <BiHistory />
        </Text>
      </ListItem>
      {recentlyUsedIngredients.map((item, i) => (
        <ListItem key={item.name}>
          <Button
            colorScheme="gray"
            fontWeight="normal"
            variant="outline"
            size="sm"
            data-index={i}
            onClick={handleClick}
          >
            {item.icon || "🍛"} {item.name} ({item.weight}g)
          </Button>
        </ListItem>
      ))}
    </FramerHStack>
  );
});

export const SearchSuggestions = memo(function SearchSuggestions({
  results,
  onAdd,
}: {
  results: ItemEntry[];
  onAdd(name?: string): void;
}) {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    onAdd(e.currentTarget?.dataset.name);
  };
  return (
    <FramerHStack
      as={UnorderedList}
      listStyleType="none"
      display="flex"
      overflow="auto"
      w="100%"
      m="0"
      px="4"
      py="2"
      spacing={4}
      borderBottom={"1px solid"}
      borderBottomColor="gray.200"
      initial={{ translateY: 100 }}
      bg="gray.50"
      animate={{ translateY: 0 }}
      transition={{ duration: 0.1 }}
    >
      {results.map((s) => (
        <ListItem key={s.name}>
          <Button
            colorScheme="gray"
            fontWeight="normal"
            variant="outline"
            size="sm"
            onClick={handleClick}
            data-name={s.name}
          >
            {s.icon} {s.name}
          </Button>
        </ListItem>
      ))}
    </FramerHStack>
  );
});

export const RecentMeals = memo(function RecentMeals({ onAdd }: { onAdd(meal: MealEntry): void }) {
  const { logs } = useStore();

  const recentlyAddedMeals = useMemo(() => {
    const map =
      // get all logs
      Object.keys(logs)
        // sort them by date (descending)
        .sort(compareDate(false))
        // flat out all meals in order (make sure we make a copy of array)
        .flatMap((date) => [...logs[date]].reverse())
        // pick first 10
        .slice(0, 10)
        // convert it into a map
        .reduce((map, item) => {
          if (map.has(item.name)) {
            return map;
          }
          map.set(item.name, item);
          return map;
        }, new Map<string, MealEntry>());

    return Array.from(map.values());
  }, [logs]);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (e.currentTarget) {
      const meal = recentlyAddedMeals[Number(e.currentTarget.dataset.index)];
      onAdd(meal);
    }
  };
  return (
    <Flex width="full" justify="flex-start" flexDir="column">
      <Heading size="md" px="5">
        Recently added meals
      </Heading>
      <UnorderedList listStyleType="none" display="flex" overflow="auto" flexDirection="row" ml="-4" pl="12">
        {recentlyAddedMeals.map((meal, i) => (
          <ListItem key={i} mt="4">
            <Button
              data-index={i}
              onClick={handleClick}
              display="flex"
              flexDir="column"
              height={24}
              width={220}
              variant="ghost"
              alignItems="center"
              justifyContent="center"
              px="4"
              py="4"
              transform={"scale(0.8)"}
              transformOrigin="left"
            >
              <Text mb="2">
                {meal.name} ({meal.portionWeight}g)
              </Text>
              <NutritionBar nutrition={meal.nutrition} />
            </Button>
          </ListItem>
        ))}
      </UnorderedList>
    </Flex>
  );
});

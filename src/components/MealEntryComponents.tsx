import { Text, UnorderedList, ListItem, Button, HStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { memo, useMemo, MouseEventHandler } from "react";
import { BiHistory } from "react-icons/bi";
import { ItemEntry, useStore } from "../store";
import { compareDate } from "../util/time";

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
        // flat out all items
        .flatMap((date) => logs[date].reverse().flatMap((log) => log.items))
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

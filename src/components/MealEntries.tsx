import {
  Box,
  Collapse,
  Heading,
  IconButton,
  IconButtonProps,
  Text,
} from "@chakra-ui/core";
import React, { memo, useState } from "react";
import { MealEntry } from "../store";
import { getTimeDifference } from "../util/time";
import ItemEntries from "./ItemEntries";
import NutritionBar from "./NutritionBar";

export interface MealEntriesProps {
  entries: MealEntry[];
  onDelete?: (meal: MealEntry, index: number) => void;
}

function MealEntries({ entries, onDelete }: MealEntriesProps) {
  return (
    <>
      {entries.map((meal, i) => (
        <Box key={i} mb="4">
          <Meal
            meal={meal}
            onDelete={onDelete ? () => onDelete(meal, i) : undefined}
          />
        </Box>
      ))}
    </>
  );
}

export default memo(MealEntries);

function Meal({
  meal,
  onDelete,
}: {
  meal: MealEntry;
  onDelete?: IconButtonProps["onClick"];
}) {
  const [show, setShow] = useState(false);

  const handleToggle = () => setShow(!show);
  return (
    <>
      <Heading
        mb="2"
        d="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        {meal.name}

        <Box d="flex" justifyContent="flex-end" alignItems="center">
          {onDelete && (
            <IconButton
              isRound
              variant="ghost"
              size="sm"
              aria-label="Delete"
              color="gray.500"
              onClick={onDelete}
              icon="delete"
            />
          )}
          <IconButton
            isRound
            size="sm"
            variant="ghost"
            aria-label={show ? "Collapse" : "Expand"}
            onClick={handleToggle}
            icon={show ? "chevron-up" : "chevron-down"}
          />
        </Box>
      </Heading>

      <NutritionBar nutrition={meal.nutrition} border={false} />
      <Box d="flex" alignItems="center" flex="1" my="2">
        <Text fontSize="xs" color="gray.600" fontWeight="300">
          {meal.portionWeight}g / {meal.totalWeight}g
        </Text>
        <Box w="1px" h="20px" bg="gray.500" mx="2" />
        <Text fontSize="xs" color="gray.600" fontWeight="300">
          {getTimeDifference(meal.timestamp)}
        </Text>
      </Box>
      <Collapse isOpen={show} duration={0}>
        <Box pl="4">
          <ItemEntries items={meal.items} size="sm" />
        </Box>
      </Collapse>
    </>
  );
}

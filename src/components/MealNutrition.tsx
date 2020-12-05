import {
  Flex,
  Box,
  Collapse,
  Heading,
  IconButton,
  IconButtonProps,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon, DeleteIcon } from "@chakra-ui/icons";
import { memo, useState } from "react";
import { MealEntry } from "../store";
import { mapNutrition } from "../util/nutrition";
import { getTimeDifference } from "../util/time";
import ItemNutrition from "./ItemNutrition";
import NutritionBar from "./NutritionBar";

export interface MealNutritionProps {
  meal: MealEntry;
  onDelete?: IconButtonProps["onClick"];
}

function MealNutrition({ meal, onDelete }: MealNutritionProps) {
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

        <Flex justify="flex-end" align="center">
          {onDelete && (
            <IconButton
              isRound
              variant="ghost"
              size="sm"
              aria-label="Delete"
              color="gray.500"
              onClick={onDelete}
              icon={<DeleteIcon />}
            />
          )}
          <IconButton
            isRound
            size="sm"
            variant="ghost"
            aria-label={show ? "Collapse" : "Expand"}
            onClick={handleToggle}
            icon={show ? <ChevronUpIcon /> : <ChevronDownIcon />}
          />
        </Flex>
      </Heading>

      <NutritionBar nutrition={meal.nutrition} border={false} />
      <Flex align="center" flex="1" mt="2" mb="6">
        <Text fontSize="xs" color="gray.600" fontWeight="300">
          {meal.portionWeight === meal.totalWeight
            ? `${meal.totalWeight}g`
            : `${meal.portionWeight}g / ${meal.totalWeight}g`}
        </Text>
        <Box w="1px" h="20px" bg="gray.500" mx="2" />
        <Text fontSize="xs" color="gray.600" fontWeight="300">
          {getTimeDifference(meal.timestamp)}
        </Text>
      </Flex>
      <Collapse in={show}>
        <Box pl="4">
          <ItemNutrition
            size="sm"
            item={{
              name: "Nutritional Value / 100 grams",
              weight: 100,
              nutrition: mapNutrition(
                meal.nutrition,
                (_, value) => (value * 100) / meal.portionWeight
              ),
            }}
            bg="blue.50"
            rounded="md"
          />

          {meal.items.map((item, itemIndex) => (
            <ItemNutrition item={item} size="sm" key={itemIndex} />
          ))}
        </Box>
      </Collapse>
    </>
  );
}

export default memo(MealNutrition);

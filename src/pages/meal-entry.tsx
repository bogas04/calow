import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/core";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Page } from "../components/layouts";
import NutritionBar from "../components/NutritionBar";
import { ACTIONS, inititalNutrition, ItemEntry, useStore } from "../store";
import { getMealName } from "../util/meal";
import { computeWeightedNutrition, mapNutrition } from "../util/nutrition";

export default function MealEntryPage() {
  const { dispatch, items } = useStore();
  const router = useRouter();

  const [addedItems, setAddedItems] = useState<ItemEntry[]>([]);
  const [totalWeight, setTotalWeight] = useState(0);
  const [portionWeight, setPortionWeight] = useState(0);

  // Compute total weight each time a new item is added
  useEffect(() => {
    const newTotalWeight = addedItems.reduce(
      (w, item) => (item.weight || 0) + w,
      0
    );

    setTotalWeight(newTotalWeight);
    setPortionWeight(newTotalWeight);
  }, [addedItems]);

  // Compute total nutrition of current meal
  const mealNutrition = addedItems.reduce(
    (itemNutrition, item) =>
      mapNutrition(item.nutrition, (key, value) =>
        Math.ceil(value + itemNutrition[key])
      ),
    inititalNutrition
  );

  // Compute portion nutrition of current meal
  const portionNutrition = mapNutrition(mealNutrition, (_, value) => {
    return portionWeight === 0
      ? 0
      : Math.ceil((value * portionWeight) / totalWeight);
  });

  function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const {
      item: { value: selectedItemName },
      weight: { value: weight },
    } = form;

    const item =
      items.find((i) => i.name === selectedItemName) ||
      // TODO: Handle custom item addition
      (selectedItemName && {
        name: selectedItemName,
        icon: "❓",
        weight: Number(weight),
        nutrition: {
          fat: 0,
          calories: 0,
          protein: 0,
          carbohydrates: 0,
        },
      });

    if (item) {
      setAddedItems((i) => [{ ...item, weight: Number(weight) }, ...i]);
    }

    form.querySelector("input")?.focus();
    form.reset();
  }

  function handleItemWeightChange(e: React.FormEvent<HTMLInputElement>) {
    const el = e.currentTarget;
    const index = Number(el.dataset.itemIndex);
    const weight = Number(el.value);

    const itemDetails = items.find((i) => i.name === addedItems[index].name);

    if (itemDetails) {
      setAddedItems((xs) =>
        xs.map((x, i) =>
          i === index
            ? {
                ...x,
                weight,
                nutrition: computeWeightedNutrition(
                  itemDetails.nutrition,
                  weight
                ),
              }
            : x
        )
      );
    }
  }

  function onDone() {
    const now = new Date();
    const entry = {
      nutrition: portionNutrition,
      items: addedItems,
      timestamp: now.getTime(),
      name: getMealName(now),
      portionWeight,
      totalWeight,
    };
    dispatch({
      type: ACTIONS.ADD_MEAL_ENTRY,
      payload: { entry },
    });
    setAddedItems([]);
    router.push("/");
  }

  const total = portionWeight !== totalWeight && (
    <Box d="flex" flexDirection="column" bg="blue.50" p="2" my="4" rounded="md">
      <Heading
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        size="md"
        mb="2"
      >
        🍛 Total
      </Heading>
      <NutritionBar border={false} nutrition={mealNutrition} />
    </Box>
  );

  const list = addedItems.map((item, i) => (
    <Box key={i} d="flex" flexDirection="column" p="2" mb="1">
      <Heading
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        size="sm"
        mb="2"
      >
        <Text>
          {item.icon || "🍛"} {item.name}
        </Text>
        <Box
          minW="100px"
          maxW="100px"
          d="flex"
          alignItems="center"
          justifyContent="flex-end"
        >
          <Input
            inputMode="numeric"
            width={60}
            value={item.weight}
            placeholder="Weight"
            size="sm"
            data-item-index={i}
            onChange={handleItemWeightChange}
            mr="2"
          />
          <Box fontWeight="100">g</Box>
        </Box>
      </Heading>
      <NutritionBar border={false} nutrition={item.nutrition} />
    </Box>
  ));

  const form = (
    <Box
      as="form"
      onSubmit={onFormSubmit}
      mt="4"
      mb="2"
      d="flex"
      flexDirection="column"
      alignItems="flex-end"
    >
      <Box d="flex" alignItems="center" justifyContent="space-between">
        <FormControl mr="1">
          <FormLabel htmlFor="items">Item</FormLabel>
          <Input
            isRequired
            type="search"
            list="items-list"
            name="item"
            size="sm"
            placeholder="Enter item name"
          />
          <datalist id="items-list">
            {items.map((i) => (
              <option key={i.name} value={i.name}>
                {i.name}
              </option>
            ))}
          </datalist>
        </FormControl>
        <FormControl my="1">
          <FormLabel htmlFor="items">Weight</FormLabel>
          <Input
            isRequired
            inputMode="numeric"
            name="weight"
            size="sm"
            placeholder="Enter item weight"
          />
        </FormControl>
      </Box>
      <Box mt="2">
        <Button type="submit">Add</Button>
      </Box>
    </Box>
  );

  const footer = (
    <Box
      as="footer"
      p="4"
      borderTop={addedItems.length !== 0 ? "1px solid #cacaca" : undefined}
    >
      {addedItems.length !== 0 && (
        <Box
          d="flex"
          alignItems="center"
          justifyContent="space-between"
          flex="1"
        >
          <Box flex="0.8" d="flex" alignItems="center">
            <Box flex="0.3">
              <Input
                inputMode="numeric"
                value={portionWeight}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setPortionWeight(Number(e.currentTarget.value))
                }
                placeholder="Weight"
                size="sm"
                mr="1"
              />
            </Box>
            <Box flex="0.2" fontWeight="100" textAlign="center">
              g of
            </Box>
            <Box flex="0.3">
              <Input
                inputMode="numeric"
                value={totalWeight}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setTotalWeight(Number(e.currentTarget.value))
                }
                placeholder="Weight"
                size="sm"
                mr="1"
              />
            </Box>
            <Box flex="0.2" fontWeight="100" textAlign="center">
              g
            </Box>
          </Box>
          <Button
            flex="0.2"
            variantColor="green"
            variant="solid"
            onClick={onDone}
          >
            Done
          </Button>
        </Box>
      )}
    </Box>
  );

  return (
    <Box h="100%" d="flex" flexDirection="column">
      <Page heading="Add Entry" flex="1" overflow="auto">
        <Box d="flex" justifyContent="center" mb="2">
          <NutritionBar nutrition={portionNutrition} />
        </Box>
        <Box
          d="flex"
          flex="1"
          flexDirection="column"
          justifyContent="space-between"
        >
          {total}
          {list}
          {form}
        </Box>
      </Page>
      {footer}
    </Box>
  );
}

MealEntryPage.pageTitle = "Add Entry";

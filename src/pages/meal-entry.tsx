import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  Grid,
  Heading,
  HStack,
  IconButton,
  Input,
  ListItem,
  Text,
  UnorderedList,
  useToast,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Fuse from "fuse.js";
import { useRouter } from "next/router";
import React, { ChangeEventHandler, MouseEventHandler, useEffect, useMemo, useState } from "react";

import CustomItemModal, { CustomItemModalProps } from "../components/CustomItemModal";
import { Page } from "../components/layouts";
import MealNameModal from "../components/MealNameModal";
import NutritionBar from "../components/NutritionBar";
import { ACTIONS, inititalNutrition, ItemEntry, MealEntry, useItems, useStore } from "../store";
import DinnerArt from "../svg/DinnerArt";
import { computeMicroNutritionFromLog, computeWeightedNutrition, mapNutrition } from "../util/nutrition";
import { computeArithmeticExpression } from "../util/primitives";

const FramerHStack = motion(HStack);

export default function MealEntryPage() {
  const {
    dispatch,
    mealEntry: { addedItems, totalWeight, portionWeight, name },
    log,
  } = useStore();
  const { items } = useItems();
  const toast = useToast();
  const router = useRouter();
  const [showMealNameModal, setShowMealModal] = useState(false);
  const [showCustomItemModal, setShowCustomItemModal] = useState(false);
  const [customItemDetails, setCustomItemDetails] = useState({
    name: "",
    weight: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");

  const searchResults = useMemo(() => {
    const f = new Fuse(items, { keys: ["name"], threshold: 0.25 });
    return [{ name: `"${searchQuery.replace(/"/gi, "")}"` } as ItemEntry].concat(
      f
        .search(searchQuery)
        .slice(0, 10)
        .map((x) => x.item)
    );
  }, [searchQuery, items]);

  const shouldShowSearchResults = searchQuery !== "" && !searchResults.find((x) => x.name === searchQuery);

  useEffect(() => {
    // on page unload, reset the state
    return () => {
      dispatch({
        type: ACTIONS.RESET_MEAL_ENTRY_ITEMS,
      });
    };
  }, [dispatch]);

  useEffect(() => {
    const index = Number(router.query.index);
    const meal = log[index];

    if (meal && meal.name !== name && meal.items.length !== addedItems.length) {
      dispatch({
        type: ACTIONS.SET_MEAL_ENTRY_ITEMS,
        payload: {
          name: meal.name,
          addedItems: meal.items,
          totalWeight: meal.totalWeight,
          portionWeight: meal.portionWeight,
        },
      });
    }
  }, [router.query.index, log, name, addedItems.length, dispatch]);

  useEffect(() => {
    if (router.query.shared_meal) {
      try {
        const meal = JSON.parse(decodeURIComponent(String(router.query.shared_meal)));

        if (Object.keys(meal).length === 0 || !Array.isArray(meal.items) || typeof meal.totalWeight !== "number") {
          throw new Error("Invalid meal item");
        }

        dispatch({
          type: ACTIONS.SET_MEAL_ENTRY_ITEMS,
          payload: {
            name: meal.name,
            addedItems: meal.items,
            totalWeight: meal.totalWeight,
            portionWeight: meal.portionWeight,
          },
        });
      } catch (err) {
        toast({
          title: "Oops!",
          description: "Please add details manually",
          duration: 5000,
          status: "error",
          isClosable: true,
        });
        alert("Oops!. Please add details manually\n" + (err as Error).message);
      }
    }
  }, [dispatch, router.query.shared_meal, toast]);

  // Compute total nutrition of current meal
  const mealNutrition = addedItems.reduce(
    (itemNutrition, item) => mapNutrition(item.nutrition, (key, value) => value + itemNutrition[key]),
    inititalNutrition
  );

  // Compute portion nutrition of current meal
  const portionNutrition = mapNutrition(mealNutrition, (_, value) => {
    return portionWeight === 0 ? 0 : (value * portionWeight) / totalWeight;
  });

  const addItem = (item: ItemEntry) => dispatch({ type: ACTIONS.ADD_MEAL_ENTRY_ITEM, payload: item });
  const updateItem = (index: number, item: ItemEntry) =>
    dispatch({
      type: ACTIONS.UPDATE_MEAL_ENTRY_ITEM,
      payload: { index, item },
    });
  const deleteItem = (index: number) => dispatch({ type: ACTIONS.DELETE_MEAL_ENTRY_ITEM, payload: index });
  const resetItems = () => dispatch({ type: ACTIONS.RESET_MEAL_ENTRY_ITEMS });
  const setPortionWeight = (weight: number) =>
    dispatch({
      type: ACTIONS.SET_MEAL_ENTRY_PORTION_WEIGHT,
      payload: weight,
    });
  const setTotalWeight = (weight: number) => dispatch({ type: ACTIONS.SET_MEAL_ENTRY_TOTAL_WEIGHT, payload: weight });

  const onSearchQueryChange: ChangeEventHandler<HTMLInputElement> = (e) => setSearchQuery(e.currentTarget.value);

  const onSearchResultClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    const searchResultName = e.currentTarget.dataset.name;
    if (searchResultName) {
      setSearchQuery(searchResultName);
    }
    document.querySelector<HTMLInputElement>('input[name="weight"]')?.focus();
  };

  function handleAddItem(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.item.value;
    const weight = computeArithmeticExpression(form.weight.value);

    const item = items.find((i) => i.name === name);
    if (!item) {
      setCustomItemDetails({
        name,
        weight,
      });

      setShowCustomItemModal(true);
      form.querySelector("input")?.focus();
      form.reset();
      return;
    }

    const weightedItem = {
      ...item,
      weight,
      nutrition: computeWeightedNutrition(item.nutrition, weight),
    };

    addItem(weightedItem);
    setSearchQuery("");
    form.querySelector("input")?.focus();
    form.reset();
  }

  function handleItemWeightChange(e: React.FormEvent<HTMLInputElement>) {
    const el = e.currentTarget;
    const index = Number(el.dataset.itemIndex);
    const weight = Number(el.value) || 1;

    const currentDetails = addedItems[index];
    const newDetails: ItemEntry = {
      ...currentDetails,
      weight,
      nutrition: mapNutrition(currentDetails.nutrition, (_, value) => (weight * value) / currentDetails.weight),
    };

    updateItem(index, newDetails);
  }

  const handleAddCustomItem: CustomItemModalProps["onAdd"] = (item) => {
    const { weight } = customItemDetails;
    const weightedItem = {
      ...item,
      weight,
      nutrition: computeWeightedNutrition(item.nutrition, weight),
    };

    addItem(weightedItem);
    setCustomItemDetails({ name: "", weight: 0 });
    setShowCustomItemModal(false);
  };

  function saveAndRedirect({ name, timestamp = Date.now() }: { name: string; timestamp?: number }) {
    const entry: MealEntry = {
      nutrition: portionNutrition,
      items: addedItems,
      timestamp,
      name,
      portionWeight,
      totalWeight,
    };

    entry.micro = computeMicroNutritionFromLog([entry]);

    dispatch(
      router.query.index && router.query.edit
        ? {
            type: ACTIONS.UPDATE_MEAL_ENTRY,
            payload: { entry, index: Number(router.query.index) },
          }
        : {
            type: ACTIONS.ADD_MEAL_ENTRY,
            payload: { entry },
          }
    );

    setShowMealModal(false);

    resetItems();
    router.push("/");
  }

  function handleDone() {
    if (addedItems.length === 1) {
      saveAndRedirect({ name: addedItems[0].name, timestamp: Date.now() });
      return;
    }
    setShowMealModal(true);
  }

  const total = portionWeight !== totalWeight && (
    <Flex direction="column" bg="blue.50" p="2" my="4" rounded="md">
      <Heading display="flex" justifyContent="space-between" alignItems="center" size="md" mb="2">
        🍛 Meal Nutrition
      </Heading>
      <FormControl>
        <FormHelperText mb="2">
          You&apos;re having {portionWeight} grams of total meal of {totalWeight} grams. This is the total nutritional
          value of the meal.
        </FormHelperText>
      </FormControl>
      <NutritionBar border={false} nutrition={mealNutrition} />
    </Flex>
  );

  const list = addedItems.map((item, i) => (
    <Flex key={i} direction="column" p="2" mb="1">
      <Heading
        display="grid"
        size="sm"
        mb="2"
        gridGap={2}
        gridTemplateColumns="auto 75px 10px 15px"
        alignItems="center"
      >
        <Text>
          {item.icon || "🍛"} {item.name}
        </Text>
        <Input
          inputMode="numeric"
          variant="flushed"
          autoComplete="off"
          width={"1.2"}
          textAlign="center"
          value={item.weight}
          placeholder="Weight"
          size="sm"
          data-item-index={i}
          onChange={handleItemWeightChange}
          mr="2"
        />
        <Flex alignItems="center" justifyContent="center">
          <Text fontWeight="100">g</Text>
        </Flex>

        <IconButton
          height="full"
          size="sm"
          color="gray.500"
          rounded="full"
          onClick={() => deleteItem(i)}
          icon={<CloseIcon />}
          aria-label="Remove item"
          variant="ghost"
        />
      </Heading>
      <NutritionBar border={false} nutrition={item.nutrition} />
    </Flex>
  ));

  const form = (
    <form onSubmit={handleAddItem} style={{ justifyContent: "space-between", flex: 1 }}>
      <Grid templateColumns="1fr 1fr 0.2fr" gap={2}>
        <Input
          isRequired
          autoFocus
          type="search"
          onChange={onSearchQueryChange}
          value={searchQuery}
          variant="filled"
          name="item"
          autoComplete="off"
          size="sm"
          placeholder="Search item"
        />
        <Input
          type="text"
          isRequired
          inputMode="numeric"
          name="weight"
          variant="filled"
          autoComplete="off"
          size="sm"
          placeholder="Weight in grams"
        />
        <IconButton
          aria-label="Add item"
          size="sm"
          type="submit"
          icon={<AddIcon />}
          variant="outline"
          colorScheme="green"
        />
      </Grid>
    </form>
  );

  const footer = (
    <Flex align="center" justify="space-between">
      <Flex align="center">
        <Flex align="center">
          <Input
            variant="flushed"
            w="30%"
            fontSize="xs"
            inputMode="numeric"
            autoComplete="off"
            textAlign="center"
            value={portionWeight}
            onChange={(e: React.FormEvent<HTMLInputElement>) => setPortionWeight(Number(e.currentTarget.value))}
            placeholder="Weight"
            size="sm"
            mr="1"
          />
          <Text fontWeight="100" textAlign="center" fontSize="xs">
            g portion of
          </Text>
        </Flex>
        <Flex align="center">
          <Input
            w="30%"
            fontSize="xs"
            textAlign="center"
            variant="flushed"
            inputMode="numeric"
            autoComplete="off"
            value={totalWeight}
            onChange={(e: React.FormEvent<HTMLInputElement>) => setTotalWeight(Number(e.currentTarget.value))}
            placeholder="Weight"
            size="sm"
            mr="1"
          />
          <Text fontWeight="100" textAlign="center" fontSize="xs">
            g total weight
          </Text>
        </Flex>
      </Flex>
      <Flex flex="1" justify="flex-end">
        <Button size="sm" colorScheme="green" variant="solid" onClick={handleDone}>
          Done
        </Button>
      </Flex>
    </Flex>
  );

  const emptyArt = (
    <Flex p="6" flex="1" direction="column" justify="center" align="center">
      <FormControl>
        <FormHelperText>Add Items of your meal by using the form below.</FormHelperText>
      </FormControl>
      <Box my="6" h={["100%", "20vh"]}>
        <DinnerArt />
      </Box>
    </Flex>
  );

  return (
    <Flex h="100%" direction="column">
      <Page heading="Add Entry" display="flex" flex="1" flexDirection="column" overflow="auto">
        <Flex justify="center" mb="2">
          <NutritionBar nutrition={portionNutrition} />
        </Flex>
        <Flex flex="1" direction="column" justify="space-between">
          {addedItems.length === 0 && emptyArt}
          <Flex direction="column">
            {total}
            {list}
          </Flex>
        </Flex>
      </Page>

      <Flex
        as="footer"
        direction={["column", "row"]}
        align="center"
        justify="space-between"
        borderTop={"1px solid"}
        borderTopColor="gray.200"
      >
        {shouldShowSearchResults && (
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
            {searchResults.map((s) => (
              <ListItem key={s.name}>
                <Button
                  colorScheme="gray"
                  fontWeight="normal"
                  variant="outline"
                  size="sm"
                  onClick={onSearchResultClick}
                  data-name={s.name}
                >
                  {s.icon} {s.name}
                </Button>
              </ListItem>
            ))}
          </FramerHStack>
        )}

        <Box my="3" w="100%" px="4">
          {form}
        </Box>
        {addedItems.length !== 0 && (
          <Box bg="gray.100" px="4" py="2">
            {footer}
          </Box>
        )}
      </Flex>
      <MealNameModal
        isOpen={showMealNameModal}
        onClose={() => setShowMealModal(false)}
        defaultName={name}
        onSubmit={saveAndRedirect}
      />
      <CustomItemModal
        isOpen={showCustomItemModal}
        onClose={() => setShowCustomItemModal(false)}
        name={customItemDetails.name}
        onAdd={handleAddCustomItem}
      />
    </Flex>
  );
}

MealEntryPage.pageTitle = "Add Entry";
MealEntryPage.hideFooter = true;

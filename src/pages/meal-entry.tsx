import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Heading,
  IconButton,
  Input,
  Text,
} from "@chakra-ui/core";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CustomItemModal, {
  CustomItemModalProps,
} from "../components/CustomItemModal";
import { Page } from "../components/layouts";
import MealNameModal, { MealNameModalProps } from "../components/MealNameModal";
import NutritionBar from "../components/NutritionBar";
import {
  ACTIONS,
  inititalNutrition,
  ItemEntry,
  useItems,
  useStore,
} from "../store";
import DinnerArt from "../svg/DinnerArt";
import { computeWeightedNutrition, mapNutrition } from "../util/nutrition";

export default function MealEntryPage() {
  const { dispatch } = useStore();
  const { items } = useItems();
  const router = useRouter();

  const [addedItems, setAddedItems] = useState<ItemEntry[]>([]);
  const [totalWeight, setTotalWeight] = useState(0);
  const [portionWeight, setPortionWeight] = useState(0);
  const [showCustomItemModal, setShowCustomItemModal] = useState(false);
  const [showMealNameModal, setShowMealModal] = useState(false);
  const [customItemDetails, setCustomItemDetails] = useState({
    name: "",
    weight: 0,
  });

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
      mapNutrition(item.nutrition, (key, value) => value + itemNutrition[key]),
    inititalNutrition
  );

  // Compute portion nutrition of current meal
  const portionNutrition = mapNutrition(mealNutrition, (_, value) => {
    return portionWeight === 0 ? 0 : (value * portionWeight) / totalWeight;
  });

  function handleAddItem(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.item.value;
    const weight = Number(form.weight.value);

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

    setAddedItems((i) => i.concat(weightedItem));
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
      nutrition: mapNutrition(
        currentDetails.nutrition,
        (_, value) => (weight * value) / currentDetails.weight
      ),
    };

    setAddedItems((xs) => xs.map((x, i) => (i === index ? newDetails : x)));
  }

  const handleAddCustomItem: CustomItemModalProps["onAdd"] = (item) => {
    const { weight } = customItemDetails;
    const weightedItem = {
      ...item,
      weight,
      nutrition: computeWeightedNutrition(item.nutrition, weight),
    };

    setAddedItems((i) => i.concat(weightedItem));
    setCustomItemDetails({ name: "", weight: 0 });
    setShowCustomItemModal(false);
  };

  const handleMealSubmit: MealNameModalProps["onSubmit"] = ({
    name,
    date = Date.now(),
  }) => {
    console.log({ date });
    const entry = {
      nutrition: portionNutrition,
      items: addedItems,
      timestamp: date,
      name,
      portionWeight,
      totalWeight,
    };

    dispatch({
      type: ACTIONS.ADD_MEAL_ENTRY,
      payload: { entry },
    });
    setAddedItems([]);
    router.push("/");
  };

  const total = portionWeight !== totalWeight && (
    <Box d="flex" flexDirection="column" bg="blue.50" p="2" my="4" rounded="md">
      <Heading
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        size="md"
        mb="2"
      >
        🍛 Meal Nutrition
      </Heading>
      <FormHelperText mb="2">
        You're having {portionWeight} grams of total meal of {totalWeight}{" "}
        grams. This is the total nutritional value of the meal.
      </FormHelperText>
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
            variant="flushed"
            textAlign="center"
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
      onSubmit={handleAddItem}
      d="flex"
      justifyContent="space-between"
      flex="1"
    >
      <FormControl mr="1">
        <Input
          isRequired
          autoFocus
          type="search"
          list="items-list"
          variant="filled"
          name="item"
          size="sm"
          placeholder="Search item"
        />
        <datalist id="items-list">
          {items.map((i) => (
            <option key={i.name} value={i.name}>
              {i.name}
            </option>
          ))}
        </datalist>
      </FormControl>
      <FormControl mx="1">
        <Input
          type="search"
          isRequired
          inputMode="numeric"
          name="weight"
          variant="filled"
          size="sm"
          placeholder="Weight in grams"
        />
      </FormControl>
      <FormControl>
        <IconButton
          aria-label="Add item"
          size="sm"
          type="submit"
          icon="add"
          variant="outline"
          variantColor="green"
        />
      </FormControl>
    </Box>
  );

  const footer = (
    <Box d="flex" alignItems="center" justifyContent="space-between">
      <Box d="flex" alignItems="center">
        <Box d="flex" alignItems="center">
          <Input
            variant="flushed"
            w="30%"
            fontSize="xs"
            inputMode="numeric"
            textAlign="center"
            value={portionWeight}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setPortionWeight(Number(e.currentTarget.value))
            }
            placeholder="Weight"
            size="sm"
            mr="1"
          />
          <Text fontWeight="100" textAlign="center" fontSize="xs">
            g portion of
          </Text>
        </Box>
        <Box d="flex" alignItems="center">
          <Input
            w="30%"
            fontSize="xs"
            textAlign="center"
            variant="flushed"
            inputMode="numeric"
            value={totalWeight}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setTotalWeight(Number(e.currentTarget.value))
            }
            placeholder="Weight"
            size="sm"
            mr="1"
          />
          <Text fontWeight="100" textAlign="center" fontSize="xs">
            g total weight
          </Text>
        </Box>
      </Box>
      <Box d="flex" flex="1" justifyContent="flex-end">
        <Button
          size="sm"
          variantColor="green"
          variant="solid"
          onClick={() => setShowMealModal(true)}
        >
          Done
        </Button>
      </Box>
    </Box>
  );

  const emptyArt = (
    <Box
      d="flex"
      p="6"
      flex="1"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <FormHelperText>
        Add Items of your meal by using the form below.
      </FormHelperText>
      <Box my="6" h={["100%", "20vh"]}>
        <DinnerArt />
      </Box>
    </Box>
  );

  return (
    <Box h="100%" d="flex" flexDirection="column">
      <Page
        heading="Add Entry"
        d="flex"
        flex="1"
        flexDirection="column"
        overflow="auto"
      >
        <Box d="flex" justifyContent="center">
          <NutritionBar nutrition={portionNutrition} />
        </Box>
        <Box
          d="flex"
          flex="1"
          flexDirection="column"
          justifyContent="space-between"
        >
          {addedItems.length === 0 && emptyArt}
          <Box d="flex" flexDirection="column">
            {total}
            {list}
          </Box>
        </Box>
      </Page>

      <Box
        as="footer"
        d="flex"
        flexDirection={["column", "row"]}
        alignItems="center"
        justifyContent="space-between"
        borderTop={"1px solid"}
        borderTopColor="gray.200"
      >
        <Box my="3" w="100%" px="4">
          {form}
        </Box>
        {addedItems.length !== 0 && (
          <Box bg="gray.100" px="4" py="2">
            {footer}
          </Box>
        )}
      </Box>
      <MealNameModal
        isOpen={showMealNameModal}
        onClose={() => setShowMealModal(false)}
        onSubmit={handleMealSubmit}
      />
      <CustomItemModal
        isOpen={showCustomItemModal}
        onClose={() => setShowCustomItemModal(false)}
        name={customItemDetails.name}
        onAdd={handleAddCustomItem}
      />
    </Box>
  );
}

MealEntryPage.pageTitle = "Add Entry";

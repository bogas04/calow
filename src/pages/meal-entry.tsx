import {
  Flex,
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
import { useEffect, useState } from "react";
import CustomItemModal, {
  CustomItemModalProps,
} from "../components/CustomItemModal";
import { Page } from "../components/layouts";
import MealNameModal from "../components/MealNameModal";
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

  function saveAndRedirect({
    name,
    timestamp = Date.now(),
  }: {
    name: string;
    timestamp?: number;
  }) {
    const entry = {
      nutrition: portionNutrition,
      items: addedItems,
      timestamp,
      name,
      portionWeight,
      totalWeight,
    };

    dispatch({
      type: ACTIONS.ADD_MEAL_ENTRY,
      payload: { entry },
    });
    setShowMealModal(false);
    setAddedItems([]);
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
    </Flex>
  );

  const list = addedItems.map((item, i) => (
    <Flex key={i} direction="column" p="2" mb="1">
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
        <Flex minW="100px" maxW="100px" align="center" justify="flex-end">
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
        </Flex>
      </Heading>
      <NutritionBar border={false} nutrition={item.nutrition} />
    </Flex>
  ));

  const form = (
    <Flex as="form" onSubmit={handleAddItem} justify="space-between" flex="1">
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
    </Flex>
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
        </Flex>
        <Flex align="center">
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
        </Flex>
      </Flex>
      <Flex flex="1" justify="flex-end">
        <Button
          size="sm"
          variantColor="green"
          variant="solid"
          onClick={handleDone}
        >
          Done
        </Button>
      </Flex>
    </Flex>
  );

  const emptyArt = (
    <Flex p="6" flex="1" direction="column" justify="center" align="center">
      <FormHelperText>
        Add Items of your meal by using the form below.
      </FormHelperText>
      <Box my="6" h={["100%", "20vh"]}>
        <DinnerArt />
      </Box>
    </Flex>
  );

  return (
    <Flex h="100%" direction="column">
      <Page
        heading="Add Entry"
        d="flex"
        flex="1"
        flexDirection="column"
        overflow="auto"
      >
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

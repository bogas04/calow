import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  Grid,
  Heading,
  IconButton,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import Fuse from "fuse.js";
import { useRouter } from "next/router";
import React, {
  ChangeEventHandler,
  FocusEventHandler,
  InputHTMLAttributes,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { BsCalculator } from "react-icons/bs";
import { CalculatorModal } from "../components/CalculatorModal";

import CustomItemModal, { CustomItemModalProps } from "../components/CustomItemModal";
import { Page } from "../components/layouts";
import { IngredientSuggestions, SearchSuggestions } from "../components/MealEntryComponents";
import MealNameModal from "../components/MealNameModal";
import NutritionBar from "../components/NutritionBar";
import { ACTIONS, inititalNutrition, ItemEntry, MealEntry, useItems, useStore } from "../store";
import DinnerArt from "../svg/DinnerArt";
import { computeMicroNutritionFromLog, computeWeightedNutrition, mapNutrition } from "../util/nutrition";
import { computeArithmeticExpression } from "../util/primitives";
import { formatShortDate, getDateFromDateKey, getDateKey } from "../util/time";

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
  const [showCalculatorModal, setShowCalculatorModal] = useState(false);
  const [showCustomItemModal, setShowCustomItemModal] = useState(false);
  const [shouldShowCalculator, setShouldShowCalculator] = useState(false);
  const [customItemDetails, setCustomItemDetails] = useState({
    name: "",
    weight: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const lastFocusedInput = useRef<HTMLInputElement | null>(null);
  const setLastFocusedInput: FocusEventHandler<HTMLInputElement> = (e) => {
    setShouldShowCalculator(false);
    lastFocusedInput.current = e.currentTarget;
  };

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
  const shouldShowIngredientsSuggestions = !shouldShowSearchResults && searchQuery.length === 0;

  const forDateKey = router.query.forDate as string;
  const forDate = getDateFromDateKey(forDateKey);

  const resetItems = useCallback(() => dispatch({ type: ACTIONS.RESET_MEAL_ENTRY_ITEMS }), [dispatch]);

  const copyMealToCurrent = useCallback(
    (meal: MealEntry) => {
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
    },
    [addedItems.length, dispatch, name]
  );

  useEffect(() => {
    // on page unload, reset the state
    return () => {
      resetItems();
    };
  }, [resetItems]);

  useEffect(() => {
    const index = Number(router.query.index);
    const meal = log[index];

    copyMealToCurrent(meal);
  }, [copyMealToCurrent, log, router.query.index]);

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
  const setPortionWeight = (weight: number) =>
    dispatch({
      type: ACTIONS.SET_MEAL_ENTRY_PORTION_WEIGHT,
      payload: weight,
    });
  const setTotalWeight = (weight: number) => dispatch({ type: ACTIONS.SET_MEAL_ENTRY_TOTAL_WEIGHT, payload: weight });

  const onSearchQueryChange: ChangeEventHandler<HTMLInputElement> = (e) => setSearchQuery(e.currentTarget.value);

  const onSearchResultClick = (searchResultName?: string) => {
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
    router.back();
  }

  function handleDone() {
    if (addedItems.length !== 1) {
      setShowMealModal(true);
      return;
    }
    saveAndRedirect({
      name: addedItems[0].name,
      timestamp: forDate?.getTime() || Date.now(),
    });
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
      <NutritionBar border={false} nutrition={mealNutrition} transparentBg />
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
          onBlur={setLastFocusedInput}
          onFocus={() => setShouldShowCalculator(true)}
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
      <NutritionBar border={false} nutrition={item.nutrition} micro={item.micro} />
    </Flex>
  ));

  const form = (
    <form onSubmit={handleAddItem} style={{ justifyContent: "space-between", flex: 1 }}>
      <Grid templateColumns="1fr 1fr 0.4fr" gap={2}>
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
          onBlur={setLastFocusedInput}
          onFocus={() => setShouldShowCalculator(true)}
          name="weight"
          variant="filled"
          autoComplete="off"
          size="sm"
          placeholder="Weight in grams"
        />
        <Flex gap={2}>
          <IconButton
            aria-label="Calculator"
            size="sm"
            variant="outline"
            icon={<BsCalculator />}
            onClick={(e) => setShowCalculatorModal(true)}
            colorScheme={shouldShowCalculator ? "blue" : "blackAlpha"}
          />
          <IconButton
            aria-label="Add item"
            size="sm"
            type="submit"
            icon={<AddIcon />}
            variant="outline"
            colorScheme="green"
          />
        </Flex>
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
            onBlur={setLastFocusedInput}
            onFocus={() => setShouldShowCalculator(true)}
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
            onBlur={setLastFocusedInput}
            onFocus={() => setShouldShowCalculator(true)}
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
    <>
      <Flex p="6" flex="1" direction="column" justify="center" align="center">
        <FormControl>
          <FormHelperText>Add Items of your meal by using the form below.</FormHelperText>
        </FormControl>
        <Box my="6" h={["100%", "20vh"]}>
          <DinnerArt />
        </Box>
      </Flex>
      {/* <Box mx={["-4", "-16", "-32"]}>
        <RecentMeals onAdd={copyMealToCurrent} />
      </Box> */}
    </>
  );

  return (
    <Flex h="100%" direction="column">
      <Page heading={<MealEntryHeading />} display="flex" flex="1" flexDirection="column" overflow="auto">
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
        {shouldShowSearchResults && <SearchSuggestions results={searchResults} onAdd={onSearchResultClick} />}
        {shouldShowIngredientsSuggestions && <IngredientSuggestions onAdd={addItem} />}
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
        onSubmit={(data) => saveAndRedirect({ ...data, timestamp: forDate?.getTime() || Date.now() })}
      />
      <CustomItemModal
        isOpen={showCustomItemModal}
        onClose={() => setShowCustomItemModal(false)}
        name={customItemDetails.name}
        onAdd={handleAddCustomItem}
      />
      <CalculatorModal
        isOpen={showCalculatorModal && lastFocusedInput.current !== null}
        getTitle={() => lastFocusedInput.current?.placeholder}
        getDefaultValue={() => lastFocusedInput.current?.value}
        onClose={() => setShowCalculatorModal(false)}
        onSubmit={(value) => {
          if (lastFocusedInput.current) {
            /**
             * react won't let us mutate lastFocusedInput.current.value, so we've to do this:
             * https://stackoverflow.com/a/46012210
             */
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
              window.HTMLInputElement.prototype,
              "value"
            )?.set;

            if (nativeInputValueSetter) {
              nativeInputValueSetter.call(lastFocusedInput.current, value);
              var ev2 = new Event("input", { bubbles: true });
              lastFocusedInput.current.dispatchEvent(ev2);
            }
          }
        }}
      />
    </Flex>
  );
}

MealEntryPage.pageTitle = "Add Entry";
MealEntryPage.hideFooter = true;

const MealEntryHeading = memo(function MealEntryHeading() {
  const router = useRouter();
  const forDateKey = router.query.forDate as string;
  const forDate = getDateFromDateKey(forDateKey);

  return (
    <div className="my-6 flex justify-between">
      <h1 className="text-3xl font-bold">Add Entry</h1>
      <input
        className="rounded-lg bg-gray-200 px-2"
        type="date"
        defaultValue={(forDate === null ? getDateKey(Date.now()) : forDateKey)
          .split("/")
          .reverse()
          // input[type=date] expects yyyy-mm-dd but we use dd/mm/yyyy
          .join("-")}
        onChange={(e) => {
          router.push({
            pathname: router.pathname,
            query: {
              ...router.query,
              forDate: e.target.value
                // input[type=date] provides yyyy-mm-dd but we use dd/mm/yyyy
                .split("-")
                .reverse()
                .join("/"),
            },
          });
        }}
      />
    </div>
  );
});

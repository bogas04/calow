import * as React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Button,
  IDrawer,
  Box,
  Input,
  Heading,
  FormControl,
  Text,
} from "@chakra-ui/core";
import { items, ItemEntry, inititalNutrition, MealEntry } from "../store";
import NutritionBar from "./NutritionBar";
import { computeWeightedNutrition, mapNutrition } from "../util/nutrition";
import { getMealName } from "../util/meal";

export interface AddItemDrawerProps {
  isOpen: IDrawer["isOpen"];
  onClose: IDrawer["onClose"];
  items: ItemEntry[];
  onAdd: (entry: MealEntry) => void;
}
function AddItemDrawer({ isOpen, onClose, onAdd }: AddItemDrawerProps) {
  const [addedItems, setAddedItems] = React.useState<ItemEntry[]>([]);
  const [totalWeight, setTotalWeight] = React.useState(0);
  const [portionWeight, setPortionWeight] = React.useState(0);

  React.useEffect(() => {
    const newTotalWeight = addedItems.reduce(
      (w, item) => (item.weight || 0) + w,
      0
    );
    setTotalWeight(newTotalWeight);
    setPortionWeight(newTotalWeight);
  }, [addedItems]);

  function handleTotalWeightChange(e: React.FormEvent<HTMLInputElement>) {
    setTotalWeight(Number(e.currentTarget.value));
  }
  function handlePortionWeightChange(e: React.FormEvent<HTMLInputElement>) {
    setPortionWeight(Number(e.currentTarget.value));
  }

  function onAddItem(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const selectedItemName = form.item.value;

    const item =
      items.find((i) => i.name === selectedItemName) ||
      // TODO: Handle custom item addition
      (selectedItemName && {
        name: selectedItemName,
        icon: "❓",
        weight: 100,
        nutrition: {
          fat: 0,
          calories: 0,
          protein: 0,
          carbohydrates: 0,
        },
        timestamp: Date.now(),
      });

    if (item) {
      setAddedItems((i) => [item, ...i]);
    }

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

  const entryNutrition = addedItems.reduce(
    (entryNutrition, item) =>
      mapNutrition(item.nutrition, (key, value) =>
        Math.ceil(value + entryNutrition[key])
      ),
    inititalNutrition
  );

  const portionNutrition = mapNutrition(entryNutrition, (key, value) =>
    value === 0
      ? 0
      : Math.ceil((entryNutrition[key] * portionWeight) / totalWeight)
  );

  return (
    <Drawer placement="bottom" isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent
        borderRadius="16px 16px 0 0"
        boxShadow="0 0 10px -4px black"
      >
        <DrawerHeader
          d="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          Add Entry
          <NutritionBar nutrition={portionNutrition} border={false} />
        </DrawerHeader>

        <DrawerBody d="flex" justifyContent="flex-start">
          <Box
            d="flex"
            flex="1"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Box as="form" onSubmit={onAddItem} my="4">
              <FormControl>
                <Input
                  type="search"
                  list="items"
                  name="item"
                  placeholder="Enter item name"
                />
                <datalist id="items">
                  {items.map((i) => (
                    <option key={i.name} value={i.name}>
                      {i.name}
                    </option>
                  ))}
                </datalist>
              </FormControl>
            </Box>

            <Box overflowY="auto" overflowX="hidden" pb="10%" maxH="35vh">
              {portionWeight !== totalWeight && (
                <Box
                  d="flex"
                  flexDirection="column"
                  bg="blue.50"
                  p="2"
                  mb="4"
                  borderRadius={8}
                >
                  <Heading
                    d="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    size="md"
                    mb="2"
                  >
                    🍛 Total
                  </Heading>
                  <NutritionBar border={false} nutrition={entryNutrition} />
                </Box>
              )}
              {addedItems.map((item, i) => (
                <Box key={i} d="flex" flexDirection="column" p="2" mb="4">
                  <Heading
                    d="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    size="md"
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
                      justifyContent="space-evenly"
                    >
                      <Input
                        inputMode="numeric"
                        width={60}
                        value={item.weight}
                        placeholder="Weight"
                        size="sm"
                        data-item-index={i}
                        onChange={handleItemWeightChange}
                        mr="1"
                      />
                      <Box fontWeight="100">g</Box>
                    </Box>
                  </Heading>
                  <NutritionBar border={false} nutrition={item.nutrition} />
                </Box>
              ))}
            </Box>
          </Box>
        </DrawerBody>

        <DrawerFooter
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
                    onChange={handlePortionWeightChange}
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
                    onChange={handleTotalWeightChange}
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
                onClick={() => {
                  const now = new Date();
                  onAdd({
                    nutrition: portionNutrition,
                    items: addedItems,
                    timestamp: now.getTime(),
                    name: getMealName(now),
                    portionWeight,
                    totalWeight,
                  });

                  setAddedItems([]);
                }}
              >
                Add
              </Button>
            </Box>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
export default React.memo(AddItemDrawer);

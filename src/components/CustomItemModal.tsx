import {
  ModalProps,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  FormHelperText,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  Text,
} from "@chakra-ui/react";
import { FormEvent, memo } from "react";
import { ItemEntry, nutritionKeys, nutritionUnits } from "../store";
import { mapNutrition } from "../util/nutrition";

export interface CustomItemModalProps {
  name: string;
  isOpen: boolean;
  onAdd: (item: ItemEntry) => void;
  onClose: ModalProps["onClose"];
}

function CustomItemModal({ name, isOpen, onClose, onAdd }: CustomItemModalProps) {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const calories = Number(form.calories.value);
    const weight = Number(form.weight.value);
    const protein = Number(form.protein.value);
    const fat = Number(form.fat.value);
    const carbohydrates = Number(form.carbohydrates.value);
    const fiber = Number(form.fiber.value);
    const saturatedFats = Number(form.saturated_fats.value);

    const computed = fat * 9 + carbohydrates * 4 + protein * 4;
    if (
      Math.abs(calories - computed) > 10 &&
      !confirm(
        `It seems the data is incorrect\nFat * 9 + carbs * 4 + protein * 4 = ${computed}\nbut calories = ${calories}\nDo you still want to continue?`
      )
    ) {
      return;
    }

    onAdd({
      name,
      weight: 100,
      nutrition: mapNutrition(
        {
          calories,
          protein,
          fat,
          carbohydrates,
        },
        (_, value) => (value * 100) / weight
      ),
      micro: { fiber: (fiber * 100) / weight, "saturated fats": (saturatedFats * 100) / weight },
    });
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <form onSubmit={handleSubmit}>
        <ModalContent>
          <ModalHeader>
            Add details for{" "}
            <Text display="inline" textDecoration="underline">
              {name}
            </Text>
          </ModalHeader>
          <ModalBody>
            <FormControl>
              <FormHelperText>
                Enter nutritional details of the item per{" "}
                <Input
                  name="weight"
                  defaultValue="100"
                  textAlign="center"
                  size="sm"
                  w="60px"
                  variant="flushed"
                  display="inline"
                />{" "}
                grams.
              </FormHelperText>
            </FormControl>
            {[...nutritionKeys, "fiber", "saturated_fats"].map((k) => {
              const presentationalKey = k.replace(/_/gi, " ");
              return (
                <FormControl key={k} my="2">
                  <FormLabel textTransform="capitalize">{presentationalKey}</FormLabel>
                  <Input
                    name={k}
                    textTransform="capitalize"
                    placeholder={
                      // @ts-expect-error
                      `${presentationalKey} in ${nutritionUnits[k] || "grams"}`
                    }
                    inputMode="numeric"
                  />
                </FormControl>
              );
            })}
          </ModalBody>
          <ModalFooter>
            <Button type="submit">Add</Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}

export default memo(CustomItemModal);

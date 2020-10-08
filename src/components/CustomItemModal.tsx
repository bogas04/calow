import {
  IModal,
  Modal,
  ModalOverlay,
  Box,
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
} from "@chakra-ui/core";
import React, { FormEvent, memo } from "react";
import { ItemEntry, nutritionKeys, nutritionUnits } from "../store";
import { mapNutrition } from "../util/nutrition";

export interface CustomItemModalProps {
  name: string;
  isOpen: boolean;
  onAdd: (item: ItemEntry) => void;
  onClose: IModal["onClose"];
}

function CustomItemModal({
  name,
  isOpen,
  onClose,
  onAdd,
}: CustomItemModalProps) {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const calories = Number(form.calories.value);
    const weight = Number(form.weight.value);
    const protein = Number(form.protein.value);
    const fat = Number(form.fat.value);
    const carbohydrates = Number(form.carbohydrates.value);

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
    });
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <Box as="form" onSubmit={handleSubmit}>
        <ModalContent>
          <ModalHeader>
            Add details for{" "}
            <Text d="inline" textDecoration="underline">
              {name}
            </Text>
          </ModalHeader>
          <ModalBody>
            <FormHelperText>
              Enter nutritional details of the item per{" "}
              <Input
                name="weight"
                defaultValue="100"
                textAlign="center"
                size="sm"
                w="60px"
                variant="flushed"
                d="inline"
              />{" "}
              grams.
            </FormHelperText>
            {nutritionKeys.map((k) => (
              <FormControl key={k} my="2">
                <FormLabel textTransform="capitalize">{k}</FormLabel>
                <Input
                  name={k}
                  textTransform="capitalize"
                  placeholder={`${k} in ${nutritionUnits[k]}`}
                  inputMode="numeric"
                />
              </FormControl>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button type="submit">Add</Button>
          </ModalFooter>
        </ModalContent>
      </Box>
    </Modal>
  );
}

export default memo(CustomItemModal);

import {
  IModal,
  Modal,
  ModalOverlay,
  Box,
  ModalContent,
  ModalHeader,
  ModalBody,
  FormControl,
  Input,
  ModalFooter,
  Button,
  FormLabel,
} from "@chakra-ui/core";
import React, { FormEvent, memo } from "react";

export interface MealNameModalProps {
  isOpen: boolean;
  onSubmit: (info: { name: string; date: number }) => void;
  onClose: IModal["onClose"];
}

function MealNameModal({ isOpen, onClose, onSubmit }: MealNameModalProps) {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.mealname.value;
    // TODO: add time picker to let user change date later
    const date = Date.now();

    onSubmit({ name, date });
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xs">
      <ModalOverlay />
      <Box as="form" onSubmit={handleSubmit}>
        <ModalContent>
          <ModalHeader>🍛 Give your meal a name</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>Meal's Name</FormLabel>
              <Input
                name="mealname"
                type="text"
                isRequired
                placeholder="Enter meal name"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button mr="2" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variantColor="green">
              Done
            </Button>
          </ModalFooter>
        </ModalContent>
      </Box>
    </Modal>
  );
}

export default memo(MealNameModal);

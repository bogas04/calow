import {
  ModalProps,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  FormControl,
  Input,
  ModalFooter,
  Button,
  FormLabel,
} from "@chakra-ui/react";
import { FormEvent, memo } from "react";

export interface MealNameModalProps {
  isOpen: boolean;
  onSubmit: (info: { name: string; timestamp: number }) => void;
  onClose: ModalProps["onClose"];
  defaultName?: string;
}

function MealNameModal({
  defaultName,
  isOpen,
  onClose,
  onSubmit,
}: MealNameModalProps) {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.mealname.value;
    // TODO: add time picker to let user change date later
    const timestamp = Date.now();

    onSubmit({ name, timestamp });
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xs">
      <ModalOverlay />
      <form onSubmit={handleSubmit}>
        <ModalContent>
          <ModalHeader>🍛 Give your meal a name</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>Meal's Name</FormLabel>
              <Input
                name="mealname"
                type="text"
                defaultValue={defaultName}
                isRequired
                placeholder="Enter meal name"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button mr="2" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" colorScheme="green">
              Done
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}

export default memo(MealNameModal);

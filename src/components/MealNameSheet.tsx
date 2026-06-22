import {
  ModalProps,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  Input,
  ModalFooter,
  Button,
  FormLabel,
} from "./ui";
import { FormEvent, memo, useState } from "react";

const foodIcons = [
  // Main dishes
  "🍛",
  "🍕",
  "🍔",
  "🥗",
  "🌮",
  "🍜",
  "🥪",
  "🍝",
  "🍲",
  "🥘",
  "🥞",
  "🍙",
  "🥟",
  "🍰",
  "🥧",
  "🍪",

  // Fruits & vegetables
  "🍞",

  // Beverages
  "☕️",
  "🧋",

  // Desserts & snacks
  "🍚",
];

export interface MealNameSheetProps {
  isOpen: boolean;
  onSubmit: (info: { name: string; timestamp: number }) => void;
  onClose: ModalProps["onClose"];
  defaultName?: string;
  defaultIcon: string;
}

function MealNameSheet({ defaultName, defaultIcon, isOpen, onClose, onSubmit }: MealNameSheetProps) {
  const [selectedIcon, setSelectedIcon] = useState(defaultIcon);
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = `${form.mealicon.value} ${form.mealname.value}`;
    // TODO: add time picker to let user change date later
    const timestamp = Date.now();

    onSubmit({ name, timestamp });
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" motionPreset="slideInBottom">
      <ModalOverlay height="100vh" />
      <form onSubmit={handleSubmit}>
        <ModalContent position="fixed" bottom="0px" mb="0" borderRadius="1.75rem 1.75rem 0px 0px" minW={["100vw", "lg"]}>
          <ModalHeader mt="2">🍛 Give your meal a name</ModalHeader>
          <ModalCloseButton mt="2" />
          <ModalBody>
            <FormControl>
              <FormLabel>Meal&apos;s Name</FormLabel>
              <Input
                autoFocus
                name="mealname"
                type="text"
                defaultValue={defaultName}
                isRequired
                placeholder="Enter meal name"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Choose an icon</FormLabel>
              <input name="mealicon" type="text" key={selectedIcon} defaultValue={selectedIcon} hidden />
              <div className="grid grid-cols-5 gap-2">
                {foodIcons.map((icon) => (
                  <button
                    type="button"
                    onClick={() => setSelectedIcon(icon)}
                    className={`text-4xl ${
                      icon === selectedIcon ? "bg-blue-50 px-2 border border-blue-200 rounded-md" : ""
                    }`}
                    key={icon}
                  >
                    {icon}
                  </button>
                ))}
              </div>
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

export default memo(MealNameSheet);

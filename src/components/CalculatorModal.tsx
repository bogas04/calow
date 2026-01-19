import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  ModalProps,
  FormControl,
  FormHelperText,
  Button,
} from "@chakra-ui/react";
import { FormEventHandler, memo } from "react";
import { computeArithmeticExpression } from "../util/primitives";

export interface CalculatorModalProps extends Pick<ModalProps, "isOpen" | "onClose"> {
  onSubmit(value: string): void;
  getTitle(): string | undefined;
  getDefaultValue(): string | undefined;
}

export const CalculatorModal = memo(function CalculatorModal({
  getDefaultValue,
  getTitle,
  isOpen,
  onClose,
  onSubmit,
}: CalculatorModalProps) {
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const value = e.currentTarget.querySelector("input")?.value;
    if (typeof value === "string") {
      onSubmit(String(computeArithmeticExpression(value)));
      onClose();
    }
  };

  function handleSymbol(symbol: "+" | "-", e: React.MouseEvent<HTMLButtonElement>) {
    const form = e.currentTarget.form;
    const input = form?.expression as HTMLInputElement;

    if (input) {
      input.value += symbol;
      input.focus?.();
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered scrollBehavior="outside" motionPreset="slideInBottom">
      <ModalOverlay height="100vh" />
      <ModalContent position="fixed" bottom="0px" mb="0" borderRadius="1.75rem 1.75rem 0px 0px" minW={["100vw", "lg"]}>
        <ModalHeader mt="2">{getTitle()}</ModalHeader>
        <ModalCloseButton mt="2" />
        <ModalBody mt="-4" pb="10">
          <form onSubmit={handleSubmit}>
            <FormControl mb="5">
              <FormHelperText mb="5">
                If you wish to calculate a simple expression, for e.g. adding up all your portion weights, then you can
                do so by entering the expression below. This way you need not switch back and forth from Calculator app.
              </FormHelperText>
              <Input
                name="expression"
                type="text"
                defaultValue={getDefaultValue()}
                inputMode="tel"
                placeholder="Eg: 101 + 25"
                autoFocus
                autoComplete="off"
              />
            </FormControl>
            <FormControl mb="5" display="flex" justifyContent="space-between" gap={4} px="4">
              <Button
                onClick={(e) => {
                  handleSymbol("+", e);
                }}
              >
                +
              </Button>
              <Button
                onClick={(e) => {
                  handleSymbol("-", e);
                }}
              >
                -
              </Button>
            </FormControl>
            <Button w="full" type="submit" bg="blue.500" color="white" size="lg">
              Calculate
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});

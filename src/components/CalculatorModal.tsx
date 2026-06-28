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
} from "./ui";
import { FormEventHandler, PointerEvent, memo, useEffect, useRef } from "react";
import { computeArithmeticExpression } from "../util/primitives";
import { focusInput, focusInputAfterViewportSettles } from "../util/dom";

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
  const expressionInputRef = useRef<HTMLInputElement | null>(null);
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const value = expressionInputRef.current?.value;
    if (typeof value === "string") {
      onSubmit(String(computeArithmeticExpression(value)));
      onClose();
    }
  };

  function handleSymbol(symbol: "+" | "-" | "*" | "/") {
    const input = expressionInputRef.current;
    if (input) {
      input.setRangeText(symbol, input.selectionStart ?? input.value.length, input.selectionEnd ?? input.value.length, "end");
      focusInput(input);
    }
  }

  useEffect(() => {
    if (!isOpen) return;
    return focusInputAfterViewportSettles(expressionInputRef.current, { select: true });
  }, [isOpen]);

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
                ref={expressionInputRef}
                name="expression"
                type="text"
                defaultValue={getDefaultValue()}
                inputMode="tel"
                placeholder="Eg: 1*1 + 2/2 + 3*3"
                autoComplete="off"
              />
            </FormControl>
            <FormControl mb="5" display="flex" justifyContent="space-between" gap={4} px="4">
              <Button
                onPointerDown={(event: PointerEvent<HTMLButtonElement>) => event.preventDefault()}
                onClick={() => {
                  handleSymbol("+");
                }}
              >
                +
              </Button>
              <Button
                onPointerDown={(event: PointerEvent<HTMLButtonElement>) => event.preventDefault()}
                onClick={() => {
                  handleSymbol("-");
                }}
              >
                -
              </Button>
              <Button
                onPointerDown={(event: PointerEvent<HTMLButtonElement>) => event.preventDefault()}
                onClick={() => {
                  handleSymbol("*");
                }}
              >
                ×
              </Button>
              <Button
                onPointerDown={(event: PointerEvent<HTMLButtonElement>) => event.preventDefault()}
                onClick={() => {
                  handleSymbol("/");
                }}
              >
                ÷
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

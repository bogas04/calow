import { createContext, FormEvent, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "./ui";
import { AppDialogController, setAppDialog } from "./appDialogController";

type DialogKind = "alert" | "confirm" | "prompt";

type DialogRequest = {
  kind: DialogKind;
  title?: string;
  message: string;
  defaultValue?: string;
  resolve(value: boolean | string | null): void;
};

const AppDialogContext = createContext<AppDialogController | null>(null);

export function AppDialogProvider({ children }: { children: ReactNode }) {
  const [activeDialog, setActiveDialog] = useState<DialogRequest | null>(null);
  const queueRef = useRef<DialogRequest[]>([]);

  const showNext = useCallback(() => {
    setActiveDialog(queueRef.current.shift() ?? null);
  }, []);

  const enqueue = useCallback(
    (request: Omit<DialogRequest, "resolve">) =>
      new Promise<boolean | string | null>((resolve) => {
        const dialog = { ...request, resolve };

        if (activeDialog) {
          queueRef.current.push(dialog);
          return;
        }

        setActiveDialog(dialog);
      }),
    [activeDialog]
  );

  const dialog = useMemo<AppDialogController>(
    () => ({
      alert: async (message, title) => {
        await enqueue({ kind: "alert", message, title });
      },
      confirm: async (message, title) => Boolean(await enqueue({ kind: "confirm", message, title })),
      prompt: async (message, defaultValue, title) => {
        const value = await enqueue({ kind: "prompt", message, defaultValue, title });
        return typeof value === "string" ? value : null;
      },
    }),
    [enqueue]
  );

  useEffect(() => {
    setAppDialog(dialog);

    return () => setAppDialog(null);
  }, [dialog]);

  return (
    <AppDialogContext.Provider value={dialog}>
      {children}
      <AppDialogSheet
        dialog={activeDialog}
        onClose={(value) => {
          activeDialog?.resolve(value);
          showNext();
        }}
      />
    </AppDialogContext.Provider>
  );
}

export function useAppDialog() {
  const dialog = useContext(AppDialogContext);

  if (!dialog) {
    throw new Error("useAppDialog must be used inside AppDialogProvider");
  }

  return dialog;
}

function AppDialogSheet({
  dialog,
  onClose,
}: {
  dialog: DialogRequest | null;
  onClose(value: boolean | string | null): void;
}) {
  const isPrompt = dialog?.kind === "prompt";
  const isConfirm = dialog?.kind === "confirm";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!dialog) {
      return;
    }

    if (isPrompt) {
      onClose(event.currentTarget.response.value);
      return;
    }

    onClose(true);
  };

  return (
    <Modal isOpen={Boolean(dialog)} onClose={() => onClose(isConfirm ? false : null)} scrollBehavior="inside" motionPreset="slideInBottom">
      <ModalOverlay height="100vh" />
      <ModalContent position="fixed" bottom="0px" mb="0" borderRadius="1.75rem 1.75rem 0px 0px" minW={["100vw", "lg"]}>
        <form onSubmit={handleSubmit}>
          <ModalHeader mt="2">{dialog?.title || (isConfirm ? "Confirm" : isPrompt ? "Enter details" : "Notice")}</ModalHeader>
          <ModalCloseButton mt="2" />
          <ModalBody>
            <Text whiteSpace="pre-line">{dialog?.message}</Text>
            {isPrompt && (
              <FormControl mt="4">
                <FormLabel>Response</FormLabel>
                <Input name="response" defaultValue={dialog.defaultValue} autoFocus />
              </FormControl>
            )}
          </ModalBody>
          <ModalFooter>
            {isConfirm || isPrompt ? (
              <Button onClick={() => onClose(isConfirm ? false : null)} variant="outline">
                Cancel
              </Button>
            ) : null}
            <Button type="submit" colorScheme={isConfirm ? "red" : "green"}>
              {isConfirm ? "Confirm" : "OK"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

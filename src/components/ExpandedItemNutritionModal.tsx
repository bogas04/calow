import { ModalProps } from "@chakra-ui/modal";
import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Box,
  IconButton,
  CloseButton,
  ModalBody,
} from "@chakra-ui/react";
import React, { memo } from "react";
import { ItemEntry } from "../store";
import NutritionBar from "./NutritionBar";

function ExpandedItemNutritionModal({
  item,
  isOpen,
  hideWeight = false,
  onClose,
}: { item: ItemEntry; hideWeight?: boolean } & Pick<
  ModalProps,
  "isOpen" | "onClose"
>) {
  const hasMicro = Object.keys(item.micro ?? {}).length !== 0;
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="full"
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent pb={5}>
        <ModalHeader>
          <Box d="flex" alignItems="center" justifyContent="space-between">
            {item.name} {hideWeight ? "" : `(${item.weight}g)`}
            <IconButton
              aria-label="close"
              rounded="full"
              icon={<CloseButton />}
              variant="ghost"
              onClick={onClose}
            />
          </Box>
        </ModalHeader>
        <ModalBody>
          <NutritionBar nutrition={item.nutrition} border={false} />
          {hasMicro && (
            <>
              <Text size="lg" fontWeight="600" mt="5" mb="2">
                Micro Nutrients (in grams):
              </Text>
              {Object.entries(item.micro ?? {}).map(
                ([microName, microValue]) => (
                  <Box
                    key={microName}
                    d="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    my="1"
                  >
                    <Text textTransform="capitalize" fontWeight="400">
                      {microName}
                    </Text>
                    <Text>
                      {Number((microValue * item.weight) / 100).toFixed(2)}
                    </Text>
                  </Box>
                )
              )}
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default memo(ExpandedItemNutritionModal);

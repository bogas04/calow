import Link from "next/link";
import { Flex, Box, BoxProps, Heading, Text, IconButton } from "@chakra-ui/react";
import React, { memo, useState } from "react";
import { ItemEntry } from "../store";
import NutritionBar from "./NutritionBar";
import { BsThreeDots } from "react-icons/bs";
import ExpandedItemNutritionModal from "./ExpandedItemNutritionModal";

export interface ItemNutritionProps extends Omit<BoxProps, "children"> {
  item: ItemEntry;
  size?: "sm" | "lg";
}

function ItemNutrition({ item, size = "lg", ...props }: ItemNutritionProps) {
  const [showMicroNutrientsModal, setShowMicroNutrientsModal] = useState(false);
  const closeMicroNutrientsModal = () => setShowMicroNutrientsModal(false);
  const openMicroNutrientsModal = () => setShowMicroNutrientsModal(true);

  return (
    <>
      <Box
        borderWidth="1px"
        borderStyle="solid"
        borderColor="gray.200"
        borderRadius={8}
        my={size === "sm" ? 3 : 5}
        p={size === "sm" ? 3 : 5}
        {...props}
      >
        <Flex mb={size === "sm" ? 2 : 4} justify="space-between">
          <Heading size={size === "sm" ? "sm" : "md"}>
            <Link href={`/items?search=${item.name}`} passHref legacyBehavior>
              <a>
                <Box as="span" mx={size === "sm" ? 0 : 2}>
                  {item.icon || "🍛"}
                </Box>{" "}
                {item.name}
              </a>
            </Link>
          </Heading>
        </Flex>
        <Flex justify="space-between" align="flex-start">
          <NutritionBar border={false} nutrition={item.nutrition} transparentBg micro={item.micro} />
          {item.micro && (
            <IconButton
              variant="ghost"
              rounded="full"
              color="gray.500"
              icon={<BsThreeDots />}
              aria-label="Micronutrients"
              onClick={openMicroNutrientsModal}
            />
          )}
        </Flex>
        <Text mt="2" fontSize="xs" color="gray.600" fontWeight="300">
          {item.weight}g
        </Text>
      </Box>
      <ExpandedItemNutritionModal item={item} onClose={closeMicroNutrientsModal} isOpen={showMicroNutrientsModal} />
    </>
  );
}

export default memo(ItemNutrition);

import Link from "next/link";
import { Flex, Box, BoxProps, Heading, Text } from "@chakra-ui/react";
import { memo } from "react";
import { ItemEntry } from "../store";
import NutritionBar from "./NutritionBar";

export interface ItemNutritionProps extends Omit<BoxProps, "children"> {
  item: ItemEntry;
  size?: "sm" | "lg";
}

function ItemNutrition({ item, size = "lg", ...props }: ItemNutritionProps) {
  return (
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
          <Link href={`/items?search=${item.name}`}>
            <a>
              <Box as="span" mx={size === "sm" ? 0 : 2}>
                {item.icon || "🍛"}
              </Box>{" "}
              {item.name}
            </a>
          </Link>
        </Heading>
      </Flex>
      <Flex justify="space-between">
        <NutritionBar border={false} nutrition={item.nutrition} />
      </Flex>
      <Text mt="2" fontSize="xs" color="gray.600" fontWeight="300">
        {item.weight}g
      </Text>
    </Box>
  );
}

export default memo(ItemNutrition);

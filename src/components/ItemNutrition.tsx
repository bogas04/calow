import Link from "next/link";
import { Box, BoxProps, Heading, Text } from "@chakra-ui/core";
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
      <Box mb={size === "sm" ? 2 : 4} d="flex" justifyContent="space-between">
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
      </Box>
      <Box d="flex" justifyContent="space-between">
        <NutritionBar border={false} nutrition={item.nutrition} />
      </Box>
      <Text mt="2" fontSize="xs" color="gray.600" fontWeight="300">
        {item.weight}g
      </Text>
    </Box>
  );
}

export default memo(ItemNutrition);

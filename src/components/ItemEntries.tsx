import { Box, Heading } from "@chakra-ui/core";
import Link from "next/link";
import * as React from "react";
import { ItemEntry } from "../store";
import NutritionBar from "./NutritionBar";

export interface ItemEntriesProps {
  items: ItemEntry[];
  size?: "sm" | "lg";
}

function ItemEntries({ items, size = "lg" }: ItemEntriesProps) {
  return (
    <>
      {items.map((l, i) => (
        <Box
          key={i}
          borderWidth={"1px"}
          borderStyle="solid"
          borderColor="gray.200"
          borderRadius={8}
          d="flex"
          alignItems={size === "sm" ? "center" : "flex-start"}
          flexDirection={size === "sm" ? "row" : "column"}
          justifyContent={size === "sm" ? "space-between" : "flex-start"}
          my={size === "sm" ? 3 : 5}
          p={size === "sm" ? 3 : 5}
        >
          <Box
            mb={size === "sm" ? 2 : 4}
            d="flex"
            justifyContent="space-between"
          >
            <Heading size={size === "sm" ? "sm" : "md"}>
              <Box as="span" mx={size === "sm" ? 0 : 2}>
                {l.icon || "🍛"}
              </Box>{" "}
              <Link href={`/items?search=${l.name}`}>
                <a>{l.name}</a>
              </Link>
            </Heading>
          </Box>
          <Box d="flex" justifyContent="space-between">
            <NutritionBar border={false} nutrition={l.nutrition} />
          </Box>
        </Box>
      ))}
    </>
  );
}

export default React.memo(ItemEntries);

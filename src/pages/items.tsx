import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
  Text,
} from "@chakra-ui/core";
import Fuse from "fuse.js";
import React, { useEffect, useMemo, useState } from "react";
import ItemNutrition from "../components/ItemNutrition";
import { Page } from "../components/layouts";

import { useItems } from "../store";

export default function ItemsPage() {
  const { items, isLoading } = useItems();
  const [sortBy, setSortBy] = useState<keyof typeof sortByTitles>("name");
  const [query, setQuery] = useState("");

  const handleSearch: React.FormEventHandler<HTMLInputElement> = (e) => {
    setQuery(e.currentTarget.value);
  };

  useEffect(() => {
    const locationQuery = new URLSearchParams(location.search).get("search");
    if (locationQuery) {
      setQuery(locationQuery);
    }
  }, []);

  const filteredItems = useMemo(() => {
    let filtered = [...items];

    if (query) {
      const fuse = new Fuse(items, { keys: ["name"], threshold: 0.3 });
      filtered = fuse.search(query).map((i) => i.item);
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "calories/weight": {
          return (
            b.nutrition.calories / b.weight - a.nutrition.calories / a.weight
          );
        }
        case "name": {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        }
        case "protein/calories": {
          return (
            b.nutrition.protein / (b.weight * b.nutrition.calories) -
            a.nutrition.protein / (a.weight * a.nutrition.calories)
          );
        }
        case "protein/weight": {
          return (
            b.nutrition.protein / b.weight - a.nutrition.protein / a.weight
          );
        }
      }
    });
  }, [query, items, sortBy]);

  return (
    <Page heading="Your Items">
      <Box
        as="form"
        d="flex"
        alignItems="flex-end"
        justifyContent="space-between"
      >
        <FormControl>
          <FormLabel htmlFor="search">Search for items.</FormLabel>

          <Input
            id="search"
            value={query}
            placeholder="Search"
            type="search"
            onChange={handleSearch}
          />
        </FormControl>
        <Menu>
          <MenuButton
            as={Button}
            // @ts-ignore
            rightIcon="chevron-down"
          >
            Sort
          </MenuButton>
          <MenuList>
            {(Object.keys(sortByTitles) as [keyof typeof sortByTitles]).map(
              (k) => (
                <MenuItem
                  onClick={() => setSortBy((s) => (s === k ? "name" : k))}
                  key={k}
                >
                  {sortBy === k && <Icon name="check" mr="1" />}
                  By {sortByTitles[k]}
                </MenuItem>
              )
            )}
          </MenuList>
        </Menu>
      </Box>
      {isLoading ? (
        <Box mt="4">
          <Skeleton h="2" mt="6" mb="6" w="30%" />

          {[...new Array(4)].map((_, i) => (
            <Box
              key={i}
              borderWidth="1px"
              borderStyle="solid"
              borderColor="gray.200"
              borderRadius={8}
              my="4"
              p="6"
            >
              <Box d="flex" flexDirection="row" mb="6">
                <Skeleton w="30px" h="30px" rounded="50%" mr="4" />
                <Skeleton flex="0.8" h="4" rounded="md" />
              </Box>
              <Box
                d="flex"
                alignItems="center"
                justifyContent="flex-start"
                my="3"
              >
                <Skeleton w="10" h="2" mr="2" />
                <Skeleton w="10" h="2" mr="2" />
                <Skeleton w="10" h="2" mr="2" />
                <Skeleton w="10" h="2" />
              </Box>
            </Box>
          ))}
        </Box>
      ) : (
        <>
          {filteredItems.length !== 0 && (
            <Text mt="4">Sorted by {sortByTitles[sortBy]}</Text>
          )}
          {filteredItems.map((item) => (
            <ItemNutrition item={item} />
          ))}
        </>
      )}
    </Page>
  );
}

ItemsPage.pageTitle = "Items";

const sortByTitles = {
  name: "Name",
  "calories/weight": "Calories",
  "protein/weight": "Protein per Weight",
  "protein/calories": "Protein per Calories",
};

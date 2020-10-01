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
  Text,
} from "@chakra-ui/core";
import Fuse from "fuse.js";
import React, { useEffect, useMemo, useState } from "react";
import ItemEntries from "../components/ItemEntries";
import { Page } from "../components/layouts";

import { useStore } from "../store";

export default function ItemsPage() {
  const { items } = useStore();
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
      {filteredItems.length !== 0 && (
        <Text mt="4">Sorted by {sortByTitles[sortBy]}</Text>
      )}
      <ItemEntries items={filteredItems} />
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

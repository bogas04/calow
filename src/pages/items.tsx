import { Box, Heading, Input, Text } from "@chakra-ui/core";
import Fuse from "fuse.js";
import { useRouter } from "next/dist/client/router";
import * as React from "react";
import { nutritionColors, nutritionKeys, shortNames, useStore } from "../store";

export default function ItemsPage() {
  const { items } = useStore();
  const [query, setQuery] = React.useState("");

  const handleSearch: React.FormEventHandler<HTMLInputElement> = (e) => {
    setQuery(e.currentTarget.value);
  };

  React.useEffect(() => {
    const locationQuery = new URLSearchParams(location.search).get("search");
    if (locationQuery) {
      setQuery(locationQuery);
    }
  }, []);

  const filteredItems = React.useMemo(() => {
    if (!query) {
      return items;
    }
    const fuse = new Fuse(items, { keys: ["name"], threshold: 0.3 });
    return fuse.search(query).map((i) => i.item);
  }, [query, items]);

  return (
    <Box py="2" px="4">
      <Heading my="6">Your items</Heading>
      <Input
        value={query}
        placeholder="Search"
        type="search"
        onChange={handleSearch}
      />
      {filteredItems.map((l, i) => (
        <Box
          key={i}
          borderWidth="1px"
          borderStyle="solid"
          borderColor="gray.200"
          borderRadius={8}
          my="5"
          p="2"
        >
          <Box mb="2" d="flex" justifyContent="space-between">
            <Heading size="md">
              <Box as="span" mx="2">
                {l.icon}
              </Box>{" "}
              {l.name}
            </Heading>
          </Box>
          <Box d="flex" justifyContent="space-around">
            {nutritionKeys.map((k, i) => (
              <React.Fragment key={i}>
                <Box
                  d="flex"
                  textTransform="capitalize"
                  color={nutritionColors[k]}
                >
                  <Text>
                    {l.nutrition[k]} {shortNames[k]}
                  </Text>
                </Box>
                {i !== nutritionKeys.length - 1 && (
                  <Box
                    backgroundColor="grey"
                    flex="1"
                    mx="2"
                    minWidth="1px"
                    maxWidth="1px"
                  />
                )}
              </React.Fragment>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
}

ItemsPage.pageTitle = "Items";

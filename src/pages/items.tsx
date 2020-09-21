import { Box, Heading, Input, Text } from "@chakra-ui/core";
import Fuse from "fuse.js";
import * as React from "react";
import ItemEntries from "../components/ItemEntries";

import { useStore } from "../store";

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
      <ItemEntries items={filteredItems} />
    </Box>
  );
}

ItemsPage.pageTitle = "Items";

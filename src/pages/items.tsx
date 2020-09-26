import { FormControl, FormLabel, Input } from "@chakra-ui/core";
import Fuse from "fuse.js";
import React, { useEffect, useMemo, useState } from "react";
import ItemEntries from "../components/ItemEntries";
import { Page } from "../components/layouts";

import { useStore } from "../store";

export default function ItemsPage() {
  const { items } = useStore();
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
    if (!query) {
      return items;
    }
    const fuse = new Fuse(items, { keys: ["name"], threshold: 0.3 });
    return fuse.search(query).map((i) => i.item);
  }, [query, items]);

  return (
    <Page heading="Your Items">
      <FormControl>
        <FormLabel htmlFor="search">Search for items</FormLabel>
        <Input
          id="search"
          value={query}
          placeholder="Search"
          type="search"
          onChange={handleSearch}
        />
      </FormControl>
      <ItemEntries items={filteredItems} />
    </Page>
  );
}

ItemsPage.pageTitle = "Items";

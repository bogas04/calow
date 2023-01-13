import { Box, Heading, Grid, FormControl, FormLabel, Input } from "@chakra-ui/react";
import Fuse from "fuse.js";
import { useRouter } from "next/router";
import { MouseEvent, MouseEventHandler, useEffect, useMemo, useState } from "react";
import { Page } from "../components/layouts";
import MealNutrition from "../components/MealNutrition";

import { ACTIONS, MealEntry, useStore } from "../store";
import { getClosestDatasetKey } from "../util/dom";
import { compareDate, formatDateKey } from "../util/time";

export default function SearchPage() {
  const { logs, dispatch } = useStore();
  const [query, setQuery] = useState("");
  const router = useRouter();

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
    if (!query || query.length < 3) {
      return [];
    }

    const fuse = new Fuse(
      Object.entries(logs).reduce(
        (acc, [date, value]) => acc.concat(value.map((v) => ({ date, value: v }))),
        [] as { date: string; value: MealEntry }[]
      ),
      { keys: ["value.name", "value.items.name"], threshold: 0.25 }
    );
    return fuse
      .search(query)
      .map((i) => i.item)
      .sort((a, b) => compareDate(false)(a.date, b.date))
      .slice(0, 15);
  }, [query, logs]);

  const onRepeat: MouseEventHandler<HTMLButtonElement> = (e) => {
    const localIndex = getMealIndexFromMenuButton(e);
    const { value: meal } = filteredItems[localIndex];

    dispatch({
      type: ACTIONS.SET_MEAL_ENTRY_ITEMS,
      payload: {
        name: meal.name,
        addedItems: meal.items,
        totalWeight: meal.totalWeight,
        portionWeight: meal.portionWeight,
      },
    });

    router.push("/meal-entry");
  };

  return (
    <Page heading="Search Meals">
      <Grid as="form" templateColumns="auto" gap={2} alignItems="end" onSubmit={(e) => e.preventDefault()} mb={6}>
        <FormControl width="full">
          <FormLabel htmlFor="search">Search for meals</FormLabel>

          <Input id="search" value={query} placeholder="Search" type="search" onChange={handleSearch} />
        </FormControl>
      </Grid>
      {filteredItems.map((item, index) => (
        <Box key={index} my={2} {...{ [`data-${MEAL_INDEX_DATA_ATTR}`]: index }}>
          <Heading size="lg" my={2}>
            {formatDateKey(item.date)}
          </Heading>
          <MealNutrition meal={item.value} onRepeat={onRepeat} />
        </Box>
      ))}
    </Page>
  );
}

SearchPage.pageTitle = "Search";

const MEAL_INDEX_DATA_ATTR = "mealindex";

function getMealIndexFromMenuButton(e: MouseEvent<HTMLButtonElement>) {
  const itemIndex = getClosestDatasetKey(e, MEAL_INDEX_DATA_ATTR);
  if (itemIndex === null || itemIndex === undefined) {
    throw new Error("This shouldn't have happened.\nCouldn't find proper meal position.");
  }
  const index = Number(itemIndex);

  return index;
}

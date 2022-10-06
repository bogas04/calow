import { Box, Grid, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { MouseEvent, MouseEventHandler, useMemo, useState } from "react";
import { Page } from "../components/layouts";
import MealNutrition from "../components/MealNutrition";
import { ACTIONS, useStore } from "../store";
import { getClosestDatasetKey } from "../util/dom";
import { useRouter } from "next/router";
import Fuse from "fuse.js";

export default function BookmarksPage() {
  const [query, setQuery] = useState("");
  const { logs, dispatch, bookmarks } = useStore();
  const router = useRouter();

  const onBookmark: MouseEventHandler<HTMLButtonElement> = (e) => {
    const localIndex = getMealIndexFromMenuButton(e);
    const { date, index } = filteredBookmarks[localIndex];

    dispatch({
      type: ACTIONS.REMOVE_BOOKMARK,
      payload: { date, index },
    });
  };

  const onRepeat: MouseEventHandler<HTMLButtonElement> = (e) => {
    const localIndex = getMealIndexFromMenuButton(e);
    const { meal } = filteredBookmarks[localIndex];

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

  const filteredBookmarks = useMemo(() => {
    const processedBookmarks = bookmarks.map((x) => ({
      date: x.date,
      index: x.index,
      meal: logs[x.date][x.index],
    }));

    const f = new Fuse(processedBookmarks, {
      keys: ["meal.name"],
      threshold: 0.25,
    });

    return query.trim() === "" ? processedBookmarks : f.search(query.trim()).map((x) => x.item);
  }, [bookmarks, query, logs]);

  const handleSearch: React.FormEventHandler<HTMLInputElement> = (e) => {
    setQuery(e.currentTarget.value);
  };

  return (
    <Page heading="Your Bookmarks">
      <Grid as="form" templateColumns="auto" gap={2} alignItems="end" onSubmit={(e) => e.preventDefault()}>
        <FormControl>
          <FormLabel htmlFor="search">Search bookmarks</FormLabel>

          <Input id="search" value={query} placeholder="Search" type="search" onChange={handleSearch} />
        </FormControl>
      </Grid>
      <Box mt="4">
        {filteredBookmarks.map(({ meal, index, date }, bookmarkIndex) => (
          <Box key={`${date}-${bookmarkIndex}`} {...{ [`data-${MEAL_INDEX_DATA_ATTR}`]: bookmarkIndex }}>
            <MealNutrition meal={meal} onRepeat={onRepeat} onBookmark={onBookmark} bookmarked />
          </Box>
        ))}
      </Box>
    </Page>
  );
}

BookmarksPage.pageTitle = "Bookmarks";

const MEAL_INDEX_DATA_ATTR = "mealindex";

function getMealIndexFromMenuButton(e: MouseEvent<HTMLButtonElement>) {
  const itemIndex = getClosestDatasetKey(e, MEAL_INDEX_DATA_ATTR);
  if (itemIndex === null || itemIndex === undefined) {
    throw new Error("This shouldn't have happened.\nCouldn't find proper meal position.");
  }
  const index = Number(itemIndex);

  return index;
}

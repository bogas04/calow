import {
  Box,
  ChakraProps,
  Flex,
  FormControl,
  FormHelperText,
  Grid,
  Icon,
  IconButton,
  Link as ChakraLink,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { MouseEvent, MouseEventHandler, useDeferredValue, useMemo, useState } from "react";

import { CgCalendarToday, CgGlassAlt as WaterGlassIcon } from "react-icons/cg";
import { ACTIONS, inititalNutrition, Store, useStore } from "../store";
import EmptyArt from "../svg/EmptyArt";
import { getClosestDatasetKey } from "../util/dom";
import { getDateFromDateKey, getDateKey } from "../util/time";

import { InfoIcon } from "@chakra-ui/icons";
import { BiStats } from "react-icons/bi";
import { BsDropletFill, BsDropletHalf } from "react-icons/bs";
import DateBar from "../components/DateBar";
import ExpandedItemNutritionModal from "../components/ExpandedItemNutritionModal";
import { Page } from "../components/layouts";
import { LoadingContainer } from "../components/LoadingContainer";
import MealNutrition from "../components/MealNutrition";
import { Meter } from "../components/Meter";
import NutritionBar from "../components/NutritionBar";
import { DAY, TODAY } from "../constants/date";

// Disabled due to low usage.
const isWaterEnabled = false;
export default function HomePage() {
  const router = useRouter();
  const date = useMemo(() => {
    if (typeof router.query.date === "undefined") {
      return TODAY;
    }
    return getDateFromDateKey(router.query.date as string)?.getTime() || TODAY;
  }, [router.query.date]);
  const setDate = (date: number) => {
    router.push({ query: { date: getDateKey(date) } });
  };

  const [isInfoModalOpen, setInfoModalOpen] = useState(false);
  const { dispatch, bookmarks, goal, nutrition, micro, water, log: actualLog } = useStore(date);
  const isSelectedDateToday = date > TODAY - DAY;

  /**
   * Log can be quite big, and we are pretty okay with interruptions
   * in rendering due to user input, such as tapping a button
   */
  const log = useDeferredValue(actualLog);
  /**
   * While we're letting user input interrupt rendering, we need to
   * let user know that the data is stale
   */
  const isLogLoading = log !== actualLog && actualLog.length !== 0;

  const onAddWater = () => {
    dispatch({
      type: ACTIONS.ADD_MEAL_ENTRY,
      payload: {
        entry: {
          name: "Water",
          water: 240,
          nutrition: inititalNutrition,
          timestamp: Date.now(),
          totalWeight: 240,
          portionWeight: 240,
          items: [],
        },
      },
    });
  };

  const onDelete: MouseEventHandler<HTMLButtonElement> = (e) => {
    const index = getMealIndexFromMenuButton(e);
    const meal = log[index];

    if (
      window.confirm(
        `Are you sure you want to delete "${meal.name}" with ${meal.items.length} item${
          meal.items.length === 1 ? "" : "s"
        } and ${meal.nutrition.calories} kCal?`
      )
    ) {
      dispatch({
        type: ACTIONS.DELETE_MEAL_ENTRY,
        payload: {
          index,
          timestamp: date,
        },
      });
    }
  };

  const onRepeat: MouseEventHandler<HTMLButtonElement> = (e) => {
    const index = getMealIndexFromMenuButton(e);
    const meal = log[index];

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

  const onBookmark: MouseEventHandler<HTMLButtonElement> = (e) => {
    const index = getMealIndexFromMenuButton(e);
    const bookmarked = isBookmarked(bookmarks, date, index);

    dispatch({
      type: bookmarked ? ACTIONS.REMOVE_BOOKMARK : ACTIONS.ADD_BOOKMARK,
      payload: { date: getDateKey(date), index },
    });
  };

  const onEdit: MouseEventHandler<HTMLButtonElement> = (e) => {
    const index = getMealIndexFromMenuButton(e);
    const meal = log[index];

    dispatch({
      type: ACTIONS.SET_MEAL_ENTRY_ITEMS,

      payload: {
        name: meal.name,
        addedItems: meal.items,
        totalWeight: meal.totalWeight,
        portionWeight: meal.portionWeight,
      },
    });

    router.push(`/meal-entry?edit=1&index=${index}`);
  };

  function onInfoClick() {
    setInfoModalOpen(true);
  }
  function onInfoModalClose() {
    setInfoModalOpen(false);
  }

  return (
    <Page h="100%">
      <Flex direction={["column", "row"]} justify={["space-between", "space-between"]} h="100%">
        <Box borderRightWidth={[0, 1]} borderRightColor="gray.300" pr={[0, "8"]} flex="0.3" mr={[0, "16"]} mb="2">
          <Meter nutrition={nutrition} goal={goal.nutrition} />
          <Flex justify="flex-end" mt="-10" mb="-2" w="90%">
            <IconButton
              aria-label="Micronutrient information"
              color="gray.400"
              variant="ghost"
              rounded="full"
              icon={<InfoIcon />}
              onClick={onInfoClick}
            />
            <IconButton
              aria-label="Micronutrient information"
              color="gray.400"
              variant="ghost"
              rounded="full"
              icon={<BiStats />}
              onClick={() => router.push("/journal")}
            />
          </Flex>

          <Flex fontWeight="bold" justify="center" align="center" mb="6">
            <NutritionBar nutrition={nutrition} />
          </Flex>

          {isWaterEnabled && (
            <Grid overflow="auto" mx={[-4]} p="4" autoColumns="1fr" autoFlow="column" gap={2} my={4}>
              <Icon
                minW={10}
                color={goal.water > water ? "gray.400" : "gray.800"}
                as={goal.water > water ? BsDropletHalf : BsDropletFill}
              />
            </Grid>
          )}

          <DateBar date={date} onChange={setDate} />
        </Box>

        <LoadingContainer isLoading={isLogLoading} py={["1", "10"]} pb="40%" flex="0.7">
          {log.length === 0 && (
            <Box h={["auto", "30vh"]}>
              <FormControl>
                <FormHelperText textAlign="center" mb="2">
                  You&apos;ve no entries for the day.
                </FormHelperText>
              </FormControl>
              <EmptyArt />
            </Box>
          )}
          {log.map((meal, index) => (
            <Box key={index} {...{ [`data-${MEAL_INDEX_DATA_ATTR}`]: index }}>
              <MealNutrition
                meal={meal}
                onDelete={onDelete}
                onEdit={isSelectedDateToday ? onEdit : undefined}
                onRepeat={onRepeat}
                onBookmark={onBookmark}
                bookmarked={isBookmarked(bookmarks, date, index)}
              />
            </Box>
          ))}
        </LoadingContainer>

        {isSelectedDateToday ? (
          <Grid {...FABContainerProps} autoFlow="row" gap={2}>
            {isWaterEnabled && (
              <IconButton
                variant="ghost"
                {...FABProps}
                height="10"
                width="10"
                type="button"
                bg="blue.600"
                aria-label="Add water glass"
                onClick={onAddWater}
                justifySelf="center"
                icon={<WaterGlassIcon size="20" />}
              />
            )}
            <Link href="/meal-entry">
              <ChakraLink {...FABProps} title="Add log item" userSelect="none">
                +
              </ChakraLink>
            </Link>
          </Grid>
        ) : (
          <Grid {...FABContainerProps} autoFlow="row" gap={2}>
            <IconButton
              variant="ghost"
              {...FABProps}
              height="10"
              width="10"
              type="button"
              bg="blue.600"
              aria-label="Add water glass"
              onClick={() => setDate(TODAY)}
              justifySelf="center"
              icon={<CgCalendarToday size={"25"} />}
            />
            <Link href={{ pathname: "/meal-entry", query: { forDate: getDateKey(date) } }}>
              <ChakraLink {...FABProps} title="Add log item" userSelect="none">
                +
              </ChakraLink>
            </Link>
          </Grid>
        )}
      </Flex>

      <ExpandedItemNutritionModal
        hideWeight
        item={{
          name: "Nutrition of the day",
          icon: "🍽",
          nutrition,
          micro,
          weight: 100,
        }}
        onClose={onInfoModalClose}
        isOpen={isInfoModalOpen}
      />
    </Page>
  );
}

HomePage.pageTitle = "Home";

const FABContainerProps: ChakraProps = {
  position: "fixed",
  right: 0,
  bottom: 0,
  mx: 4,
  my: 20,
};

const FABProps: ChakraProps = {
  height: "16",
  width: "16",
  fontSize: "3xl",
  fontWeight: "100",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  _hover: { textDecoration: "none", boxShadow: "lg" },
  borderRadius: "50%",
  bg: "green.400",
  color: "white",
};

function getMealIndexFromMenuButton(e: MouseEvent<HTMLButtonElement>) {
  const itemIndex = getClosestDatasetKey(e, MEAL_INDEX_DATA_ATTR);
  if (itemIndex === null || itemIndex === undefined) {
    throw new Error("This shouldn't have happened.\nCouldn't find proper meal position.");
  }
  const index = Number(itemIndex);

  return index;
}

const MEAL_INDEX_DATA_ATTR = "mealindex";

function isBookmarked(bookmarks: Store["bookmarks"], date: number, index: number) {
  return typeof bookmarks.find((x) => x.date === getDateKey(date) && x.index === index) !== "undefined";
}

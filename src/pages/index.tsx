import {
  Flex,
  Box,
  Link as ChakraLink,
  FormHelperText,
  LinkProps as ChakraLinkProps,
  FormControl,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, MouseEventHandler } from "react";

import { getShortMonth } from "../util/time";
import { getClosestDatasetKey } from "../util/dom";
import { ACTIONS, useStore } from "../store";
import EmptyArt from "../svg/EmptyArt";

import { Meter } from "../components/Meter";
import { Page } from "../components/layouts";
import DateBar from "../components/DateBar";
import { TODAY, DAY } from "../constants/date";
import MealNutrition from "../components/MealNutrition";
import NutritionBar from "../components/NutritionBar";

export default function HomePage() {
  const [date, setDate] = useState(TODAY);
  const router = useRouter();
  const { dispatch, goal, nutrition, log } = useStore(date);
  const isSelectedDateToday = date > TODAY - DAY;

  const onDelete: MouseEventHandler<HTMLButtonElement> = (e) => {
    const itemIndex = getClosestDatasetKey(e, "index");
    if (!itemIndex) {
      alert(
        "This shouldn't have happened.\nCouldn't find proper meal position."
      );
      return;
    }
    const index = Number(itemIndex);

    const meal = log[index];
    if (
      window.confirm(
        `Are you sure you want to delete "${meal.name}" with ${
          meal.items.length
        } item${meal.items.length === 1 ? "" : "s"} and ${
          meal.nutrition.calories
        } kCal?`
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
    const itemIndex = getClosestDatasetKey(e, "index");
    if (!itemIndex) {
      alert(
        "This shouldn't have happened.\nCouldn't find proper meal position."
      );
      return;
    }
    const index = Number(itemIndex);
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

  const onEdit: MouseEventHandler<HTMLButtonElement> = (e) => {
    const itemIndex = getClosestDatasetKey(e, "index");
    if (!itemIndex) {
      alert(
        "This shouldn't have happened.\nCouldn't find proper meal position."
      );
      return;
    }
    const index = Number(itemIndex);
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

  return (
    <Page h="100%">
      <Flex
        direction={["column", "row"]}
        justify={["space-between", "space-between"]}
        h="100%"
      >
        <Box
          borderRightWidth={[0, 1]}
          borderRightColor="gray.300"
          pr={[0, "8"]}
          flex="0.3"
          mr={[0, "16"]}
          mb="2"
        >
          <Meter nutrition={nutrition} goal={goal} />
          <Flex fontWeight="bold" justify="center" align="center" mb="6">
            <NutritionBar nutrition={nutrition} />
          </Flex>
          <DateBar date={date} onChange={setDate} />
        </Box>

        <Box py={["1", "10"]} pb="40%" flex="0.7">
          {log.length === 0 && (
            <Box h={["auto", "30vh"]}>
              <FormControl>
                <FormHelperText textAlign="center" mb="2">
                  You've no entries for the day.
                </FormHelperText>
              </FormControl>
              <EmptyArt />
            </Box>
          )}
          {log.map((meal, index) => (
            <Box key={index} data-index={index}>
              <MealNutrition
                meal={meal}
                onDelete={onDelete}
                onEdit={isSelectedDateToday ? onEdit : undefined}
                onRepeat={onRepeat}
              />
            </Box>
          ))}
        </Box>

        {isSelectedDateToday ? (
          <Link href="/meal-entry">
            <ChakraLink href="/meal-entry" {...FABProps} title="Add log item">
              +
            </ChakraLink>
          </Link>
        ) : (
          <ChakraLink
            as="button"
            {...FABProps}
            bg="purple.300"
            flexDirection="column"
            title="Show today's log"
            onClick={() => setDate(TODAY)}
          >
            {new Date().getDate()}
            <Box fontSize="xs" mt={-2}>
              {getShortMonth(new Date().getMonth())}
            </Box>
          </ChakraLink>
        )}
      </Flex>
    </Page>
  );
}

HomePage.pageTitle = "Home";

const FABProps: ChakraLinkProps = {
  position: "fixed",
  right: 0,
  bottom: 0,
  mx: 4,
  my: 20,
  height: "16",
  fontSize: "3xl",
  fontWeight: "100",
  width: "16",
  d: "flex",
  _hover: { textDecoration: "none", boxShadow: "lg" },
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  bg: "green.400",
  color: "white",
};

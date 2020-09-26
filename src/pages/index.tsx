import {
  Box,
  Link as ChakraLink,
  Button,
  FormHelperText,
} from "@chakra-ui/core";
import Link from "next/link";
import React, { useState } from "react";

import { Meter } from "../components/Meter";
import { useStore } from "../store";
import MealEntries from "../components/MealEntries";
import EmptyArt from "../svg/EmptyArt";
import { Page } from "../components/layouts";
import { formatShortDate } from "../util/time";

const DAY = 1000 * 60 * 60 * 24;
const TODAY = Date.now();

export default function HomePage() {
  const [date, setDate] = useState(TODAY);
  const { goal, nutrition, log } = useStore(date);

  return (
    <Page>
      <Meter nutrition={nutrition} goal={goal} />

      <Box d="flex" alignItems="center" justifyContent="space-between" mb="3">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setDate(date - DAY)}
          flex="1"
          mr="1"
        >
          {formatShortDate(new Date(date - DAY))}
        </Button>
        <Button size="sm" variant="solid" flex="1" mx="1">
          {formatShortDate(new Date(date))}
        </Button>
        <Button
          ml="1"
          flex="1"
          size="sm"
          variant="ghost"
          transition="0ms"
          visibility={date + DAY > TODAY ? "hidden" : "visible"}
          onClick={() => setDate(Math.min(date + DAY, TODAY))}
        >
          {formatShortDate(new Date(date + DAY))}
        </Button>
      </Box>
      <Box py={["1", "10"]} pb="40%">
        {log.length === 0 && (
          <Box h={["auto", "30vh"]}>
            <FormHelperText textAlign="center" mb="2">
              You've no entries for the day.
            </FormHelperText>
            <EmptyArt />
          </Box>
        )}
        <MealEntries entries={log} />
      </Box>

      {date > TODAY - DAY && (
        <Link href="/meal-entry">
          <ChakraLink
            href="/meal-entry"
            position="fixed"
            right={0}
            bottom={0}
            mx={4}
            my={20}
            height="16"
            fontSize="3xl"
            fontWeight="100"
            width="16"
            d="flex"
            _hover={{ textDecoration: "none", boxShadow: "lg" }}
            alignItems="center"
            justifyContent="center"
            borderRadius="50%"
            bg="green.400"
            color="white"
          >
            +
          </ChakraLink>
        </Link>
      )}
    </Page>
  );
}

HomePage.pageTitle = "Home";

import { Box, Link as ChakraLink } from "@chakra-ui/core";
import Link from "next/link";
import React from "react";

import { Meter } from "../components/Meter";
import { useStore } from "../store";
import MealEntries from "../components/MealEntries";
import EmptyArt from "../svg/EmptyArt";
import { Page } from "../components/layouts";

export default function HomePage() {
  const { goal, nutrition, log } = useStore();

  return (
    <Page>
      <Meter nutrition={nutrition} goal={goal} />

      <Box py={["1", "10"]} pb="40%">
        {log.length === 0 && (
          <Box h={["auto", "30vh"]}>
            <EmptyArt />
          </Box>
        )}
        <MealEntries entries={log} />
      </Box>

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
    </Page>
  );
}

HomePage.pageTitle = "Home";

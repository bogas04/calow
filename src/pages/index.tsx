import Link from "next/link";
import { Box, Button, Heading, Text } from "@chakra-ui/core";
import * as React from "react";
import { Meter } from "../components/Meter";
import {
  ACTIONS,
  nutritionColors,
  nutritionKeys,
  nutritionShortNames,
  useStore,
} from "../store";
import { getTimeDifference } from "../util/time";

export default function HomePage() {
  const { goal, nutrition, log, items, dispatch } = useStore();

  const addItem = () => {
    dispatch({
      type: ACTIONS.ADD_LOG_ITEM,
      payload: { entry: items[log.length % items.length] },
    });
  };

  return (
    <Box py="2" px="4">
      <Meter nutrition={nutrition} goal={goal} />
      {log.map((l, i) => (
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
              <Link href={`/items?search=${l.name}`}>
                <a>{l.name}</a>
              </Link>
            </Heading>
            <Text d="flex">{getTimeDifference(l.timestamp)}</Text>
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
                    {l.nutrition[k]} {nutritionShortNames[k]}
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
      <Button
        onClick={addItem}
        position="fixed"
        right={0}
        bottom={0}
        mx={4}
        my={16}
        height="16"
        fontSize={36}
        fontWeight="100"
        width="16"
        borderRadius="50%"
        bg="hotpink"
        color="white"
        _active={{ bg: "pink", transform: "translate(1px, 1px)" }}
        _hover={{ boxShadow: "0 2px 2px -2px black" }}
      >
        +
      </Button>
    </Box>
  );
}

HomePage.pageTitle = "Home";

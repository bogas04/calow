import { Box, Button, Heading, Text } from "@chakra-ui/core";
import * as React from "react";
import { Meter } from "../components/Meter";
import {
  ACTIONS,
  LogEntry,
  nutritionColors,
  nutritionKeys,
  shortNames,
  useStore,
} from "../store";

function getTimeDifference(from: number, to: number = Date.now()) {
  const rtf = new Intl.RelativeTimeFormat("en", { style: "narrow" });
  let difference = Math.abs((from - to) / 1000);
  const unit =
    difference > 60
      ? difference > 60 * 60
        ? difference > 60 * 60 * 24
          ? "days"
          : "hour"
        : "minute"
      : "seconds";

  if (unit === "minute") {
    difference /= 60;
  }
  if (unit === "hour") {
    difference /= 60 * 60;
  }
  if (unit === "days") {
    difference /= 60 * 60 * 24;
  }

  return rtf.format(Math.floor(difference), unit);
}
export default function HomePage() {
  const { goal, nutrition, log, dispatch } = useStore();

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
          borderColor="gray.500"
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
      <Button
        onClick={addItem}
        position="fixed"
        right={0}
        bottom={0}
        mx={4}
        my={16}
        size="lg"
        height="12"
        width="12"
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

const items: LogEntry[] = [
  {
    name: "Rice",
    icon: "🍚",
    nutrition: {
      calories: 100,
      protein: 8,
      carbohydrates: 5,
      fat: 2,
    },
    timestamp: Date.now() - 1000,
  },
  {
    name: "Egg",
    icon: "🥚",
    nutrition: {
      calories: 50,
      protein: 9,
      carbohydrates: 5,
      fat: 2,
    },
    timestamp: Date.now() - 1000 * 60 * 20,
  },
  {
    name: "Whole Wheat",
    icon: "🌾",
    nutrition: {
      calories: 120,
      protein: 9,
      carbohydrates: 10,
      fat: 2,
    },
    timestamp: Date.now() - 1000 * 60 * 60,
  },
  {
    name: "Sugar",
    icon: "🍭",
    nutrition: {
      calories: 400,
      protein: 2,
      carbohydrates: 13,
      fat: 5,
    },
    timestamp: Date.now() - 1000 * 60 * 60 * 2,
  },
  {
    name: "Milk",
    icon: "🥛",
    nutrition: {
      calories: 20,
      protein: 8,
      carbohydrates: 1,
      fat: 5,
    },
    timestamp: Date.now() - 1000 * 60 * 60 * 4.5,
  },
  {
    name: "Chickpea",
    nutrition: {
      calories: 25,
      protein: 8,
      carbohydrates: 5,
      fat: 2,
    },
    timestamp: Date.now() - 1000 * 60 * 60 * 7,
  },
  {
    name: "Tomato",
    icon: "🍅",
    nutrition: {
      calories: 25,
      protein: 8,
      carbohydrates: 5,
      fat: 2,
    },
    timestamp: Date.now() - 1000 * 60 * 60 * 12,
  },
];

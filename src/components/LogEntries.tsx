import { Box, Heading, Text } from "@chakra-ui/core";
import Link from "next/link";
import * as React from "react";
import {
  LogEntry,
  nutritionColors,
  nutritionKeys,
  nutritionShortNames,
} from "../store";
import { getTimeDifference } from "../util/time";

interface LogEntriesProps {
  showTimestamp?: boolean;
  entries: LogEntry[];
}

function LogEntries({ entries, showTimestamp = true }: LogEntriesProps) {
  return (
    <>
      {entries.map((l, i) => (
        <Box
          key={i}
          borderWidth="1px"
          borderStyle="solid"
          borderColor="gray.200"
          borderRadius={8}
          my="5"
          px="4"
          py="5"
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
            {showTimestamp && (
              <Text d="flex" color="gray.600">
                {getTimeDifference(l.timestamp)}
              </Text>
            )}
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
    </>
  );
}

export default React.memo(LogEntries);

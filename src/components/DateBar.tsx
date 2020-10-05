import { Box, Button } from "@chakra-ui/core";
import React, { memo } from "react";
import { DAY, TODAY } from "../constants/date";

import { formatShortDate } from "../util/time";

function DateBar({
  date,
  onChange,
}: {
  date: number;
  onChange: (newDate: number) => void;
}) {
  return (
    <Box d="flex" alignItems="center" justifyContent="space-between" mb="3">
      <Button
        size="sm"
        variant="ghost"
        onClick={() => onChange(date - DAY)}
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
        onClick={() => onChange(Math.min(date + DAY, TODAY))}
      >
        {formatShortDate(new Date(date + DAY))}
      </Button>
    </Box>
  );
}
export default memo(DateBar);

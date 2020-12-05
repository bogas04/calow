import { Flex, Button } from "@chakra-ui/react";
import { memo } from "react";
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
    <Flex align="center" justify="space-between" mb="3">
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
    </Flex>
  );
}
export default memo(DateBar);

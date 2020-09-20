import { Box, Button } from "@chakra-ui/core";

import * as React from "react";
import { Meter } from "../components/Meter";
import { ACTIONS, useStore } from "../store";
import AddItemDrawer from "../components/AddItemDrawer";
import LogEntries from "../components/LogEntries";
import EmptyArt from "../svg/EmptyArt";

export default function HomePage() {
  const { goal, nutrition, log, items, dispatch } = useStore();
  const [showAddItem, setShowAddItem] = React.useState(false);

  return (
    <>
      <Box py="2" px="4">
        <Meter nutrition={nutrition} goal={goal} />

        <Box py="1" pb="20%">
          {log.length === 0 && <EmptyArt />}
          <LogEntries entries={log} />
        </Box>

        <Button
          onClick={() => setShowAddItem(true)}
          position="fixed"
          right={0}
          bottom={0}
          mx={4}
          my={20}
          height="16"
          fontSize="3xl"
          fontWeight="100"
          width="16"
          borderRadius="50%"
          bg="green.400"
          color="white"
          _active={{ bg: "pink", transform: "translate(1px, 1px)" }}
          _hover={{ boxShadow: "0 2px 2px -2px black" }}
        >
          +
        </Button>
      </Box>

      <AddItemDrawer
        items={items}
        isOpen={showAddItem}
        onClose={() => setShowAddItem(false)}
        onAdd={(entry) => {
          dispatch({
            type: ACTIONS.ADD_LOG_ENTRY,
            payload: { entry },
          });
          setShowAddItem(false);
        }}
      />
    </>
  );
}

HomePage.pageTitle = "Home";

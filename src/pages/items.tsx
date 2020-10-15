import {
  Box,
  Button,
  Collapse,
  FormControl,
  FormLabel,
  Icon,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
  Text,
} from "@chakra-ui/core";
import Fuse from "fuse.js";
import { useEffect, useMemo, useState } from "react";
import ItemNutrition from "../components/ItemNutrition";
import { Page } from "../components/layouts";

import { useItems } from "../store";

export default function ItemsPage() {
  const { items, isLoading } = useItems();
  const [sortBy, setSortBy] = useState<SortByKeys>("name");
  const [query, setQuery] = useState("");
  const [showInfo, setShowInfo] = useState(false);

  const handleSearch: React.FormEventHandler<HTMLInputElement> = (e) => {
    setQuery(e.currentTarget.value);
  };

  useEffect(() => {
    const locationQuery = new URLSearchParams(location.search).get("search");
    if (locationQuery) {
      setQuery(locationQuery);
    }
  }, []);

  const filteredItems = useMemo(() => {
    let filtered = [...items];

    if (query) {
      const fuse = new Fuse(items, { keys: ["name"], threshold: 0.25 });

      if (query.includes(",")) {
        filtered = query
          .split(",")
          .map((q) => q.trim())
          .map((q) => fuse.search(q).map((i) => i.item))
          .flat();
      } else {
        filtered = fuse.search(query).map((i) => i.item);
      }
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "calories/weight": {
          return (
            b.nutrition.calories / b.weight - a.nutrition.calories / a.weight
          );
        }
        case "name": {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        }
        case "carbs/calories": {
          return (
            b.nutrition.carbohydrates / (b.weight * b.nutrition.calories) -
            a.nutrition.carbohydrates / (a.weight * a.nutrition.calories)
          );
        }
        case "fat/calories": {
          return (
            b.nutrition.fat / (b.weight * b.nutrition.calories) -
            a.nutrition.fat / (a.weight * a.nutrition.calories)
          );
        }
        case "protein/calories": {
          return (
            b.nutrition.protein / (b.weight * b.nutrition.calories) -
            a.nutrition.protein / (a.weight * a.nutrition.calories)
          );
        }
      }
    });
  }, [query, items, sortBy]);

  return (
    <Page heading="Your Items">
      <Box
        as="form"
        d="flex"
        alignItems="flex-end"
        justifyContent="space-between"
        onSubmit={(e) => e.preventDefault()}
      >
        <FormControl>
          <FormLabel htmlFor="search">Search for items.</FormLabel>

          <Input
            id="search"
            value={query}
            placeholder="Search"
            type="search"
            onChange={handleSearch}
          />
        </FormControl>
        <Menu>
          <MenuButton
            as={Button}
            // @ts-ignore
            rightIcon="chevron-down"
          >
            Sort
          </MenuButton>
          <MenuList>
            {(Object.keys(sortByTitles) as SortByKeys[]).map((k) => (
              <MenuItem
                onClick={() => setSortBy((s) => (s === k ? "name" : k))}
                key={k}
              >
                {sortBy === k && <Icon name="check" mr="1" />}
                By {sortByTitles[k].title}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Box>
      {isLoading ? (
        <Box mt="4">
          <Skeleton h="2" mt="6" mb="6" w="30%" />

          {[...new Array(4)].map((_, i) => (
            <Box
              key={i}
              borderWidth="1px"
              borderStyle="solid"
              borderColor="gray.200"
              borderRadius={8}
              my="4"
              p="6"
            >
              <Box d="flex" flexDirection="row" mb="6">
                <Skeleton w="30px" h="30px" rounded="50%" mr="4" />
                <Skeleton flex="0.8" h="4" rounded="md" />
              </Box>
              <Box
                d="flex"
                alignItems="center"
                justifyContent="flex-start"
                my="3"
              >
                <Skeleton w="10" h="2" mr="2" />
                <Skeleton w="10" h="2" mr="2" />
                <Skeleton w="10" h="2" mr="2" />
                <Skeleton w="10" h="2" />
              </Box>
            </Box>
          ))}
        </Box>
      ) : (
        <>
          {filteredItems.length !== 0 && (
            <Box mt="4">
              <Box d="flex" justifyContent="space-between" alignItems="center">
                <Text>Sorted by {sortByTitles[sortBy].title}</Text>
                {sortByTitles[sortBy].description && (
                  <IconButton
                    isRound
                    size="sm"
                    variant="ghost"
                    aria-label={showInfo ? "Collapse" : "Expand"}
                    onClick={() => setShowInfo(!showInfo)}
                    color={showInfo ? "gray.800" : "gray.400"}
                    icon="info"
                  />
                )}
              </Box>
              {sortByTitles[sortBy].description && (
                <Collapse
                  isOpen={showInfo}
                  startingHeight={45}
                  bg="gray.50"
                  p="2"
                  rounded="sm"
                  fontSize="sm"
                >
                  {sortByTitles[sortBy].description}
                </Collapse>
              )}
            </Box>
          )}
          {filteredItems.map((item, index) => (
            <ItemNutrition item={item} key={index} />
          ))}
        </>
      )}
    </Page>
  );
}

ItemsPage.pageTitle = "Items";

const sortByTitles = {
  name: { title: "Name", description: "", source: "" },
  "calories/weight": { title: "Calories", description: "", source: "" },
  "protein/calories": {
    title: "Protein per Calories",
    description: "",
    source: "",
  },
  "fat/calories": {
    title: "Fat per Calories",
    description:
      "Fats are sources of essential fatty acids, an important dietary requirement, especially to absorb Vitamins A, D, E, and K. Fats also play a vital role in maintaining healthy skin and hair, insulating body organs against shock, maintaining body temperature, and promoting healthy cell function. Fat also serves as a useful buffer against a host of diseases. When a particular substance, whether chemical or biotic, reaches unsafe levels in the bloodstream, the body can effectively dilute or at least maintain equilibrium of the offending substances by storing it in new fat tissue. This helps to protect vital organs, until such time as the offending substances can be metabolized or removed from the body by such means as excretion, urination, accidental or intentional bloodletting, sebum excretion, and hair growth.",
    source: "https://en.wikipedia.org/wiki/Fat#Biological_importance",
  },
  "carbs/calories": { title: "Carbs per Calories", description: "" },
};

type SortByKeys = keyof typeof sortByTitles;

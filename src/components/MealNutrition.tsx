import {
  Flex,
  Box,
  Collapse,
  Heading,
  IconButton,
  IconButtonProps,
  Icon,
  Text,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, RepeatClockIcon } from "@chakra-ui/icons";
import {
  BsThreeDotsVertical as ThreeDotsIcon,
  BsArrowsCollapse as CollapseIcon,
  BsArrowsExpand as ExpandIcon,
} from "react-icons/bs";
import { memo, useState } from "react";
import { MealEntry } from "../store";
import { mapNutrition } from "../util/nutrition";
import { getTimeDifference } from "../util/time";
import ItemNutrition from "./ItemNutrition";
import NutritionBar from "./NutritionBar";

export interface MealNutritionProps {
  meal: MealEntry;
  onDelete?: IconButtonProps["onClick"];
  onEdit?: IconButtonProps["onClick"];
  onRepeat?: IconButtonProps["onClick"];
}

function MealNutrition({
  meal,
  onRepeat,
  onDelete,
  onEdit,
}: MealNutritionProps) {
  const [show, setShow] = useState(false);

  const handleToggle = () => setShow(!show);

  return (
    <>
      <Flex d="flex" justify="space-between" align="center" mb="2">
        <Heading>{meal.name}</Heading>

        <Flex justify="flex-end" align="center">
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<ThreeDotsIcon />}
              aria-label="Options"
              variant="ghost"
              rounded="full"
            />
            <MenuList minW={10}>
              {onEdit && (
                <MenuItem onClick={onEdit}>
                  <EditIcon mr={2} />
                  Edit
                </MenuItem>
              )}
              {onDelete && (
                <MenuItem onClick={onDelete}>
                  <DeleteIcon mr={2} />
                  Delete
                </MenuItem>
              )}
              {onRepeat && (
                <MenuItem onClick={onRepeat}>
                  <RepeatClockIcon mr={2} />
                  Repeat
                </MenuItem>
              )}
              <MenuItem onClick={handleToggle}>
                {show ? (
                  <Icon as={CollapseIcon} mr={2} />
                ) : (
                  <Icon as={ExpandIcon} mr={2} />
                )}
                {show ? "Hide Items" : "Show Items"}
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      <NutritionBar nutrition={meal.nutrition} border={false} />
      <Flex align="center" flex="1" mt="2" mb="6">
        <Text fontSize="xs" color="gray.600" fontWeight="300">
          {meal.portionWeight === meal.totalWeight
            ? `${meal.totalWeight}g`
            : `${meal.portionWeight}g / ${meal.totalWeight}g`}
        </Text>
        <Box w="1px" h="20px" bg="gray.500" mx="2" />
        <Text fontSize="xs" color="gray.600" fontWeight="300">
          {getTimeDifference(meal.timestamp)}
        </Text>
      </Flex>
      <Collapse in={show}>
        <Box pl="4">
          <ItemNutrition
            size="sm"
            item={{
              name: "Nutritional Value / 100 grams",
              weight: 100,
              nutrition: mapNutrition(
                meal.nutrition,
                (_, value) => (value * 100) / meal.portionWeight
              ),
            }}
            bg="blue.50"
            rounded="md"
          />

          {meal.items.map((item, itemIndex) => (
            <ItemNutrition item={item} size="sm" key={itemIndex} />
          ))}
        </Box>
      </Collapse>
    </>
  );
}

export default memo(MealNutrition);

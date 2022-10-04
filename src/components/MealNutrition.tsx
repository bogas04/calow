import {
  Flex,
  Box,
  Collapse,
  Heading,
  IconButton,
  IconButtonProps,
  Text,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  DeleteIcon,
  EditIcon,
  RepeatClockIcon,
} from "@chakra-ui/icons";
import {
  BiBookmarkMinus as RemoveBookmarkIcon,
  BiBookmarkPlus as AddBookmarkIcon,
} from "react-icons/bi";
import {
  BsThreeDots,
  BsThreeDotsVertical as ThreeDotsIcon,
} from "react-icons/bs";
import React, { memo, useState } from "react";
import { MealEntry } from "../store";
import { mapNutrition } from "../util/nutrition";
import { getTimeDifference } from "../util/time";
import ItemNutrition from "./ItemNutrition";
import NutritionBar from "./NutritionBar";
import ExpandedItemNutritionModal from "./ExpandedItemNutritionModal";

export interface MealNutritionProps {
  meal: MealEntry;
  onDelete?: IconButtonProps["onClick"];
  onEdit?: IconButtonProps["onClick"];
  onRepeat?: IconButtonProps["onClick"];
  onBookmark?: IconButtonProps["onClick"];
  bookmarked?: boolean;
}

function MealNutrition({
  meal,
  onRepeat,
  onDelete,
  onEdit,
  onBookmark,
  bookmarked,
}: MealNutritionProps) {
  const [showItemDetails, setShowItemDetails] = useState(false);
  const [showMicroNutrientsModal, setShowMicroNutrientsModal] = useState(false);
  const closeMicroNutrientsModal = () => setShowMicroNutrientsModal(false);
  const openMicroNutrientsModal = () => setShowMicroNutrientsModal(true);

  const handleToggle = () => setShowItemDetails(!showItemDetails);

  return (
    <>
      <Flex justify="space-between" align="center" mb="2">
        <Heading size="md">{meal.name}</Heading>

        <Flex justify="flex-end" align="center">
          <IconButton
            isRound
            size="sm"
            variant="ghost"
            aria-label={showItemDetails ? "Hide Details" : "Show Details"}
            onClick={handleToggle}
            icon={showItemDetails ? <ChevronUpIcon /> : <ChevronDownIcon />}
          />
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<ThreeDotsIcon />}
              aria-label="Options"
              variant="ghost"
              size="sm"
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
              {onBookmark && (
                <MenuItem onClick={onBookmark}>
                  <Box mr={2}>
                    {bookmarked ? <RemoveBookmarkIcon /> : <AddBookmarkIcon />}
                  </Box>
                  {bookmarked ? "Remove Bookmark" : "Add Bookmark"}
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      <Flex justify="space-between" align="flex-start">
        <NutritionBar nutrition={meal.nutrition} border={false} />
        <IconButton
          variant="ghost"
          rounded="full"
          color="gray.500"
          icon={<BsThreeDots />}
          aria-label="Micronutrients"
          onClick={openMicroNutrientsModal}
        />
      </Flex>
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
      <Collapse in={showItemDetails}>
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
      <ExpandedItemNutritionModal
        hideWeight
        item={{
          name: meal.name,
          nutrition: meal.nutrition,
          micro: meal.micro,
          weight: 100,
        }}
        onClose={closeMicroNutrientsModal}
        isOpen={showMicroNutrientsModal}
      />
    </>
  );
}

export default memo(MealNutrition);

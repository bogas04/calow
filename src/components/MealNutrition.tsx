import {
  ChevronDownIcon,
  ChevronUpIcon,
  DeleteIcon,
  EditIcon,
  LinkIcon as ShareIcon,
  RepeatClockIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Collapse,
  Flex,
  Heading,
  IconButton,
  IconButtonProps,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { memo, useCallback, useState } from "react";
import { BiBookmarkMinus as RemoveBookmarkIcon, BiBookmarkPlus as AddBookmarkIcon } from "react-icons/bi";
import { BsThreeDots, BsThreeDotsVertical as ThreeDotsIcon } from "react-icons/bs";
import { CgDetailsMore } from "react-icons/cg";
import { MealEntry } from "../store";
import { mapNutrition } from "../util/nutrition";
import { formatTimeOfDay } from "../util/time";
import ExpandedItemNutritionModal from "./ExpandedItemNutritionModal";
import ItemNutrition from "./ItemNutrition";
import NutritionBar from "./NutritionBar";
import { ShareModal } from "./ShareMealModal";

export interface MealNutritionProps {
  meal: MealEntry;
  onDelete?: IconButtonProps["onClick"];
  onEdit?: IconButtonProps["onClick"];
  onRepeat?: IconButtonProps["onClick"];
  onBookmark?: IconButtonProps["onClick"];
  bookmarked?: boolean;
}

function MealNutrition({ meal, onRepeat, onDelete, onEdit, onBookmark, bookmarked }: MealNutritionProps) {
  const [showItemDetails, setShowItemDetails] = useState(false);
  const [showMicroNutrientsModal, setShowMicroNutrientsModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const closeMicroNutrientsModal = useCallback(() => setShowMicroNutrientsModal(false), []);
  const openMicroNutrientsModal = useCallback(() => setShowMicroNutrientsModal(true), []);
  const closeShareModal = useCallback(() => setShowShareModal(false), []);
  const openShareModal = useCallback(() => setShowShareModal(true), []);

  const handleToggle = () => setShowItemDetails(!showItemDetails);

  return (
    <div className="border border-zinc-400 bg-zinc-50 rounded-2xl p-4">
      <Flex justify="space-between" align="center" mb="2">
        <p className="text-xl font-black">{meal.name}</p>

        <Flex justify="flex-end" align="center">
          <IconButton
            isRound
            size="sm"
            variant="ghost"
            aria-label={"Show micro nutrients"}
            onClick={openMicroNutrientsModal}
            icon={<CgDetailsMore />}
          />
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
              <MenuItem onClick={openShareModal}>
                <ShareIcon mr={2} />
                Share
              </MenuItem>
              {onRepeat && (
                <MenuItem onClick={onRepeat}>
                  <RepeatClockIcon mr={2} />
                  Repeat
                </MenuItem>
              )}
              {onBookmark && (
                <MenuItem onClick={onBookmark}>
                  <Box mr={2}>{bookmarked ? <RemoveBookmarkIcon /> : <AddBookmarkIcon />}</Box>
                  {bookmarked ? "Unbookmark" : "Bookmark"}
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      <NutritionBar nutrition={meal.nutrition} border={false} micro={meal.micro} transparentBg />

      <Flex align="center" flex="1" mt="2">
        <Text fontSize="xs" color="gray.600" fontWeight="300">
          {meal.portionWeight === meal.totalWeight
            ? `${meal.totalWeight}g`
            : `${meal.portionWeight}g / ${meal.totalWeight}g`}
        </Text>
        <Box w="1px" h="20px" bg="gray.500" mx="2" />
        <Text fontSize="xs" color="gray.600" fontWeight="300">
          {formatTimeOfDay(new Date(meal.timestamp))}
        </Text>
      </Flex>
      <Collapse in={showItemDetails}>
        <Box pl="4">
          <ItemNutrition
            size="sm"
            item={{
              name: "Nutritional Value / 100 grams",
              weight: 100,
              nutrition: mapNutrition(meal.nutrition, (_, value) => (value * 100) / meal.portionWeight),
              micro: Object.fromEntries(
                Object.entries(meal.micro || {}).map(([key, value]) => [key, (value * 100) / meal.portionWeight])
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
      <ShareModal isOpen={showShareModal} onClose={closeShareModal} meal={meal} />
    </div>
  );
}

export default memo(MealNutrition);

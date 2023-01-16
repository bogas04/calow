import { CopyIcon } from "@chakra-ui/icons";
import {
  ModalProps,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  InputGroup,
  Input,
  InputRightAddon,
  IconButton,
  Button,
  Text,
} from "@chakra-ui/react";
import { useMemo, useCallback, memo } from "react";
import { MealEntry } from "../store";

export const ShareModal = memo(function ShareModal({
  isOpen,
  onClose,
  meal,
}: Pick<ModalProps, "isOpen" | "onClose"> & { meal: MealEntry }) {
  const toast = useToast();
  const link = useMemo(() => {
    // this is to prevent pre-mature calculation
    if (!isOpen) {
      return "";
    }
    // collect meal as an item
    let mealToBeShared: MealEntry = {
      name: meal.name,
      timestamp: Date.now(),
      items: meal.items,
      totalWeight: meal.totalWeight,
      portionWeight: meal.portionWeight,
      nutrition: meal.nutrition,
      micro: meal.micro,
      water: meal.water,
    };

    // create a calow link
    return createShareableMealLink(meal);
  }, [isOpen, meal]);

  const onShare = useCallback(() => {
    const failureToast = () =>
      toast({
        title: "Oops!",
        description: "We couldn't share the link at this moment",
        status: "error",
        duration: 5000,
        isClosable: true,
      });

    window?.navigator
      ?.share?.({
        title: meal.name,
        url: link,
      })
      .catch(() => {
        failureToast();
      }) || failureToast();
  }, [link, meal.name, toast]);

  const onCopy = useCallback(() => {
    window.navigator.clipboard
      .writeText(link)
      .then(() => {
        toast({
          title: "Copied!",
          description: "The shareable link is now in your clipboard",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch(() => {
        toast({
          title: "Opps!",
          description: "We couldn't copy the link to your clipboard",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  }, [link, toast]);

  const canShare = window?.navigator?.canShare?.() || typeof window?.navigator.share === "function";

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered scrollBehavior="outside" motionPreset="slideInBottom">
      <ModalOverlay height="100vh" />
      <ModalContent position="fixed" bottom="0px" mb="0" borderRadius="1.75rem 1.75rem 0px 0px" minW={["100vw", "lg"]}>
        <ModalHeader mt="2">Share Meal</ModalHeader>
        <ModalCloseButton mt="2" />
        <ModalBody pb="5">
          <Text>Here&apos;s a link you can share with your buddy who wants to add this meal to their log.</Text>
          <InputGroup my="4">
            <Input type="text" defaultValue={link} disabled />
            <InputRightAddon px={0} mx={0} bg="gray.50">
              <IconButton icon={<CopyIcon />} variant="flushed" onClick={onCopy} aria-label={"Copy Link"} />
            </InputRightAddon>
          </InputGroup>
          {canShare ? (
            <Button w="full" onClick={onShare} bg="blue.500" color="white" size="lg">
              Share
            </Button>
          ) : null}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});

function createShareableMealLink(_mealToBeShared: MealEntry) {
  const mealToBeShared = structuredClone(_mealToBeShared);
  const fullMealJson = JSON.stringify(mealToBeShared);
  const baseLink =
    document.querySelector('meta[property="og:url"')?.getAttribute("content") || "https://bogas04.github.io/calow/";
  const createLink = (stringifiedJson: string) =>
    `${baseLink}meal-entry?shared_meal=${encodeURIComponent(stringifiedJson)}`;

  const finalUrl = createLink(fullMealJson);

  if (finalUrl.length < 2000) {
    return finalUrl;
  }

  const microMultiplier = 100 / mealToBeShared.portionWeight;
  const microPer100 = Object.fromEntries(
    Object.entries(mealToBeShared.micro || {}).map(([k, v]) => [k, v * microMultiplier])
  );

  // we compress entire meal into one item in itself
  mealToBeShared.items = [
    {
      name: mealToBeShared.name,
      nutrition: mealToBeShared.nutrition,
      micro: microPer100,
      weight: mealToBeShared.portionWeight,
    },
  ];
  mealToBeShared.totalWeight = mealToBeShared.portionWeight;

  return createLink(JSON.stringify(mealToBeShared));
}

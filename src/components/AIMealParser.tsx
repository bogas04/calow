import {
  Alert,
  AlertIcon,
  Box,
  Button,
  CloseButton,
  Flex,
  FormControl,
  FormLabel,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ItemEntry, Nutrition } from "../store";
import { addNutrition, createNutrition } from "../util/nutrition";

const GEMINI_MODELS = ["gemini-3.5-flash", "gemini-2.5-flash", "gemini-2.5-flash-lite"];
const RETRYABLE_GEMINI_STATUSES = new Set([429, 500, 502, 503, 504]);
const GEMINI_API_KEY_URL = "https://aistudio.google.com/app/apikey";
const LOADING_MESSAGES = [
  "Understanding",
  "Simulating the kitchen",
  "Preparing the virtual dishes",
  "Checking familiar portions",
  "Estimating the ingredients",
  "Balancing the macros",
  "Analyzing the calories",
  "Looking at fiber",
  "Checking saturated fat",
  "Calibrating the quantities",
  "Plating the numbers",
];

interface GeminiParsedMealItem {
  name: string;
  icon?: string;
  weight: number;
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  fiber: number;
  saturatedFats: number;
}

class InvalidGeminiKeyError extends Error {
  constructor() {
    super("Your saved Gemini key is no longer valid.");
  }
}

export interface ParsedMeal {
  name: string;
  items: ItemEntry[];
  totalWeight: number;
  portionWeight: number;
  nutrition: Nutrition;
}

export interface AIMealParserProps {
  apiKey: string;
  mode: "create" | "adjust";
  onConfirm(parsedMeal: ParsedMeal): void;
  mealToAdjust?: ParsedMeal;
  onClose(): void;
}

export interface AIMealParserSheetProps extends AIMealParserProps {
  isOpen: boolean;
}

function normalizeToInteger(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return Math.max(Math.round(value), 0);
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (/^-?\d+(\.\d+)?$/.test(trimmed)) {
      return Math.max(Math.round(Number(trimmed)), 0);
    }
  }

  return null;
}

function normalizeName(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function validateGeminiMeal(
  value: any
): value is { name: string; items: GeminiParsedMealItem[]; portionWeight?: number } {
  if (!value || typeof value !== "object") {
    return false;
  }

  return (
    typeof value.name === "string" &&
    Array.isArray(value.items) &&
    value.items.length > 0 &&
    value.items.every(
      (item: any) =>
        item &&
        typeof item === "object" &&
        typeof item.name === "string" &&
        normalizeToInteger(item.weight) !== null &&
        normalizeToInteger(item.calories) !== null &&
        normalizeToInteger(item.protein) !== null &&
        normalizeToInteger(item.carbohydrates) !== null &&
        normalizeToInteger(item.fat) !== null &&
        normalizeToInteger(item.fiber) !== null &&
        normalizeToInteger(item.saturatedFats) !== null
    )
  );
}

function parseGeminiJson(result: any): unknown {
  const text = result?.candidates?.[0]?.content?.parts?.map((part: any) => part.text).join("") ?? "";

  try {
    return JSON.parse(text);
  } catch {
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/) || text.match(/(\{[\s\S]*\})/);
    return jsonMatch?.[1] ? JSON.parse(jsonMatch[1].trim()) : null;
  }
}

function toParsedMeal(payload: { name: string; items: GeminiParsedMealItem[]; portionWeight?: number }): ParsedMeal {
  const items = payload.items.map<ItemEntry>((item, index) => {
    const weight = normalizeToInteger(item.weight) ?? 0;

    return {
      name: normalizeName(item.name, `Item ${index + 1}`),
      icon: typeof item.icon === "string" && item.icon.trim() ? item.icon.trim() : "🍛",
      weight,
      nutrition: {
        calories: normalizeToInteger(item.calories) ?? 0,
        carbohydrates: normalizeToInteger(item.carbohydrates) ?? 0,
        protein: normalizeToInteger(item.protein) ?? 0,
        fat: normalizeToInteger(item.fat) ?? 0,
      },
      micro: {
        fiber: normalizeToInteger(item.fiber) ?? 0,
        "saturated fats": normalizeToInteger(item.saturatedFats) ?? 0,
      },
    };
  });
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  const portionWeight = normalizeToInteger(payload.portionWeight) || totalWeight;
  const nutrition = items.reduce(
    (total, item) => addNutrition(total, item.nutrition),
    createNutrition(() => 0)
  );

  return {
    name: normalizeName(payload.name, "Meal"),
    items,
    totalWeight,
    portionWeight,
    nutrition,
  };
}

function createGeminiMealRequest(description: string, mealToAdjust?: ParsedMeal) {
  const currentMealContext = mealToAdjust
    ? `\n\nCurrent estimate to adjust:\n${JSON.stringify({
        name: mealToAdjust.name,
        totalWeight: mealToAdjust.totalWeight,
        portionWeight: mealToAdjust.portionWeight,
        items: mealToAdjust.items.map((item) => ({
          name: item.name,
          icon: item.icon,
          weight: item.weight,
          calories: item.nutrition.calories,
          protein: item.nutrition.protein,
          carbohydrates: item.nutrition.carbohydrates,
          fat: item.nutrition.fat,
          fiber: item.micro?.fiber ?? 0,
          saturatedFats: item.micro?.["saturated fats"] ?? 0,
        })),
      })}\n\nApply this instruction to the current estimate: ${description}`
    : `\n\nMeal: ${description}`;

  return {
    contents: [
      {
        parts: [
          {
            text: `Estimate this meal for a calorie tracking app. Break complex dishes into practical logged items when useful, and use realistic consumed gram weights. For restaurant or commercial food, account for likely hidden oils, butter, sugar, or sauces without overcorrecting. Keep calories broadly consistent with macros using calories ~= protein*4 + carbohydrates*4 + fat*9, allowing normal rounding. Return realistic calories, protein, carbohydrates, fat, fiber, and saturatedFats for each item. Use grams for all nutrients except calories. Use short food names and one relevant emoji icon per item.${currentMealContext}`,
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0,
      responseMimeType: "application/json",
      responseSchema: {
        type: "object",
        properties: {
          name: { type: "string" },
          portionWeight: { type: "integer" },
          items: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                icon: { type: "string" },
                weight: { type: "integer" },
                calories: { type: "integer" },
                protein: { type: "integer" },
                carbohydrates: { type: "integer" },
                fat: { type: "integer" },
                fiber: { type: "integer" },
                saturatedFats: { type: "integer" },
              },
              required: ["name", "weight", "calories", "protein", "carbohydrates", "fat", "fiber", "saturatedFats"],
            },
          },
        },
        required: ["name", "items"],
      },
    },
  };
}

async function parseMealWithGemini({
  apiKey,
  description,
  mealToAdjust,
}: {
  apiKey: string;
  description: string;
  mealToAdjust?: ParsedMeal;
}) {
  let lastRetryableStatus: number | null = null;

  for (const model of GEMINI_MODELS) {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify(createGeminiMealRequest(description, mealToAdjust)),
    });

    if (response.ok) {
      return response.json();
    }

    if (!RETRYABLE_GEMINI_STATUSES.has(response.status)) {
      if (response.status === 401 || response.status === 403) {
        throw new InvalidGeminiKeyError();
      }

      if (response.status === 400) {
        throw new Error("Gemini could not use this request. Try saving a fresh Gemini key in Settings.");
      }

      throw new Error("I could not estimate this meal. Add a little more detail and try again.");
    }

    lastRetryableStatus = response.status;
  }

  throw new Error(
    lastRetryableStatus === 503
      ? "Gemini is busy right now. Try again in a bit."
      : "Gemini is having a moment. Try again shortly."
  );
}

export function AIMealParser({ apiKey, mode, onClose, onConfirm, mealToAdjust }: AIMealParserProps) {
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [shouldShowKeyLink, setShouldShowKeyLink] = useState(false);
  const [parsedResult, setParsedResult] = useState<ParsedMeal | null>(null);
  const [parsedDescription, setParsedDescription] = useState("");
  const actionRef = useRef<HTMLDivElement | null>(null);

  const isAdjustingMeal = mode === "adjust";
  const hasDescription = description.trim().length > 0;
  const loadingMessage = LOADING_MESSAGES[loadingMessageIndex];
  const hasDescriptionChanged = Boolean(parsedResult) && description.trim() !== parsedDescription;
  const primaryActionText = parsedResult
    ? hasDescriptionChanged
      ? "Estimate again"
      : isAdjustingMeal
      ? "Update estimate"
      : "Add estimate"
    : isAdjustingMeal
    ? "Update estimate"
    : "Estimate for me";
  const isEstimatingAction = !parsedResult || hasDescriptionChanged;
  const shouldDisablePrimaryAction = isEstimatingAction && !hasDescription;

  useEffect(() => {
    if (!isLoading) {
      setLoadingMessageIndex(0);
      return;
    }

    const intervalId = window.setInterval(() => {
      setLoadingMessageIndex((index) => (index + 1) % LOADING_MESSAGES.length);
    }, 2200);

    return () => window.clearInterval(intervalId);
  }, [isLoading]);

  useEffect(() => {
    if (!parsedResult) {
      return;
    }

    window.setTimeout(() => actionRef.current?.scrollIntoView({ behavior: "smooth", block: "end" }), 50);
  }, [parsedResult]);

  const handleParseMeal = useCallback(async () => {
    setErrorMessage(null);
    setShouldShowKeyLink(false);
    setParsedResult(null);

    if (!apiKey) {
      setErrorMessage("Add a Gemini key in Settings to use estimates.");
      return;
    }

    if (!description.trim()) {
      setErrorMessage(isAdjustingMeal ? "Tell me what to change first." : "Describe what you ate first.");
      return;
    }

    setIsLoading(true);

    try {
      const result = await parseMealWithGemini({ apiKey, description, mealToAdjust });
      const payload = parseGeminiJson(result);

      if (!validateGeminiMeal(payload)) {
        throw new Error("I could not turn that into a meal estimate. Add a little more detail and try again.");
      }

      setParsedResult(toParsedMeal(payload));
      setParsedDescription(description.trim());
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to parse meal. Check your API key and retry.";
      setShouldShowKeyLink(error instanceof InvalidGeminiKeyError);
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  }, [apiKey, description, isAdjustingMeal, mealToAdjust]);

  const handlePrimaryAction = useCallback(() => {
    if (parsedResult && !hasDescriptionChanged) {
      onConfirm(parsedResult);
      return;
    }

    handleParseMeal();
  }, [handleParseMeal, hasDescriptionChanged, onConfirm, parsedResult]);

  return (
    <Box w="100%" bg="white">
      <VStack align="stretch" spacing={4}>
        <Flex align="center" justify="space-between">
          <Box>
            <Text fontSize="lg" fontWeight="bold">
              {isAdjustingMeal ? "Adjust estimate" : "Quick add"}
            </Text>
            <Text color="gray.500" fontSize="sm">
              {isAdjustingMeal ? "Tell me what to change" : "Describe what you ate for a quick estimate"}
            </Text>
          </Box>
          <CloseButton size="lg" color="gray.500" onClick={onClose} aria-label="Hide AI meal parser" />
        </Flex>

        <FormControl>
          <FormLabel fontSize="sm" fontWeight="semibold" color="gray.600">
            {isAdjustingMeal ? "Adjustment" : "Meal description"}
          </FormLabel>
          <Textarea
            value={description}
            onChange={(event) => {
              setDescription(event.currentTarget.value);
              setErrorMessage(null);
              setShouldShowKeyLink(false);
            }}
            minH="112px"
            bg="gray.50"
            borderColor="gray.200"
            _focus={{ borderColor: "green.400", boxShadow: "0 0 0 1px var(--chakra-colors-green-400)" }}
            placeholder={
              isAdjustingMeal
                ? "e.g. make this half portion, add extra chutney"
                : "e.g. 1 oat milk tea, 1 vada pav and half portion poha"
            }
          />
        </FormControl>

        {errorMessage && (
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            {shouldShowKeyLink ? (
              <Box>
                <Text mb={2}>{errorMessage}</Text>
                <Text>
                  1. Create a new API key in{" "}
                  <Link href={GEMINI_API_KEY_URL} color="red.700" fontWeight="semibold" isExternal>
                    Google AI Studio
                  </Link>
                  .
                </Text>
                <Text>2. Open Settings.</Text>
                <Text>3. Paste the new API key there.</Text>
              </Box>
            ) : (
              errorMessage
            )}
          </Alert>
        )}

        <Text color="gray.500" fontSize="xs">
          Nutrition values are estimates. You can review and adjust them before adding.
        </Text>

        {parsedResult && (
          <Box borderWidth="1px" borderRadius="md" borderColor="gray.200" p={3}>
            <Flex align="baseline" justify="space-between" gap={3} mb={3}>
              <Text fontSize="sm" fontWeight="bold">
                {parsedResult.name}
              </Text>
              <Text color="green.400" fontSize="lg" fontWeight="bold">
                {parsedResult.nutrition.calories}kCal
              </Text>
            </Flex>
            <VStack align="stretch" spacing={2}>
              {parsedResult.items.map((item, index) => (
                <Flex key={`${item.name}-${index}`} justify="space-between" gap={3} fontSize="sm" color="gray.600">
                  <Text>
                    {item.icon || "🍛"} {item.name}
                  </Text>
                  <Text color="green.400" fontWeight="semibold" whiteSpace="nowrap">
                    {item.nutrition.calories}kCal
                  </Text>
                </Flex>
              ))}
            </VStack>
          </Box>
        )}

        <Flex ref={actionRef} gap={3}>
          <Button
            flex="1"
            colorScheme={parsedResult && !hasDescriptionChanged ? "green" : "blue"}
            onClick={handlePrimaryAction}
            isDisabled={shouldDisablePrimaryAction}
            isLoading={isLoading}
            loadingText={loadingMessage}
          >
            {primaryActionText}
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
}

export default function AIMealParserSheet({ isOpen, onClose, ...props }: AIMealParserSheetProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered scrollBehavior="inside" motionPreset="slideInBottom">
      <ModalOverlay height="100vh" />
      <ModalContent position="fixed" bottom="0px" mb="0" borderRadius="1.75rem 1.75rem 0px 0px" minW={["100vw", "lg"]}>
        <ModalBody px={4} pt={5} pb={6}>
          <AIMealParser {...props} onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

import {
  Alert,
  AlertIcon,
  Box,
  Button,
  CloseButton,
  Flex,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
} from "./ui";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { BodyMetrics, MealEntry, MicroNutrition, Nutrition, Store } from "../store";
import { computeMacroNutritionFromLog, computeMicroNutritionFromLog } from "../util/nutrition";

const GEMINI_MODELS = ["gemini-2.5-flash", "gemini-2.5-flash-lite", "gemini-2.0-flash"];
const RETRYABLE_GEMINI_STATUSES = new Set([429, 500, 502, 503, 504]);
const GEMINI_API_KEY_URL = "https://aistudio.google.com/app/apikey";
const LOADING_MESSAGES = [
  "Reading your day",
  "Checking the meal rhythm",
  "Looking at the macro balance",
  "Spotting the useful patterns",
  "Comparing against your goals",
  "Checking fiber and sat fat",
  "Finding one practical nudge",
  "Keeping it kind",
  "Writing your insight",
];

interface AIDayInsightsSheetProps {
  apiKey: string;
  body: BodyMetrics;
  dietPreference?: string;
  goal: Store["goal"];
  goalNutrition: Nutrition;
  isOpen: boolean;
  log: MealEntry[];
  micro: MicroNutrition;
  nutrition: Nutrition;
  onClose(): void;
}

class InvalidGeminiKeyError extends Error {
  constructor() {
    super("Your saved Gemini key is no longer valid.");
  }
}

function roundNumber(value: number) {
  return Number(value.toFixed(1));
}

function roundNutrition(nutrition: Nutrition) {
  return {
    calories: roundNumber(nutrition.calories),
    protein: roundNumber(nutrition.protein),
    carbohydrates: roundNumber(nutrition.carbohydrates),
    fat: roundNumber(nutrition.fat),
  };
}

function roundMicro(micro: MicroNutrition = {}) {
  return Object.fromEntries(Object.entries(micro).map(([key, value]) => [key, roundNumber(value)]));
}

function createDayInsightsRequest({
  body,
  dietPreference,
  goal,
  goalNutrition,
  log,
  micro,
  nutrition,
}: {
  body: BodyMetrics;
  dietPreference?: string;
  goal: Store["goal"];
  goalNutrition: Nutrition;
  log: MealEntry[];
  micro: MicroNutrition;
  nutrition: Nutrition;
}) {
  const bodyMetrics = {
    ...(body.age ? { age: body.age } : {}),
    ...(body.gender ? { gender: body.gender } : {}),
    ...(body.height ? { heightCm: body.height } : {}),
    ...(body.weight ? { weightKg: body.weight } : {}),
    ...(body.activity ? { activityMultiplier: body.activity } : {}),
  };
  const daySummary = {
    user: Object.keys(bodyMetrics).length ? bodyMetrics : undefined,
    dietaryPreference: dietPreference?.trim() || undefined,
    totals: {
      nutrition: roundNutrition(nutrition),
      micro: roundMicro(micro),
    },
    goals: {
      nutrition: roundNutrition(goalNutrition),
      diet: goal.diet,
      ...(goal.water ? { waterMl: goal.water } : {}),
    },
    meals: log.map((meal) => ({
      name: meal.name,
      portionWeight: roundNumber(meal.portionWeight),
      totalWeight: roundNumber(meal.totalWeight),
      nutrition: roundNutrition(computeMacroNutritionFromLog([meal])),
      micro: roundMicro(computeMicroNutritionFromLog([meal])),
    })),
  };

  return {
    contents: [
      {
        parts: [
          {
            text: `Give brief, practical feedback for this calorie tracking day. Use the user's dietary preference, body metrics, nutrition goals, total macros/micros, and meal-wise macros/micros below as context when present. Keep it encouraging, specific, and non-medical. Mention one clear win, one thing to watch, and one small next step. Avoid moralizing food or discussing weight loss/gain unless the goal data clearly implies it. Keep it under 90 words.\n\nDay data:\n${JSON.stringify(daySummary)}`,
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.4,
    },
  };
}

async function askGeminiForDayInsights({
  apiKey,
  body,
  dietPreference,
  goal,
  goalNutrition,
  log,
  micro,
  nutrition,
}: {
  apiKey: string;
  body: BodyMetrics;
  dietPreference?: string;
  goal: Store["goal"];
  goalNutrition: Nutrition;
  log: MealEntry[];
  micro: MicroNutrition;
  nutrition: Nutrition;
}) {
  let lastRetryableStatus: number | null = null;

  for (const model of GEMINI_MODELS) {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify(createDayInsightsRequest({ body, dietPreference, goal, goalNutrition, log, micro, nutrition })),
    });

    if (response.ok) {
      const result = await response.json();
      return result?.candidates?.[0]?.content?.parts?.map((part: any) => part.text).join("").trim() || "";
    }

    const errorPayload = await response.json().catch(() => null);
    const geminiMessage = typeof errorPayload?.error?.message === "string" ? errorPayload.error.message : "";
    const normalizedGeminiMessage = geminiMessage.toLowerCase();
    const shouldTryNextModel =
      response.status === 400 &&
      (normalizedGeminiMessage.includes("model") ||
        normalizedGeminiMessage.includes("not found") ||
        normalizedGeminiMessage.includes("not supported") ||
        normalizedGeminiMessage.includes("not available"));

    if (!RETRYABLE_GEMINI_STATUSES.has(response.status) && !shouldTryNextModel) {
      if (response.status === 401 || response.status === 403) {
        throw new InvalidGeminiKeyError();
      }

      if (response.status === 400) {
        throw new Error(geminiMessage ? `Gemini could not use this request: ${geminiMessage}` : "Gemini could not use this request.");
      }

      throw new Error("I could not create insights for this day. Try again in a bit.");
    }

    lastRetryableStatus = response.status;
  }

  throw new Error(
    lastRetryableStatus === 503
      ? "Gemini is busy right now. Try again in a bit."
      : "Gemini is having a moment. Try again shortly."
  );
}

export default function AIDayInsightsSheet({
  apiKey,
  body,
  dietPreference,
  goal,
  goalNutrition,
  isOpen,
  log,
  micro,
  nutrition,
  onClose,
}: AIDayInsightsSheetProps) {
  const [insight, setInsight] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [shouldShowKeyLink, setShouldShowKeyLink] = useState(false);
  const hasMeals = log.length > 0;

  const roundedCalories = useMemo(() => Math.round(nutrition.calories), [nutrition.calories]);
  const loadingMessage = LOADING_MESSAGES[loadingMessageIndex];

  useEffect(() => {
    if (!isLoading) {
      setLoadingMessageIndex(0);
      return;
    }

    const intervalId = window.setInterval(() => {
      setLoadingMessageIndex((index) => (index + 1) % LOADING_MESSAGES.length);
    }, 2400);

    return () => window.clearInterval(intervalId);
  }, [isLoading]);

  const handleGenerateInsights = useCallback(async () => {
    setErrorMessage(null);
    setShouldShowKeyLink(false);
    setIsLoading(true);

    try {
      const nextInsight = await askGeminiForDayInsights({
        apiKey,
        body,
        dietPreference,
        goal,
        goalNutrition,
        log,
        micro,
        nutrition,
      });
      setInsight(nextInsight || "I could not find a clear insight for this day. Try again after adding another meal.");
    } catch (error) {
      setInsight("");
      setShouldShowKeyLink(error instanceof InvalidGeminiKeyError);
      setErrorMessage(error instanceof Error ? error.message : "I could not create insights for this day.");
    } finally {
      setIsLoading(false);
    }
  }, [apiKey, body, dietPreference, goal, goalNutrition, log, micro, nutrition]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered scrollBehavior="inside" motionPreset="slideInBottom">
      <ModalOverlay height="100vh" />
      <ModalContent position="fixed" bottom="0px" mb="0" borderRadius="1.75rem 1.75rem 0px 0px" minW={["100vw", "lg"]}>
        <ModalBody px={4} pt={5} pb={6}>
          <Box w="100%" bg="white">
            <VStack align="stretch" spacing={4}>
              <Flex align="center" justify="space-between">
                <Box>
                  <Text fontSize="lg" fontWeight="bold">
                    Day insights
                  </Text>
                  <Text color="gray.500" fontSize="sm">
                    Feedback from your logged nutrition
                  </Text>
                </Box>
                <CloseButton size="lg" color="gray.500" onClick={onClose} aria-label="Hide day insights" />
              </Flex>

              <Box borderWidth="1px" borderColor="gray.200" borderRadius="md" p={3}>
                <Text color="gray.500" fontSize="xs" fontWeight="semibold" textTransform="uppercase">
                  Logged today
                </Text>
                <Text fontSize="2xl" fontWeight="bold" color="green.400">
                  {roundedCalories}kCal
                </Text>
                <Text color="gray.500" fontSize="sm">
                  {log.length} meal{log.length === 1 ? "" : "s"} included
                </Text>
              </Box>

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

              {insight && (
                <Box bg="gray.50" borderWidth="1px" borderColor="gray.200" borderRadius="md" p={3}>
                  <Text color="gray.700" whiteSpace="pre-wrap">
                    {insight}
                  </Text>
                </Box>
              )}

              <Text color="gray.500" fontSize="xs">
                This is an estimate from your logged entries, not medical advice.
              </Text>

              <Button
                colorScheme="blue"
                isDisabled={!hasMeals}
                isLoading={isLoading}
                loadingText={loadingMessage}
                onClick={handleGenerateInsights}
              >
                {insight ? "Refresh insights" : "Get insights"}
              </Button>
            </VStack>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

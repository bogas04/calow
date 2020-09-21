import { theme } from "@chakra-ui/core";
import { Nutrition } from "./types";

export const nutritionColors = {
  carbohydrates: theme.colors.purple["400"],
  calories: theme.colors.green["400"],
  protein: theme.colors.red["400"],
  fat: theme.colors.blue["400"],
};

export const nutritionShortNames = {
  fat: "fat",
  carbohydrates: "carbs",
  protein: "protein",
  calories: "kCal",
};

export const inititalNutrition = {
  calories: 0,
  carbohydrates: 0,
  fat: 0,
  protein: 0,
} as Nutrition;

export const nutritionKeys = ([
  "calories",
  "protein",
  "carbohydrates",
  "fat",
] as unknown) as [keyof Nutrition];

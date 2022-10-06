import { theme } from "@chakra-ui/react";
import { Nutrition } from "./types";

export const nutritionColors = {
  carbohydrates: theme.colors.purple["400"],
  calories: theme.colors.green["400"],
  protein: theme.colors.red["400"],
  fat: theme.colors.blue["400"],
};

export const nutritionColorsRaw = {
  carbohydrates: theme.colors.purple,
  calories: theme.colors.green,
  protein: theme.colors.red,
  fat: theme.colors.blue,
};

export const nutritionUnits = {
  fat: "grams",
  carbohydrates: "grams",
  protein: "grams",
  calories: "kCal",
};

export const nutritionShortUnits = {
  fat: "g",
  carbohydrates: "g",
  protein: "g",
  calories: "kCal",
};

export const nutritionShortNames = {
  fat: "fat",
  carbohydrates: "carbs",
  protein: "protein",
  calories: "cals",
};

export const inititalNutrition = {
  calories: 0,
  carbohydrates: 0,
  fat: 0,
  protein: 0,
} as Nutrition;

export const nutritionKeys = ["calories", "protein", "carbohydrates", "fat"] as unknown as [keyof Nutrition];

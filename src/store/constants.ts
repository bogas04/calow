import { Nutrition } from "./types";

const colors = {
  purple: { "400": "#9F7AEA", "500": "#805AD5", "600": "#6B46C1" },
  green: { "400": "#48BB78", "500": "#38A169", "600": "#2F855A" },
  red: { "400": "#F56565", "500": "#E53E3E", "600": "#C53030" },
  blue: { "400": "#4299e1", "500": "#3182ce", "600": "#2b6cb0" },
};

export const nutritionColors = {
  carbohydrates: colors.purple["400"],
  calories: colors.green["400"],
  protein: colors.red["400"],
  fat: colors.blue["400"],
};

export const nutritionColorsRaw = {
  carbohydrates: colors.purple,
  calories: colors.green,
  protein: colors.red,
  fat: colors.blue,
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

export const importantMicros = ["fiber", "saturated fats"];

/** hard coded for my family but can be put to settings */
export const microGoals = {
  fiber: 50,
  "saturated fats": 10,
} as const;

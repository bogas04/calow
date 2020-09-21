import { Nutrition, nutritionKeys } from "../store";

export function mapNutrition(
  nutrition: Nutrition,
  fn: (nutritionKey: keyof Nutrition, nutritionValue: number) => number
) {
  return nutritionKeys.reduce(
    (newNutrition, key) => ({
      ...newNutrition,
      [key]: fn(key, nutrition[key]),
    }),
    nutrition
  );
}

export function computeWeightedNutrition(
  nutritionPer100Grams: Nutrition,
  newWeight: number
) {
  return mapNutrition(
    nutritionPer100Grams,
    (_, value) => (value * newWeight) / 100
  );
}

export function addNutrition(n1: Nutrition, n2: Nutrition) {
  return mapNutrition(n1, (key) => n1[key] + n2[key]);
}

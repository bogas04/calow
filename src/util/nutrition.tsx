import { Nutrition, nutritionKeys } from "../store";

export function computeWeightedNutrition(
  nutritionPer100Grams: Nutrition,
  newWeight: number
) {
  return nutritionKeys.reduce(
    (newNutrition, key) => ({
      ...newNutrition,
      [key]: (nutritionPer100Grams[key] * newWeight) / 100,
    }),
    {} as Nutrition
  );
}

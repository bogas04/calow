import { BodyMetrics, Nutrition, nutritionKeys } from "../store";

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

export function computeCaloricNeeds({
  height,
  weight,
  gender,
  age,
  activity,
}: BodyMetrics): Nutrition {
  // Harris–Benedict BMR 1990: https://en.wikipedia.org/wiki/Harris%E2%80%93Benedict_equation
  const bmr =
    10 * Number(weight) +
    6.25 * Number(height) -
    5 * Number(age) +
    (gender === "male" ? 5 : -161);

  const calories = Math.ceil(bmr * activity);

  return computeMacroFromCalories(calories);
}

export function computeMacroFromCalories(calories: number): Nutrition {
  return {
    calories,
    carbohydrates: Math.ceil((0.45 * calories) / 4),
    protein: Math.ceil((0.1 * calories) / 4),
    fat: Math.ceil((0.35 * calories) / 9),
  };
}

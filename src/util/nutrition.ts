import {
  BodyMetrics,
  inititalNutrition,
  MealEntry,
  Nutrition,
  nutritionKeys,
} from "../store";

export function mapNutrition<T = number>(
  nutrition: Nutrition,
  fn: (nutritionKey: keyof Nutrition, nutritionValue: number) => T
): Nutrition<T> {
  return nutritionKeys.reduce<Nutrition<T>>(
    (newNutrition, key) => ({
      ...newNutrition,
      [key]: fn(key, nutrition[key]),
    }),
    (nutrition as unknown) as Nutrition<T>
  );
}

export function createNutrition(
  fn: (nutritionKey: keyof Nutrition, nutritionValue: number) => number
) {
  return mapNutrition(inititalNutrition, fn);
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
}: BodyMetrics): { bmr: number; caloricNeeds: Nutrition } {
  // Harris–Benedict BMR 1990: https://en.wikipedia.org/wiki/Harris%E2%80%93Benedict_equation
  const bmr =
    10 * Number(weight) +
    6.25 * Number(height) -
    5 * Number(age) +
    (gender === "male" ? 5 : -161);

  const calories = Math.ceil(bmr * activity);

  return { bmr, caloricNeeds: computeMacroFromCalories(calories) };
}

export function computeMacroFromCalories(calories: number): Nutrition {
  return {
    calories,
    carbohydrates: Math.ceil((0.5 * calories) / 4),
    protein: Math.ceil((0.225 * calories) / 4),
    fat: Math.ceil((0.275 * calories) / 9),
  };
}

export function computeNutritionFromLog(entries: MealEntry[]) {
  return entries.reduce((totalNutrition, meal) => {
    const totalMealNutrition = meal.items.reduce(
      (mealNutrition, item) => addNutrition(mealNutrition, item.nutrition),
      inititalNutrition
    );

    const portionNutrition = mapNutrition(
      totalMealNutrition,
      (key) => (totalMealNutrition[key] * meal.portionWeight) / meal.totalWeight
    );

    return addNutrition(portionNutrition, totalNutrition);
  }, inititalNutrition);
}

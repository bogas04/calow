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

export function computeMacroFromCalories(
  calories: number,
  multiplier = macroCombination.neutral.macros
): Nutrition {
  return {
    calories,
    carbohydrates: Math.ceil((multiplier.carbohydrates * calories) / 4),
    protein: Math.ceil((multiplier.protein * calories) / 4),
    fat: Math.ceil((multiplier.fat * calories) / 9),
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

/**
 * The acceptable macronutrient distribution ranges (AMDR) are 45–65% of your daily calories from carbs, 20–35% from fats and 10–35% from protein.
 * https://www.healthline.com/nutrition/best-macronutrient-ratio
 */
export const macroCombination = {
  protein: {
    name: "High protein",
    description:
      "A high protein diet can help in weight loss and muscle building. Choose this if you intend to engage in intense weight training.",
    macros: {
      carbohydrates: 0.45,
      protein: 0.35,
      fat: 0.2,
    },
  },
  carbohydrates: {
    name: "High carb",
    macros: {
      carbohydrates: 0.65,
      protein: 0.15,
      fat: 0.2,
    },
    description:
      "A high carbohydrate diet is easiest to maintain, however stay wary of refined carbohydrates.",
  },
  fat: {
    name: "High fat",
    description:
      "A high fat diet can help in feeling fuller with small portions.",
    macros: {
      carbohydrates: 0.45,
      protein: 0.2,
      fat: 0.35,
    },
  },
  neutral: {
    name: "Neutral",
    macros: {
      carbohydrates: 0.455,
      protein: 0.225,
      fat: 0.27,
    },

    description: "This diet is well balanced in terms of macro nutrients.",
  },
};

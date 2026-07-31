import type { ItemEntry, Store } from "../store";
import { getRecentLoggedMeals } from "./mealHistory";

/**
 * Finds ingredients that most often occur alongside every item currently in
 * the draft. Only the 20 most recent meals are considered, via mealHistory.
 */
export function getPairedIngredientSuggestions(logs: Store["logs"], addedItems: ItemEntry[], limit = 10) {
  const addedNames = new Set(addedItems.map((item) => item.name));
  const candidates = new Map<string, { item: ItemEntry; count: number }>();

  getRecentLoggedMeals(logs)
    .filter((meal) => [...addedNames].every((name) => meal.items.some((item) => item.name === name)))
    .forEach((meal) => {
      meal.items.forEach((item) => {
        if (addedNames.has(item.name)) return;
        const candidate = candidates.get(item.name);
        candidates.set(item.name, candidate ? { ...candidate, count: candidate.count + 1 } : { item, count: 1 });
      });
    });

  return Array.from(candidates.values())
    .sort((a, b) => b.count - a.count || a.item.name.localeCompare(b.item.name))
    .slice(0, limit)
    .map(({ item }) => item);
}

/** Returns the most-used name from recent meals with the exact same ingredient set. */
export function getMatchingMealName(logs: Store["logs"], addedItems: ItemEntry[]) {
  if (addedItems.length === 0) return "";

  const currentIngredientNames = new Set(addedItems.map((item) => item.name));
  const matchingNames = new Map<string, number>();

  getRecentLoggedMeals(logs)
    .filter((meal) => {
      const mealIngredientNames = new Set(meal.items.map((item) => item.name));
      return (
        mealIngredientNames.size === currentIngredientNames.size &&
        [...currentIngredientNames].every((ingredientName) => mealIngredientNames.has(ingredientName))
      );
    })
    .forEach((meal) => matchingNames.set(meal.name, (matchingNames.get(meal.name) || 0) + 1));

  return Array.from(matchingNames.entries()).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0]?.[0] || "";
}

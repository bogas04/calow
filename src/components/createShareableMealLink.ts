import { MealEntry } from "../store/types";

function createCleanJSON(obj: any): string {
  return JSON.stringify(obj, (key, value) => {
    // Skip null and undefined values
    if (value === null || value === undefined) {
      return undefined;
    }
    return value;
  });
}

export function createShareableMealLink(_mealToBeShared: MealEntry, baseLink: string) {
  const mealToBeShared = structuredClone(_mealToBeShared);
  const fullMealJson = createCleanJSON(mealToBeShared);
  const createLink = (stringifiedJson: string) =>
    `${baseLink}meal-entry?shared_meal=${encodeURIComponent(stringifiedJson)}`;

  const finalUrl = createLink(fullMealJson);

  if (finalUrl.length < 2000) {
    return finalUrl;
  }

  const microMultiplier = 100 / mealToBeShared.portionWeight;
  const microPer100 = Object.fromEntries(
    Object.entries(mealToBeShared.micro || {}).map(([k, v]) => [k, v * microMultiplier])
  );

  // we compress entire meal into one item in itself
  mealToBeShared.items = [
    {
      name: mealToBeShared.name,
      nutrition: mealToBeShared.nutrition,
      micro: microPer100,
      weight: mealToBeShared.portionWeight,
    },
  ];
  mealToBeShared.totalWeight = mealToBeShared.portionWeight;

  return createLink(createCleanJSON(mealToBeShared));
}

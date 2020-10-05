export interface MealEntry {
  name: string;
  timestamp: number;
  items: ItemEntry[];
  totalWeight: number;
  portionWeight: number;
  nutrition: Nutrition;
}

export interface ItemEntry {
  name: string;
  icon?: string;
  nutrition: Nutrition;
  weight: number;
}

export interface Nutrition<T = number> {
  calories: T;
  carbohydrates: T;
  protein: T;
  fat: T;
}

export interface BodyMetrics {
  height: number;
  weight: number;
  gender: "male" | "female";
  age: number;
  activity: number;
}

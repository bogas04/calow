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
  weight?: number;
  timestamp: number;
}

export interface Nutrition {
  calories: number;
  carbohydrates: number;
  protein: number;
  fat: number;
}

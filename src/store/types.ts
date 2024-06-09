export interface MealEntry {
  name: string;
  timestamp: number;
  items: ItemEntry[];
  totalWeight: number;
  portionWeight: number;
  nutrition: Nutrition;
  micro?: MicroNutrition;
  water?: number;
}

export interface ItemEntry {
  name: string;
  icon?: string;
  nutrition: Nutrition;
  micro?: MicroNutrition;
  weight: number;
}

// Right now our data source is free flowing
export interface MicroNutrition<T = number> extends Record<string, T> {}

// We'll use this when we've clear keys defined in our data source
export interface KnownMicroNutrition<T> {
  /** RDA > 19 years: 2000-2500mg */
  calcium?: T;
  /** RDA > 19 years: 1800-2300mg */
  chloride?: T;
  /** RDA > 19 years: 900mcg */
  copper?: T;
  /**
   * men under 50: 30-38g
   * women under 50: 21-25g
   * children 1-18: 14-31g
   */
  fiber?: T;
  /** RDA > 19 years: 3-4mg */
  fluoride?: T;
  /** RDA > 19 years: 150mcg */
  iodine?: T;
  /** RDA > 19 years: 8-18mg */
  iron?: T;
  /** RDA > 19 years: 310-420mg */
  magnesium?: T;
  /** RDA > 19 years: 1.8-2.3mg */
  manganese?: T;
  /** RDA > 19 years: 700mg */
  phosphorus?: T;
  /** RDA > 19 years: 4700mg */
  potassium?: T;
  /** RDA > 19 years; 10g */
  "saturated fats"?: T;
  /** RDA > 19 years: 55mcg */
  selenium?: T;
  /** RDA > 19 years: 2300mg */
  sodium?: T;
  /** RDA > 19 years: N/A */
  sulfur?: T;
  /** RDA > 19 years: 700-900mcg */
  vitaminA?: T;
  /** RDA > 19 years: 1.1-1.2mg */
  vitaminB1?: T;
  /** RDA > 19 years: 1.1-1.3mg */
  vitaminB2?: T;
  /** RDA > 19 years: 14-16mg */
  vitaminB3?: T;
  /** RDA > 19 years: 5mg */
  vitaminB5?: T;
  /** RDA > 19 years: 1.3mg */
  vitaminB6?: T;
  /** RDA > 19 years: 30mcg */
  vitaminB7?: T;
  /** RDA > 19 years: 400mcg */
  vitaminB9?: T;
  /** RDA > 19 years: 2.4mcg */
  vitaminB12?: T;
  /** RDA > 19 years: 75-90mg */
  vitaminC?: T;
  /** RDA > 19 years: 600-900mcg */
  vitaminD?: T;
  /** RDA > 19 years: 15mg */
  vitaminE?: T;
  /** RDA > 19 years: 90-120mcg */
  vitaminK?: T;
  /** RDA > 19 years: 8-11mg */
  zinc?: T;
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

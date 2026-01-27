import { MealEntry } from "../store/types";

export function createShareableMealLink(meal: MealEntry, baseLink: string, parserVersion: "v1" | "v2" = "v2"): string {
  if (parserVersion === "v1") {
    return v1Parser.create(meal, baseLink);
  }

  return v2Parser.create(meal, baseLink);
}

export function getMealFromQueryParams(queryParams: Record<string, string | string[] | undefined>): MealEntry | null {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(queryParams)) {
    if (value !== undefined) {
      if (Array.isArray(value)) value.forEach((v) => searchParams.append(key, v));
      else searchParams.append(key, value);
    }
  }
  const link = searchParams.toString();

  for (const parser of parsers) {
    if (parser.isValid(link)) {
      return parser.parse(link);
    }
  }
  return null;
}

export function parseMealFromLink(urlOrEncoded: string): MealEntry {
  for (const parser of parsers) {
    if (parser.isValid(urlOrEncoded)) {
      return parser.parse(urlOrEncoded);
    }
  }

  throw new Error("No valid meal data found in link or string");
}

class Helpers {
  static reverseMap(map: Record<string, string>): Record<string, string> {
    return Object.fromEntries(Object.entries(map).map(([k, v]) => [v, k]));
  }

  static createCleanJSON(obj: any): string {
    return JSON.stringify(obj, (_, value) => (value === null || value === undefined ? undefined : value));
  }

  static compressMeal(meal: MealEntry): MealEntry {
    const mealToBeShared = structuredClone(meal);
    const microMultiplier = 100 / (mealToBeShared.portionWeight || 1);
    const microPer100 = Object.fromEntries(
      Object.entries(mealToBeShared.micro || {}).map(([k, v]) => [k, v * microMultiplier])
    );

    mealToBeShared.items = [
      {
        name: mealToBeShared.name,
        nutrition: mealToBeShared.nutrition,
        micro: microPer100,
        weight: mealToBeShared.portionWeight,
      },
    ];
    mealToBeShared.totalWeight = mealToBeShared.portionWeight;
    return mealToBeShared;
  }
  static getQueryParam(link: string, param: string): string | null {
    try {
      if (link.startsWith("http")) {
        const url = new URL(link);
        return url.searchParams.get(param);
      }
      const search = link.includes("?") ? link.split("?")[1] : link;
      const params = new URLSearchParams(search);
      return params.get(param);
    } catch {
      return null;
    }
  }

  static validateMeal(meal: any): asserts meal is MealEntry {
    if (!meal || typeof meal !== "object") throw new Error("Invalid meal data");
    if (!Array.isArray(meal.items) || typeof meal.totalWeight !== "number") {
      throw new Error("Invalid meal data");
    }
  }
}

const FIELD_MAP_V2 = {
  calories: "j",
  carbohydrates: "c",
  protein: "p",
  fat: "f",
  items: "i",
  nutrition: "n",
  name: "nm",
  weight: "w",
  micro: "m",
  fiber: "fb",
  calcium: "ca",
  "saturated fats": "sf",
  sodium: "na",
  timestamp: "t",
  totalWeight: "tw",
  portionWeight: "pw",
  icon: "ic",
} as const;

const FIELD_MAP_V2_REVERSED = Helpers.reverseMap(FIELD_MAP_V2 as unknown as Record<string, string>);

const IGNORED_MICRO_FIELDS = ["calorie delta", "delta > 20"];

export interface LinkParser {
  isValid(link: string): boolean;
  create(meal: MealEntry, baseLink: string): string;
  parse(link: string): MealEntry;
}

class LinkParserV1 implements LinkParser {
  private readonly PARAM = "shared_meal";

  isValid(link: string): boolean {
    return !!Helpers.getQueryParam(link, this.PARAM);
  }

  create(meal: MealEntry, baseLink: string): string {
    let mealToShare = meal;
    const makeUrl = (m: MealEntry) =>
      `${baseLink}meal-entry?${this.PARAM}=${encodeURIComponent(Helpers.createCleanJSON(m))}`;

    let url = makeUrl(mealToShare);
    if (url.length >= 2000) {
      mealToShare = Helpers.compressMeal(meal);
      url = makeUrl(mealToShare);
    }
    return url;
  }

  parse(link: string): MealEntry {
    const data = Helpers.getQueryParam(link, this.PARAM);
    if (!data) throw new Error("No meal data found in URL");
    const meal = JSON.parse(decodeURIComponent(data));
    Helpers.validateMeal(meal);
    return meal;
  }
}

class LinkParserV2 implements LinkParser {
  private readonly PARAM = "m";

  transformKeys(obj: any, keyMap: Record<string, string>, shouldIgnore?: (key: string) => boolean): any {
    if (obj === null || obj === undefined) return obj;
    if (Array.isArray(obj)) return obj.map((item) => this.transformKeys(item, keyMap, shouldIgnore));
    if (typeof obj !== "object") return obj;

    const transformed: any = {};
    for (const [key, value] of Object.entries(obj)) {
      const trimmedKey = key.trim();
      if (shouldIgnore?.(trimmedKey)) continue;

      const newKey = keyMap[trimmedKey] || trimmedKey;
      transformed[newKey] = this.transformKeys(value, keyMap, shouldIgnore);
    }
    return transformed;
  }

  isValid(link: string): boolean {
    return !!Helpers.getQueryParam(link, this.PARAM);
  }

  create(meal: MealEntry, baseLink: string): string {
    let mealToShare = meal;
    const transform = (m: MealEntry) => this.transformKeys(m, FIELD_MAP_V2, (k) => IGNORED_MICRO_FIELDS.includes(k));

    let url = `${baseLink}meal-entry?${this.PARAM}=${encodeURIComponent(
      Helpers.createCleanJSON(transform(mealToShare))
    )}`;

    if (url.length >= 2000) {
      mealToShare = Helpers.compressMeal(meal);
      url = `${baseLink}meal-entry?${this.PARAM}=${encodeURIComponent(
        Helpers.createCleanJSON(transform(mealToShare))
      )}`;
    }
    return url;
  }

  parse(link: string): MealEntry {
    const data = Helpers.getQueryParam(link, this.PARAM);
    if (!data) throw new Error("No meal data found in URL");
    const meal = JSON.parse(decodeURIComponent(data));
    const transformed = this.transformKeys(meal, FIELD_MAP_V2_REVERSED);
    Helpers.validateMeal(transformed);
    return transformed;
  }
}

const v1Parser = new LinkParserV1();
const v2Parser = new LinkParserV2();
const parsers: LinkParser[] = [v2Parser, v1Parser];

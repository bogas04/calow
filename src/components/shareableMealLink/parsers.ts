import { MealEntry } from "../../store/types";

class Helpers {
  static reverseMap(map: Record<string, string>): Record<string, string> {
    return Object.fromEntries(Object.entries(map).map(([k, v]) => [v, k]));
  }

  static createCleanJSON(obj: any): string {
    return JSON.stringify(obj, (_, value) => {
      if (value === null || value === undefined) return undefined;
      if (typeof value === "number") return Math.round(value * 100) / 100;
      return value;
    });
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

    // Add missing timestamp if not present (common in V2 links)
    if (meal.timestamp === undefined) {
      meal.timestamp = Date.now();
    }

    if (!Array.isArray(meal.items) || typeof meal.totalWeight !== "number") {
      throw new Error("Invalid meal data");
    }
  }
}

interface LinkParser {
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
    const mealToShare = { ...meal };
    delete (mealToShare as any).timestamp;

    const makeUrl = (m: any) => `${baseLink}meal-entry?${this.PARAM}=${encodeURIComponent(Helpers.createCleanJSON(m))}`;

    let url = makeUrl(mealToShare);
    if (url.length >= 2000) {
      const compressed = Helpers.compressMeal(meal);
      delete (compressed as any).timestamp;
      url = makeUrl(compressed);
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
    const transform = (m: MealEntry) => this.transformKeys(m, FIELD_MAP_V2, (k) => FIELDS_TO_IGNORE.includes(k));

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

class LinkParserV3 extends LinkParserV2 {
  override isValid(link: string): boolean {
    const data = Helpers.getQueryParam(link, "m");
    return !!data && data.startsWith("3{");
  }

  override create(meal: MealEntry, baseLink: string): string {
    let mealToShare = meal;
    const transform = (m: MealEntry) => this.transformKeys(m, FIELD_MAP_V2, (k) => FIELDS_TO_IGNORE.includes(k));

    const stringifyString = (val: string): string => {
      let res = "";
      for (let i = 0; i < val.length; i++) {
        const c = val[i];
        const code = val.codePointAt(i)!;
        if (c === " ") {
          res += ".";
        } else if (code > 0x7f) {
          // Keep emojis/Unicode - they will be URI encoded by the browser
          res += c;
          if (code > 0xffff) res += val[++i]; // Handle surrogate pairs
        } else if (!/[a-zA-Z0-9]/.test(c)) {
          // Escape separators and formatting chars: { } [ ] : ; - . _ * ~ ` ( )
          res += "-" + code.toString(16).toUpperCase().padStart(2, "0");
        } else {
          res += c;
        }
      }
      return res;
    };

    const stringify = (val: any): string => {
      if (typeof val === "number") return Math.round(val * 100) / 100 + "";
      if (typeof val === "string") return stringifyString(val);
      if (Array.isArray(val)) return "[" + val.map(stringify).join(";") + "]";
      if (val && typeof val === "object") {
        return (
          "{" +
          Object.entries(val)
            .map(([k, v]) => `${k}:${stringify(v)}`)
            .join(";") +
          "}"
        );
      }
      return "";
    };

    const createUrl = (m: MealEntry) => {
      const payload = "3" + stringify(transform(m));
      // Manual encoding for ( ) as they are often NOT escaped by encodeURIComponent but break WhatsApp
      return `${baseLink}meal-entry?m=${encodeURIComponent(payload).replace(/\(/g, "%28").replace(/\)/g, "%29")}`;
    };

    let url = createUrl(mealToShare);

    if (url.length >= 2000) {
      mealToShare = Helpers.compressMeal(meal);
      url = createUrl(mealToShare);
    }
    return url;
  }

  override parse(link: string): MealEntry {
    const data = Helpers.getQueryParam(link, "m");
    if (!data || !data.startsWith("3")) throw new Error("No V3 meal data found");

    const content = data.substring(1);

    const decodeString = (s: string): string => {
      let res = "";
      for (let i = 0; i < s.length; i++) {
        const c = s[i];
        if (c === ".") {
          res += " ";
        } else if (c === "-") {
          const hex = s.substring(i + 1, i + 3);
          res += String.fromCharCode(parseInt(hex, 16));
          i += 2;
        } else {
          res += c;
        }
      }
      return res;
    };

    const parseValue = (s: string): { val: any; rest: string } => {
      if (s.startsWith("{")) {
        const obj: any = {};
        let rest = s.substring(1);
        while (rest && !rest.startsWith("}")) {
          const keyMatch = rest.match(/^([^:]+):/);
          if (!keyMatch) break;
          const key = keyMatch[1];
          const { val, rest: r } = parseValue(rest.substring(key.length + 1));
          obj[key] = val;
          rest = r;
          if (rest.startsWith(";")) rest = rest.substring(1);
        }
        return { val: obj, rest: rest.substring(1) };
      }
      if (s.startsWith("[")) {
        const arr: any[] = [];
        let rest = s.substring(1);
        while (rest && !rest.startsWith("]")) {
          const { val, rest: r } = parseValue(rest);
          arr.push(val);
          rest = r;
          if (rest.startsWith(";")) rest = rest.substring(1);
        }
        return { val: arr, rest: rest.substring(1) };
      }

      // Scalar value
      let endIdx = 0;
      for (; endIdx < s.length; endIdx++) {
        const c = s[endIdx];
        if (c === ";" || c === ":" || c === "}" || c === "]" || c === "[" || c === "{") break;
      }
      const raw = s.substring(0, endIdx);
      const rest = s.substring(endIdx);

      if (raw !== "" && !isNaN(raw as any) && !/^\d{4}-\d{2}-\d{2}/.test(raw)) {
        return { val: Number(raw), rest };
      }
      return { val: decodeString(raw), rest };
    };

    const meal = parseValue(content).val;
    const transformed = this.transformKeys(meal, FIELD_MAP_V2_REVERSED);
    Helpers.validateMeal(transformed);
    return transformed;
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

const FIELDS_TO_IGNORE = ["calorie delta", "delta > 20", "timestamp"];

export const v1Parser = new LinkParserV1();
export const v2Parser = new LinkParserV2();
export const v3Parser = new LinkParserV3();
export const parsers: LinkParser[] = [v3Parser, v2Parser, v1Parser];

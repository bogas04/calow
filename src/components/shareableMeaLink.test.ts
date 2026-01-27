import { describe, it } from "node:test";
import assert from "node:assert";
import { createShareableMealLink, parseMealFromLink, getMealFromQueryParams } from "./shareableMealLink";
import { MealEntry } from "../store/types";

const BASE_LINK = "https://example.com/";

describe("V1: Shareable Link Creation", () => {
  it("generates a link using the 'shared_meal' query parameter", () => {
    const result = createShareableMealLink(COMPREHENSIVE_MEAL, BASE_LINK, "v1");
    assert.ok(result.includes("?shared_meal="));
    assert.ok(!result.includes("?m="));
  });

  it("retains full JSON field names without compression", () => {
    const result = createShareableMealLink(COMPREHENSIVE_MEAL, BASE_LINK, "v1");
    const encoded = new URLSearchParams(result.split("?")[1]).get("shared_meal")!;
    const decoded = decodeURIComponent(encoded);
    assert.ok(decoded.includes('"name"'));
    assert.ok(decoded.includes('"nutrition"'));
    assert.ok(decoded.includes('"calories"'));
  });

  it("strips timestamps and removes null/undefined fields", () => {
    const result = createShareableMealLink(COMPREHENSIVE_MEAL, BASE_LINK, "v1");
    const encoded = new URLSearchParams(result.split("?")[1]).get("shared_meal")!;
    const decoded = decodeURIComponent(encoded);

    assert.ok(!decoded.includes(COMPREHENSIVE_MEAL.timestamp.toString()));
    assert.ok(!decoded.includes("water"));
    assert.ok(!decoded.includes("null"));
  });

  it("rounds numeric values to 2 decimal places", () => {
    const result = createShareableMealLink(COMPREHENSIVE_MEAL, BASE_LINK, "v1");
    const parsed = parseMealFromLink(result);
    // 0.375 should round to 0.38
    assert.strictEqual(parsed.nutrition.fat, 0.38);
  });

  it("compresses the meal into a single summary item if the URL exceeds 2000 characters", () => {
    const result = createShareableMealLink(MASSIVE_MEAL, BASE_LINK, "v1");
    assert.ok(result.includes("?shared_meal="));
    const parsed = parseMealFromLink(result);
    assert.strictEqual(parsed.items.length, 1);
    assert.strictEqual(parsed.items[0].name, MASSIVE_MEAL.name);
  });
});

describe("V1: Link Parsing", () => {
  it("successfully parses a valid V1 URL back into a meal object", () => {
    const url = createShareableMealLink(COMPREHENSIVE_MEAL, BASE_LINK, "v1");
    const parsed = parseMealFromLink(url);
    assert.strictEqual(parsed.name, COMPREHENSIVE_MEAL.name);
    assert.strictEqual(parsed.nutrition.calories, 133.25);
  });

  it("correctly extracts meal data from a raw query parameters object", () => {
    const url = createShareableMealLink(COMPREHENSIVE_MEAL, BASE_LINK, "v1");
    const queryParams: Record<string, string> = {};
    new URLSearchParams(url.split("?")[1]).forEach((v, k) => (queryParams[k] = v));

    const result = getMealFromQueryParams(queryParams);
    assert.ok(result);
    assert.strictEqual(result.name, COMPREHENSIVE_MEAL.name);
  });
});

describe("V2: Shortened Link Creation", () => {
  it("uses the 'm' query parameter for minimized links", () => {
    const result = createShareableMealLink(COMPREHENSIVE_MEAL, BASE_LINK, "v2");
    assert.ok(result.includes("?m="));
  });

  it("obfuscates field names to single characters or short codes", () => {
    const result = createShareableMealLink(COMPREHENSIVE_MEAL, BASE_LINK, "v2");
    const encoded = new URLSearchParams(result.split("?")[1]).get("m")!;
    const decoded = decodeURIComponent(encoded);

    assert.ok(decoded.includes('"nm"')); // name
    assert.ok(decoded.includes('"n"')); // nutrition
    assert.ok(decoded.includes('"j"')); // calories (joules)
    assert.ok(!decoded.includes('"calories"'));
  });

  it("maps micro-nutrient keys to internal codes and filters ignored fields", () => {
    const result = createShareableMealLink(COMPREHENSIVE_MEAL, BASE_LINK, "v2");
    const encoded = new URLSearchParams(result.split("?")[1]).get("m")!;
    const decoded = JSON.parse(decodeURIComponent(encoded));

    // Check item micro mapping (fb for fiber, na for sodium)
    assert.ok(decoded.i[0].m.fb, "Should have 'fb' for fiber");
    assert.ok(decoded.i[0].m.na, "Should have 'na' for sodium");

    // Check ignored fields
    const decodedRaw = decodeURIComponent(encoded);
    assert.ok(!decodedRaw.includes("calorie delta"));
    assert.ok(!decodedRaw.includes("delta > 20"));
  });

  it("correctly handles micro-nutrient keys with trailing spaces", () => {
    // COMPREHENSIVE_MEAL has "sodium " with a trailing space
    const result = createShareableMealLink(COMPREHENSIVE_MEAL, BASE_LINK, "v2");
    const encoded = new URLSearchParams(result.split("?")[1]).get("m")!;
    const decoded = JSON.parse(decodeURIComponent(encoded));
    assert.strictEqual(decoded.i[0].m.na, 24);
  });

  it("automatically compresses long V2 meals into a summary item", () => {
    const result = createShareableMealLink(MASSIVE_MEAL, BASE_LINK, "v2");
    const parsed = parseMealFromLink(result);
    assert.strictEqual(parsed.items.length, 1);
  });
});

describe("V2: Shortened Link Parsing", () => {
  it("seamlessly reconstructs the original meal data from a V2 URL", () => {
    const url = createShareableMealLink(COMPREHENSIVE_MEAL, BASE_LINK, "v2");
    const parsed = parseMealFromLink(url);

    assert.strictEqual(parsed.name, COMPREHENSIVE_MEAL.name);
    assert.strictEqual(parsed.nutrition.fat, 0.38);
    assert.strictEqual(parsed.micro?.fiber, 15);
  });
});

describe("Edge Cases & Validation", () => {
  it("handles empty item arrays without failing", () => {
    const result = createShareableMealLink(EMPTY_MEAL, BASE_LINK);
    const parsed = parseMealFromLink(result);
    assert.strictEqual(parsed.items.length, 0);
  });

  it("preserves special characters through the encoding/decoding cycle", () => {
    const result = createShareableMealLink(COMPREHENSIVE_MEAL, BASE_LINK);
    const parsed = parseMealFromLink(result);
    assert.strictEqual(parsed.name, COMPREHENSIVE_MEAL.name);
  });

  it("respects custom base link prefixes", () => {
    const customBase = "https://share.calow.app/";
    const result = createShareableMealLink(COMPREHENSIVE_MEAL, customBase);
    assert.ok(result.startsWith(customBase));
  });

  it("respects totalWeight vs portionWeight discrepancy", () => {
    const result = createShareableMealLink(COMPREHENSIVE_MEAL, BASE_LINK);
    const parsed = parseMealFromLink(result);
    assert.strictEqual(parsed.totalWeight, 200);
    assert.strictEqual(parsed.portionWeight, 100);
  });

  it("does not mutate the source meal object during link generation", () => {
    const originalJson = JSON.stringify(COMPREHENSIVE_MEAL);
    createShareableMealLink(COMPREHENSIVE_MEAL, BASE_LINK, "v1");
    createShareableMealLink(COMPREHENSIVE_MEAL, BASE_LINK, "v2");
    assert.strictEqual(JSON.stringify(COMPREHENSIVE_MEAL), originalJson);
  });

  it("throws appropriate errors for malformed or missing query parameters", () => {
    assert.throws(() => parseMealFromLink(BASE_LINK + "meal-entry?shared_meal=invalid-json"));
    assert.throws(() => parseMealFromLink(BASE_LINK + "meal-entry?m=%G1")); // Invalid URI encoding
    assert.throws(() => parseMealFromLink(BASE_LINK + "meal-entry")); // Missing param
    assert.throws(() => parseMealFromLink("just some random text"));
  });

  it("validates mandatory fields (items, totalWeight) during parsing", () => {
    const invalidData = encodeURIComponent(JSON.stringify({ name: "Incomplete" }));
    assert.throws(() => parseMealFromLink(`?shared_meal=${invalidData}`));
  });
});

// --- Consolidated Test Data ---

const COMPREHENSIVE_MEAL: MealEntry = {
  name: "🍲 Comprehensive Test Meal & Special <Chars> 'Quotes' \"Double\"",
  timestamp: 1769514522903,
  items: [
    {
      name: "Item with Micro and Bad Keys",
      icon: "🧪",
      weight: 50,
      nutrition: { calories: 166.5, carbohydrates: 30, fat: 0.4, protein: 12 },
      micro: {
        fiber: 25,
        calcium: null as any,
        "saturated fats": 0.1,
        "sodium ": 24, // Tests trailing space
        "calorie delta": 10.2, // Should be ignored in V2
        "delta > 20": null as any,
      },
    },
    {
      name: "Simple Item",
      icon: "🍎",
      weight: 50,
      nutrition: { calories: 100, carbohydrates: 20, fat: 0.35, protein: 5 },
      micro: { fiber: 5, sodium: 100 },
    },
  ],
  totalWeight: 200,
  portionWeight: 100,
  nutrition: {
    calories: 133.25,
    carbohydrates: 25,
    fat: 0.375, // Tests rounding (rounds to 0.38)
    protein: 8.5,
  },
  micro: {
    fiber: 15,
    sodium: 62,
  },
  water: undefined, // To test exclusion
};

const EMPTY_MEAL: MealEntry = {
  name: "Empty Meal",
  timestamp: 123456789,
  items: [],
  totalWeight: 0,
  portionWeight: 0,
  nutrition: { calories: 0, carbohydrates: 0, fat: 0, protein: 0 },
};

const MASSIVE_MEAL: MealEntry = {
  name: "Massive Meal for Compression",
  timestamp: 123456789,
  items: Array.from({ length: 60 }, (_, i) => ({
    name: `Distraction Item ${i} with a very long name intended to push the URL length beyond the two kilobyte threshold allowed by most browsers and systems`,
    weight: 100,
    nutrition: { calories: 100, carbohydrates: 10, fat: 2, protein: 2 },
    micro: { fiber: 1, sodium: 10 },
  })),
  totalWeight: 6000,
  portionWeight: 6000,
  nutrition: { calories: 6000, carbohydrates: 600, fat: 120, protein: 120 },
  micro: { fiber: 60, sodium: 600 },
};

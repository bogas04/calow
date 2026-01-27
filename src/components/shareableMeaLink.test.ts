import { describe, it } from "node:test";
import assert from "node:assert";
import { createShareableMealLink, parseMealFromLink, getMealFromQueryParams } from "./shareableMealLink";
import { MealEntry } from "../store/types";

describe("createShareableMealLink", () => {
  const baseLink = "https://example.com/";

  describe("V2 format (short field names)", () => {
    it("uses V2 format for short URLs", () => {
      const result = createShareableMealLink(fullMeal, baseLink);

      // Should use V2 query param
      assert.ok(result.includes("?m="));
      assert.ok(!result.includes("shared_meal"));
      assert.ok(result.length < 2000);
    });

    it("uses shortened field names in V2 format", () => {
      const result = createShareableMealLink(simpleMeal, baseLink);

      const urlParams = new URLSearchParams(result.split("?")[1]);
      const encodedMeal = urlParams.get("m");
      assert.ok(encodedMeal);

      const decodedJson = decodeURIComponent(encodedMeal);

      // Check for short field names
      assert.ok(decodedJson.includes('"nm"')); // name
      assert.ok(decodedJson.includes('"n"')); // nutrition
      assert.ok(decodedJson.includes('"j"')); // calories (joules)
      assert.ok(decodedJson.includes('"c"')); // carbohydrates
      assert.ok(decodedJson.includes('"i"')); // items

      // Should not contain long field names
      assert.ok(!decodedJson.includes('"name"'));
      assert.ok(!decodedJson.includes('"nutrition"'));
      assert.ok(!decodedJson.includes('"calories"'));
    });

    it("handles micro keys with trailing spaces (e.g., 'sodium ')", () => {
      const mealWithBadKeys: MealEntry = {
        name: "Test",
        timestamp: 123,
        items: [
          {
            name: "Item",
            weight: 100,
            nutrition: { calories: 100, carbohydrates: 10, fat: 5, protein: 5 },
            micro: { "sodium ": 100 } as any,
          },
        ],
        totalWeight: 100,
        portionWeight: 100,
        nutrition: { calories: 100, carbohydrates: 10, fat: 5, protein: 5 },
      };

      const result = createShareableMealLink(mealWithBadKeys, baseLink);
      const encoded = new URLSearchParams(result.split("?")[1]).get("m")!;
      const decoded = JSON.parse(decodeURIComponent(encoded));

      // Items -> first item -> micro -> "na" (short for "sodium")
      assert.ok(decoded.i[0].m.na, "Should map 'sodium ' to 'na'");
    });

    it("can parse V2 format URLs correctly", () => {
      const result = createShareableMealLink(fullMeal, baseLink);
      const parsed = parseMealFromLink(result);

      assert.strictEqual(parsed.name, fullMeal.name);
      assert.deepStrictEqual(parsed.nutrition, fullMeal.nutrition);
      assert.deepStrictEqual(parsed.micro, fullMeal.micro);
    });

    it("ignores specified micro fields in V2", () => {
      const mealWithIgnoredFields: MealEntry = {
        name: "Test Meal",
        timestamp: 1769514522903,
        items: [
          {
            name: "Item",
            weight: 100,
            nutrition: {
              calories: 100,
              carbohydrates: 10,
              fat: 5,
              protein: 5,
            },
            micro: {
              fiber: 5,
              "calorie delta": 10 as any,
              "delta > 20": null as any,
            },
          },
        ],
        totalWeight: 100,
        portionWeight: 100,
        nutrition: {
          calories: 100,
          carbohydrates: 10,
          fat: 5,
          protein: 5,
        },
        micro: {
          fiber: 5,
          "calorie delta": 10 as any,
          "delta > 20": null as any,
        },
      };

      const result = createShareableMealLink(mealWithIgnoredFields, baseLink);
      const urlParams = new URLSearchParams(result.split("?")[1]);
      const encodedMeal = urlParams.get("m")!;
      const decodedJson = decodeURIComponent(encodedMeal);

      // Should not contain ignored fields
      assert.ok(!decodedJson.includes("calorie delta"));
      assert.ok(!decodedJson.includes("delta > 20"));

      // Should contain fiber
      assert.ok(decodedJson.includes("fb")); // fiber in short form
    });
  });

  describe("short meals (< 2000 chars)", () => {
    it("creates a valid URL with full meal data including micro nutrition", () => {
      const result = createShareableMealLink(fullMeal, baseLink);

      assert.ok(result.startsWith(`${baseLink}meal-entry?`));
      assert.ok(result.length < 2000);

      const parsed = parseMealFromLink(result);

      assert.strictEqual(parsed.name, fullMeal.name);
      assert.strictEqual(parsed.items.length, 1);
      assert.deepStrictEqual(parsed.nutrition, fullMeal.nutrition);
      assert.deepStrictEqual(parsed.micro, fullMeal.micro);
    });

    it("creates a valid URL without micro nutrition", () => {
      const result = createShareableMealLink(simpleMeal, baseLink);

      assert.ok(result.startsWith(`${baseLink}meal-entry?`));
      assert.ok(result.length < 2000);

      const parsed = parseMealFromLink(result);

      assert.strictEqual(parsed.name, simpleMeal.name);
      assert.strictEqual(parsed.items.length, 1);
      assert.deepStrictEqual(parsed.nutrition, simpleMeal.nutrition);
      assert.strictEqual(parsed.micro, undefined);
    });

    it("creates a valid URL with multiple items", () => {
      const result = createShareableMealLink(dinnerMeal, baseLink);

      assert.ok(result.startsWith(`${baseLink}meal-entry?`));
      assert.ok(result.length < 2000);

      const parsed = parseMealFromLink(result);

      assert.strictEqual(parsed.items.length, 2);
      assert.deepStrictEqual(parsed.nutrition, dinnerMeal.nutrition);
    });

    it("creates a valid URL with mixed items (some with micro, some without)", () => {
      const result = createShareableMealLink(mixedMeal, baseLink);

      const parsed = parseMealFromLink(result);

      assert.strictEqual(parsed.items.length, 2);
      assert.strictEqual(parsed.items[0].micro, undefined);
      assert.ok(parsed.items[1].micro);
    });
  });

  describe("long meals (>= 2000 chars) - compression", () => {
    it("compresses meal into single item when URL exceeds 2000 chars", () => {
      const result = createShareableMealLink(compressedMeal, baseLink);

      // Should use V2 parser now, but let's just parse it using our tool
      const decodedMeal = parseMealFromLink(result);

      // Compressed meal should have only 1 item
      assert.strictEqual(decodedMeal.items.length, 1);
      assert.strictEqual(decodedMeal.items[0].name, compressedMeal.name);
      assert.strictEqual(decodedMeal.items[0].weight, compressedMeal.portionWeight);
      assert.strictEqual(decodedMeal.totalWeight, compressedMeal.portionWeight);

      // Nutrition should be preserved
      assert.deepStrictEqual(decodedMeal.nutrition, compressedMeal.nutrition);

      // Micro should be converted to per-100g values
      const microMultiplier = 100 / compressedMeal.portionWeight;
      assert.strictEqual(decodedMeal.items[0].micro?.fiber, (compressedMeal.micro?.fiber || 0) * microMultiplier);
      assert.strictEqual(decodedMeal.items[0].micro?.sodium, (compressedMeal.micro?.sodium || 0) * microMultiplier);
    });

    it("compresses meal without micro nutrition correctly", () => {
      const result = createShareableMealLink(noMicro, baseLink);

      const decodedMeal = parseMealFromLink(result);

      assert.strictEqual(decodedMeal.items.length, 1);
      assert.deepStrictEqual(decodedMeal.nutrition, noMicro.nutrition);
      // Empty object for micro per-100g when no micro exists
      assert.deepStrictEqual(decodedMeal.items[0].micro || {}, {});
    });

    it("correctly scales micro nutrition to per-100g in compressed meal", () => {
      const result = createShareableMealLink(scaleMicro, baseLink);

      const decodedMeal = parseMealFromLink(result);

      assert.strictEqual(decodedMeal.items.length, 1);
      assert.deepStrictEqual(decodedMeal.nutrition, scaleMicro.nutrition);

      // Calculate expected per-100g values
      const microMultiplier = 100 / scaleMicro.portionWeight; // 100 / 5000 = 0.02
      const expectedFiberPer100g = 150 * 0.02; // 3
      const expectedSodiumPer100g = 20000 * 0.02; // 400

      assert.strictEqual(decodedMeal.items[0].micro?.fiber, expectedFiberPer100g);
      assert.strictEqual(decodedMeal.items[0].micro?.sodium, expectedSodiumPer100g);
    });
  });

  describe("edge cases", () => {
    it("handles meal with empty items array", () => {
      const result = createShareableMealLink(emptyMeal, baseLink);

      assert.ok(result.startsWith(`${baseLink}meal-entry?`));

      const parsed = parseMealFromLink(result);
      assert.strictEqual(parsed.items.length, 0);
    });

    it("handles special characters in meal and item names", () => {
      const result = createShareableMealLink(specialCharactersMeal, baseLink);

      const parsed = parseMealFromLink(result);

      assert.strictEqual(parsed.name, specialCharactersMeal.name);
      assert.strictEqual(parsed.items[0].name, specialCharactersMeal.items[0].name);
    });

    it("handles meal with different portionWeight and totalWeight", () => {
      const result = createShareableMealLink(portionMeal, baseLink);

      const parsed = parseMealFromLink(result);

      assert.strictEqual(parsed.portionWeight, 200);
      assert.strictEqual(parsed.totalWeight, 800);
      assert.deepStrictEqual(parsed.nutrition, portionMeal.nutrition);
    });

    it("does not mutate the original meal object", () => {
      const originalItemCount = nonMutableMeal.items.length;
      const originalMicro = { ...nonMutableMeal.micro };

      createShareableMealLink(nonMutableMeal, baseLink);

      // Verify original meal is unchanged
      assert.strictEqual(nonMutableMeal.items.length, originalItemCount);
      assert.deepStrictEqual(nonMutableMeal.micro, originalMicro);
    });
  });

  describe("URL formatting", () => {
    it("properly encodes meal data in URL", () => {
      const result = createShareableMealLink(urlEncodedMeal, baseLink);

      // Should be properly encoded
      assert.ok(!result.includes("{"));
      assert.ok(!result.includes("}"));
      assert.ok(result.includes("%"));
    });

    it("respects the baseLink parameter", () => {
      const customBase = "https://custom-domain.com/app/";
      const result = createShareableMealLink(baseLinkMeal, customBase);

      assert.ok(result.startsWith(`${customBase}meal-entry?`));
    });

    it("removes null and undefined fields from meal data", () => {
      const result = createShareableMealLink(mealWithNullableFields, baseLink);

      const parsed = parseMealFromLink(result);

      // Verify null fields are removed from items micro
      assert.ok(parsed.items[0].micro);
      assert.ok(!("calcium" in parsed.items[0].micro!));
      assert.ok(!("delta > 20" in parsed.items[0].micro!));
      assert.ok(parsed.items[1].micro);
      assert.ok(!("calcium" in parsed.items[1].micro!));
      assert.ok(!("delta > 20" in parsed.items[1].micro!));

      // Verify null fields are removed from meal micro
      assert.ok(parsed.micro);
      assert.ok(!("calcium" in parsed.micro!));
      assert.ok(!("delta > 20" in parsed.micro!));

      // Verify undefined water is removed
      assert.ok(!("water" in parsed));

      // Verify non-null fields are preserved
      assert.strictEqual(parsed.items[0].micro!.fiber, 25);
      assert.strictEqual(parsed.items[0].micro!["saturated fats"], 0.1);
      // V2 format normalizes "sodium " to "sodium"
      assert.strictEqual(parsed.items[0].micro!["sodium"], 24);

      // Verify the URL doesn't contain null
      assert.ok(!result.includes("null"));

      // Verify required fields are still present
      assert.strictEqual(parsed.name, "Meal with Nullable Fields");
      assert.strictEqual(parsed.items.length, 2);
    });
  });

  describe("parseMealFromLink", () => {
    it("parses a valid encoded meal string correctly", () => {
      const meal: MealEntry = {
        name: "Test Meal",
        timestamp: 1769514522903,
        items: [
          {
            name: "Apple",
            icon: "🍎",
            weight: 100,
            nutrition: {
              calories: 95,
              carbohydrates: 25,
              fat: 0.3,
              protein: 0.5,
            },
          },
        ],
        totalWeight: 100,
        portionWeight: 100,
        nutrition: {
          calories: 95,
          carbohydrates: 25,
          fat: 0.3,
          protein: 0.5,
        },
      };

      const encoded = "?shared_meal=" + encodeURIComponent(JSON.stringify(meal));
      const parsed = parseMealFromLink(encoded);

      assert.deepStrictEqual(parsed, meal);
    });

    it("parses a full URL correctly", () => {
      const meal: MealEntry = {
        name: "URL Test Meal",
        timestamp: 1769514522903,
        items: [
          {
            name: "Banana",
            weight: 120,
            nutrition: {
              calories: 105,
              carbohydrates: 27,
              fat: 0.4,
              protein: 1.3,
            },
          },
        ],
        totalWeight: 120,
        portionWeight: 120,
        nutrition: {
          calories: 105,
          carbohydrates: 27,
          fat: 0.4,
          protein: 1.3,
        },
      };

      const url = createShareableMealLink(meal, "https://example.com/");
      const parsed = parseMealFromLink(url);

      assert.strictEqual(parsed.name, meal.name);
      assert.strictEqual(parsed.items.length, 1);
      assert.deepStrictEqual(parsed.nutrition, meal.nutrition);
    });

    it("throws error for URL without meal query param", () => {
      assert.throws(() => parseMealFromLink("https://example.com/meal-entry"));
    });

    it("throws error for invalid meal data - empty object", () => {
      const encoded = encodeURIComponent(JSON.stringify({}));

      assert.throws(() => parseMealFromLink(encoded));
    });

    it("throws error for invalid meal data - missing items array", () => {
      const invalidMeal = {
        name: "Bad Meal",
        totalWeight: 100,
      };
      const encoded = encodeURIComponent(JSON.stringify(invalidMeal));

      assert.throws(() => parseMealFromLink(encoded));
    });

    it("throws error for invalid meal data - missing totalWeight", () => {
      const invalidMeal = {
        name: "Bad Meal",
        items: [],
      };
      const encoded = encodeURIComponent(JSON.stringify(invalidMeal));

      assert.throws(() => parseMealFromLink(encoded));
    });

    it("can parse URLs created by createShareableMealLink", () => {
      const meal: MealEntry = {
        name: "Round-trip Test",
        timestamp: 1769514522903,
        items: [
          {
            name: "Banana",
            weight: 120,
            nutrition: {
              calories: 105,
              carbohydrates: 27,
              fat: 0.4,
              protein: 1.3,
            },
          },
        ],
        totalWeight: 120,
        portionWeight: 120,
        nutrition: {
          calories: 105,
          carbohydrates: 27,
          fat: 0.4,
          protein: 1.3,
        },
      };

      const url = createShareableMealLink(meal, "https://example.com/");
      const parsed = parseMealFromLink(url);

      assert.strictEqual(parsed.name, meal.name);
      assert.strictEqual(parsed.items.length, meal.items.length);
      assert.deepStrictEqual(parsed.nutrition, meal.nutrition);
    });
  });

  describe("getMealFromQueryParams", () => {
    it("returns meal when shared_meal query param exists", () => {
      const meal: MealEntry = {
        name: "Query Param Test",
        timestamp: 1769514522903,
        items: [
          {
            name: "Apple",
            weight: 100,
            nutrition: {
              calories: 95,
              carbohydrates: 25,
              fat: 0.3,
              protein: 0.5,
            },
          },
        ],
        totalWeight: 100,
        portionWeight: 100,
        nutrition: {
          calories: 95,
          carbohydrates: 25,
          fat: 0.3,
          protein: 0.5,
        },
      };

      const encoded = encodeURIComponent(JSON.stringify(meal));
      const queryParams = { shared_meal: encoded };

      const result = getMealFromQueryParams(queryParams);

      assert.ok(result);
      assert.strictEqual(result.name, meal.name);
      assert.deepStrictEqual(result.nutrition, meal.nutrition);
    });

    it("returns null when no shared meal query param exists", () => {
      const queryParams = { someOtherParam: "value" };

      const result = getMealFromQueryParams(queryParams);

      assert.strictEqual(result, null);
    });

    it("returns null when query params are empty", () => {
      const queryParams = {};

      const result = getMealFromQueryParams(queryParams);

      assert.strictEqual(result, null);
    });

    it("handles Next.js router query format with string values", () => {
      const meal: MealEntry = {
        name: "Router Test",
        timestamp: 1769514522903,
        items: [],
        totalWeight: 0,
        portionWeight: 0,
        nutrition: {
          calories: 0,
          carbohydrates: 0,
          fat: 0,
          protein: 0,
        },
      };

      const url = createShareableMealLink(meal, "https://example.com/");
      const urlParams = new URLSearchParams(url.split("?")[1]);

      // Simulate Next.js router.query format
      const queryParams: Record<string, string> = {};
      urlParams.forEach((value, key) => {
        queryParams[key] = value;
      });

      const result = getMealFromQueryParams(queryParams);

      assert.ok(result);
      assert.strictEqual(result.name, meal.name);
    });

    it("throws error when shared_meal has invalid data", () => {
      const queryParams = { shared_meal: "invalid-json" };

      assert.throws(() => getMealFromQueryParams(queryParams));
    });
  });
});

const fullMeal: MealEntry = {
  name: "🍛 Vegan Indian Dinner",
  timestamp: 1769514522903,
  items: [
    {
      name: "Tandoori Roti",
      icon: "🫓",
      weight: 75,
      nutrition: {
        calories: 205,
        carbohydrates: 35,
        fat: 3,
        protein: 6,
      },
      micro: {
        fiber: 4,
        "saturated fats": 0.5,
        sodium: 220,
      },
    },
  ],
  totalWeight: 75,
  portionWeight: 75,
  nutrition: {
    calories: 205,
    carbohydrates: 35,
    fat: 3,
    protein: 6,
  },
  micro: {
    fiber: 4,
    "saturated fats": 0.5,
    sodium: 220,
  },
};

const simpleMeal: MealEntry = {
  name: "Simple Meal",
  timestamp: 1769514522903,
  items: [
    {
      name: "Banana",
      icon: "🍌",
      weight: 100,
      nutrition: {
        calories: 89,
        carbohydrates: 23,
        fat: 0.3,
        protein: 1.1,
      },
    },
  ],
  totalWeight: 100,
  portionWeight: 100,
  nutrition: {
    calories: 89,
    carbohydrates: 23,
    fat: 0.3,
    protein: 1.1,
  },
};

const dinnerMeal: MealEntry = {
  name: "🍛 Vegan Indian Dinner",
  timestamp: 1769514522903,
  items: [
    {
      name: "Tandoori Roti",
      icon: "🫓",
      weight: 75,
      nutrition: {
        calories: 205,
        carbohydrates: 35,
        fat: 3,
        protein: 6,
      },
      micro: {
        fiber: 4,
        "saturated fats": 0.5,
        sodium: 220,
      },
    },
    {
      name: "Mushroom Masala",
      icon: "🍄",
      weight: 150,
      nutrition: {
        calories: 135,
        carbohydrates: 11,
        fat: 8,
        protein: 4,
      },
      micro: {
        fiber: 2.5,
        "saturated fats": 1.2,
        sodium: 450,
      },
    },
  ],
  totalWeight: 225,
  portionWeight: 225,
  nutrition: {
    calories: 340,
    carbohydrates: 46,
    fat: 11,
    protein: 10,
  },
  micro: {
    fiber: 6.5,
    "saturated fats": 1.7,
    sodium: 670,
  },
};

const mixedMeal: MealEntry = {
  name: "Mixed Meal",
  timestamp: 1769514522903,
  items: [
    {
      name: "Banana",
      weight: 100,
      nutrition: {
        calories: 89,
        carbohydrates: 23,
        fat: 0.3,
        protein: 1.1,
      },
    },
    {
      name: "Almonds",
      weight: 30,
      nutrition: {
        calories: 172,
        carbohydrates: 6,
        fat: 15,
        protein: 6,
      },
      micro: {
        fiber: 3.5,
        vitamin_e: 7.3,
      },
    },
  ],
  totalWeight: 130,
  portionWeight: 130,
  nutrition: {
    calories: 261,
    carbohydrates: 29,
    fat: 15.3,
    protein: 7.1,
  },
  micro: {
    fiber: 3.5,
    vitamin_e: 7.3,
  },
};

// Create a meal with many items to exceed URL length
const items = Array.from({ length: 50 }, (_, i) => ({
  name: `Very Long Item Name That Takes Up Space ${i}`,
  icon: "🍕",
  weight: 100,
  nutrition: {
    calories: 250,
    carbohydrates: 30,
    fat: 10,
    protein: 12,
  },
  micro: {
    fiber: 2,
    sodium: 500,
    "saturated fats": 3,
    calcium: 100,
    iron: 2,
  },
}));

const compressedMeal: MealEntry = {
  name: "Very Large Meal With Many Items",
  timestamp: 1769514522903,
  items,
  totalWeight: 5000,
  portionWeight: 5000,
  nutrition: {
    calories: 12500,
    carbohydrates: 1500,
    fat: 500,
    protein: 600,
  },
  micro: {
    fiber: 100,
    sodium: 25000,
    "saturated fats": 150,
    calcium: 5000,
    iron: 100,
  },
};

const noMicro: MealEntry = {
  name: "Large Meal Without Micro",
  timestamp: 1769514522903,
  items,
  totalWeight: 5000,
  portionWeight: 5000,
  nutrition: {
    calories: 12500,
    carbohydrates: 1500,
    fat: 500,
    protein: 600,
  },
};

const scaleMicroItems = Array.from({ length: 50 }, (_, i) => ({
  name: `Item ${i} With Long Name`,
  weight: 100,
  nutrition: { calories: 200, carbohydrates: 25, fat: 8, protein: 10 },
  micro: { fiber: 3, sodium: 400 },
}));

const scaleMicro: MealEntry = {
  name: "Meal for Micro Scaling Test",
  timestamp: 1769514522903,
  items: scaleMicroItems,
  totalWeight: 5000,
  portionWeight: 5000,
  nutrition: {
    calories: 10000,
    carbohydrates: 1250,
    fat: 400,
    protein: 500,
  },
  micro: {
    fiber: 150,
    sodium: 20000,
  },
};

const emptyMeal: MealEntry = {
  name: "Empty Meal",
  timestamp: 1769514522903,
  items: [],
  totalWeight: 0,
  portionWeight: 0,
  nutrition: {
    calories: 0,
    carbohydrates: 0,
    fat: 0,
    protein: 0,
  },
};

const specialCharactersMeal: MealEntry = {
  name: "Meal with & special <characters> 'quotes' \"double\"",
  timestamp: 1769514522903,
  items: [
    {
      name: "Item & < > ' \" special",
      weight: 100,
      nutrition: {
        calories: 100,
        carbohydrates: 10,
        fat: 5,
        protein: 5,
      },
    },
  ],
  totalWeight: 100,
  portionWeight: 100,
  nutrition: {
    calories: 100,
    carbohydrates: 10,
    fat: 5,
    protein: 5,
  },
};

const portionMeal: MealEntry = {
  name: "Partial Portion Meal",
  timestamp: 1769514522903,
  items: [
    {
      name: "Large Pizza",
      weight: 800,
      nutrition: {
        calories: 2000,
        carbohydrates: 250,
        fat: 80,
        protein: 80,
      },
      micro: {
        fiber: 10,
        sodium: 3000,
      },
    },
  ],
  totalWeight: 800,
  portionWeight: 200, // Eating only 1/4 of the pizza
  nutrition: {
    calories: 500,
    carbohydrates: 62.5,
    fat: 20,
    protein: 20,
  },
  micro: {
    fiber: 2.5,
    sodium: 750,
  },
};

const nonMutableMeal: MealEntry = {
  name: "Original Meal",
  timestamp: 1769514522903,
  items: [
    {
      name: "Item 1",
      weight: 100,
      nutrition: { calories: 100, carbohydrates: 10, fat: 5, protein: 5 },
    },
    {
      name: "Item 2",
      weight: 100,
      nutrition: { calories: 100, carbohydrates: 10, fat: 5, protein: 5 },
    },
  ],
  totalWeight: 200,
  portionWeight: 200,
  nutrition: { calories: 200, carbohydrates: 20, fat: 10, protein: 10 },
  micro: { fiber: 5 },
};

const urlEncodedMeal: MealEntry = {
  name: "Test Meal",
  timestamp: 1769514522903,
  items: [],
  totalWeight: 0,
  portionWeight: 0,
  nutrition: { calories: 0, carbohydrates: 0, fat: 0, protein: 0 },
};

const baseLinkMeal: MealEntry = {
  name: "Test",
  timestamp: 1769514522903,
  items: [],
  totalWeight: 0,
  portionWeight: 0,
  nutrition: { calories: 0, carbohydrates: 0, fat: 0, protein: 0 },
};

const mealWithNullableFields: MealEntry = {
  name: "Meal with Nullable Fields",
  timestamp: 1769514522903,
  items: [
    {
      name: "Rajma Dal",
      icon: "🌾",
      weight: 50,
      nutrition: {
        calories: 166.5,
        carbohydrates: 30,
        fat: 0.4,
        protein: 12,
      },
      micro: {
        fiber: 25,
        calcium: null as any,
        "saturated fats": 0.1,
        "sodium ": 24,
        "calorie delta": 10.2,
        "delta > 20": null as any,
      },
    },
    {
      name: "White Rice",
      icon: "🌾",
      weight: 50,
      nutrition: {
        calories: 182.5,
        carbohydrates: 40,
        fat: 0.35,
        protein: 3.5,
      },
      micro: {
        fiber: 1.3,
        calcium: null as any,
        "saturated fats": 0.2,
        "sodium ": 0,
        "calorie delta": 10.7,
        "delta > 20": null as any,
      },
    },
  ],
  totalWeight: 200,
  portionWeight: 100,
  nutrition: {
    calories: 174.5,
    carbohydrates: 35,
    fat: 0.375,
    protein: 7.75,
  },
  micro: {
    fiber: 6.575,
    calcium: null as any,
    "saturated fats": 0.075,
    "sodium ": 6,
    "calorie delta": 5.225,
    "delta > 20": null as any,
  },
  water: undefined,
};

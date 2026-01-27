import { describe, it } from "node:test";
import assert from "node:assert";
import { createShareableMealLink } from "./createShareableMealLink";
import { MealEntry } from "../store/types";

describe("createShareableMealLink", () => {
  const baseLink = "https://example.com/";

  describe("short meals (< 2000 chars)", () => {
    it("creates a valid URL with full meal data including micro nutrition", () => {
      const result = createShareableMealLink(fullMeal, baseLink);

      assert.ok(result.startsWith(`${baseLink}meal-entry?shared_meal=`));
      assert.ok(result.length < 2000);

      const urlParams = new URLSearchParams(result.split("?")[1]);
      const decodedMeal = JSON.parse(urlParams.get("shared_meal")!);

      assert.strictEqual(decodedMeal.name, fullMeal.name);
      assert.strictEqual(decodedMeal.items.length, 1);
      assert.deepStrictEqual(decodedMeal.nutrition, fullMeal.nutrition);
      assert.deepStrictEqual(decodedMeal.micro, fullMeal.micro);
    });

    it("creates a valid URL without micro nutrition", () => {
      const result = createShareableMealLink(simpleMeal, baseLink);

      assert.ok(result.startsWith(`${baseLink}meal-entry?shared_meal=`));
      assert.ok(result.length < 2000);

      const urlParams = new URLSearchParams(result.split("?")[1]);
      const decodedMeal = JSON.parse(urlParams.get("shared_meal")!);

      assert.strictEqual(decodedMeal.name, simpleMeal.name);
      assert.strictEqual(decodedMeal.items.length, 1);
      assert.deepStrictEqual(decodedMeal.nutrition, simpleMeal.nutrition);
      assert.strictEqual(decodedMeal.micro, undefined);
    });

    it("creates a valid URL with multiple items", () => {
      const result = createShareableMealLink(dinnerMeal, baseLink);

      assert.ok(result.startsWith(`${baseLink}meal-entry?shared_meal=`));
      assert.ok(result.length < 2000);

      const urlParams = new URLSearchParams(result.split("?")[1]);
      const decodedMeal = JSON.parse(urlParams.get("shared_meal")!);

      assert.strictEqual(decodedMeal.items.length, 2);
      assert.deepStrictEqual(decodedMeal.nutrition, dinnerMeal.nutrition);
    });

    it("creates a valid URL with mixed items (some with micro, some without)", () => {
      const result = createShareableMealLink(mixedMeal, baseLink);

      const urlParams = new URLSearchParams(result.split("?")[1]);
      const decodedMeal = JSON.parse(urlParams.get("shared_meal")!);

      assert.strictEqual(decodedMeal.items.length, 2);
      assert.strictEqual(decodedMeal.items[0].micro, undefined);
      assert.ok(decodedMeal.items[1].micro);
    });
  });

  describe("long meals (>= 2000 chars) - compression", () => {
    it("compresses meal into single item when URL exceeds 2000 chars", () => {
      const result = createShareableMealLink(compressedMeal, baseLink);

      const urlParams = new URLSearchParams(result.split("?")[1]);
      const decodedMeal = JSON.parse(urlParams.get("shared_meal")!);

      // Compressed meal should have only 1 item
      assert.strictEqual(decodedMeal.items.length, 1);
      assert.strictEqual(decodedMeal.items[0].name, compressedMeal.name);
      assert.strictEqual(decodedMeal.items[0].weight, compressedMeal.portionWeight);
      assert.strictEqual(decodedMeal.totalWeight, compressedMeal.portionWeight);

      // Nutrition should be preserved
      assert.deepStrictEqual(decodedMeal.nutrition, compressedMeal.nutrition);

      // Micro should be converted to per-100g values
      const microMultiplier = 100 / compressedMeal.portionWeight;
      assert.strictEqual(decodedMeal.items[0].micro.fiber, (compressedMeal.micro?.fiber || 0) * microMultiplier);
      assert.strictEqual(decodedMeal.items[0].micro.sodium, (compressedMeal.micro?.sodium || 0) * microMultiplier);
    });

    it("compresses meal without micro nutrition correctly", () => {
      const items = Array.from({ length: 50 }, (_, i) => ({
        name: `Item With Very Long Name For Testing Purposes ${i}`,
        weight: 100,
        nutrition: {
          calories: 250,
          carbohydrates: 30,
          fat: 10,
          protein: 12,
        },
      }));

      const result = createShareableMealLink(noMicro, baseLink);

      const urlParams = new URLSearchParams(result.split("?")[1]);
      const decodedMeal = JSON.parse(urlParams.get("shared_meal")!);

      assert.strictEqual(decodedMeal.items.length, 1);
      assert.deepStrictEqual(decodedMeal.nutrition, noMicro.nutrition);
      // Empty object for micro per-100g when no micro exists
      assert.deepStrictEqual(decodedMeal.items[0].micro, {});
    });

    it("correctly scales micro nutrition to per-100g in compressed meal", () => {
      const result = createShareableMealLink(scaleMicro, baseLink);

      const urlParams = new URLSearchParams(result.split("?")[1]);
      const decodedMeal = JSON.parse(urlParams.get("shared_meal")!);

      // Calculate expected per-100g values
      const microMultiplier = 100 / scaleMicro.portionWeight; // 100 / 5000 = 0.02
      const expectedFiberPer100g = 150 * 0.02; // 3
      const expectedSodiumPer100g = 20000 * 0.02; // 400

      assert.strictEqual(decodedMeal.items[0].micro.fiber, expectedFiberPer100g);
      assert.strictEqual(decodedMeal.items[0].micro.sodium, expectedSodiumPer100g);
    });
  });

  describe("edge cases", () => {
    it("handles meal with empty items array", () => {
      const result = createShareableMealLink(emptyMeal, baseLink);

      assert.ok(result.startsWith(`${baseLink}meal-entry?shared_meal=`));

      const urlParams = new URLSearchParams(result.split("?")[1]);
      const decodedMeal = JSON.parse(urlParams.get("shared_meal")!);

      assert.strictEqual(decodedMeal.items.length, 0);
    });

    it("handles special characters in meal and item names", () => {
      const result = createShareableMealLink(specialCharactersMeal, baseLink);

      const urlParams = new URLSearchParams(result.split("?")[1]);
      const decodedMeal = JSON.parse(urlParams.get("shared_meal")!);

      assert.strictEqual(decodedMeal.name, specialCharactersMeal.name);
      assert.strictEqual(decodedMeal.items[0].name, specialCharactersMeal.items[0].name);
    });

    it("handles meal with different portionWeight and totalWeight", () => {
      const result = createShareableMealLink(portionMeal, baseLink);

      const urlParams = new URLSearchParams(result.split("?")[1]);
      const decodedMeal = JSON.parse(urlParams.get("shared_meal")!);

      assert.strictEqual(decodedMeal.portionWeight, 200);
      assert.strictEqual(decodedMeal.totalWeight, 800);
      assert.deepStrictEqual(decodedMeal.nutrition, portionMeal.nutrition);
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

      assert.ok(result.startsWith(`${customBase}meal-entry?shared_meal=`));
    });

    it("removes null and undefined fields from meal data", () => {
      const result = createShareableMealLink(mealWithNullableFields, baseLink);

      const urlParams = new URLSearchParams(result.split("?")[1]);
      const decodedMeal = JSON.parse(urlParams.get("shared_meal")!);

      // Verify null fields are removed from items micro
      assert.ok(!("calcium" in decodedMeal.items[0].micro));
      assert.ok(!("delta > 20" in decodedMeal.items[0].micro));
      assert.ok(!("calcium" in decodedMeal.items[1].micro));
      assert.ok(!("delta > 20" in decodedMeal.items[1].micro));

      // Verify null fields are removed from meal micro
      assert.ok(!("calcium" in decodedMeal.micro));
      assert.ok(!("delta > 20" in decodedMeal.micro));

      // Verify undefined water is removed
      assert.ok(!("water" in decodedMeal));

      // Verify non-null fields are preserved
      assert.strictEqual(decodedMeal.items[0].micro.fiber, 25);
      assert.strictEqual(decodedMeal.items[0].micro["saturated fats"], 0.1);
      assert.strictEqual(decodedMeal.items[0].micro["sodium "], 24);
      
      // Verify the URL doesn't contain null
      assert.ok(!result.includes("null"));

      // Verify required fields are still present
      assert.strictEqual(decodedMeal.name, "Meal with Nullable Fields");
      assert.strictEqual(decodedMeal.items.length, 2);
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

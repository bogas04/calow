import { ItemEntry } from "./types";

export const items: ItemEntry[] = [
  {
    name: "Rice",
    icon: "🍚",
    weight: 100,
    nutrition: {
      calories: 100,
      protein: 8,
      carbohydrates: 5,
      fat: 2,
    },
    timestamp: Date.now() - 1000,
  },
  {
    name: "Egg",
    icon: "🥚",
    weight: 100,
    nutrition: {
      calories: 50,
      protein: 9,
      carbohydrates: 5,
      fat: 2,
    },
    timestamp: Date.now() - 1000 * 60 * 20,
  },
  {
    name: "Whole Wheat",
    icon: "🌾",
    weight: 100,
    nutrition: {
      calories: 120,
      protein: 9,
      carbohydrates: 10,
      fat: 2,
    },
    timestamp: Date.now() - 1000 * 60 * 60,
  },
  {
    name: "Sugar",
    icon: "🍭",
    weight: 100,
    nutrition: {
      calories: 400,
      protein: 2,
      carbohydrates: 13,
      fat: 5,
    },
    timestamp: Date.now() - 1000 * 60 * 60 * 2,
  },
  {
    name: "Milk",
    icon: "🥛",
    weight: 100,
    nutrition: {
      calories: 20,
      protein: 8,
      carbohydrates: 1,
      fat: 5,
    },
    timestamp: Date.now() - 1000 * 60 * 60 * 4.5,
  },
  {
    name: "Chickpea",
    weight: 100,
    nutrition: {
      calories: 25,
      protein: 8,
      carbohydrates: 5,
      fat: 2,
    },
    timestamp: Date.now() - 1000 * 60 * 60 * 7,
  },
  {
    name: "Tomato",
    icon: "🍅",
    weight: 100,
    nutrition: {
      calories: 25,
      protein: 8,
      carbohydrates: 5,
      fat: 2,
    },
    timestamp: Date.now() - 1000 * 60 * 60 * 12,
  },
];

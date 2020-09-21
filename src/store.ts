import { createContext, Reducer, useContext, useReducer } from "react";
import theme from "./theme";
import { addNutrition, mapNutrition } from "./util/nutrition";

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

const defaultState = {
  /** goal */
  goal: {
    fat: 100,
    calories: 1600,
    carbohydrates: 400,
    protein: 80,
  } as Nutrition,
  /** logs of all days */
  logs: {} as { [dateKey: string]: MealEntry[] },
};

export enum ACTIONS {
  ADD_MEAL_ENTRY,
  SET_GOAL,
}

export type Action =
  | {
      type: ACTIONS.SET_GOAL;
      payload: Partial<Nutrition>;
    }
  | {
      type: ACTIONS.ADD_MEAL_ENTRY;
      payload: {
        entry: MealEntry;
      };
    };
const getDateKey = (time: number) => {
  const d = new Date(time);
  return `${String(d.getDate()).padStart(2, "0")}/${String(
    d.getMonth() + 1
  ).padStart(2, "0")}/${d.getFullYear()}`;
};

const reducer: Reducer<typeof defaultState, Action> = (
  state,
  action
): typeof defaultState => {
  switch (action.type) {
    case ACTIONS.SET_GOAL: {
      return { ...state, goal: { ...state.goal, ...action.payload } };
    }
    case ACTIONS.ADD_MEAL_ENTRY: {
      const time = action.payload.entry.timestamp || Date.now();

      const dateKey = getDateKey(time);
      const logs = state.logs[dateKey] || [];

      return {
        ...state,
        logs: {
          ...state.logs,
          [dateKey]: logs.concat(action.payload.entry),
        },
      };
    }
    default:
      return state;
  }
};

export function useStoreReducer() {
  const [store, dispatch] = useReducer(reducer, defaultState);
  return {
    ...store,
    dispatch,
  };
}

export const nutritionKeys = ([
  "calories",
  "protein",
  "carbohydrates",
  "fat",
] as unknown) as [keyof Nutrition];

export const StoreContext = createContext({
  ...defaultState,
  dispatch: (action: Action) => {},
});

export function useStore(time?: number) {
  const store = useContext(StoreContext);

  const log = store.logs[getDateKey(time || Date.now())] || [];

  return {
    ...store,
    nutrition: log.reduce((totalNutrition, meal) => {
      const totalMealNutrition = meal.items.reduce(
        (mealNutrition, item) => addNutrition(mealNutrition, item.nutrition),
        inititalNutrition
      );

      const portionNutrition = mapNutrition(
        totalMealNutrition,
        (key) =>
          (totalMealNutrition[key] * meal.portionWeight) / meal.totalWeight
      );

      return addNutrition(portionNutrition, totalNutrition);
    }, inititalNutrition),
    items,
    log: store.logs[getDateKey(time || Date.now())] || [],
  };
}
export const nutritionColors = {
  carbohydrates: theme.colors.purple["400"],
  calories: theme.colors.green["400"],
  protein: theme.colors.red["400"],
  fat: theme.colors.blue["400"],
};

export const nutritionShortNames = {
  fat: "fat",
  carbohydrates: "carbs",
  protein: "protein",
  calories: "kCal",
};

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

export const inititalNutrition = {
  calories: 0,
  carbohydrates: 0,
  fat: 0,
  protein: 0,
} as Nutrition;

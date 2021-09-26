import { Reducer } from "react";
import { computeMacroFromCalories, macroCombination } from "../util/nutrition";
import { getDateKey } from "../util/time";
import { BodyMetrics, ItemEntry, MealEntry, Nutrition } from "./types";

export const defaultState = {
  /** body */
  body: {
    height: 0,
    weight: 0,
    age: 0,
    activity: 0,
    gender: "female",
  } as BodyMetrics,
  /** goal */
  goal: {
    nutrition: computeMacroFromCalories(0),
    diet: "neutral" as keyof typeof macroCombination,
    water: 0,
  },
  /** logs of all days */
  logs: {} as { [dateKey: string]: MealEntry[] },
  /** meal entry page data. We store it here for edit and repeat features. */
  mealEntry: {
    addedItems: [] as ItemEntry[],
    name: "",
    totalWeight: 0,
    portionWeight: 0,
  },
  /** saved meal items */
  bookmarks: [] as { date: string; index: number }[],
};

export interface Store extends Required<typeof defaultState> {}

export enum ACTIONS {
  /** Save meal entry to logs */
  ADD_MEAL_ENTRY,
  /** Update a particular meal entry to logs */
  UPDATE_MEAL_ENTRY,
  /** Delete meal entry from logs */
  DELETE_MEAL_ENTRY,
  /** Reset entire state */
  RESET,
  /** Set entire state */
  SET,
  /** Set goal */
  SET_GOAL,
  /** Set body metrics */
  SET_BODY,
  /** Add new item to meal entry's state */
  ADD_MEAL_ENTRY_ITEM,
  /** Set meal entry data to meal entry's state */
  SET_MEAL_ENTRY_ITEMS,
  /** Delete item from meal entry's state */
  DELETE_MEAL_ENTRY_ITEM,
  /** Update item in meal entry's state */
  UPDATE_MEAL_ENTRY_ITEM,
  /** Clear added items to meal entry's state */
  RESET_MEAL_ENTRY_ITEMS,
  /** Set meal entry's total weight */
  SET_MEAL_ENTRY_TOTAL_WEIGHT,
  /** Set meal entry's portion weight */
  SET_MEAL_ENTRY_PORTION_WEIGHT,
  /** Add bookmark */
  ADD_BOOKMARK,
  /** Remove bookmark */
  REMOVE_BOOKMARK,
}

export type Action =
  | {
      type: ACTIONS.RESET;
    }
  | {
      type: ACTIONS.SET;
      payload: Omit<Store, "mealEntry">;
    }
  | {
      type: ACTIONS.SET_GOAL;
      payload: Omit<Store["goal"], "water">;
    }
  | {
      type: ACTIONS.DELETE_MEAL_ENTRY;
      payload: {
        timestamp?: number;
        index: number;
      };
    }
  | {
      type: ACTIONS.ADD_MEAL_ENTRY;
      payload: {
        entry: MealEntry;
      };
    }
  | {
      type: ACTIONS.UPDATE_MEAL_ENTRY;
      payload: {
        index: number;
        entry: MealEntry;
      };
    }
  | {
      type: ACTIONS.SET_BODY;
      payload: BodyMetrics;
    }
  | { type: ACTIONS.ADD_MEAL_ENTRY_ITEM; payload: ItemEntry }
  | { type: ACTIONS.SET_MEAL_ENTRY_ITEMS; payload: Store["mealEntry"] }
  | { type: ACTIONS.DELETE_MEAL_ENTRY_ITEM; payload: number }
  | {
      type: ACTIONS.UPDATE_MEAL_ENTRY_ITEM;
      payload: { index: number; item: ItemEntry };
    }
  | { type: ACTIONS.RESET_MEAL_ENTRY_ITEMS }
  | { type: ACTIONS.SET_MEAL_ENTRY_PORTION_WEIGHT; payload: number }
  | { type: ACTIONS.SET_MEAL_ENTRY_TOTAL_WEIGHT; payload: number }
  | { type: ACTIONS.ADD_BOOKMARK; payload: { date: string; index: number } }
  | { type: ACTIONS.REMOVE_BOOKMARK; payload: { date: string; index: number } };

export const reducer: Reducer<Store, Action> = (state, action) => {
  switch (action.type) {
    case ACTIONS.RESET: {
      return defaultState;
    }
    case ACTIONS.SET: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case ACTIONS.SET_BODY: {
      return { ...state, body: { ...state.body, ...action.payload } };
    }
    case ACTIONS.SET_GOAL: {
      const water = state.body.gender === "male" ? 3000 : 2000;
      return {
        ...state,
        goal: {
          ...state.goal,
          ...action.payload,
          water,
        },
      };
    }
    case ACTIONS.DELETE_MEAL_ENTRY: {
      const { timestamp = Date.now(), index } = action.payload;

      const dateKey = getDateKey(timestamp);
      const logs = state.logs[dateKey] || [];
      const newLogs = logs.filter((_, i) => i !== index);

      return {
        ...state,
        logs: {
          ...state.logs,
          [dateKey]: newLogs,
        },
      };
    }
    case ACTIONS.UPDATE_MEAL_ENTRY: {
      const index = action.payload.index;
      const time = action.payload.entry.timestamp || Date.now();

      const dateKey = getDateKey(time);
      const logs = state.logs[dateKey] || [];
      const newLogs = logs.map((x, i) =>
        i === index ? action.payload.entry : x
      );

      return {
        ...state,
        logs: {
          ...state.logs,
          [dateKey]: newLogs,
        },
      };
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
    case ACTIONS.SET_MEAL_ENTRY_ITEMS: {
      return {
        ...state,
        mealEntry: {
          ...state.mealEntry,
          ...action.payload,
        },
      };
    }
    case ACTIONS.ADD_MEAL_ENTRY_ITEM: {
      const newAddedItems = state.mealEntry.addedItems.concat(action.payload);

      const newTotalWeight = newAddedItems.reduce(
        (w, item) => (item.weight || 0) + w,
        0
      );

      return {
        ...state,
        mealEntry: {
          ...state.mealEntry,
          addedItems: newAddedItems,
          totalWeight: newTotalWeight,
          portionWeight: newTotalWeight,
        },
      };
    }
    case ACTIONS.DELETE_MEAL_ENTRY_ITEM: {
      const newAddedItems = state.mealEntry.addedItems.filter((_, i) =>
        i === action.payload ? false : true
      );

      const newTotalWeight = newAddedItems.reduce(
        (w, item) => (item.weight || 0) + w,
        0
      );

      return {
        ...state,
        mealEntry: {
          ...state.mealEntry,
          addedItems: newAddedItems,
          totalWeight: newTotalWeight,
          portionWeight: newTotalWeight,
        },
      };
    }
    case ACTIONS.UPDATE_MEAL_ENTRY_ITEM: {
      const newAddedItems = state.mealEntry.addedItems.map((x, i) =>
        i === action.payload.index ? action.payload.item : x
      );

      const newTotalWeight = newAddedItems.reduce(
        (w, item) => (item.weight || 0) + w,
        0
      );

      return {
        ...state,
        mealEntry: {
          ...state.mealEntry,
          addedItems: newAddedItems,
          totalWeight: newTotalWeight,
          portionWeight: newTotalWeight,
        },
      };
    }
    case ACTIONS.RESET_MEAL_ENTRY_ITEMS: {
      return {
        ...state,
        mealEntry: defaultState.mealEntry,
      };
    }
    case ACTIONS.SET_MEAL_ENTRY_TOTAL_WEIGHT: {
      return {
        ...state,
        mealEntry: { ...state.mealEntry, totalWeight: action.payload },
      };
    }
    case ACTIONS.SET_MEAL_ENTRY_PORTION_WEIGHT: {
      return {
        ...state,
        mealEntry: { ...state.mealEntry, portionWeight: action.payload },
      };
    }
    case ACTIONS.ADD_BOOKMARK: {
      return {
        ...state,
        bookmarks: (state.bookmarks || []).concat(action.payload),
      };
    }
    case ACTIONS.REMOVE_BOOKMARK: {
      const bookmarks = state.bookmarks.filter(
        (x) =>
          !(x.index === action.payload.index && x.date === action.payload.date)
      );

      return {
        ...state,
        bookmarks,
      };
    }
    default:
      return state;
  }
};

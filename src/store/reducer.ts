import { Reducer } from "react";
import { getDateKey } from "../util/time";
import { MealEntry, Nutrition } from "./types";

export const defaultState = {
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

export const reducer: Reducer<typeof defaultState, Action> = (
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

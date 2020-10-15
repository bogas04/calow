import { Reducer } from "react";
import { computeMacroFromCalories } from "../util/nutrition";
import { getDateKey } from "../util/time";
import { BodyMetrics, MealEntry, Nutrition } from "./types";

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
  goal: computeMacroFromCalories(0),
  /** logs of all days */
  logs: {} as { [dateKey: string]: MealEntry[] },
};

export interface Store extends Required<typeof defaultState> {}

export enum ACTIONS {
  ADD_MEAL_ENTRY,
  DELETE_MEAL_ENTRY,
  RESET,
  SET,
  SET_GOAL,
  SET_GOAL_FROM_CALORIES,
  SET_BODY,
}

export type Action =
  | {
      type: ACTIONS.RESET;
    }
  | {
      type: ACTIONS.SET;
      payload: Store;
    }
  | {
      type: ACTIONS.SET_GOAL_FROM_CALORIES;
      payload: number;
    }
  | {
      type: ACTIONS.SET_GOAL;
      payload: Partial<Nutrition>;
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
      type: ACTIONS.SET_BODY;
      payload: BodyMetrics;
    };

export const reducer: Reducer<Store, Action> = (state, action) => {
  switch (action.type) {
    case ACTIONS.RESET: {
      return defaultState;
    }
    case ACTIONS.SET: {
      return action.payload;
    }
    case ACTIONS.SET_BODY: {
      return { ...state, body: { ...state.body, ...action.payload } };
    }
    case ACTIONS.SET_GOAL_FROM_CALORIES: {
      return reducer(state, {
        type: ACTIONS.SET_GOAL,
        payload: computeMacroFromCalories(action.payload),
      });
    }
    case ACTIONS.SET_GOAL: {
      return { ...state, goal: { ...state.goal, ...action.payload } };
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

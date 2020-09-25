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
  goal: computeMacroFromCalories(1800),
  /** logs of all days */
  logs: {} as { [dateKey: string]: MealEntry[] },
};

export enum ACTIONS {
  ADD_MEAL_ENTRY,
  SET_GOAL,
  SET_GOAL_FROM_CALORIES,
  SET_BODY,
}

export type Action =
  | {
      type: ACTIONS.SET_GOAL_FROM_CALORIES;
      payload: number;
    }
  | {
      type: ACTIONS.SET_GOAL;
      payload: Partial<Nutrition>;
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

export const reducer: Reducer<typeof defaultState, Action> = (
  state,
  action
): typeof defaultState => {
  switch (action.type) {
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

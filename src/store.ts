import { createContext, Reducer, useContext, useReducer } from "react";
import theme from "./theme";

export interface LogEntry {
  name: string;
  icon?: string;
  nutrition: Nutrition;
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
  logs: {} as { [dateKey: string]: LogEntry[] },
};

export enum ACTIONS {
  ADD_LOG_ITEM,
  SET_GOAL,
}

export type Action =
  | {
      type: ACTIONS.SET_GOAL;
      payload: Partial<Nutrition>;
    }
  | {
      type: ACTIONS.ADD_LOG_ITEM;
      payload: {
        entry: LogEntry;
        date?: number;
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
    case ACTIONS.ADD_LOG_ITEM: {
      const time = action.payload.date || Date.now();
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
    nutrition: log.reduce<Nutrition>(
      (n, l) => ({
        calories: n.calories + l.nutrition.calories,
        carbohydrates: n.carbohydrates + l.nutrition.carbohydrates,
        fat: n.fat + l.nutrition.fat,
        protein: n.protein + l.nutrition.protein,
      }),
      { calories: 0, carbohydrates: 0, fat: 0, protein: 0 } as Nutrition
    ),
    log: store.logs[getDateKey(time || Date.now())] || [],
  };
}

export const nutritionShortNames = {};
export const nutritionColors = {
  carbohydrates: theme.colors.purple["500"],
  calories: theme.colors.green["500"],
  protein: theme.colors.red["500"],
  fat: theme.colors.blue["500"],
};

export const shortNames = {
  fat: "fat",
  carbohydrates: "carbs",
  protein: "protein",
  calories: "kCals",
};

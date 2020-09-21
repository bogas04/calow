import { createContext, useContext, useReducer } from "react";

import { inititalNutrition } from "./constants";
import { Action, defaultState, reducer } from "./reducer";
import { items } from "./seed";

import { addNutrition, mapNutrition } from "../util/nutrition";
import { getDateKey } from "../util/time";

export function useStoreReducer() {
  const [store, dispatch] = useReducer(reducer, defaultState);
  return {
    ...store,
    dispatch,
  };
}

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

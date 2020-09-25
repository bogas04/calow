import { createContext, useContext, useEffect, useReducer } from "react";

import { inititalNutrition } from "./constants";
import { ACTIONS, Action, defaultState, reducer } from "./reducer";
import { items } from "./seed";

import { addNutrition, mapNutrition } from "../util/nutrition";
import { getDateKey } from "../util/time";

export function useStoreReducer() {
  const [store, dispatch] = useReducer(reducer, defaultState);

  useEffect(() => {
    if (localStorage.getItem("store")) {
      try {
        const payload = JSON.parse(localStorage.getItem("store")!);
        if (Object.keys(payload).every((k) => k in defaultState)) {
          dispatch({ type: ACTIONS.SET, payload });
        }
      } catch (err) {
        alert("Sorry! We couldn't restore data stored in your phone.");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("store", JSON.stringify(store));
  }, [store]);

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

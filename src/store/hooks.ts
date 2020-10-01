import { createContext, useContext, useEffect, useReducer } from "react";
import useSWR from "swr";

import { ACTIONS, Action, defaultState, reducer } from "./reducer";
import { computeNutritionFromLog, createNutrition } from "../util/nutrition";
import { getDateKey } from "../util/time";

import { ItemEntry } from "./types";

export function useStoreReducer() {
  const [store, dispatch] = useReducer(reducer, defaultState);

  useEffect(() => {
    if (localStorage.getItem("store")) {
      try {
        const payload = JSON.parse(localStorage.getItem("store")!);
        if (Object.keys(defaultState).every((k) => k in payload)) {
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
    nutrition: computeNutritionFromLog(log),
    log,
  };
}

const fetcher = (info: RequestInfo, options?: RequestInit) =>
  fetch(info, options).then((res) => res.json());

export function useItems() {
  const key = "AIzaSyAumEHcudhBHlcCASiBmUrjTjBsV75KQDs";
  const sheet = "1n1HOEej_1-jXzm9t7LfyEptFpIBKJbsIQ5EZRd4a_Tg";

  interface SheetsApiResponse {
    range: string;
    majorDimension: string;
    values: string[][];
  }

  const { data, error } = useSWR<SheetsApiResponse>(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheet}/values/Sheet1!A1:G1000?key=${key}`,
    {
      fetcher,
      revalidateOnFocus: false,
    }
  );

  let items: ItemEntry[] = [];
  if (data && data.values) {
    const indices = {
      name: 0,
      icon: 1,
      calories: 2,
      protein: 3,
      fat: 4,
      carbohydrates: 5,
      weight: 6,
    };

    items = data.values.reduce<ItemEntry[]>((acc, value, i) => {
      // ignore the header row
      if (i > 0) {
        acc.push({
          name: value[indices.name],
          icon: value[indices.icon] || undefined,
          weight: Number(value[indices.weight]),
          nutrition: createNutrition((key) => Number(value[indices[key]])),
        });
      }
      return acc;
    }, []);

    items.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  }

  return {
    items,
    isLoading: !error && !data,
    error,
  };
}

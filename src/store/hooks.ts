import { createContext, useContext, useEffect, useReducer } from "react";
import { get, set } from "idb-keyval";
import useSWR from "swr";

import { ACTIONS, Action, defaultState, reducer } from "./reducer";
import { computeNutritionFromLog, createNutrition } from "../util/nutrition";
import { getDateKey } from "../util/time";

import { ItemEntry } from "./types";
import { Store } from ".";

export function useStoreReducer() {
  const [store, dispatch] = useReducer(reducer, defaultState);

  useEffect(() => {
    (async () => {
      try {
        const [body, goal, logs] = await Promise.all([
          get<Store["body"]>("body"),
          get<Store["goal"]>("goal"),
          get<Store["logs"]>("logs"),
        ]);

        if (body && goal && logs) {
          dispatch({ type: ACTIONS.SET, payload: { body, goal, logs } });
        }
      } catch (err) {
        alert("Sorry! We couldn't restore data stored in your phone.");
      }
    })();
  }, []);

  useEffect(() => {
    set("body", store.body);
    set("goal", store.goal);
    set("logs", store.logs);
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
    `https://sheets.googleapis.com/v4/spreadsheets/${sheet}/values/Sheet1?key=${key}`,
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
      categories: 2,
      weight: 3,
      calories: 4,
      protein: 5,
      fat: 6,
      carbohydrates: 7,
      fiber: 8,
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

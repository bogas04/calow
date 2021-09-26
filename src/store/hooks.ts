import { createContext, useContext, useEffect, useReducer } from "react";
import { get, set } from "idb-keyval";
import useSWR from "swr";

import { ACTIONS, Action, defaultState, reducer } from "./reducer";
import {
  computeMacroNutritionFromLog,
  computeMicroNutritionFromLog,
  createNutrition,
} from "../util/nutrition";
import { getDateKey } from "../util/time";

import { ItemEntry } from "./types";
import { Store } from ".";

export function useStoreReducer() {
  const [store, dispatch] = useReducer(reducer, defaultState);

  useEffect(() => {
    (async () => {
      try {
        const [body, goal, logs, bookmarks = []] = await Promise.all([
          get<Store["body"]>("body"),
          get<Store["goal"]>("goal"),
          get<Store["logs"]>("logs"),
          get<Store["bookmarks"]>("bookmarks"),
        ]);

        if (body && goal && logs) {
          dispatch({
            type: ACTIONS.SET,
            payload: { body, goal, logs, bookmarks },
          });
        }
      } catch (err) {
        alert("Sorry! We couldn't restore data stored in your phone.");
      }
    })();
  }, []);

  useEffect(() => {
    set("bookmarks", store.bookmarks);
  }, [store.bookmarks]);
  useEffect(() => {
    set("body", store.body);
  }, [store.body]);
  useEffect(() => {
    set("goal", store.goal);
  }, [store.goal]);
  useEffect(() => {
    set("logs", store.logs);
  }, [store.logs]);

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
  const bookmarks = store.bookmarks || [];

  return {
    ...store,
    water: log.reduce((sum, l) => sum + (l.water || 0), 0),
    nutrition: computeMacroNutritionFromLog(log),
    micro: computeMicroNutritionFromLog(log),
    log,
    bookmarks,
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
    const knownNutritionIndices: {
      [name: string]: /** index in sheet */ number;
    } = {
      name: 0,
      icon: 1,
      categories: 2,
      calories: 3,
      protein: 4,
      carbohydrates: 5,
      fat: 6,
    };
    const lastKnownNutritionIndex = Math.max(
      ...Object.values(knownNutritionIndices)
    );

    const unknowNutritionIndexMap: {
      [
        /** index in sheet */
        index: number
      ]: /** name of nutrition */
      string;
    } = data.values.slice(0, 1)[0].reduce((acc, microName, index) => {
      return index > lastKnownNutritionIndex
        ? { ...acc, [index]: microName.toLowerCase() }
        : {};
    }, {});

    items = data.values.slice(1).reduce<ItemEntry[]>((acc, value, i) => {
      const micro = value.reduce((microAcc, nutritionValue, microIndex) => {
        if (microIndex <= lastKnownNutritionIndex) {
          return microAcc;
        }
        return {
          ...microAcc,
          [unknowNutritionIndexMap[microIndex]]: Number(nutritionValue),
        };
      }, {});

      const sanitizedData: ItemEntry = {
        name: value[knownNutritionIndices.name],
        icon: value[knownNutritionIndices.icon] || undefined,
        weight: 100,
        nutrition: createNutrition((key) =>
          Number(value[knownNutritionIndices[key]])
        ),
        micro,
      };

      acc.push(sanitizedData);
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

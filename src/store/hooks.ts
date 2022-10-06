import { createContext, useContext, useEffect, useReducer, useRef } from "react";
import { getMany, update } from "idb-keyval";
import useSWR from "swr";

import { ACTIONS, Action, defaultState, reducer } from "./reducer";
import { computeMacroNutritionFromLog, computeMicroNutritionFromLog, createNutrition } from "../util/nutrition";
import { getDateKey } from "../util/time";

import { ItemEntry } from "./types";
import { Store } from ".";

export function useStoreReducer() {
  const [store, dispatch] = useReducer(reducer, defaultState);
  /**
   * A boolean ref to check if we've read from the database
   * doesn't need to be a state variable as it's tied to `store`
   */
  const hasLoadedFromDataBase = useRef(false);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const [body, goal, logs, bookmarks = []] = (await getMany(["body", "goal", "logs", "bookmarks"])) as [
          Store["body"],
          Store["goal"],
          Store["logs"],
          Store["bookmarks"]
        ];

        hasLoadedFromDataBase.current = true;

        if (body && goal && logs) {
          dispatch({
            type: ACTIONS.SET,
            payload: { body, goal, logs, bookmarks },
          });
        }
      } catch (err) {
        alert("Sorry! We couldn't restore data stored in your phone.");
      }
    };

    bootstrap();

    window.calowResetStore = bootstrap;
    window.calowClearStore = () =>
      dispatch({
        type: ACTIONS.SET,
        payload: {
          body: defaultState.body,
          goal: defaultState.goal,
          logs: defaultState.logs,
          bookmarks: defaultState.bookmarks,
        },
      });

    return () => {
      window.calowResetStore = undefined;
      window.calowClearStore = undefined;
    };
  }, []);

  useSyncedKey("bookmarks", store.bookmarks, hasLoadedFromDataBase.current);
  useSyncedKey("body", store.body, hasLoadedFromDataBase.current);
  useSyncedKey("goal", store.goal, hasLoadedFromDataBase.current);
  useSyncedKey("logs", store.logs, hasLoadedFromDataBase.current);

  return {
    ...store,
    dispatch,
  };
}

/**
 * A custom hook that is typed to save a key and value to idb-keyval database,
 * along with a confirmation message in case new value is empty and old value is not,
 * i.e. deletion of a key.
 */
function useSyncedKey<K extends SavedKeys>(key: K, newValue: Store[K], isReady: boolean) {
  useEffect(() => {
    /**
     * If we've not yet read from the databse
     * then this particular render is to be ignored
     * so that we don't risk clearing the persistend value pre-maturely
     */
    if (!isReady) {
      return;
    }

    update<Store[K]>(key, (oldValue) => {
      const isNewValueEmpty = isEmpty[key](newValue);
      const isOldValueNotEmpty = oldValue && !isEmpty[key](oldValue);

      if (
        isNewValueEmpty &&
        isOldValueNotEmpty &&
        !confirm(deletionMessages[key]) // ask user for confirmation
      ) {
        window.calowResetStore?.();
        return oldValue;
      }
      return newValue;
    });
  }, [key, newValue, isReady]);
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

const fetcher = (info: RequestInfo, options?: RequestInit) => fetch(info, options).then((res) => res.json());

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
    const lastKnownNutritionIndex = Math.max(...Object.values(knownNutritionIndices));

    const unknowNutritionIndexMap: {
      [
        /** index in sheet */
        index: number
      ]: /** name of nutrition */
      string;
    } = data.values.slice(0, 1)[0].reduce((acc, microName, index) => {
      return index > lastKnownNutritionIndex ? { ...acc, [index]: microName.toLowerCase() } : {};
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
        nutrition: createNutrition((key) => Number(value[knownNutritionIndices[key]])),
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

declare global {
  interface Window {
    /**
     * Resets app state from database
     */
    calowResetStore?(): void;
    /**
     * Clears app state but doesn't update database
     * used for debugging purposes
     */
    calowClearStore?(): void;
  }
}

/**
 * All the keys that are saved in idb-keyval database
 */
type SavedKeys = Extract<keyof Store, "goal" | "logs" | "body" | "bookmarks">;

/**
 * Confirmation message in case user wishes to delete any of the saved keys
 */
const deletionMessages: Record<SavedKeys, string> = {
  body: "Are you sure you want to delete your body data?",
  bookmarks: "Are you sure you want to delete your bookmarks?",
  logs: "Are you sure you want to delete your logs?",
  goal: "Are you sure you want to delete your goal data?",
};

/**
 * Helper object that has isEmpty functions for saved keys
 */
const isEmpty: { [key in SavedKeys]: (v?: Store[key]) => boolean } = {
  body: (body?: Store["body"]) => (body || defaultState.body).height === defaultState.body.height,
  goal: (goal?: Store["goal"]) =>
    (goal || defaultState.goal).nutrition.calories === defaultState.goal.nutrition.calories,
  logs: (logs?: Store["logs"]) => Object.keys(logs || {}).length === 0,
  bookmarks: (bookmarks?: Store["bookmarks"]) => bookmarks?.length == -0,
};

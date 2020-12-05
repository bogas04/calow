import { MouseEvent } from "react";

/**
 * Finds a parent of event target that has given data-${key}
 * Returns null if not found
 */
export function getClosestDatasetKey<T extends HTMLElement>(
  e: MouseEvent<T>,
  key: string
) {
  const el: HTMLElement | null = e.currentTarget.closest(`[data-${key}]`);

  return !el ? null : el.dataset[key];
}

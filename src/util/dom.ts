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

export function readFile(file: File, encoding = "utf-8") {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(e.target?.result as string);
    };
    reader.onerror = () => {
      reject(reader.error);
      reader.abort();
    };

    reader.readAsText(file, encoding);
  });
}

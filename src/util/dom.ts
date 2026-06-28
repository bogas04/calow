import { MouseEvent } from "react";

/**
 * Finds a parent of event target that has given data-${key}
 * Returns null if not found
 */
export function getClosestDatasetKey<T extends HTMLElement>(e: MouseEvent<T>, key: string) {
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

function isIOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

export function focusInput(
  input: HTMLInputElement | null | undefined,
  options: { select?: boolean; preventScroll?: boolean } = {}
) {
  if (!input) return;

  try {
    input.focus({ preventScroll: options.preventScroll ?? true });
  } catch {
    input.focus();
  }

  if (options.select) {
    input.select();
  }
}

export function focusInputAfterViewportSettles(
  input: HTMLInputElement | null | undefined,
  options: { select?: boolean } = {}
) {
  if (!input) return () => {};
  if (typeof window === "undefined") return () => {};

  let cancelled = false;
  let frame = 0;
  let timeout = 0;

  const run = () => {
    if (cancelled) return;
    focusInput(input, { ...options, preventScroll: true });
  };

  if (!isIOS() || !window.visualViewport) {
    frame = window.requestAnimationFrame(run);
    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
    };
  }

  const viewport = window.visualViewport;
  const schedule = () => {
    window.clearTimeout(timeout);
    timeout = window.setTimeout(run, 120);
  };

  viewport.addEventListener("resize", schedule);
  viewport.addEventListener("scroll", schedule);
  schedule();

  return () => {
    cancelled = true;
    window.clearTimeout(timeout);
    viewport.removeEventListener("resize", schedule);
    viewport.removeEventListener("scroll", schedule);
  };
}

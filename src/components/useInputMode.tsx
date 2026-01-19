export function useNumericInputMode() {
  return typeof window === "undefined"
    ? "numeric"
    : /iPhone|iPad|iPod/i.test(navigator.userAgent)
    ? "decimal"
    : "numeric";
}

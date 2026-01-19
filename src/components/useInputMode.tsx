export function useNumericInputMode() {
  // on iOS use text, otherwise use numeric
  return /iPhone|iPad|iPod/i.test(navigator.userAgent) ? "text" : "numeric";
}

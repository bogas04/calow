export function useNumericInputMode() {
  // on server send numeric, on iOS use text, otherwise use numeric
  return typeof window === "undefined" ? "numeric" : /iPhone|iPad|iPod/i.test(navigator.userAgent) ? "text" : "numeric";
}

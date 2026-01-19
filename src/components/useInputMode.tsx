import { useEffect, useState } from "react";

export function useNumericInputMode() {
  const [inputMode, setInputMode] = useState<"numeric" | "decimal">("numeric");

  useEffect(() => {
    setInputMode(/iPhone|iPad|iPod/i.test(navigator.userAgent) ? "decimal" : "numeric");
  }, []);

  return inputMode;
}

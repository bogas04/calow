import { useCallback, useEffect, useState } from "react";

export const GEMINI_API_KEY_KEY = "gemini_api_key";

export function useGeminiApiKey() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    setApiKey(localStorage.getItem(GEMINI_API_KEY_KEY));
    setIsLoaded(true);
  }, []);

  const saveApiKey = useCallback((key: string) => {
    localStorage.setItem(GEMINI_API_KEY_KEY, key);
    setApiKey(key);
  }, []);

  const clearApiKey = useCallback(() => {
    localStorage.removeItem(GEMINI_API_KEY_KEY);
    setApiKey(null);
  }, []);

  return { apiKey, clearApiKey, hasApiKey: Boolean(apiKey), isLoaded, saveApiKey };
}

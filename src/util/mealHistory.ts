import type { Store } from "../store";

/** Recent meals are more representative of the user's current food habits. */
export function getRecentLoggedMeals(logs: Store["logs"], limit = 20) {
  return Object.values(logs)
    .flat()
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, limit);
}

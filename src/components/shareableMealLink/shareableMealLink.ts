import { MealEntry } from "../../store/types";
import { parsers, v1Parser, v2Parser, v3Parser } from "./parsers";

export function createShareableMealLink(
  meal: MealEntry,
  baseLink: string,
  parserVersion: "v1" | "v2" | "v3" = "v3"
): string {
  if (parserVersion === "v1") {
    return v1Parser.create(meal, baseLink);
  }
  if (parserVersion === "v2") {
    return v2Parser.create(meal, baseLink);
  }

  return v3Parser.create(meal, baseLink);
}

export function getMealFromQueryParams(queryParams: Record<string, string | string[] | undefined>): MealEntry | null {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(queryParams)) {
    if (value !== undefined) {
      if (Array.isArray(value)) value.forEach((v) => searchParams.append(key, v));
      else searchParams.append(key, value);
    }
  }
  const link = searchParams.toString();

  for (const parser of parsers) {
    if (parser.isValid(link)) {
      return parser.parse(link);
    }
  }
  return null;
}

export function parseMealFromLink(urlOrEncoded: string): MealEntry {
  for (const parser of parsers) {
    if (parser.isValid(urlOrEncoded)) {
      return parser.parse(urlOrEncoded);
    }
  }

  throw new Error("No valid meal data found in link or string");
}

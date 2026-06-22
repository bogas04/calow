export const dietPreferenceOptions = [
  { value: "none", label: "No preference" },
  { value: "vegan", label: "Vegan" },
  { value: "lacto-veg", label: "Lacto-vegetarian" },
  { value: "ovo-lacto-veg", label: "Ovo-lacto vegetarian" },
  { value: "pesce", label: "Pescetarian" },
  { value: "carni", label: "Carnivore / meat-based" },
  { value: "other", label: "Other" },
] as const;

export type DietPreferenceType = (typeof dietPreferenceOptions)[number]["value"];

export function getDietPreferenceLabel(diet: { type: string; custom?: string }) {
  if (diet.type === "other") {
    return diet.custom?.trim() || "";
  }

  return dietPreferenceOptions.find((option) => option.value === diet.type)?.label || "";
}

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { ACTIONS, useStore } from "../store";
import { computeCaloricNeeds, computeMacroFromCalories, macroCombination } from "../util/nutrition";
import { DietPreferenceType } from "../util/preferences";
import { useGeminiApiKey } from "./useGeminiApiKey";

const ONBOARDING_DISMISSED_KEY = "calow_onboarding_dismissed";
type MacroPlan = keyof typeof macroCombination;
const inputClass = "min-h-[42px] w-full rounded-lg border border-slate-300 bg-white px-2.5 py-2 font-normal text-slate-900";
const primaryClass = "mt-6 block min-h-[46px] w-full rounded-[10px] border-0 bg-green-400 font-bold text-white hover:bg-green-500";
const choiceClass = (selected: boolean) =>
  `rounded-xl border p-3 text-left transition-colors ${selected ? "border-green-400 bg-green-50 text-green-900" : "border-slate-200 text-slate-700 hover:border-slate-300"}`;
const activityOptions = [
  { value: 1.2, label: "Sedentary", detail: "Little to no exercise" },
  { value: 1.375, label: "Light", detail: "Exercise 1–3 days a week" },
  { value: 1.55, label: "Moderate", detail: "Exercise 3–5 days a week" },
  { value: 1.725, label: "Active", detail: "Exercise 6–7 days a week" },
  { value: 1.9, label: "Very active", detail: "Twice daily or physical work" },
];
const dietOptions: Array<{ value: DietPreferenceType; label: string; emoji: string }> = [
  { value: "none", label: "No preference", emoji: "🍽️" },
  { value: "vegan", label: "Vegan", emoji: "🌱" },
  { value: "lacto-veg", label: "Lacto-vegetarian", emoji: "🥛" },
  { value: "ovo-lacto-veg", label: "Ovo-lacto vegetarian", emoji: "🥚" },
  { value: "pesce", label: "Pescetarian", emoji: "🐟" },
  { value: "carni", label: "Meat-based", emoji: "🥩" },
  { value: "other", label: "Something else", emoji: "✨" },
];

export default function Onboarding() {
  const router = useRouter();
  const { body, dispatch, goal, isLoaded, logs, preferences } = useStore();
  const { saveApiKey } = useGeminiApiKey();
  const hasCheckedEligibility = useRef(false);
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const [metrics, setMetrics] = useState(body);
  const [macroPlan, setMacroPlan] = useState<MacroPlan>(goal.diet);
  const [diet, setDiet] = useState<DietPreferenceType>(preferences.diet.type);
  const [customDiet, setCustomDiet] = useState(preferences.diet.custom);
  const [geminiKey, setGeminiKey] = useState("");
  const { bmr, caloricNeeds } = useMemo(() => computeCaloricNeeds(metrics), [metrics]);
  const hasCompleteBody = Boolean(metrics.height && metrics.weight && metrics.age);
  const hasCompleteActivity = Boolean(metrics.activity);

  useEffect(() => {
    if (!isLoaded || hasCheckedEligibility.current || typeof window === "undefined") return;
    hasCheckedEligibility.current = true;
    const hasEntries = Object.values(logs).some((entries) => entries.length > 0);
    const hasSetup = Boolean(body.height || body.weight || body.age || goal.nutrition.calories);
    setVisible(!hasEntries && !hasSetup && !localStorage.getItem(ONBOARDING_DISMISSED_KEY));
  }, [body, goal.nutrition.calories, isLoaded, logs]);

  const dismiss = () => {
    localStorage.setItem(ONBOARDING_DISMISSED_KEY, "true");
    setVisible(false);
  };
  const changeStep = (nextStep: number) => {
    const update = () => setStep(nextStep);
    document.startViewTransition ? document.startViewTransition(update) : update();
  };
  const saveBody = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!hasCompleteBody) return;
    dispatch({ type: ACTIONS.SET_BODY, payload: metrics });
    changeStep(2);
  };
  const saveActivity = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!hasCompleteActivity) return;
    dispatch({ type: ACTIONS.SET_BODY, payload: metrics });
    changeStep(3);
  };
  const saveDiet = () => {
    dispatch({ type: ACTIONS.SET_PREFERENCES, payload: { diet: { type: diet, custom: customDiet } } });
    changeStep(4);
  };
  const saveMacroPlan = () => {
    dispatch({
      type: ACTIONS.SET_GOAL,
      payload: {
        diet: macroPlan,
        nutrition: computeMacroFromCalories(goal.nutrition.calories, macroCombination[macroPlan].macros),
      },
    });
    changeStep(5);
  };
  const finish = () => {
    if (geminiKey.trim()) saveApiKey(geminiKey.trim());
    dismiss();
  };
  if (!visible) return null;

  const heading = (eyebrow: string, title: string, bodyText: string) => (
    <>
      <p className="mb-2 text-[13px] font-bold uppercase tracking-[.07em] text-green-600">{eyebrow}</p>
      <h1 id="onboarding-title" className="mb-4 mr-8 max-w-[500px] text-[clamp(28px,5vw,40px)] font-bold leading-[1.08] text-slate-900">{title}</h1>
      <p className="mb-[18px] max-w-[570px] text-base leading-relaxed text-slate-600">{bodyText}</p>
    </>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-900/60 animate-overlay-in" role="dialog" aria-modal="true" aria-labelledby="onboarding-title">
      <section className="relative max-h-[90vh] w-full max-w-[720px] overflow-y-auto rounded-t-[24px] border border-slate-200 bg-white p-6 pb-8 shadow-2xl sm:p-10">
        {step > 0 && (
          <button
            className="absolute left-[18px] top-[18px] border-0 bg-transparent text-sm font-semibold text-slate-600 hover:text-slate-900"
            type="button"
            onClick={() => changeStep(step - 1)}
          >
            ← Back
          </button>
        )}
        <button className="absolute right-[18px] top-[18px] border-0 bg-transparent text-sm text-slate-500" type="button" onClick={dismiss}>Skip setup</button>
        <div className="mb-8 mt-10 flex w-40 gap-1.5" aria-label={`Step ${step + 1} of 7`}>
          {[0, 1, 2, 3, 4, 5, 6].map((index) => <span key={index} className={`h-1 flex-1 rounded-full ${index <= step ? "bg-green-400" : "bg-slate-200"}`} />)}
        </div>

        {step === 0 && <div className="animate-sheet-in">
          {heading("Welcome to Calow", "Track food your way.", "Most calorie trackers make you fit meals into someone else’s catalogue. Calow lets you add the foods you actually eat, name them in your own words, and keep labels that make sense to you.")}
          <p className="mb-[18px] text-sm text-green-700">Simple logging, without losing the detail.</p>
          <button className={primaryClass} type="button" onClick={() => changeStep(1)}>Set up my goals</button>
        </div>}

        {step === 1 && <form className="animate-sheet-in" onSubmit={saveBody}>
          {heading("Your starting point", "A little biology, not an identity label.", "Calorie equations use sex-based averages in their estimates. We only ask for the biological profile that best matches your body’s energy needs; it does not define your gender or identity. Every result remains adjustable in Settings.")}
          <div className="mt-6 grid grid-cols-1 gap-[14px] sm:grid-cols-2 [&>label]:grid [&>label]:gap-1.5 [&>label]:text-[13px] [&>label]:font-bold [&>label]:text-slate-700">
            <fieldset className="sm:col-span-2"><legend className="mb-2 text-[13px] font-bold text-slate-700">Biological profile</legend><div className="grid grid-cols-2 gap-2"><button className={choiceClass(metrics.gender === "female")} type="button" onClick={() => setMetrics({ ...metrics, gender: "female" })}><strong className="block">Female-based</strong><span className="mt-1 block text-xs font-normal">For bodies typically assigned female at birth</span></button><button className={choiceClass(metrics.gender === "male")} type="button" onClick={() => setMetrics({ ...metrics, gender: "male" })}><strong className="block">Male-based</strong><span className="mt-1 block text-xs font-normal">For bodies typically assigned male at birth</span></button></div></fieldset>
            <label>Age<input className={inputClass} required min="1" inputMode="numeric" type="number" value={metrics.age || ""} onChange={(e) => setMetrics({ ...metrics, age: Number(e.target.value) })} /></label>
            <label>Height (cm)<input className={inputClass} required min="1" inputMode="decimal" type="number" value={metrics.height || ""} onChange={(e) => setMetrics({ ...metrics, height: Number(e.target.value) })} /></label>
            <label>Weight (kg)<input className={inputClass} required min="1" inputMode="decimal" type="number" value={metrics.weight || ""} onChange={(e) => setMetrics({ ...metrics, weight: Number(e.target.value) })} /></label>
          </div>
          <button className={primaryClass} type="submit">Continue</button>
        </form>}

        {step === 2 && <form className="animate-sheet-in" onSubmit={saveActivity}>
          {heading("Daily energy", "How active are your usual days?", "Your BMR is the energy your body uses at rest. We combine it with your everyday activity to estimate maintenance calories, a useful starting point rather than a rule.")}
          <fieldset className="mt-5"><legend className="mb-2 text-[13px] font-bold text-slate-700">Daily activity</legend><div className="grid grid-cols-3 gap-2">{activityOptions.map((option) => <button key={option.value} title={option.detail} aria-label={`${option.label}: ${option.detail}`} className={`${choiceClass(metrics.activity === option.value)} min-h-[54px] p-2 text-center`} type="button" onClick={() => setMetrics({ ...metrics, activity: option.value })}><strong className="block text-xs leading-tight">{option.label}</strong></button>)}</div></fieldset>
          {hasCompleteActivity && <div className="mt-5 rounded-xl bg-green-50 p-4 text-sm text-green-800"><div>Estimated BMR <strong className="float-right">{Math.round(bmr)} kcal</strong></div><div className="mt-2 border-t border-green-100 pt-2">Daily maintenance <strong className="float-right">{caloricNeeds.calories} kcal</strong></div></div>}
          <button className={primaryClass} type="submit">Use this starting point</button>
        </form>}

        {step === 3 && <div className="animate-sheet-in">
          {heading("Make it yours", "What kind of food do you eat?", "Your food preference helps AI suggestions understand your meals and make more useful suggestions. You can change it at any time in Settings.")}
          <div className="mt-6 grid gap-5">
            <fieldset><legend className="mb-2 text-[13px] font-bold text-slate-700">Food preference</legend><div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{dietOptions.map((option) => <button key={option.value} className={choiceClass(diet === option.value)} type="button" onClick={() => setDiet(option.value)}><span className="mr-2 text-lg" aria-hidden="true">{option.emoji}</span><strong className="text-sm">{option.label}</strong></button>)}</div></fieldset>
            {diet === "other" && <label className="grid gap-1.5 text-[13px] font-bold text-slate-700">Describe it<input className={inputClass} value={customDiet} placeholder="e.g. Jain vegetarian" onChange={(e) => setCustomDiet(e.target.value)} /></label>}
          </div>
          <button className={primaryClass} type="button" onClick={saveDiet}>Continue</button>
        </div>}

        {step === 4 && <div className="animate-sheet-in">
          {heading("Macro split", "How should your calories be divided?", "Macronutrients are carbohydrates, protein, and fat. Pick a balance that feels right for how you like to eat. You can always change it later in Settings.")}
          <fieldset className="mt-6"><legend className="mb-2 text-[13px] font-bold text-slate-700">Choose a macro split</legend><div className="grid gap-2 sm:grid-cols-2">{(Object.keys(macroCombination) as MacroPlan[]).map((plan) => { const macros = macroCombination[plan].macros; return <button key={plan} type="button" onClick={() => setMacroPlan(plan)} className={choiceClass(macroPlan === plan)}><strong className="text-slate-800">{macroCombination[plan].name}</strong><span className="mt-1 block text-xs text-slate-600">Carbs {Math.round(macros.carbohydrates * 100)}% · Protein {Math.round(macros.protein * 100)}% · Fat {Math.round(macros.fat * 100)}%</span></button>; })}</div></fieldset>
          <button className={primaryClass} type="button" onClick={saveMacroPlan}>Save my macro split</button>
        </div>}

        {step === 5 && <div className="animate-sheet-in">
          {heading("You’re ready", "Add your first item with +.", "Use the plus button in the bottom-right corner whenever you eat. You can build a meal from several ingredients, give it your own name, and fine-tune portions as you go.")}
          <div className="flex min-h-[100px] items-center justify-end gap-3 px-3"><button className="grid h-[58px] w-[58px] place-items-center rounded-full border-0 bg-green-400 text-4xl font-extralight text-white animate-[onboarding-pulse_1.8s_ease-in-out_infinite]" type="button" aria-label="Add my first meal" onClick={() => { dismiss(); router.push("/meal-entry"); }}>+</button><span className="text-sm text-slate-500">← start here</span></div>
          <button className={primaryClass} type="button" onClick={() => changeStep(6)}>Show me the optional AI tools</button>
          <button className="mt-2.5 block min-h-[46px] w-full rounded-[10px] border-0 bg-transparent font-bold text-slate-600" type="button" onClick={() => { dismiss(); router.push("/meal-entry"); }}>Add my first meal now</button>
        </div>}

        {step === 6 && <div className="animate-sheet-in">
          {heading("Optional AI helper", "Get an estimate when you eat out.", "A free Gemini API key from Google AI Studio lets Calow estimate restaurant meals and generate day insights. It is an informed estimate, not a replacement for a nutrition label, and your key stays only in this browser.")}
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm leading-relaxed text-amber-900"><strong>Your Calow data lives only on this device.</strong> It is not synced to an account. Export a backup from Settings regularly if you want to keep your history safe.</div>
          <label className="mt-6 grid gap-1.5 text-[13px] font-bold text-slate-700">Gemini API key (optional)<input className={inputClass} type="password" value={geminiKey} onChange={(e) => setGeminiKey(e.target.value)} placeholder="Paste your key" autoComplete="new-password" /></label>
          <a className="mt-4 flex min-h-[46px] items-center justify-center rounded-[10px] border border-blue-200 bg-blue-50 px-4 text-sm font-bold text-blue-700 hover:bg-blue-100" href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer">Open Google AI Studio to create a free key ↗</a>
          <button className={primaryClass} type="button" onClick={finish}>Finish setup</button>
          <button className="mt-2.5 block min-h-[46px] w-full rounded-[10px] border-0 bg-transparent font-bold text-slate-600" type="button" onClick={() => { finish(); router.push("/meal-entry"); }}>Finish and add my first meal</button>
        </div>}
      </section>
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useState } from "react";
import { PublicShell } from "@/components/layout/PublicShell";
import { ArrowLeft, ArrowRight, Check, Info, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/survey")({
  head: () => ({
    meta: [
      { title: "5-minute Pflegegrad check — Klara" },
      { name: "description", content: "Answer 10 plain-language questions to estimate the German care grade your relative is likely to receive." },
      { property: "og:title", content: "5-minute Pflegegrad check" },
      { property: "og:description", content: "Free estimate of the likely Pflegegrad." },
    ],
  }),
  component: SurveyPage,
});

type Step =
  | { id: string; module: 1 | 2 | 3 | 4 | 5 | 6; weight: number; kind: "scale" | "freq" };

const STEPS: Step[] = [
  { id: "mobility",   module: 1, weight: 1.0, kind: "scale" },
  { id: "cognition",  module: 2, weight: 1.5, kind: "scale" },
  { id: "behaviour",  module: 3, weight: 1.5, kind: "freq"  },
  { id: "hygiene",    module: 4, weight: 1.3, kind: "scale" },
  { id: "dressing",   module: 4, weight: 1.3, kind: "scale" },
  { id: "eating",     module: 4, weight: 2.0, kind: "scale" },
  { id: "toilet",     module: 4, weight: 1.5, kind: "scale" },
  { id: "medication", module: 5, weight: 1.2, kind: "scale" },
  { id: "structure",  module: 6, weight: 1.0, kind: "scale" },
  { id: "social",     module: 6, weight: 1.0, kind: "scale" },
];

// Monthly Pflegegeld gap (EUR) between this grade and one grade lower.
// PG3 uses 360 to reflect blended cash+services uplift commonly cited.
const MONTHLY_GAP: Record<number, number> = { 1: 131, 2: 216, 3: 360, 4: 201, 5: 190 };

const STORAGE_KEY = "klara.survey.v1";

type Saved = {
  profile: "autism" | "elderly" | null;
  idx: number;
  answers: Record<string, number>;
  done: boolean;
};

function loadSaved(): Saved | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Saved) : null;
  } catch {
    return null;
  }
}

function SurveyPage() {
  const { t } = useTranslation();
  const [profile, setProfile] = useState<"autism" | "elderly" | null>(null);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [showRequired, setShowRequired] = useState(false);
  const [savedBanner, setSavedBanner] = useState<number | null>(null); // module number just completed

  // Hydrate from localStorage
  useEffect(() => {
    const s = loadSaved();
    if (s) {
      setProfile(s.profile);
      setIdx(s.idx);
      setAnswers(s.answers);
      setDone(s.done);
    }
    setHydrated(true);
  }, []);

  // Auto-save
  useEffect(() => {
    if (!hydrated || typeof window === "undefined") return;
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ profile, idx, answers, done } as Saved),
    );
  }, [hydrated, profile, idx, answers, done]);

  // Dismiss saved banner after a few seconds
  useEffect(() => {
    if (savedBanner == null) return;
    const id = window.setTimeout(() => setSavedBanner(null), 3500);
    return () => window.clearTimeout(id);
  }, [savedBanner]);

  const step = STEPS[idx];
  const totalModules = 6;
  // Progress by step count gives the smoothest movement (10 steps).
  const progress = Math.round(((idx + (done ? 1 : 0)) / STEPS.length) * 100);

  const result = useMemo(() => {
    if (!done) return null;
    let raw = 0;
    let max = 0;
    for (const s of STEPS) {
      raw += (answers[s.id] ?? 0) * s.weight;
      max += 3 * s.weight;
    }
    const pct = (raw / max) * 100;
    let pg = 0;
    if (pct >= 90) pg = 5;
    else if (pct >= 70) pg = 4;
    else if (pct >= 47.5) pg = 3;
    else if (pct >= 27) pg = 2;
    else if (pct >= 12.5) pg = 1;
    return { pg, pct: Math.round(pct) };
  }, [done, answers]);

  if (!profile) {
    return (
      <PublicShell>
        <section className="mx-auto max-w-2xl px-4 py-16">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {t("survey.title")}
          </h1>
          <p className="mt-3 text-base text-muted-foreground">{t("survey.sub")}</p>
          <div className="mt-6 flex items-start gap-2 rounded-xl border border-border bg-secondary/50 p-4 text-sm text-muted-foreground">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span>{t("survey.disclaimer")}</span>
          </div>

          <h2 className="mt-10 text-lg font-semibold text-foreground">
            {t("survey.who_title")}
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {(["autism", "elderly"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setProfile(p)}
                className="rounded-2xl border border-border bg-card p-5 text-left transition-colors hover:border-primary hover:bg-secondary/40"
              >
                <span className="text-base font-medium text-foreground">
                  {t(`survey.who_${p}`)}
                </span>
              </button>
            ))}
          </div>
        </section>
      </PublicShell>
    );
  }

  if (done && result) {
    const label = result.pg === 0 ? t("survey.result_none") : t("survey.result_pg", { n: result.pg });
    const gap = result.pg > 0 ? MONTHLY_GAP[result.pg] : 0;
    const yearly = gap * 12;

    return (
      <PublicShell>
        <section className="mx-auto max-w-2xl px-4 py-16">
          <p className="text-center text-sm font-medium uppercase tracking-wide text-muted-foreground">
            {t("survey.result_title")}
          </p>

          {/* Big emotional reveal */}
          {result.pg > 0 ? (
            <div className="mt-4 text-center">
              <p className="text-[120px] font-semibold leading-none tracking-tight text-primary md:text-[160px]">
                {result.pg}
              </p>
              <p className="mt-2 text-2xl font-semibold text-foreground md:text-3xl">
                Pflegegrad {result.pg}
              </p>
            </div>
          ) : (
            <h1 className="mt-4 text-center text-4xl font-semibold tracking-tight text-foreground">
              {label}
            </h1>
          )}

          <p className="mt-6 text-center text-base leading-relaxed text-foreground">
            {t("survey.result_reveal_label")} <strong>{label}</strong>.
          </p>

          {/* Gap card */}
          {result.pg > 0 && gap > 0 && (
            <div className="mt-8 rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
              <p className="text-sm font-medium text-primary">
                {t("survey.result_gap_title")}
              </p>
              <p className="mt-3 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
                {t("survey.result_gap_month", { m: gap })}
              </p>
              <p className="mt-2 text-lg text-muted-foreground">
                {t("survey.result_gap_year", { y: yearly.toLocaleString("de-DE") })}
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                {t("survey.result_gap_note")}
              </p>
            </div>
          )}

          <div className="mt-6 flex items-start gap-2 rounded-xl border border-border bg-secondary/50 p-4 text-sm text-muted-foreground">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span>{t("survey.disclaimer")}</span>
          </div>

          {/* Payment moment — framed against the monthly gap */}
          <div className="mt-8 rounded-2xl border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground">
              {gap > 0 ? t("survey.result_next_frame", { m: gap }) : t("pricing.frame")}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                to="/pricing"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90"
              >
                {t("survey.result_next")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                onClick={() => {
                  setAnswers({});
                  setIdx(0);
                  setDone(false);
                  setProfile(null);
                  if (typeof window !== "undefined") window.localStorage.removeItem(STORAGE_KEY);
                }}
                className="rounded-md border border-input bg-background px-5 py-3 text-base font-medium text-foreground hover:bg-secondary"
              >
                {t("survey.result_restart")}
              </button>
            </div>
          </div>
        </section>
      </PublicShell>
    );
  }

  const options =
    step.kind === "freq"
      ? [
          { v: 0, label: t("survey.a.never") },
          { v: 1, label: t("survey.a.weekly") },
          { v: 2, label: t("survey.a.daily") },
          { v: 3, label: t("survey.a.often") },
        ]
      : [
          { v: 0, label: t("survey.a.independent") },
          { v: 1, label: t("survey.a.mostly") },
          { v: 2, label: t("survey.a.much_help") },
          { v: 3, label: t("survey.a.fully") },
        ];

  const selected = answers[step.id];
  const canNext = selected !== undefined;

  function handleNext() {
    if (selected === undefined) {
      setShowRequired(true);
      return;
    }
    setShowRequired(false);
    const currentModule = step.module;
    const nextStep = STEPS[idx + 1];
    const movingToNewModule = !nextStep || nextStep.module !== currentModule;

    if (idx === STEPS.length - 1) {
      // Final module completed
      setSavedBanner(currentModule);
      setDone(true);
      return;
    }
    if (movingToNewModule) {
      setSavedBanner(currentModule);
    }
    setIdx((i) => i + 1);
  }

  const showHalfway = step.module === 4; // first question of module 4 = 3 of 6 modules done

  return (
    <PublicShell>
      <section className="mx-auto max-w-2xl px-4 py-12 md:py-16">
        {/* Saved banner */}
        {savedBanner != null && (
          <div
            role="status"
            className="mb-4 flex items-center gap-2 rounded-lg border border-accent/40 bg-accent/10 px-3 py-2 text-sm text-foreground"
          >
            <Check className="h-4 w-4 text-accent" />
            <span>{t("survey.module_complete_saved", { n: savedBanner })}</span>
          </div>
        )}

        {/* Step + module label */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            {idx + 1} / {STEPS.length}
          </span>
          <span className="font-medium text-foreground">
            {t("survey.module_progress", { n: step.module, total: totalModules })}
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">{t("survey.autosave_hint")}</p>

        {/* Halfway encouragement */}
        {showHalfway && (
          <div className="mt-4 rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-foreground">
            {t("survey.halfway")}
          </div>
        )}

        <h1 className="mt-8 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          {t(`survey.q.${step.id}`)}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {t(`survey.q.${step.id}_help`)}
        </p>

        <div className="mt-8 grid gap-3">
          {options.map((o) => {
            const active = selected === o.v;
            return (
              <button
                key={o.v}
                onClick={() => {
                  setShowRequired(false);
                  setAnswers((a) => ({ ...a, [step.id]: o.v }));
                }}
                className={
                  "rounded-xl border p-4 text-left text-base transition-colors " +
                  (active
                    ? "border-primary bg-primary/5 text-foreground ring-1 ring-primary"
                    : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-secondary/40")
                }
                aria-pressed={active}
              >
                {o.label}
              </button>
            );
          })}
        </div>

        {/* Blank-answer flag */}
        {showRequired && !canNext && (
          <div className="mt-4 flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{t("survey.answer_required")}</span>
          </div>
        )}

        <div className="mt-10 flex items-center justify-between">
          <button
            onClick={() => {
              setShowRequired(false);
              setIdx((i) => Math.max(0, i - 1));
            }}
            disabled={idx === 0}
            className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" /> {t("common.back")}
          </button>
          <button
            onClick={handleNext}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90"
          >
            {idx === STEPS.length - 1 ? t("survey.result_title") : t("common.next")}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </PublicShell>
  );
}

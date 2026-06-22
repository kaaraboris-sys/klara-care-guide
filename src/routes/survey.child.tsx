import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useState } from "react";
import { PublicShell } from "@/components/layout/PublicShell";
import { ArrowLeft, ArrowRight, Check, Info, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/survey/child")({
  head: () => ({
    meta: [
      { title: "Pflegegrad check for children — Klara" },
      {
        name: "description",
        content:
          "Estimate the German care grade (Pflegegrad) for a child or young person under 18, with child-specific MDK questions.",
      },
      { property: "og:title", content: "Pflegegrad check for children — Klara" },
      {
        property: "og:description",
        content: "A child-specific 5-minute estimate of the Pflegegrad.",
      },
    ],
  }),
  component: ChildSurveyPage,
});

type Step = {
  id: string;
  module: 1 | 2 | 3 | 4 | 5 | 6;
  weight: number;
  kind: "scale" | "freq";
  /** When true, the item is dropped for children under 3 (age-typical dependency). */
  skipUnder3?: boolean;
};

const STEPS: Step[] = [
  { id: "child_mobility",   module: 1, weight: 1.0, kind: "scale" },
  { id: "child_cognition",  module: 2, weight: 1.5, kind: "scale" },
  { id: "child_behaviour",  module: 3, weight: 1.5, kind: "freq"  },
  { id: "child_hygiene",    module: 4, weight: 1.3, kind: "scale", skipUnder3: true },
  { id: "child_dressing",   module: 4, weight: 1.3, kind: "scale", skipUnder3: true },
  { id: "child_eating",     module: 4, weight: 2.0, kind: "scale" },
  { id: "child_toilet",     module: 4, weight: 1.5, kind: "scale", skipUnder3: true },
  { id: "child_therapy",    module: 5, weight: 1.3, kind: "scale" },
  { id: "child_structure",  module: 6, weight: 1.0, kind: "scale" },
  { id: "child_social",     module: 6, weight: 1.0, kind: "scale" },
];

const MONTHLY_GAP: Record<number, number> = { 1: 131, 2: 216, 3: 360, 4: 201, 5: 190 };

const STORAGE_KEY = "klara.survey.child.v1";

type Saved = {
  under3: boolean | null;
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

function ChildSurveyPage() {
  const { t } = useTranslation();
  const [under3, setUnder3] = useState<boolean | null>(null);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [showRequired, setShowRequired] = useState(false);
  const [savedBanner, setSavedBanner] = useState<number | null>(null);

  useEffect(() => {
    const s = loadSaved();
    if (s) {
      setUnder3(s.under3);
      setIdx(s.idx);
      setAnswers(s.answers);
      setDone(s.done);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || typeof window === "undefined") return;
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ under3, idx, answers, done } as Saved),
    );
  }, [hydrated, under3, idx, answers, done]);

  useEffect(() => {
    if (savedBanner == null) return;
    const id = window.setTimeout(() => setSavedBanner(null), 3500);
    return () => window.clearTimeout(id);
  }, [savedBanner]);

  const activeSteps = useMemo(
    () => STEPS.filter((s) => !(under3 && s.skipUnder3)),
    [under3],
  );

  const step = activeSteps[idx];
  const totalModules = 6;
  const progress = Math.round(((idx + (done ? 1 : 0)) / activeSteps.length) * 100);

  const result = useMemo(() => {
    if (!done) return null;
    let raw = 0;
    let max = 0;
    for (const s of activeSteps) {
      raw += (answers[s.id] ?? 0) * s.weight;
      max += 3 * s.weight;
    }
    const pct = max > 0 ? (raw / max) * 100 : 0;
    let pg = 0;
    if (pct >= 90) pg = 5;
    else if (pct >= 70) pg = 4;
    else if (pct >= 47.5) pg = 3;
    else if (pct >= 27) pg = 2;
    else if (pct >= 12.5) pg = 1;
    return { pg, pct: Math.round(pct) };
  }, [done, answers, activeSteps]);

  // Age sub-gate
  if (under3 === null) {
    return (
      <PublicShell>
        <section className="mx-auto max-w-2xl px-4 py-16">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {t("survey.child.title")}
          </h1>
          <p className="mt-3 text-base text-muted-foreground">{t("survey.child.sub")}</p>
          <div className="mt-6 flex items-start gap-2 rounded-xl border border-border bg-secondary/50 p-4 text-sm text-muted-foreground">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span>{t("survey.disclaimer")}</span>
          </div>

          <h2 className="mt-10 text-lg font-semibold text-foreground">
            {t("survey.child.under3_title")}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">{t("survey.child.under3_hint")}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <button
              onClick={() => setUnder3(false)}
              className="rounded-2xl border border-border bg-card p-5 text-left transition-colors hover:border-primary hover:bg-secondary/40"
            >
              <span className="text-base font-medium text-foreground">
                {t("survey.child.age_3plus")}
              </span>
            </button>
            <button
              onClick={() => setUnder3(true)}
              className="rounded-2xl border border-border bg-card p-5 text-left transition-colors hover:border-primary hover:bg-secondary/40"
            >
              <span className="text-base font-medium text-foreground">
                {t("survey.child.age_under3")}
              </span>
            </button>
          </div>
          <div className="mt-8">
            <Link to="/survey" className="text-sm text-muted-foreground hover:text-foreground">
              ← {t("common.back")}
            </Link>
          </div>
        </section>
      </PublicShell>
    );
  }

  if (done && result) {
    const label =
      result.pg === 0 ? t("survey.result_none") : t("survey.result_pg", { n: result.pg });
    const gap = result.pg > 0 ? MONTHLY_GAP[result.pg] : 0;
    const yearly = gap * 12;

    return (
      <PublicShell>
        <section className="mx-auto max-w-2xl px-4 py-16">
          <p className="text-center text-sm font-medium uppercase tracking-wide text-muted-foreground">
            {t("survey.result_title")}
          </p>

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
            <h1 className="mt-4 text-center text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              {label}
            </h1>
          )}

          <p className="mt-6 text-center text-base leading-relaxed text-foreground">
            {t("survey.child.result_reveal_label")} <strong>{label}</strong>.
          </p>

          {result.pg > 0 && gap > 0 && (
            <div className="mt-8 rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
              <p className="text-sm font-medium text-primary">{t("survey.result_gap_title")}</p>
              <p className="mt-3 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
                {t("survey.result_gap_month", { m: gap })}
              </p>
              <p className="mt-2 text-lg text-muted-foreground">
                {t("survey.result_gap_year", { y: yearly.toLocaleString("de-DE") })}
              </p>
              <p className="mt-3 text-xs text-muted-foreground">{t("survey.result_gap_note")}</p>
            </div>
          )}

          <div className="mt-6 flex items-start gap-2 rounded-xl border border-border bg-secondary/50 p-4 text-sm text-muted-foreground">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span>{t("survey.disclaimer")}</span>
          </div>

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
                  setUnder3(null);
                  if (typeof window !== "undefined")
                    window.localStorage.removeItem(STORAGE_KEY);
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
    const nextStep = activeSteps[idx + 1];
    const movingToNewModule = !nextStep || nextStep.module !== currentModule;

    if (idx === activeSteps.length - 1) {
      setSavedBanner(currentModule);
      setDone(true);
      return;
    }
    if (movingToNewModule) {
      setSavedBanner(currentModule);
    }
    setIdx((i) => i + 1);
  }

  const showHalfway = step.module === 4;

  return (
    <PublicShell>
      <section className="mx-auto max-w-2xl px-4 py-12 md:py-16">
        {savedBanner != null && (
          <div
            role="status"
            className="mb-4 flex items-center gap-2 rounded-lg border border-accent/40 bg-accent/10 px-3 py-2 text-sm text-foreground"
          >
            <Check className="h-4 w-4 text-accent" />
            <span>{t("survey.module_complete_saved", { n: savedBanner })}</span>
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            {idx + 1} / {activeSteps.length}
          </span>
          <span className="font-medium text-foreground">
            {t("survey.module_progress", { n: step.module, total: totalModules })}
          </span>
        </div>

        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">{t("survey.autosave_hint")}</p>

        {showHalfway && (
          <div className="mt-4 rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-foreground">
            {t("survey.child.halfway")}
          </div>
        )}

        <h1 className="mt-8 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          {t(`survey.child.q.${step.id}`)}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {t(`survey.child.q.${step.id}_help`)}
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
            {idx === activeSteps.length - 1 ? t("survey.result_title") : t("common.next")}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </PublicShell>
  );
}

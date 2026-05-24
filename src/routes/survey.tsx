import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useMemo, useState } from "react";
import { PublicShell } from "@/components/layout/PublicShell";
import { ArrowLeft, ArrowRight, Info } from "lucide-react";

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

// 0 = independent, 1 = mostly, 2 = much help, 3 = fully
// behaviour: 0 never, 1 weekly, 2 daily, 3 several/day
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

function SurveyPage() {
  const { t } = useTranslation();
  const [profile, setProfile] = useState<"autism" | "elderly" | null>(null);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);

  const step = STEPS[idx];
  const progress = Math.round(((idx + (done ? 1 : 0)) / STEPS.length) * 100);

  const result = useMemo(() => {
    if (!done) return null;
    let raw = 0;
    let max = 0;
    for (const s of STEPS) {
      raw += (answers[s.id] ?? 0) * s.weight;
      max += 3 * s.weight;
    }
    const pct = (raw / max) * 100; // 0..100
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
    return (
      <PublicShell>
        <section className="mx-auto max-w-2xl px-4 py-16">
          <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            {t("survey.result_title")}
          </p>
          <h1 className="mt-2 text-5xl font-semibold tracking-tight text-foreground">
            {label}
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            {t("survey.result_explain", { label })}
          </p>
          <div className="mt-6 flex items-start gap-2 rounded-xl border border-border bg-secondary/50 p-4 text-sm text-muted-foreground">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span>{t("survey.disclaimer")}</span>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/pricing" className="rounded-md bg-primary px-5 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90">
              {t("survey.result_next")}
            </Link>
            <button
              onClick={() => { setAnswers({}); setIdx(0); setDone(false); setProfile(null); }}
              className="rounded-md border border-input bg-background px-5 py-3 text-base font-medium text-foreground hover:bg-secondary"
            >
              {t("survey.result_restart")}
            </button>
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

  return (
    <PublicShell>
      <section className="mx-auto max-w-2xl px-4 py-16">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            {idx + 1} / {STEPS.length}
          </span>
          <span>Modul {step.module}</span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
          <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
        </div>

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
                onClick={() => setAnswers((a) => ({ ...a, [step.id]: o.v }))}
                className={
                  "rounded-xl border p-4 text-left text-base transition-colors " +
                  (active
                    ? "border-primary bg-primary/5 text-foreground"
                    : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-secondary/40")
                }
                aria-pressed={active}
              >
                {o.label}
              </button>
            );
          })}
        </div>

        <div className="mt-10 flex items-center justify-between">
          <button
            onClick={() => setIdx((i) => Math.max(0, i - 1))}
            disabled={idx === 0}
            className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" /> {t("common.back")}
          </button>
          <button
            onClick={() => {
              if (idx === STEPS.length - 1) setDone(true);
              else setIdx((i) => i + 1);
            }}
            disabled={!canNext}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-40"
          >
            {idx === STEPS.length - 1 ? t("survey.result_title") : t("common.next")}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </PublicShell>
  );
}

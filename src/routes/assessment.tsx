import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { PublicShell } from "@/components/layout/PublicShell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  MODULES,
  SCALE_0_3,
  SCALE_FREQ,
  bracketPoints,
  pflegegradFromTotal,
  type Criterion,
} from "@/lib/mdk-criteria";
import { AlertCircle, CheckCircle2, FileText, Info, Lightbulb } from "lucide-react";

export const Route = createFileRoute("/assessment")({
  head: () => ({
    meta: [
      { title: "Full MDK assessment — Klara" },
      {
        name: "description",
        content:
          "Complete the full Pflegegrad assessment used by the MDK, with plain-language guidance for every criterion. Live scoring across all 6 NBA modules.",
      },
      { property: "og:title", content: "Full MDK assessment — Klara" },
      {
        property: "og:description",
        content: "Step through all 6 NBA modules with caregiver-friendly explanations and a live Pflegegrad estimate.",
      },
    ],
  }),
  component: AssessmentPage,
});

type Answers = Record<string, { value: number | null; notes: string }>;
const STORAGE_KEY = "klara.assessment.v1";

function loadAnswers(): Answers {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Answers) : {};
  } catch {
    return {};
  }
}

function AssessmentPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Answers>({});
  const [activeModule, setActiveModule] = useState("1");

  useEffect(() => {
    setAnswers(loadAnswers());
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  }, [answers]);

  function setAnswer(code: string, patch: Partial<Answers[string]>) {
    setAnswers((prev) => {
      const existing = prev[code] ?? { value: null, notes: "" };
      return { ...prev, [code]: { ...existing, ...patch } };
    });
  }

  const moduleResults = useMemo(() => {
    return MODULES.map((m) => {
      let raw = 0;
      let answered = 0;
      for (const c of m.criteria) {
        const a = answers[c.code];
        if (a?.value != null) {
          answered += 1;
          const w = c.weight ?? 1;
          raw += a.value * w;
        }
      }
      const weighted = bracketPoints(m.id, raw);
      return {
        id: m.id,
        title: m.titleEn,
        weightPct: m.weightPct,
        raw,
        weighted,
        answered,
        total: m.criteria.length,
      };
    });
  }, [answers]);

  const totalPoints = useMemo(() => {
    // M2 and M3 share 15% — use higher.
    const m2 = moduleResults.find((m) => m.id === 2)!.weighted;
    const m3 = moduleResults.find((m) => m.id === 3)!.weighted;
    const m1 = moduleResults.find((m) => m.id === 1)!.weighted;
    const m4 = moduleResults.find((m) => m.id === 4)!.weighted;
    const m5 = moduleResults.find((m) => m.id === 5)!.weighted;
    const m6 = moduleResults.find((m) => m.id === 6)!.weighted;
    return m1 + Math.max(m2, m3) + m4 + m5 + m6;
  }, [moduleResults]);

  const pg = pflegegradFromTotal(totalPoints);
  const totalAnswered = moduleResults.reduce((a, m) => a + m.answered, 0);
  const totalCriteria = moduleResults.reduce((a, m) => a + m.total, 0);
  const progress = Math.round((totalAnswered / totalCriteria) * 100);

  return (
    <PublicShell>
      <div className="container mx-auto px-4 py-10 lg:py-14">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
            <div>
              <Badge variant="secondary" className="mb-2">
                {t("assessment.pro_badge")}
              </Badge>
              <h1 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
                {t("assessment.title")}
              </h1>
              <p className="mt-2 max-w-2xl text-muted-foreground">
                {t("assessment.intro")}
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/survey">{t("assessment.try_quick")}</Link>
            </Button>
          </div>

          <ScoreSummary
            totalPoints={totalPoints}
            pg={pg}
            progress={progress}
            results={moduleResults}
          />

          <Alert className="mt-6">
            <Info className="h-4 w-4" />
            <AlertTitle>{t("assessment.alert_title")}</AlertTitle>
            <AlertDescription>
              {t("assessment.alert_body")}
            </AlertDescription>
          </Alert>

          <Tabs value={activeModule} onValueChange={setActiveModule} className="mt-8">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
              {MODULES.map((m) => {
                const r = moduleResults.find((x) => x.id === m.id)!;
                return (
                  <TabsTrigger key={m.id} value={String(m.id)} className="text-xs">
                    {t("assessment.tab_label", { n: m.id })}
                    <span className="ml-1 text-muted-foreground">
                      {r.answered}/{r.total}
                    </span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {MODULES.map((m) => {
              const r = moduleResults.find((x) => x.id === m.id)!;
              return (
                <TabsContent key={m.id} value={String(m.id)} className="mt-6">
                  <Card>
                    <CardHeader>
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <CardTitle className="text-xl">{m.titleEn}</CardTitle>
                          <p className="mt-1 text-sm text-muted-foreground">{m.titleDe}</p>
                        </div>
                        <Badge variant="outline">
                          {t("assessment.weight_of_total", { p: m.weightPct })}
                          {m.id === 2 || m.id === 3 ? t("assessment.shared_m2_m3") : ""}
                        </Badge>
                      </div>
                      <CardDescription className="pt-2">{m.description}</CardDescription>
                      <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                        <span>
                          {t("assessment.raw_weighted", { raw: r.raw })} <strong className="text-foreground">{r.weighted}</strong> {t("assessment.pts")}
                        </span>
                        <Progress value={(r.answered / r.total) * 100} className="h-1.5 max-w-xs" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="multiple" className="w-full">
                        {m.criteria.map((c) => (
                          <CriterionRow
                            key={c.code}
                            criterion={c}
                            answer={answers[c.code]}
                            onChange={(patch) => setAnswer(c.code, patch)}
                          />
                        ))}
                      </Accordion>

                      <div className="mt-6 flex justify-between">
                        <Button
                          variant="ghost"
                          disabled={m.id === 1}
                          onClick={() => setActiveModule(String(m.id - 1))}
                        >
                          {t("assessment.prev_module")}
                        </Button>
                        <Button
                          disabled={m.id === 6}
                          onClick={() => setActiveModule(String(m.id + 1))}
                        >
                          {t("assessment.next_module")}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              );
            })}
          </Tabs>

          <Card className="mt-8 border-accent/40 bg-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="h-5 w-5" /> {t("assessment.result_title")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">{pg.label}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {t("assessment.based_on", { p: totalPoints.toFixed(2) })}
              </p>
              <Separator className="my-4" />
              <p className="text-sm text-muted-foreground">
                {t("assessment.self_estimate")}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button asChild>
                  <Link to="/report">{t("assessment.generate_report")}</Link>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    if (confirm(t("assessment.clear_confirm"))) setAnswers({});
                  }}
                >
                  {t("common.restart")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PublicShell>
  );
}

function ScoreSummary({
  totalPoints,
  pg,
  progress,
  results,
}: {
  totalPoints: number;
  pg: { grade: number; label: string };
  progress: number;
  results: { id: number; title: string; weighted: number; weightPct: number }[];
}) {
  const { t } = useTranslation();
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <CardTitle className="text-base text-muted-foreground">{t("assessment.live_estimate")}</CardTitle>
            <p className="mt-1 text-3xl font-bold text-foreground">{pg.label}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-semibold text-foreground">{totalPoints.toFixed(1)}</p>
            <p className="text-xs text-muted-foreground">{t("assessment.of_100")}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Progress value={progress} className="h-2" />
        <p className="mt-2 text-xs text-muted-foreground">{t("assessment.percent_answered", { p: progress })}</p>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {results.map((r) => (
            <div key={r.id} className="rounded-md border bg-card p-2 text-center">
              <p className="text-xs text-muted-foreground">{t("assessment.tab_label", { n: r.id })}</p>
              <p className="text-sm font-semibold text-foreground">{r.weighted}</p>
              <p className="text-[10px] text-muted-foreground">/ {r.weightPct} max</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function CriterionRow({
  criterion,
  answer,
  onChange,
}: {
  criterion: Criterion;
  answer: { value: number | null; notes: string } | undefined;
  onChange: (patch: Partial<{ value: number | null; notes: string }>) => void;
}) {
  const { t } = useTranslation();
  const scale = criterion.scale === "freq" ? SCALE_FREQ : SCALE_0_3;
  const current = answer?.value ?? null;
  const answered = current != null;

  return (
    <AccordionItem value={criterion.code}>
      <AccordionTrigger className="hover:no-underline">
        <div className="flex w-full items-start gap-3 pr-2 text-left">
          {answered ? (
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          ) : (
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
          )}
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">
              <span className="text-muted-foreground">{criterion.code}</span>{" "}
              {criterion.en}
              {criterion.weight && criterion.weight > 1 ? (
                <Badge variant="secondary" className="ml-2 text-[10px]">
                  ×{criterion.weight}
                </Badge>
              ) : null}
            </p>
            <p className="text-xs text-muted-foreground">{criterion.de}</p>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4 pl-7">
          <div className="rounded-md bg-muted/40 p-3">
            <p className="text-sm text-foreground">
              <span className="font-medium">{t("assessment.in_plain_words")} </span>
              {criterion.paraphrase}
            </p>
            <p className="mt-2 flex items-start gap-2 text-xs text-muted-foreground">
              <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warning" />
              <span>{criterion.honest}</span>
            </p>
          </div>

          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {scale.map((opt) => {
              const selected = current === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onChange({ value: opt.value })}
                  className={`rounded-md border p-3 text-left text-sm transition ${
                    selected
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : "border-input bg-card hover:border-primary/40"
                  }`}
                >
                  <p className="font-medium text-foreground">{opt.labelEn}</p>
                  <p className="text-xs text-muted-foreground">{opt.labelDe}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{opt.hint}</p>
                </button>
              );
            })}
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground">
              {t("assessment.notes_label")}
            </label>
            <Textarea
              value={answer?.notes ?? ""}
              onChange={(e) => onChange({ notes: e.target.value })}
              placeholder={t("assessment.notes_placeholder")}
              className="mt-1"
              maxLength={1000}
            />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

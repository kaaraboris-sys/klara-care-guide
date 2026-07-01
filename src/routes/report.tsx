import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import { PublicShell } from "@/components/layout/PublicShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { FileText, Loader2, Printer, Sparkles, AlertCircle, Lock } from "lucide-react";

import {
  MODULES,
  bracketPoints,
  pflegegradFromTotal,
} from "@/lib/mdk-criteria";
import { TEMPLATES_RAW, resolveTemplate, type DiaryEntry } from "@/lib/diary-templates";
import { generateReport } from "@/lib/report.functions";

export const Route = createFileRoute("/report")({
  head: () => ({
    meta: [
      { title: "MDK preparation report — Klara" },
      {
        name: "description",
        content:
          "Klara turns your full MDK assessment answers and 14-day care diary into a one-page report you can hand to the Gutachter.",
      },
    ],
  }),
  component: ReportPage,
});

type Answers = Record<string, { value: number | null; notes: string }>;

const ASSESSMENT_KEY = "klara.assessment.v1";
const DIARY_KEY = "klara.diary.entries.v1";
const CHILD_SURVEY_KEY = "klara.survey.child.v1";

function loadAssessment(): Answers {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(ASSESSMENT_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function loadDiary(): DiaryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const v = JSON.parse(localStorage.getItem(DIARY_KEY) ?? "[]");
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

function ReportPage() {
  const { t, i18n } = useTranslation();
  const [answers, setAnswers] = useState<Answers>({});
  const [diary, setDiary] = useState<DiaryEntry[]>([]);
  const [template, setTemplate] = useState<"autism" | "elderly">("elderly");
  const [markdown, setMarkdown] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [subject, setSubject] = useState<"adult" | "child">("adult");

  const language: "en" | "de" = i18n.language?.startsWith("de") ? "de" : "en";

  const runReport = useServerFn(generateReport);

  useEffect(() => {
    setAnswers(loadAssessment());
    setDiary(loadDiary());
    // If the user took the child survey track, default report subject to "child".
    try {
      if (typeof window !== "undefined" && localStorage.getItem(CHILD_SURVEY_KEY)) {
        setSubject("child");
      }
    } catch {
      /* ignore */
    }
  }, []);


  const assessmentPayload = useMemo(() => {
    const modules = MODULES.map((m) => {
      let raw = 0;
      let answered = 0;
      const criteria = m.criteria.map((c) => {
        const a = answers[c.code];
        if (a?.value != null) {
          answered += 1;
          raw += (a.value ?? 0) * (c.weight ?? 1);
        }
        return {
          code: c.code,
          label: c.en,
          value: a?.value ?? null,
          notes: a?.notes || undefined,
        };
      });
      return {
        id: m.id,
        title: m.titleEn,
        raw,
        weighted: bracketPoints(m.id, raw),
        weightPct: m.weightPct,
        answered,
        total: m.criteria.length,
        criteria,
      };
    });
    const m1 = modules.find((x) => x.id === 1)!.weighted;
    const m2 = modules.find((x) => x.id === 2)!.weighted;
    const m3 = modules.find((x) => x.id === 3)!.weighted;
    const m4 = modules.find((x) => x.id === 4)!.weighted;
    const m5 = modules.find((x) => x.id === 5)!.weighted;
    const m6 = modules.find((x) => x.id === 6)!.weighted;
    const totalPoints = m1 + Math.max(m2, m3) + m4 + m5 + m6;
    return {
      totalPoints,
      pflegegrad: pflegegradFromTotal(totalPoints),
      modules,
    };
  }, [answers]);

  const diaryForTemplate = useMemo(
    () => diary.filter((d) => d.template === template),
    [diary, template],
  );

  const totalAnswered = assessmentPayload.modules.reduce((a, m) => a + m.answered, 0);
  const canGenerate = totalAnswered > 0 || diaryForTemplate.length > 0;

  async function onGenerate() {
    setLoading(true);
    setError(null);
    setMarkdown("");
    try {
      const result = await runReport({
        data: {
          language,
          subject,
          assessment: totalAnswered > 0 ? assessmentPayload : undefined,
          diary:
            diaryForTemplate.length > 0
              ? {
                  template,
                  entries: diaryForTemplate.map((e) => ({ date: e.date, values: e.values })),
                }
              : undefined,
        },
      });
      if (result.ok) {
        setMarkdown(result.markdown);
      } else {
        setError(result.error);
      }
    } catch (e) {
      console.error(e);
      setError(t("report.error_generic"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <PublicShell>
      <section className="bg-secondary/30 border-b border-border print:hidden">
        <div className="mx-auto max-w-4xl px-4 py-10">
          <Badge variant="secondary" className="mb-3">
            {t("report.pro_badge")}
          </Badge>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {t("report.title")}
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            {t("report.intro")}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-8 space-y-6">
        <Card className="print:hidden">
          <CardHeader>
            <CardTitle>{t("report.inputs_title")}</CardTitle>
            <CardDescription>
              {t("report.inputs_desc")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-md border p-3">
                <p className="text-xs text-muted-foreground">{t("report.criteria_answered")}</p>
                <p className="text-2xl font-semibold text-foreground">
                  {totalAnswered}
                  <span className="text-sm text-muted-foreground">
                    {" "}
                    / {assessmentPayload.modules.reduce((a, m) => a + m.total, 0)}
                  </span>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {t("report.live_estimate")} <strong>{t(assessmentPayload.pflegegrad.label)}</strong> ·{" "}
                  {assessmentPayload.totalPoints.toFixed(1)} {t("report.pts")}
                </p>
              </div>
              <div className="rounded-md border p-3">
                <p className="text-xs text-muted-foreground">{t("report.diary_entries")}</p>
                <p className="text-2xl font-semibold text-foreground">
                  {diaryForTemplate.length}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {t("report.template")}{" "}
                  <button
                    onClick={() =>
                      setTemplate(template === "elderly" ? "autism" : "elderly")
                    }
                    className="font-medium text-primary hover:underline"
                  >
                    {resolveTemplate(TEMPLATES_RAW[template], t as (k: string) => string).title} {t("report.switch")}
                  </button>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button onClick={onGenerate} disabled={!canGenerate || loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t("report.generating")}
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" /> {t("report.generate")}
                  </>
                )}
              </Button>
              {markdown && unlocked ? (
                <Button variant="outline" onClick={() => window.print()}>
                  <Printer className="mr-2 h-4 w-4" /> {t("report.print")}
                </Button>
              ) : null}
            </div>


            {!canGenerate ? (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>{t("report.nothing_title")}</AlertTitle>
                <AlertDescription>
                  {t("report.nothing_body_1")}
                  <Link to="/assessment" className="text-primary hover:underline">
                    {t("report.nothing_body_2")}
                  </Link>
                  {t("report.nothing_body_3")}
                  <Link to="/diary" className="text-primary hover:underline">
                    {t("report.nothing_body_4")}
                  </Link>
                  {t("report.nothing_body_5")}
                </AlertDescription>
              </Alert>
            ) : null}

            {error ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>{t("report.error_title")}</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : null}
          </CardContent>
        </Card>

        {markdown ? (
          <Card>
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  {unlocked ? t("report.your_report") : t("report.sample_preview")}
                </CardTitle>
                {!unlocked ? (
                  <Badge variant="secondary" className="gap-1">
                    <Lock className="h-3 w-3" /> {t("report.preview_only")}
                  </Badge>
                ) : null}
              </div>
              <CardDescription>
                {unlocked
                  ? t("report.draft_desc")
                  : t("report.estimated_grade", { grade: t(assessmentPayload.pflegegrad.label) })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Separator className="mb-4" />
              <div className="relative">
                <article
                  className={`prose prose-sm max-w-none dark:prose-invert prose-headings:text-foreground prose-strong:text-foreground prose-p:text-foreground prose-li:text-foreground ${
                    unlocked ? "" : "max-h-[420px] overflow-hidden"
                  }`}
                >
                  <ReactMarkdown>{markdown}</ReactMarkdown>
                </article>
                {!unlocked ? (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-card to-transparent" />
                ) : null}
              </div>
              {!unlocked ? (
                <div className="mt-6 rounded-lg border border-primary/30 bg-primary/5 p-5">
                  <div className="flex items-start gap-3">
                    <Lock className="mt-0.5 h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-foreground">
                        {t("report.unlock_title")}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {t("report.unlock_body")}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Button asChild>
                          <Link to="/pricing">{t("report.unlock_cta")}</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>
        ) : null}
      </section>
    </PublicShell>
  );
}


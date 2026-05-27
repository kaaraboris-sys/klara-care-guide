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
import { FileText, Loader2, Printer, Sparkles, AlertCircle } from "lucide-react";
import {
  MODULES,
  bracketPoints,
  pflegegradFromTotal,
} from "@/lib/mdk-criteria";
import { TEMPLATES, type DiaryEntry } from "@/lib/diary-templates";
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
  const { t } = useTranslation();
  const [answers, setAnswers] = useState<Answers>({});
  const [diary, setDiary] = useState<DiaryEntry[]>([]);
  const [template, setTemplate] = useState<"autism" | "elderly">("elderly");
  const [language, setLanguage] = useState<"en" | "de">("en");
  const [markdown, setMarkdown] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runReport = useServerFn(generateReport);

  useEffect(() => {
    setAnswers(loadAssessment());
    setDiary(loadDiary());
    if (typeof navigator !== "undefined" && navigator.language?.startsWith("de")) {
      setLanguage("de");
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
      setError("Something went wrong generating the report.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PublicShell>
      <section className="bg-secondary/30 border-b border-border print:hidden">
        <div className="mx-auto max-w-4xl px-4 py-10">
          <Badge variant="secondary" className="mb-3">
            Pro feature preview
          </Badge>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            MDK preparation report
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Klara reads your full assessment answers and your care diary, then drafts a
            one-page report you can print and bring to the assessor.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-8 space-y-6">
        <Card className="print:hidden">
          <CardHeader>
            <CardTitle>Inputs detected on this device</CardTitle>
            <CardDescription>
              Reports are generated from what you have already entered in the assessment and
              diary. Nothing is uploaded until you sign in.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-md border p-3">
                <p className="text-xs text-muted-foreground">Assessment criteria answered</p>
                <p className="text-2xl font-semibold text-foreground">
                  {totalAnswered}
                  <span className="text-sm text-muted-foreground">
                    {" "}
                    / {assessmentPayload.modules.reduce((a, m) => a + m.total, 0)}
                  </span>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Live estimate: <strong>{assessmentPayload.pflegegrad.label}</strong> ·{" "}
                  {assessmentPayload.totalPoints.toFixed(1)} pts
                </p>
              </div>
              <div className="rounded-md border p-3">
                <p className="text-xs text-muted-foreground">Diary entries</p>
                <p className="text-2xl font-semibold text-foreground">
                  {diaryForTemplate.length}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Template:{" "}
                  <button
                    onClick={() =>
                      setTemplate(template === "elderly" ? "autism" : "elderly")
                    }
                    className="font-medium text-primary hover:underline"
                  >
                    {TEMPLATES[template].title} (switch)
                  </button>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button onClick={onGenerate} disabled={!canGenerate || loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating…
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" /> Generate report
                  </>
                )}
              </Button>
              <div className="inline-flex rounded-md border p-0.5 text-sm">
                <button
                  onClick={() => setLanguage("en")}
                  className={`rounded px-3 py-1 ${language === "en" ? "bg-secondary text-foreground" : "text-muted-foreground"}`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage("de")}
                  className={`rounded px-3 py-1 ${language === "de" ? "bg-secondary text-foreground" : "text-muted-foreground"}`}
                >
                  Deutsch
                </button>
              </div>
              {markdown ? (
                <Button variant="outline" onClick={() => window.print()}>
                  <Printer className="mr-2 h-4 w-4" /> Print / Save as PDF
                </Button>
              ) : null}
            </div>

            {!canGenerate ? (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Nothing to summarise yet</AlertTitle>
                <AlertDescription>
                  Fill in at least a few items in the{" "}
                  <Link to="/assessment" className="text-primary hover:underline">
                    full assessment
                  </Link>{" "}
                  or the{" "}
                  <Link to="/diary" className="text-primary hover:underline">
                    care diary
                  </Link>{" "}
                  first.
                </AlertDescription>
              </Alert>
            ) : null}

            {error ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Could not generate report</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : null}
          </CardContent>
        </Card>

        {markdown ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Draft report
              </CardTitle>
              <CardDescription>
                Review and edit anything that doesn't match your day-to-day reality before
                printing.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Separator className="mb-4" />
              <article className="prose prose-sm max-w-none dark:prose-invert prose-headings:text-foreground prose-strong:text-foreground prose-p:text-foreground prose-li:text-foreground">
                <ReactMarkdown>{markdown}</ReactMarkdown>
              </article>
            </CardContent>
          </Card>
        ) : null}
      </section>
    </PublicShell>
  );
}

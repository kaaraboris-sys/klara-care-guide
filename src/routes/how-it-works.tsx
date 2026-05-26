import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { PublicShell } from "@/components/layout/PublicShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accessibility,
  Activity,
  Brain,
  HeartPulse,
  Sparkles,
  Users,
  AlertTriangle,
  Moon,
  Pill,
  Compass,
  Utensils,
  Eye,
  Repeat,
  Waves,
  MessageCircle,
  CalendarClock,
} from "lucide-react";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How Klara works — Pflegegrad explained" },
      {
        name: "description",
        content:
          "What Pflegegrad means, what each of the 5 grades implies, the 6 NBA modules, the assessment process, and special considerations for autism and elderly care.",
      },
      { property: "og:title", content: "How Klara works — Pflegegrad explained" },
      {
        property: "og:description",
        content:
          "Plain-language guide to the German Pflegegrad system, the NBA assessment, and how to prepare.",
      },
    ],
  }),
  component: HowPage,
});

const GRADES = [
  {
    n: 1,
    range: "12.5 – < 27 points",
    label: "Minor impairment of independence",
    implies:
      "Some help is needed in daily life, but the person is largely self-reliant. Limited cash benefit; access to counselling and minor relief services.",
  },
  {
    n: 2,
    range: "27 – < 47.5 points",
    label: "Significant impairment",
    implies:
      "Regular daily support needed. Eligible for care allowance (Pflegegeld), home-care services, day care, and respite care.",
  },
  {
    n: 3,
    range: "47.5 – < 70 points",
    label: "Severe impairment",
    implies:
      "Substantial support across most areas of daily life. Higher benefits, eligibility for residential or intensive home care.",
  },
  {
    n: 4,
    range: "70 – < 90 points",
    label: "Most severe impairment",
    implies:
      "Continuous, complex care needs. Full access to inpatient care benefits and the highest tier of home-care support.",
  },
  {
    n: 5,
    range: "≥ 90 points",
    label: "Most severe impairment with special demands",
    implies:
      "Maximum care needs — typically continuous supervision, complete dependence in self-care, or specialised medical needs. Highest benefit level.",
  },
];

const MODULES = [
  { icon: Activity, title: "1 · Mobility", weight: "10%", body: "Changing position, sitting, standing, walking, stairs." },
  { icon: Brain, title: "2 · Cognitive & communicative abilities", weight: "15% *", body: "Orientation, recognition, decisions, conversation." },
  { icon: Sparkles, title: "3 · Behaviour & psychological issues", weight: "15% *", body: "Meltdowns, aggression, anxiety, night-time disturbance." },
  { icon: HeartPulse, title: "4 · Self-care", weight: "40%", body: "Washing, dressing, toileting, eating (×3 weighted), drinking." },
  { icon: Pill, title: "5 · Coping with illness & therapy", weight: "20%", body: "Medication, injections, doctor visits, therapy, diet." },
  { icon: Users, title: "6 · Everyday life & social contacts", weight: "15%", body: "Structuring the day, planning activities, social contact." },
];

const AUTISM = [
  { icon: CalendarClock, text: "Prompting and supervision time required" },
  { icon: AlertTriangle, text: "Behavioural regulation episodes and triggers" },
  { icon: Waves, text: "Sensory needs and environmental adaptations" },
  { icon: MessageCircle, text: "Social communication support" },
  { icon: Repeat, text: "Structured daily routines needed" },
];

const ELDERLY = [
  { icon: AlertTriangle, text: "Fall incidents and near-falls" },
  { icon: Moon, text: "Night-time care interventions (most commonly underreported)" },
  { icon: Pill, text: "Medication management and compliance" },
  { icon: Compass, text: "Orientation and memory changes" },
  { icon: Utensils, text: "Meal preparation and nutrition support" },
];

function HowPage() {
  const { t } = useTranslation();
  const steps = ["s1", "s2", "s3", "s4"] as const;

  return (
    <PublicShell>
      <section className="mx-auto max-w-5xl px-4 py-16">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          {t("how.title")}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">{t("how.sub")}</p>

        {/* What is Pflegegrad */}
        <div className="mt-12 rounded-2xl border border-border bg-card p-8">
          <Badge variant="secondary" className="mb-3">The basics</Badge>
          <h2 className="text-2xl font-semibold text-foreground">What is a Pflegegrad?</h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            A <strong>Pflegegrad</strong> (care grade) is the level of long-term care need assigned
            under German social law (<em>SGB XI §15</em>). It determines which benefits a person and
            their family receive from the statutory long-term care insurance —
            cash allowances, home-care services, day care, residential care, and aids.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The grade is decided after an assessment by the <strong>Medizinischer Dienst (MD/MDK)</strong>,
            using the <strong>Neues Begutachtungsassessment (NBA)</strong>. The assessor scores how
            independent the person is across six life domains, weights the scores, and adds them up.
            The total — from 0 to 100 points — maps to one of five grades.
          </p>
        </div>

        {/* The 5 grades */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-foreground">What each grade implies</h2>
          <p className="mt-2 text-muted-foreground">
            Higher grade = more support needs recognised, and more benefits unlocked.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {GRADES.map((g) => (
              <Card key={g.n} className="border-border">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-foreground font-semibold">
                      {g.n}
                    </span>
                    <div>
                      <CardTitle className="text-base">Pflegegrad {g.n}</CardTitle>
                      <p className="text-xs text-muted-foreground">{g.range}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm font-medium text-foreground">{g.label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{g.implies}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* The 6 modules */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-foreground">The 6 NBA modules</h2>
          <p className="mt-2 text-muted-foreground">
            Each module is scored, then weighted into the final total.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MODULES.map(({ icon: Icon, title, weight, body }) => (
              <div key={title} className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center justify-between">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <Badge variant="outline" className="text-xs">{weight}</Badge>
                </div>
                <h3 className="mt-3 text-sm font-semibold text-foreground">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            * Modules 2 and 3 share a single weighted contribution — only the higher of the two counts.
          </p>
        </div>

        {/* Assessment process flowchart */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-foreground">The assessment process</h2>
          <p className="mt-2 text-muted-foreground">
            From the first application to the official decision.
          </p>

          <div className="mt-8 rounded-2xl border border-border bg-card p-6 md:p-10">
            <ol className="flex flex-col gap-0">
              {[
                { t: "1 · Apply to the care insurance (Pflegekasse)", d: "A short written or phone application — benefits start from the application date." },
                { t: "2 · MD/MDK schedules a home visit", d: "Usually within a few weeks. You'll receive a date by post." },
                { t: "3 · Prepare with Klara", d: "Run the quick check, fill the 14-day diary, work through the full assessment. Generate your AI report." },
                { t: "4 · Assessor visit (60–90 min)", d: "The assessor observes, asks questions across all 6 modules, and takes notes." },
                { t: "5 · Scoring & weighting", d: "Raw scores per module → weighted points → total out of 100." },
                { t: "6 · Decision letter", d: "The Pflegekasse issues the Pflegegrad in writing, typically within 25 working days." },
                { t: "7 · Objection (Widerspruch) — if needed", d: "You have 1 month to formally object. A new assessment can be requested." },
              ].map((s, i, arr) => (
                <li key={s.t} className="relative flex gap-4 pb-6 last:pb-0">
                  <div className="flex flex-col items-center">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                      {i + 1}
                    </div>
                    {i < arr.length - 1 && (
                      <div className="mt-1 w-px flex-1 bg-border" aria-hidden />
                    )}
                  </div>
                  <div className="pb-2 pt-1">
                    <p className="font-medium text-foreground">{s.t}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Special considerations */}
        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                <Accessibility className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Special considerations — autism</h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Autism-related support needs are often <strong>underestimated</strong> in standard
              assessments. Key areas to document:
            </p>
            <ul className="mt-4 space-y-3">
              {AUTISM.map(({ icon: Icon, text }) => (
                <li key={text} className="flex gap-3 text-sm text-foreground">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                <Eye className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Special considerations — elderly</h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Elderly people often <strong>minimise difficulties</strong> during formal assessments.
              Important areas to emphasise:
            </p>
            <ul className="mt-4 space-y-3">
              {ELDERLY.map(({ icon: Icon, text }) => (
                <li key={text} className="flex gap-3 text-sm text-foreground">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Original 4-step Klara workflow */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-foreground">How Klara helps, step by step</h2>
          <ol className="mt-6 space-y-4">
            {steps.map((s) => (
              <li key={s} className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground">{t(`how.${s}_title`)}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                  {t(`how.${s}_body`)}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            to="/survey"
            className="rounded-md bg-primary px-5 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90"
          >
            {t("home.cta_primary")}
          </Link>
          <Link
            to="/assessment"
            className="rounded-md border border-input bg-background px-5 py-3 text-base font-medium text-foreground hover:bg-secondary"
          >
            Full assessment
          </Link>
        </div>

        <p className="mt-8 text-xs text-muted-foreground">
          Reference: SGB XI §15 · Begutachtungs-Richtlinien (BRi) 2024. This page is informational
          and does not replace official MDK assessment or legal advice.
        </p>
      </section>
    </PublicShell>
  );
}

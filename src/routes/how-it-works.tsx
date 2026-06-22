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
import heroFamily from "@/assets/hero-family.jpg";
import careChild from "@/assets/care-child.jpg";
import careElderly from "@/assets/care-elderly.jpg";
import careNurse from "@/assets/care-nurse.jpg";

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

const GRADE_KEYS = ["g1", "g2", "g3", "g4", "g5"] as const;
const MOD_KEYS = ["m1", "m2", "m3", "m4", "m5", "m6"] as const;
const MOD_ICONS = [Activity, Brain, Sparkles, HeartPulse, Pill, Users] as const;
const MOD_WEIGHTS = ["10%", "15% *", "15% *", "40%", "20%", "15%"] as const;
const PROCESS_KEYS = ["p1", "p2", "p3", "p4", "p5", "p6", "p7"] as const;
const AUTISM_ICONS = [CalendarClock, AlertTriangle, Waves, MessageCircle, Repeat] as const;
const ELDERLY_ICONS = [AlertTriangle, Moon, Pill, Compass, Utensils] as const;
const AUTISM_KEYS = ["i1", "i2", "i3", "i4", "i5"] as const;

function HtmlText({ html }: { html: string }) {
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

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

        <img
          src={heroFamily}
          alt="A family caregiver, an elderly grandmother and a young child together at home"
          width={1920}
          height={1080}
          className="mt-10 aspect-[21/9] w-full rounded-3xl object-cover shadow-md ring-1 ring-border"
        />

        {/* What is Pflegegrad */}
        <div className="mt-12 rounded-2xl border border-border bg-card p-4 md:p-8">
          <Badge variant="secondary" className="mb-3">{t("how.basics_badge")}</Badge>
          <h2 className="text-2xl font-semibold text-foreground">{t("how.basics_title")}</h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            <HtmlText html={t("how.basics_p1")} />
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            <HtmlText html={t("how.basics_p2")} />
          </p>
        </div>

        {/* The 5 grades */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-foreground">{t("how.grades_title")}</h2>
          <p className="mt-2 text-muted-foreground">{t("how.grades_sub")}</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {GRADE_KEYS.map((g, i) => (
              <Card key={g} className="border-border">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-foreground font-semibold">
                      {i + 1}
                    </span>
                    <div>
                      <CardTitle className="text-base">{t("how.grade_label")} {i + 1}</CardTitle>
                      <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">{t(`how.grade.${g}_benefits`)}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm font-medium text-foreground">{t(`how.grade.${g}_label`)}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`how.grade.${g}_implies`)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">{t("how.benefits_note")}</p>
        </div>

        {/* Detailed benefits table */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-foreground">{t("how.benefits_table_title")}</h2>
          <p className="mt-2 text-muted-foreground">{t("how.benefits_table_sub")}</p>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full min-w-[760px] border-collapse text-sm">
              <thead className="bg-secondary/60">
                <tr className="text-left text-foreground">
                  <th className="px-4 py-3 font-semibold">{t("how.benefits_table.col_grade")}</th>
                  <th className="px-4 py-3 font-semibold">{t("how.benefits_table.col_cash")}</th>
                  <th className="px-4 py-3 font-semibold">{t("how.benefits_table.col_services")}</th>
                  <th className="px-4 py-3 font-semibold">{t("how.benefits_table.col_relief")}</th>
                  <th className="px-4 py-3 font-semibold">{t("how.benefits_table.col_short")}</th>
                  <th className="px-4 py-3 font-semibold">{t("how.benefits_table.col_respite")}</th>
                  <th className="px-4 py-3 font-semibold">{t("how.benefits_table.col_residential")}</th>
                </tr>
              </thead>
              <tbody>
                {GRADE_KEYS.map((g, i) => (
                  <tr key={g} className="border-t border-border">
                    <td className="px-4 py-3 font-medium text-foreground">
                      {t("how.grade_label")} {i + 1}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{t(`how.benefits_table.${g}_cash`)}</td>
                    <td className="px-4 py-3 text-muted-foreground">{t(`how.benefits_table.${g}_services`)}</td>
                    <td className="px-4 py-3 text-muted-foreground">{t(`how.benefits_table.${g}_relief`)}</td>
                    <td className="px-4 py-3 text-muted-foreground">{t(`how.benefits_table.${g}_short`)}</td>
                    <td className="px-4 py-3 text-muted-foreground">{t(`how.benefits_table.${g}_respite`)}</td>
                    <td className="px-4 py-3 text-muted-foreground">{t(`how.benefits_table.${g}_residential`)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">{t("how.benefits_table_note")}</p>
        </div>

        {/* The 6 modules */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-foreground">{t("how.mods_title")}</h2>
          <p className="mt-2 text-muted-foreground">{t("how.mods_sub")}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MOD_KEYS.map((k, i) => {
              const Icon = MOD_ICONS[i];
              return (
                <div key={k} className="rounded-xl border border-border bg-card p-5">
                  <div className="flex items-center justify-between">
                    <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge variant="outline" className="text-xs">{MOD_WEIGHTS[i]}</Badge>
                  </div>
                  <h3 className="mt-3 text-sm font-semibold text-foreground">{t(`how.mod.${k}_title`)}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t(`how.mod.${k}_body`)}</p>
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">{t("how.mods_note")}</p>
        </div>

        {/* Assessment process flowchart */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-foreground">{t("how.process_title")}</h2>
          <p className="mt-2 text-muted-foreground">{t("how.process_sub")}</p>

          <div className="mt-8 rounded-2xl border border-border bg-card p-6 md:p-10">
            <ol className="flex flex-col gap-0">
              {PROCESS_KEYS.map((p, i) => (
                <li key={p} className="relative flex gap-4 pb-6 last:pb-0">
                  <div className="flex flex-col items-center">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                      {i + 1}
                    </div>
                    {i < PROCESS_KEYS.length - 1 && (
                      <div className="mt-1 w-px flex-1 bg-border" aria-hidden />
                    )}
                  </div>
                  <div className="pb-2 pt-1">
                    <p className="font-medium text-foreground">{t(`how.process.${p}_t`)}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t(`how.process.${p}_d`)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Special considerations */}
        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <img
              src={careChild}
              alt="Parent calmly playing with an autistic child"
              width={1920}
              height={1080}
              loading="lazy"
              className="aspect-[16/9] w-full object-cover"
            />
            <div className="p-6">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Accessibility className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">{t("how.autism_title")}</h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                <HtmlText html={t("how.autism_intro")} />
              </p>
              <ul className="mt-4 space-y-3">
                {AUTISM_KEYS.map((k, i) => {
                  const Icon = AUTISM_ICONS[i];
                  return (
                    <li key={k} className="flex gap-3 text-sm text-foreground">
                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{t(`how.autism.${k}`)}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <img
              src={careElderly}
              alt="Adult daughter holding her elderly mother's hand at home"
              width={1920}
              height={1080}
              loading="lazy"
              className="aspect-[16/9] w-full object-cover"
            />
            <div className="p-6">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Eye className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">{t("how.elderly_title")}</h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                <HtmlText html={t("how.elderly_intro")} />
              </p>
              <ul className="mt-4 space-y-3">
                {AUTISM_KEYS.map((k, i) => {
                  const Icon = ELDERLY_ICONS[i];
                  return (
                    <li key={k} className="flex gap-3 text-sm text-foreground">
                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{t(`how.elderly.${k}`)}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* Mid-page assessment-process visual */}
        <img
          src={careNurse}
          alt="A home-care nurse assisting an elderly man with a walker"
          width={1920}
          height={1080}
          loading="lazy"
          className="mt-16 aspect-[21/9] w-full rounded-3xl object-cover shadow-md ring-1 ring-border"
        />

        {/* Original 4-step Klara workflow */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-foreground">{t("how.klara_steps_title")}</h2>
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
            {t("how.full_assessment_cta")}
          </Link>
        </div>

        <p className="mt-8 text-xs text-muted-foreground">{t("how.reference")}</p>
      </section>
    </PublicShell>
  );
}

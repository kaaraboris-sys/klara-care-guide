import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PublicShell } from "@/components/layout/PublicShell";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Preise / Pricing — Klara" },
      {
        name: "description",
        content:
          "Einmalig 9 Euro fuer den Vorbereitungs-Report. Kein Abo, keine versteckten Kosten.",
      },
      { property: "og:title", content: "Preise / Pricing — Klara" },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  const { t } = useTranslation();

  const reportItems = t("pricing.report_items", { returnObjects: true }) as string[];
  const widerspruchItems = t("pricing.widerspruch_items", { returnObjects: true }) as string[];

  return (
    <PublicShell>
      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            {t("pricing.title")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("pricing.sub")}
          </p>
          <p className="mx-auto mt-4 inline-block rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
            {t("pricing.badge")}
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Noch unsicher?{" "}
          <a href="/survey" className="font-medium text-primary underline-offset-4 hover:underline">
            Starten Sie zuerst den kostenlosen 5-Minuten-Check
          </a>{" "}
          — kein Login erforderlich.
        </p>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Not sure yet?{" "}
          <a href="/survey" className="font-medium text-primary underline-offset-4 hover:underline">
            Try the free 5-minute check first
          </a>{" "}
          — no account needed.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="flex flex-col rounded-2xl border border-border bg-card p-5 md:p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-foreground">{t("pricing.report_title")}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{t("pricing.report_sub")}</p>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-semibold text-foreground">{t("pricing.report_price")}</span>
              <span className="text-sm text-muted-foreground">{t("pricing.report_per")}</span>
            </div>
            <ul className="mt-6 flex-1 space-y-3">
              {reportItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href="/assessment"
              className="mt-8 inline-flex items-center justify-center rounded-md border border-input bg-background px-5 py-3 text-base font-medium text-foreground transition-colors hover:bg-secondary"
            >
              {t("pricing.report_cta")}
            </a>
          </div>
          <div className="flex flex-col rounded-2xl border border-primary bg-card p-5 md:p-8 shadow-sm ring-1 ring-primary/20">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-foreground">{t("pricing.widerspruch_title")}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{t("pricing.widerspruch_sub")}</p>
              </div>
              <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {t("pricing.widerspruch_badge")}
              </span>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-semibold text-foreground">{t("pricing.widerspruch_price")}</span>
              <span className="text-sm text-muted-foreground">{t("pricing.widerspruch_per")}</span>
            </div>
            <ul className="mt-6 flex-1 space-y-3">
              {widerspruchItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href="/assessment"
              className="mt-8 inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {t("pricing.widerspruch_cta")}
            </a>
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-muted-foreground max-w-2xl mx-auto">
          {t("pricing.disclaimer")}
        </p>
      </section>
    </PublicShell>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";
import { PublicShell } from "@/components/layout/PublicShell";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Klara" },
      { name: "description", content: "Free Pflegegrad information and a 5-minute check. Pro unlocks the full MDK assessment and AI report." },
      { property: "og:title", content: "Klara pricing" },
      { property: "og:description", content: "Free and Pro plans." },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  const { t } = useTranslation();
  const freeItems = t("pricing.free_items", { returnObjects: true }) as string[];
  const proItems = t("pricing.pro_items", { returnObjects: true }) as string[];

  return (
    <PublicShell>
      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            {t("pricing.title")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{t("pricing.sub")}</p>
          <p className="mx-auto mt-4 inline-block rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
            {t("pricing.frame")}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <PlanCard
            title={t("pricing.free_title")}
            price={t("pricing.free_price")}
            per={t("pricing.free_per")}
            items={freeItems}
            cta={t("pricing.cta_free")}
            ctaTo="/survey"
          />
          <PlanCard
            title={t("pricing.pro_title")}
            price={t("pricing.pro_price")}
            per={t("pricing.pro_per")}
            items={proItems}
            cta={t("pricing.cta_pro")}
            ctaTo="/survey"
            highlighted
          />
        </div>
      </section>
    </PublicShell>
  );
}

function PlanCard({
  title, price, per, items, cta, ctaTo, highlighted,
}: {
  title: string; price: string; per: string; items: string[];
  cta: string; ctaTo: string; highlighted?: boolean;
}) {
  return (
    <div
      className={
        "flex flex-col rounded-2xl border bg-card p-8 shadow-sm " +
        (highlighted ? "border-primary ring-1 ring-primary/20" : "border-border")
      }
    >
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-4xl font-semibold text-foreground">{price}</span>
        <span className="text-sm text-muted-foreground">/ {per}</span>
      </div>
      <ul className="mt-6 flex-1 space-y-3">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-3 text-sm text-foreground">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
      <Link
        to={ctaTo}
        className={
          "mt-8 inline-flex items-center justify-center rounded-md px-5 py-3 text-base font-medium transition-colors " +
          (highlighted
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "border border-input bg-background text-foreground hover:bg-secondary")
        }
      >
        {cta}
      </Link>
    </div>
  );
}

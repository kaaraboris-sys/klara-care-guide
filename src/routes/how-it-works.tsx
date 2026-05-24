import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { PublicShell } from "@/components/layout/PublicShell";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How Klara works — Klara" },
      { name: "description", content: "Klara guides caregivers through the German Pflegegrad assessment in four clear steps." },
      { property: "og:title", content: "How Klara works" },
      { property: "og:description", content: "Four steps from application to the MDK visit." },
    ],
  }),
  component: HowPage,
});

function HowPage() {
  const { t } = useTranslation();
  const steps = ["s1", "s2", "s3", "s4"] as const;
  return (
    <PublicShell>
      <section className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          {t("how.title")}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">{t("how.sub")}</p>

        <ol className="mt-12 space-y-6">
          {steps.map((s) => (
            <li key={s} className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-xl font-semibold text-foreground">
                {t(`how.${s}_title`)}
              </h2>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                {t(`how.${s}_body`)}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link to="/survey" className="rounded-md bg-primary px-5 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90">
            {t("home.cta_primary")}
          </Link>
          <Link to="/modules" className="rounded-md border border-input bg-background px-5 py-3 text-base font-medium text-foreground hover:bg-secondary">
            {t("nav.modules")}
          </Link>
        </div>
      </section>
    </PublicShell>
  );
}

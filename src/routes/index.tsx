import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { PublicShell } from "@/components/layout/PublicShell";
import { ArrowRight, ClipboardCheck, BookOpen, FileText, Sparkles, Heart, Users } from "lucide-react";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const { t } = useTranslation();
  const features = [
    { icon: ClipboardCheck, k: "feat1" },
    { icon: BookOpen, k: "feat2" },
    { icon: FileText, k: "feat3" },
    { icon: Sparkles, k: "feat4" },
  ] as const;

  return (
    <PublicShell>
      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-b from-secondary/40 to-background">
        <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
              NBA · SGB XI §15 · BRi 2024
            </span>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              {t("home.hero_title")}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
              {t("home.hero_sub")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/survey"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {t("home.cta_primary")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/how-it-works"
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-5 py-3 text-base font-medium text-foreground transition-colors hover:bg-secondary"
              >
                {t("home.cta_secondary")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid items-start gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              {t("home.trust_title")}
            </h2>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            {t("home.trust_body")}
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-border bg-secondary/30">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            {t("home.features_title")}
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, k }) => (
              <div
                key={k}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm"
              >
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent/30 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">
                  {t(`home.${k}_title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(`home.${k}_body`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For whom */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          {t("home.for_who_title")}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {t("home.for_who_body")}
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent/30 text-primary">
                <Heart className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {t("home.autism_title")}
              </h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t("home.autism_body")}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent/30 text-primary">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {t("home.elderly_title")}
              </h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t("home.elderly_body")}
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-3 rounded-2xl border border-border bg-secondary/40 p-8 text-center">
          <div className="w-full">
            <h3 className="text-xl font-semibold text-foreground">
              {t("home.cta_primary")}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("survey.disclaimer")}
            </p>
          </div>
          <Link
            to="/survey"
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90"
          >
            {t("common.start")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </PublicShell>
  );
}

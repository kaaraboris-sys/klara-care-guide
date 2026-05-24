import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { PublicShell } from "@/components/layout/PublicShell";

export const Route = createFileRoute("/modules")({
  head: () => ({
    meta: [
      { title: "The 6 NBA modules — Klara" },
      { name: "description", content: "How the German Pflegegrad is calculated: what each of the six NBA modules really measures." },
      { property: "og:title", content: "The 6 NBA modules explained" },
      { property: "og:description", content: "What each module of the German MDK assessment scores." },
    ],
  }),
  component: ModulesPage,
});

function ModulesPage() {
  const { t } = useTranslation();
  const mods = ["m1", "m2", "m3", "m4", "m5", "m6"] as const;
  return (
    <PublicShell>
      <section className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          {t("modules.title")}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">{t("modules.sub")}</p>
        <div className="mt-12 space-y-4">
          {mods.map((m, i) => (
            <article key={m} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-start gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground font-semibold">
                  {i + 1}
                </span>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    {t(`modules.${m}_title`)}
                  </h2>
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                    {t(`modules.${m}_body`)}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PublicShell>
  );
}

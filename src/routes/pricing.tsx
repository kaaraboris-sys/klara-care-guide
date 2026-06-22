import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PublicShell } from "@/components/layout/PublicShell";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Preise — Klara" },
      {
        name: "description",
        content:
          "Einmalig 9 Euro fuer den Vorbereitungs-Report. Kein Abo, keine versteckten Kosten.",
      },
      { property: "og:title", content: "Preise — Klara" },
      {
        property: "og:description",
        content: "Einmalig 9 Euro fuer den Vorbereitungs-Report. Kein Abo, keine versteckten Kosten.",
      },
    ],
  }),
  component: PricingPage,
});

const reportItems = [
  "5-Minuten-Pflegegrad-Check (kostenlos, ohne Login)",
  "14-Tage-Pflegetagebuch (Autismus- und Senioren-Track)",
  "Vollstaendiges MDK-Assessment mit allen 6 NBA-Modulen",
  "Verstaendliche Erklaerung jeder Beurteilungsfrage",
  "KI-generierter Ein-Seiten-PDF-Report fuer den Begutachtungstermin",
  "30-Tage-Geld-zurueck-Garantie",
];

const widerspruchItems = [
  "Alles aus dem Vorbereitungs-Report",
  "KI-generierter Widerspruch-Brief mit Ihren Tagebuchbelegen",
  "Coaching-Skript: Was Sie sagen, wenn die Pflegekasse anruft",
  "Checkliste der beizufuegenden Unterlagen",
  "30-Tage-Geld-zurueck-Garantie",
];

function PricingPage() {
  return (
    <PublicShell>
      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Zwei Produkte. Ein Ziel.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Die meisten Familien brauchen nur den Report. Das Widerspruch-Paket ist fuer die kleinere Zahl, deren Ergebnis niedriger ausgefallen ist als erwartet.
          </p>
          <p className="mx-auto mt-4 inline-block rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
            Einmalige Zahlung · Kein Abo · Keine versteckten Kosten
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="flex flex-col rounded-2xl border border-border bg-card p-5 md:p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-foreground">Vorbereitungs-Report</h2>
            <p className="mt-1 text-sm text-muted-foreground">Fuer Familien vor der ersten Begutachtung</p>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-semibold text-foreground">9 Euro</span>
              <span className="text-sm text-muted-foreground">einmalig · kein Abo</span>
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
              href="/auth"
              className="mt-8 inline-flex items-center justify-center rounded-md border border-input bg-background px-5 py-3 text-base font-medium text-foreground transition-colors hover:bg-secondary"
            >
              Report kaufen
            </a>
          </div>

          <div className="flex flex-col rounded-2xl border border-primary bg-card p-5 md:p-8 shadow-sm ring-1 ring-primary/20">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Widerspruch-Paket</h2>
                <p className="mt-1 text-sm text-muted-foreground">Fuer Familien, deren Ergebnis zu niedrig war</p>
              </div>
              <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                Empfohlen
              </span>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-semibold text-foreground">ab 19 Euro</span>
              <span className="text-sm text-muted-foreground">einmalig · kein Abo</span>
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
              href="/auth"
              className="mt-8 inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Paket kaufen
            </a>
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-muted-foreground max-w-2xl mx-auto">
          Klara ist kein Ersatz fuer offizielle MDK-Begutachtung oder Rechtsberatung. Prognosen sind Schaetzungen auf Basis oeffentlicher BRi-2024-Richtlinien.
        </p>
      </section>
    </PublicShell>
  );
}

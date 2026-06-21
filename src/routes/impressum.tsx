import { createFileRoute } from "@tanstack/react-router";
import { PublicShell } from "@/components/layout/PublicShell";

export const Route = createFileRoute("/impressum")({
  component: ImpressumPage,
});

function ImpressumPage() {
  return (
    <PublicShell>
      <div className="mx-auto max-w-2xl px-4 py-16">
        <h1 className="text-3xl font-bold text-foreground mb-8">Impressum</h1>
        <p className="text-sm text-muted-foreground mb-8">Angaben gemäß §5 TMG</p>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-3">Verantwortlich</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            [Vollständiger Name]<br />
            [Straße und Hausnummer]<br />
            [PLZ Ort]<br />
            Deutschland
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-3">Kontakt</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            E-Mail: [email@example.com]<br />
            Telefon: [+49 ...]
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-3">Hinweis</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Klara ist ein akademisches Prototyp-Projekt im Rahmen des Masterstudiengangs Digital Health an der Technischen Hochschule Deggendorf (THD), Campus Pfarrkirchen. Klara ist kein zugelassenes Medizinprodukt und ersetzt keine offizielle MDK-Begutachtung oder Rechtsberatung.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-3">Haftungsausschluss</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann jedoch keine Gewähr übernommen werden. Als Diensteanbieter sind wir gemäß §7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
          </p>
        </section>
      </div>
    </PublicShell>
  );
}

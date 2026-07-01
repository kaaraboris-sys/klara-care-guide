import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { PublicShell } from "@/components/layout/PublicShell";

export const Route = createFileRoute("/impressum")({
  component: ImpressumPage,
});

function ImpressumPage() {
  const { i18n } = useTranslation();
  const isDE = i18n.language === "de";

  return (
    <PublicShell>
      <div className="mx-auto max-w-2xl px-4 py-16">
        {isDE ? (
          <>
            <h1 className="text-2xl font-bold text-foreground mb-8 md:text-3xl">Impressum</h1>
            <p className="text-sm text-muted-foreground mb-8">Angaben gemäß §5 TMG</p>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-3">Verantwortlich</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Boris Nuhu Kaara<br />
                Auenweg 17<br />
                94032 Passau<br />
                Deutschland
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-3">Kontakt</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                E-Mail: kaaraboris@gmail.com<br />
                Telefon: +49 163 2116674
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
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-foreground mb-8 md:text-3xl">Legal Notice (Impressum)</h1>
            <p className="text-sm text-muted-foreground mb-8">Information pursuant to §5 TMG (German Telemedia Act)</p>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-3">Responsible Party</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Boris Nuhu Kaara<br />
                Auenweg 17<br />
                94032 Passau<br />
                Germany
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-3">Contact</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Email: kaaraboris@gmail.com<br />
                Phone: +49 163 2116674
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-3">Note</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Klara is an academic prototype project developed as part of the Digital Health master's program at the Deggendorf Institute of Technology (THD), Pfarrkirchen campus. Klara is not an approved medical device and does not replace an official MDK (Medical Service) assessment or legal advice.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-3">Disclaimer of Liability</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The content of this website has been created with the greatest care. However, we cannot guarantee the accuracy, completeness, or timeliness of the content. As a service provider, we are responsible for our own content on these pages in accordance with general laws pursuant to §7(1) TMG.
              </p>
            </section>
          </>
        )}
      </div>
    </PublicShell>
  );
}

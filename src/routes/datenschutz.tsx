import { createFileRoute } from "@tanstack/react-router";
import { PublicShell } from "@/components/layout/PublicShell";

export const Route = createFileRoute("/datenschutz")({
  component: DatenschutzPage,
});

function DatenschutzPage() {
  return (
    <PublicShell>
      <div className="mx-auto max-w-2xl px-4 py-16">
        <h1 className="text-3xl font-bold text-foreground mb-2">Datenschutzerklärung</h1>
        <p className="text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-md px-4 py-3 mb-8">
          Diese Datenschutzerklärung wurde für die spezifischen Datenflüsse von Klara erstellt. Bitte lassen Sie sie vor dem offiziellen Launch von einem Datenschutzanwalt prüfen.
        </p>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-3">1. Verantwortlicher</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Verantwortlicher im Sinne der DSGVO ist:<br />
            Boris Nuhu Kaara, Auenweg 17, 94032 Passau — siehe <a href="/impressum" className="underline hover:text-foreground">Impressum</a>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-3">2. Erhobene Daten und Rechtsgrundlagen</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            Wir verarbeiten folgende personenbezogene Daten:
          </p>
          <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
            <li><strong>Kontodaten</strong> (E-Mail-Adresse): Rechtsgrundlage Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung)</li>
            <li><strong>Pflegetagebuch-Einträge und Assessmentantworten</strong> (gesundheitsbezogene Daten): Rechtsgrundlage Art. 9 Abs. 2 lit. a DSGVO (ausdrückliche Einwilligung)</li>
            <li><strong>Zahlungsdaten</strong>: werden direkt von Stripe verarbeitet und nicht auf unseren Servern gespeichert</li>
            <li><strong>Technische Daten</strong> (IP-Adresse, Browser): Rechtsgrundlage Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-3">3. Speicherung</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Ihre Daten werden in der Datenbank von Supabase (EU-Region Frankfurt, AWS eu-central-1) gespeichert. Die Verbindung ist TLS-verschlüsselt. Daten werden bei Löschung Ihres Kontos auf Anfrage entfernt.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-3">4. Auftragsverarbeiter</h2>
          <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
            <li><strong>Supabase Inc.</strong> — Datenbankhosting (AVV vorhanden)</li>
            <li><strong>Stripe Inc.</strong> — Zahlungsabwicklung (AVV vorhanden)</li>
            <li><strong>Vercel Inc.</strong> — Hosting der Webanwendung (AVV vorhanden)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-3">5. Ihre Rechte</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Sie haben das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung (Art. 18) und Datenübertragbarkeit (Art. 20) gemäß DSGVO. Zur Ausübung dieser Rechte wenden Sie sich an: kaaraboris@gmail.com
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-3">6. Beschwerderecht</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Sie haben das Recht, sich bei der zuständigen Aufsichtsbehörde zu beschweren: Bayerisches Landesamt für Datenschutzaufsicht (BayLDA), Promenade 18, 91522 Ansbach, <a href="https://www.lda.bayern.de" className="underline hover:text-foreground" target="_blank" rel="noopener noreferrer">www.lda.bayern.de</a>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-3">7. Cookies</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Wir verwenden ausschließlich technisch notwendige Cookies (Session-Verwaltung) sowie optionale Analyse-Cookies, für die wir Ihre Einwilligung einholen. Sie können Ihre Cookie-Einstellungen jederzeit über den Banner am unteren Bildschirmrand ändern.
          </p>
        </section>
      </div>
    </PublicShell>
  );
}

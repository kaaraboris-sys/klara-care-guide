import { createFileRoute } from "@tanstack/react-router";
import { PublicShell } from "@/components/layout/PublicShell";

export const Route = createFileRoute("/datenschutz")({
  component: DatenschutzPage,
});

function DatenschutzPage() {
  return (
    <PublicShell>
      <div className="mx-auto max-w-2xl px-4 py-16">
        <h1 className="text-2xl font-bold text-foreground mb-2 md:text-3xl">Datenschutzerklärung</h1>

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
          <h2 className="text-lg font-semibold text-foreground mb-3">2a. Besonderheit: Testversion von Pflegetagebuch und vollständigem Assessment</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            Für die aktuelle Testphase gilt für das Pflegetagebuch und das vollständige Assessment (alle 6 NBA-Module) eine abweichende Verarbeitung:
          </p>
          <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
            <li>Ihre Eingaben (Tagebucheinträge, Assessmentantworten) werden ausschließlich lokal in Ihrem Browser verarbeitet (z. B. in sessionStorage) und nicht an unsere Server oder unsere Datenbank (Supabase) übermittelt oder dort gespeichert.</li>
            <li>Schließen Sie den Browser-Tab oder löschen Sie den Browserverlauf, gehen diese Eingaben verloren. Wir haben keinen Zugriff darauf und können sie nicht wiederherstellen.</li>
            <li>Eine Ausnahme besteht, wenn Sie aktiv den kostenpflichtigen PDF-Bericht anfordern: In diesem Fall werden Ihre zu diesem Zeitpunkt im Browser vorhandenen Antworten einmalig an unsere Server (Supabase Edge Function) übermittelt, um den Bericht zu erstellen. Die übermittelten Antworten selbst werden nach Erstellung des PDFs nicht dauerhaft in einer Datenbank gespeichert. Lediglich der Zahlungsvorgang über Stripe wird wie oben beschrieben verarbeitet.</li>
            <li>Diese abweichende Verarbeitung gilt nur für die Testversion. Die spätere reguläre Version mit Benutzerkonto wird wie in Abschnitt 2 und 3 beschrieben funktionieren und erfordert dann die dort genannte ausdrückliche Einwilligung.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-3">3. Speicherung</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Ihre Daten werden in der Datenbank von Supabase (EU-Region Frankfurt, AWS eu-central-1) gespeichert. Die Verbindung ist TLS-verschlüsselt. Daten werden bei Löschung Ihres Kontos auf Anfrage entfernt. Dies gilt nicht für das Pflegetagebuch und das vollständige Assessment in der aktuellen Testversion — siehe Abschnitt 2a.
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

import { createFileRoute } from "@tanstack/react-router";
import { PublicShell } from "@/components/layout/PublicShell";

export const Route = createFileRoute("/agb")({
  component: AgbPage,
});

function AgbPage() {
  return (
    <PublicShell>
      <div className="mx-auto max-w-2xl px-4 py-16">
        <h1 className="text-3xl font-bold text-foreground mb-2">Allgemeine Geschäftsbedingungen</h1>
        <p className="text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-md px-4 py-3 mb-8">
          Diese AGB sind ein Entwurf und müssen vor dem offiziellen Launch von einem Rechtsanwalt geprüft werden.
        </p>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-3">§1 Geltungsbereich</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Diese AGB gelten für alle Leistungen von Klara (betrieben von [Name], [Adresse]) gegenüber Verbrauchern im Sinne von §13 BGB.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-3">§2 Leistungsgegenstand</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            Klara bietet zwei digitale Produkte an:
          </p>
          <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
            <li><strong>Vorbereitungs-Report (€9,00 einmalig)</strong>: Digitaler Bericht zur Vorbereitung auf die MDK-Pflegegradbegutachtung, basierend auf Ihren Angaben im Pflegetagebuch und Assessment.</li>
            <li><strong>Widerspruch-Paket (ab €19,00 einmalig)</strong>: KI-gestützter Entwurf eines Widerspruchsschreibens nebst Coaching-Skript und Dokumenten-Checkliste.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-3">§3 Kein Ersatz für Rechts- oder Medizinberatung</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Klara ist ein Vorbereitungswerkzeug. Die Pflegegrad-Schätzung ist keine offizielle Begutachtung und hat keine rechtliche Bindungswirkung. Klara ersetzt weder einen zugelassenen Pflegeberater, einen Rechtsanwalt noch eine Begutachtung durch den MDK/Medicproof. Klara übernimmt keine Haftung für die Richtigkeit der Pflegegrad-Prognose.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-3">§4 Vertragsschluss und Zahlung</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Der Vertrag kommt mit Abschluss des Bezahlvorgangs über Stripe zustande. Alle Preise sind Endpreise inkl. gesetzlicher MwSt. Die Zahlung erfolgt einmalig; es entsteht kein Abonnement.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-3">§5 Widerrufsrecht und digitale Inhalte</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Bei digitalen Inhalten, die sofort nach Zahlung bereitgestellt werden, erlischt das Widerrufsrecht gemäß §356 Abs. 5 BGB, wenn der Verbraucher ausdrücklich zugestimmt hat, dass die Lieferung vor Ablauf der Widerrufsfrist beginnt, und seine Kenntnis davon bestätigt hat, dass er durch seine Zustimmung sein Widerrufsrecht verliert. Diese Zustimmung wird beim Kaufvorgang eingeholt. Weitere Informationen: <a href="/widerruf" className="underline hover:text-foreground">Widerrufsbelehrung</a>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-3">§6 Geld-zurück-Garantie</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Klara bietet eine 30-Tage-Geld-zurück-Garantie, wenn der tatsächlich festgestellte Pflegegrad mehr als eine Stufe unter der Klara-Schätzung liegt und Sie dies durch den offiziellen MDK-Bescheid nachweisen. Anfragen an: [email@example.com].
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-3">§7 Anwendbares Recht</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Es gilt deutsches Recht. Gerichtsstand ist [Ort], soweit gesetzlich zulässig.
          </p>
        </section>
      </div>
    </PublicShell>
  );
}

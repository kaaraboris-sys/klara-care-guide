import { createFileRoute } from "@tanstack/react-router";
import { PublicShell } from "@/components/layout/PublicShell";

export const Route = createFileRoute("/agb")({
  component: AgbPage,
});

function AgbPage() {
  return (
    <PublicShell>
      <div className="mx-auto max-w-2xl px-4 py-16">
        <h1 className="text-2xl font-bold text-foreground mb-2 md:text-3xl">Allgemeine Geschäftsbedingungen</h1>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-3">§1 Geltungsbereich</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Diese AGB gelten für alle Leistungen von Klara (betrieben von Boris Nuhu Kaara, Auenweg 17, 94032 Passau) gegenüber Verbrauchern im Sinne von §13 BGB.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-3">§2 Leistungsgegenstand</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            Klara bietet zwei digitale Produkte an:
          </p>
          <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside mb-4">
            <li><strong>Vorbereitungs-Report (€9,00 einmalig)</strong>: Digitaler Bericht zur Vorbereitung auf die MDK-Pflegegradbegutachtung, basierend auf Ihren Angaben im Pflegetagebuch und Assessment.</li>
            <li><strong>Widerspruch-Paket (€19,00 einmalig)</strong>: KI-gestützter Entwurf eines Widerspruchsschreibens nebst Coaching-Skript und Dokumenten-Checkliste.</li>
          </ul>
          <p className="text-sm text-muted-foreground leading-relaxed">
            In der aktuellen Testphase können das Pflegetagebuch und das vollständige Assessment kostenlos und ohne Kauf genutzt werden. Es entsteht hierbei kein Vertrag im Sinne dieser AGB. Ein Vertrag kommt erst zustande, wenn Sie aktiv den Vorbereitungs-Report oder das Widerspruch-Paket kostenpflichtig bestellen (siehe §4).
          </p>
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
          <h2 className="text-lg font-semibold text-foreground mb-3">§6 Anwendbares Recht</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Es gilt deutsches Recht. Gerichtsstand ist Passau, soweit gesetzlich zulässig.
          </p>
        </section>
      </div>
    </PublicShell>
  );
}

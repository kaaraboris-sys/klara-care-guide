import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { PublicShell } from "@/components/layout/PublicShell";

export const Route = createFileRoute("/agb")({
  component: AgbPage,
});

function AgbPage() {
  const { i18n } = useTranslation();
  const isDE = i18n.language === "de";

  return (
    <PublicShell>
      <div className="mx-auto max-w-2xl px-4 py-16">
        {isDE ? (
          <>
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
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-foreground mb-2 md:text-3xl">Terms and Conditions (AGB)</h1>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-3">§1 Scope</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                These Terms and Conditions apply to all services provided by Klara (operated by Boris Nuhu Kaara, Auenweg 17, 94032 Passau) to consumers within the meaning of §13 BGB (German Civil Code).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-3">§2 Subject of Services</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Klara offers two digital products:
              </p>
              <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside mb-4">
                <li><strong>Preparation Report (€9.00 one-time)</strong>: A digital report to help prepare for the MDK care-level (Pflegegrad) assessment, based on your entries in the care diary and assessment.</li>
                <li><strong>Appeal Package (€19.00 one-time)</strong>: An AI-assisted draft of an appeal letter along with a coaching script and document checklist.</li>
              </ul>
              <p className="text-sm text-muted-foreground leading-relaxed">
                During the current trial phase, the care diary and the full assessment can be used free of charge and without purchase. No contract within the meaning of these Terms is created by this. A contract is only formed once you actively place a paid order for the Preparation Report or the Appeal Package (see §4).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-3">§3 Not a Substitute for Legal or Medical Advice</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Klara is a preparation tool. The care-level (Pflegegrad) estimate is not an official assessment and has no legally binding effect. Klara does not replace a licensed care advisor, a lawyer, or an assessment by the MDK/Medicproof. Klara assumes no liability for the accuracy of the care-level forecast.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-3">§4 Conclusion of Contract and Payment</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The contract is formed upon completion of the payment process via Stripe. All prices are final prices including statutory VAT. Payment is a one-time payment; no subscription is created.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-3">§5 Right of Withdrawal and Digital Content</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                For digital content that is provided immediately after payment, the right of withdrawal expires pursuant to §356(5) BGB if the consumer has expressly agreed that delivery begins before the withdrawal period expires, and has confirmed their awareness that by giving this consent they lose their right of withdrawal. This consent is obtained during the purchase process. Further information: <a href="/widerruf" className="underline hover:text-foreground">Right of Withdrawal</a>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-3">§6 Applicable Law</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                German law applies. The place of jurisdiction is Passau, to the extent legally permissible.
              </p>
            </section>
          </>
        )}
      </div>
    </PublicShell>
  );
}

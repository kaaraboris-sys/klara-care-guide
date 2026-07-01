import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { PublicShell } from "@/components/layout/PublicShell";

export const Route = createFileRoute("/widerruf")({
  component: WiderrufPage,
});

function WiderrufPage() {
  const { i18n } = useTranslation();
  const isDE = i18n.language === "de";

  return (
    <PublicShell>
      <div className="mx-auto max-w-2xl px-4 py-16">
        {isDE ? (
          <>
            <h1 className="text-2xl font-bold text-foreground mb-8 md:text-3xl">Widerrufsbelehrung</h1>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-3">Widerrufsrecht</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.
              </p>
            </section>

            <section className="mb-8 bg-amber-50 border border-amber-200 rounded-md px-4 py-4">
              <h2 className="text-lg font-semibold text-amber-800 mb-3">Erlöschen des Widerrufsrechts bei digitalen Inhalten</h2>
              <p className="text-sm text-amber-700 leading-relaxed">
                Bei digitalen Inhalten, die nicht auf einem körperlichen Datenträger geliefert werden (z. B. PDF-Report, Widerspruchsschreiben), erlischt das Widerrufsrecht gemäß §356 Abs. 5 BGB vorzeitig, wenn Sie ausdrücklich zugestimmt haben, dass wir mit der Ausführung des Vertrags vor Ablauf der Widerrufsfrist beginnen, und Sie Ihre Kenntnis davon bestätigt haben, dass Sie durch Ihre Zustimmung Ihr Widerrufsrecht verlieren. Diese Zustimmung erteilen Sie durch Anklicken der entsprechenden Checkbox im Kaufvorgang.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-3">Ausübung des Widerrufs</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (Boris Nuhu Kaara, Auenweg 17, 94032 Passau, kaaraboris@gmail.com) mittels einer eindeutigen Erklärung (z. B. per E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.
              </p>
            </section>

            <section className="mb-8 border border-border rounded-md px-4 py-4">
              <h2 className="text-lg font-semibold text-foreground mb-3">Muster-Widerrufsformular</h2>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
{`An: Boris Nuhu Kaara, Auenweg 17, 94032 Passau, kaaraboris@gmail.com

Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über den Kauf der folgenden digitalen Leistung:

Bestellt am: _______________
Name des/der Verbraucher(s): _______________
E-Mail-Adresse: _______________

Datum: _______________
Unterschrift (nur bei Mitteilung auf Papier): _______________

(*) Unzutreffendes streichen.`}
              </p>
            </section>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-foreground mb-8 md:text-3xl">Right of Withdrawal</h1>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-3">Right of Withdrawal</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                You have the right to withdraw from this contract within fourteen days without giving any reason. The withdrawal period is fourteen days from the day the contract was concluded.
              </p>
            </section>

            <section className="mb-8 bg-amber-50 border border-amber-200 rounded-md px-4 py-4">
              <h2 className="text-lg font-semibold text-amber-800 mb-3">Expiry of the Right of Withdrawal for Digital Content</h2>
              <p className="text-sm text-amber-700 leading-relaxed">
                For digital content that is not supplied on a physical data carrier (e.g., PDF report, appeal letter), the right of withdrawal expires early pursuant to §356(5) BGB if you have expressly agreed that we begin performance of the contract before the withdrawal period expires, and you have confirmed your awareness that by giving this consent you lose your right of withdrawal. You give this consent by ticking the corresponding checkbox during the purchase process.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-3">Exercising the Right of Withdrawal</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                To exercise your right of withdrawal, you must inform us (Boris Nuhu Kaara, Auenweg 17, 94032 Passau, kaaraboris@gmail.com) of your decision to withdraw from this contract by means of a clear statement (e.g., by email). To meet the withdrawal deadline, it is sufficient that you send your notice of withdrawal before the withdrawal period has expired.
              </p>
            </section>

            <section className="mb-8 border border-border rounded-md px-4 py-4">
              <h2 className="text-lg font-semibold text-foreground mb-3">Model Withdrawal Form</h2>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
{`To: Boris Nuhu Kaara, Auenweg 17, 94032 Passau, kaaraboris@gmail.com

I/we (*) hereby give notice that I/we (*) withdraw from my/our (*) contract for the purchase of the following digital service:

Ordered on: _______________
Name of consumer(s): _______________
Email address: _______________

Date: _______________
Signature (only if notified on paper): _______________

(*) Delete as applicable.`}
              </p>
            </section>
          </>
        )}
      </div>
    </PublicShell>
  );
}

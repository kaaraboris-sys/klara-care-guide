import { createFileRoute } from "@tanstack/react-router";
import { PublicShell } from "@/components/layout/PublicShell";

export const Route = createFileRoute("/widerruf")({
  component: WiderrufPage,
});

function WiderrufPage() {
  return (
    <PublicShell>
      <div className="mx-auto max-w-2xl px-4 py-16">
        <h1 className="text-3xl font-bold text-foreground mb-8">Widerrufsbelehrung</h1>

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
            Um Ihr Widerrufsrecht auszuüben, müssen Sie uns ([Name], [Adresse], [email@example.com]) mittels einer eindeutigen Erklärung (z. B. per E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.
          </p>
        </section>

        <section className="mb-8 border border-border rounded-md px-4 py-4">
          <h2 className="text-lg font-semibold text-foreground mb-3">Muster-Widerrufsformular</h2>
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
{`An: [Name], [Adresse], [email@example.com]

Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über den Kauf der folgenden digitalen Leistung:

Bestellt am: _______________
Name des/der Verbraucher(s): _______________
E-Mail-Adresse: _______________

Datum: _______________
Unterschrift (nur bei Mitteilung auf Papier): _______________

(*) Unzutreffendes streichen.`}
          </p>
        </section>
      </div>
    </PublicShell>
  );
}

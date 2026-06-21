import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";

const CONSENT_KEY = "klara_cookie_consent";
const CONSENT_EXPIRY_DAYS = 365;

function getStoredConsent(): { value: string; timestamp: number } | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function isConsentExpired(timestamp: number): boolean {
  const expiryMs = CONSENT_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
  return Date.now() - timestamp > expiryMs;
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = getStoredConsent();
    if (!stored || isConsentExpired(stored.timestamp)) {
      setVisible(true);
    }
  }, []);

  const saveConsent = (value: "accepted" | "rejected") => {
    localStorage.setItem(
      CONSENT_KEY,
      JSON.stringify({ value, timestamp: Date.now() })
    );
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Cookie-Einstellungen"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background shadow-lg"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Wir verwenden Cookies, um diese Website zu betreiben. Analyse-Cookies
          setzen wir nur mit Ihrer Zustimmung ein.{" "}
          <Link to="/datenschutz" className="underline hover:text-foreground">
            Mehr erfahren
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            onClick={() => saveConsent("rejected")}
            className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Nur notwendige
          </button>
          <button
            onClick={() => saveConsent("accepted")}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Alle akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}

import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const nav = [
    { to: "/how-it-works", label: t("nav.how") },
    { to: "/modules", label: t("nav.modules") },
    { to: "/survey", label: t("nav.survey") },
    { to: "/diary", label: "Care diary" },
    { to: "/assessment", label: "Full assessment" },
    { to: "/pricing", label: t("nav.pricing") },
  ] as const;

  const toggleLang = () => {
    const next = i18n.language?.startsWith("de") ? "en" : "de";
    i18n.changeLanguage(next);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <span
            aria-hidden
            className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground font-semibold"
          >
            K
          </span>
          <span className="text-lg font-semibold tracking-tight text-foreground">
            Klara
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "text-foreground bg-secondary" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <button
            onClick={toggleLang}
            className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label={t("common.language")}
          >
            <Globe className="h-4 w-4" />
            {i18n.language?.startsWith("de") ? "DE" : "EN"}
          </button>
          <Link
            to="/survey"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("home.cta_primary")}
          </Link>
        </div>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          "md:hidden border-t border-border bg-background",
          open ? "block" : "hidden",
        )}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-secondary"
            >
              {n.label}
            </Link>
          ))}
          <button
            onClick={() => {
              toggleLang();
              setOpen(false);
            }}
            className="flex items-center gap-2 rounded-md px-3 py-3 text-left text-base font-medium text-foreground hover:bg-secondary"
          >
            <Globe className="h-4 w-4" />
            {i18n.language?.startsWith("de") ? "Deutsch" : "English"}
          </button>
          <Link
            to="/survey"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-md bg-primary px-4 py-3 text-center text-base font-medium text-primary-foreground"
          >
            {t("home.cta_primary")}
          </Link>
        </div>
      </div>
    </header>
  );
}

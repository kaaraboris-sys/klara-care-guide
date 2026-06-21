import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

export function SiteFooter() {
  const { t, i18n } = useTranslation();

  const toggleLang = () => {
    const next = i18n.language?.startsWith("de") ? "en" : "de";
    i18n.changeLanguage(next);
  };

  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">

        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground font-semibold">
              K
            </span>
            <span className="text-lg font-semibold text-foreground">Klara</span>
          </div>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            {t("brand.tagline")}.
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            THD Digital Health Master's 2026
          </p>
          <button
            onClick={toggleLang}
            className="mt-4 inline-flex items-center gap-1.5 rounded-md border border-input bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label={t("common.language")}
          >
            <Globe className="h-3 w-3" />
            {i18n.language?.startsWith("de") ? "Deutsch / EN" : "English / DE"}
          </button>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground">Navigation</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/how-it-works" className="hover:text-foreground">{t("nav.how")}</Link></li>
            <li><Link to="/pricing" className="hover:text-foreground">{t("nav.pricing")}</Link></li>
            <li><Link to="/directory" className="hover:text-foreground">{t("nav.directory")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground">Rechtliches</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/impressum" className="hover:text-foreground">Impressum</Link></li>
            <li><Link to="/datenschutz" className="hover:text-foreground">Datenschutz</Link></li>
            <li><Link to="/agb" className="hover:text-foreground">AGB</Link></li>
            <li><Link to="/widerruf" className="hover:text-foreground">Widerruf</Link></li>
          </ul>
        </div>

      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-6 text-xs text-muted-foreground">
          {t("footer.disclaimer")}
        </p>
      </div>
    </footer>
  );
}

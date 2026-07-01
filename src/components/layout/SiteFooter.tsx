import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export function SiteFooter() {
  const { t } = useTranslation();

  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">

        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-primary text-primary-foreground text-sm font-bold">
              K
            </span>
            <span className="text-lg font-semibold text-foreground">lara</span>
          </div>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            {t("brand.tagline")}.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground">Navigation</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/how-it-works" className="hover:text-foreground">{t("nav.how")}</Link></li>
            <li><Link to="/assessment" className="hover:text-foreground">{t("nav.assessment")}</Link></li>
            <li><Link to="/diary" className="hover:text-foreground">{t("nav.diary")}</Link></li>
            <li><Link to="/pricing" className="hover:text-foreground">{t("nav.pricing")}</Link></li>
            <li><Link to="/directory" className="hover:text-foreground">{t("nav.directory")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground">{t("footer.legal_heading")}</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/impressum" className="hover:text-foreground">{t("footer.impressum")}</Link></li>
            <li><Link to="/datenschutz" className="hover:text-foreground">{t("footer.datenschutz")}</Link></li>
            <li><Link to="/agb" className="hover:text-foreground">{t("footer.agb")}</Link></li>
            <li><Link to="/widerruf" className="hover:text-foreground">{t("footer.widerruf")}</Link></li>
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

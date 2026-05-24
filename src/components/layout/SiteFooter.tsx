import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export function SiteFooter() {
  const { t } = useTranslation();
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground font-semibold">
              K
            </span>
            <span className="text-lg font-semibold text-foreground">Klara</span>
          </div>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            {t("brand.tagline")}.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground">
            {t("nav.home")}
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/how-it-works" className="hover:text-foreground">{t("nav.how")}</Link></li>
            <li><Link to="/modules" className="hover:text-foreground">{t("nav.modules")}</Link></li>
            <li><Link to="/survey" className="hover:text-foreground">{t("nav.survey")}</Link></li>
            <li><Link to="/pricing" className="hover:text-foreground">{t("nav.pricing")}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground">Klara</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>NBA · SGB XI §15</li>
            <li>BRi 2024</li>
            <li>THD Digital Health 2026</li>
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

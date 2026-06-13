import { Link, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Menu, X, Globe, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";

export function SiteHeader() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const nav = [
    { to: "/how-it-works", label: t("nav.how") },
    { to: "/modules", label: t("nav.modules") },
    { to: "/survey", label: t("nav.survey") },
    { to: "/diary", label: t("nav.diary") },
    { to: "/assessment", label: t("nav.assessment") },
    { to: "/directory", label: t("nav.directory") },
    { to: "/pricing", label: t("nav.pricing") },
  ] as const;

  const toggleLang = () => {
    const next = i18n.language?.startsWith("de") ? "en" : "de";
    i18n.changeLanguage(next);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/", replace: true });
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
          {isAuthenticated ? (
            <>
              <span className="hidden lg:inline max-w-[160px] truncate text-sm text-muted-foreground" title={user?.email ?? ""}>
                {user?.email}
              </span>
              <button
                onClick={handleSignOut}
                className="inline-flex items-center gap-1.5 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                <LogOut className="h-4 w-4" />
                {t("auth.signout")}
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth"
                className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {t("auth.signin")}
              </Link>
              <Link
                to="/auth"
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {t("home.cta_primary")}
              </Link>
            </>
          )}
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
          {isAuthenticated ? (
            <button
              onClick={() => {
                handleSignOut();
                setOpen(false);
              }}
              className="mt-2 flex items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-3 text-base font-medium text-foreground"
            >
              <LogOut className="h-4 w-4" />
              {t("auth.signout")}
            </button>
          ) : (
            <Link
              to="/auth"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-md bg-primary px-4 py-3 text-center text-base font-medium text-primary-foreground"
            >
              {t("auth.signin")}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

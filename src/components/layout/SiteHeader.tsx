import { Link, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Menu, X, Globe, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";


// Set to true to re-enable sign-in flow
const SHOW_AUTH = false;

export function SiteHeader() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const nav = [
    { to: "/how-it-works", label: t("nav.how") },
    { to: "/assessment", label: t("nav.assessment") },
    { to: "/diary", label: t("nav.diary") },
    { to: "/pricing", label: t("nav.pricing") },
    { to: "/directory", label: t("nav.directory") },
  ] as const;

  const toggleLang = () => {
    const next = i18n.language?.startsWith("de") ? "en" : "de";
    i18n.changeLanguage(next);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/", replace: true });
  };

  const langLabel = i18n.language?.startsWith("de") ? "EN" : "DE";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src="/klara-logo.png" alt="Klara" className="h-9 w-auto" />
        </Link>

        <nav aria-label="Hauptnavigation" className="hidden items-center gap-1 md:flex">
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
          {/* Language toggle — desktop */}
          <button
            onClick={toggleLang}
            className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Switch language"
          >
            <Globe className="h-4 w-4" />
            {langLabel}
          </button>

          {SHOW_AUTH && isAuthenticated ? (
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
          ) : SHOW_AUTH ? (
            <>
              <Link
                to="/auth"
                className="px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {t("auth.signin")}
              </Link>
              <Link
                to="/survey"
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {t("home.cta_primary")}
              </Link>
            </>
          ) : null}
        </div>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menue oeffnen"
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
          ))}         <button
            onClick={() => {
              toggleLang();
              setOpen(false);
            }}
            className="flex items-center gap-2 rounded-md px-3 py-3 text-left text-base font-medium text-foreground hover:bg-secondary"
          >
            <Globe className="h-4 w-4" />
            {i18n.language?.startsWith("de") ? "English" : "Deutsch"}
          </button>
          {SHOW_AUTH && isAuthenticated ? (
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
          ) : null}
        </div>
      </div>
    </header>
  );
}

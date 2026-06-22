import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { PublicShell } from "@/components/layout/PublicShell";
import { ArrowRight, ClipboardCheck, BookOpen, FileText, X } from "lucide-react";
import heroFamily from "@/assets/hero-family.jpg";
import careChild from "@/assets/care-child.jpg";
import careElderly from "@/assets/care-elderly.jpg";
import careNurse from "@/assets/care-nurse.jpg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const INTRO_KEY = "klara.intro.seen.v1";

function HomePage() {
  const { t } = useTranslation();
  const [introOpen, setIntroOpen] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(INTRO_KEY)) setIntroOpen(true);
    } catch {
      /* ignore */
    }
  }, []);

  const closeIntro = (remember: boolean) => {
    if (remember) {
      try {
        localStorage.setItem(INTRO_KEY, "1");
      } catch {
        /* ignore */
      }
    }
    setIntroOpen(false);
  };

  const steps = [
    { icon: ClipboardCheck, img: careChild, k: "s1" },
    { icon: BookOpen, img: careElderly, k: "s2" },
    { icon: FileText, img: careNurse, k: "s3" },
  ] as const;

  return (
    <PublicShell>
      {/* Hero — image-forward */}
      <section className="relative overflow-hidden border-b border-border bg-secondary/40">
        <img
          src={heroFamily}
          alt="Eine pflegende Tochter, eine aeltere Grossmutter und ein Kind in ruhigem Moment zu Hause"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/30" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 md:py-32">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full border border-border bg-background/90 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
              NBA · SGB XI §15 · BRi 2024
            </span>
            <h1 className="mt-5 text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
              {t("home.hero_title")}
            </h1>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/survey"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {t("home.cta_primary")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                onClick={() => setIntroOpen(true)}
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-5 py-3 text-base font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Wie funktioniert das?
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Three-step image walkthrough */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map(({ icon: Icon, img, k }) => (
            <div
              key={k}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={img}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute left-3 top-3 grid h-10 w-10 place-items-center rounded-lg bg-background/95 text-primary shadow">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-base font-semibold text-foreground">
                  {t(`intro.${k}_title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(`intro.${k}_body`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Visual diptych — for whom */}
      <section className="border-t border-border bg-secondary/30">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid gap-6 md:grid-cols-2">
            <Link
              to="/survey"
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border"
            >
              <img
                src={careChild}
                alt="Ein Elternteil unterstuetzt ein Kind mit Autismus beim Spielen"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="text-xl font-semibold text-foreground">
                  {t("home.autism_title")}
                </h3>
              </div>
            </Link>
            <Link
              to="/survey"
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border"
            >
              <img
                src={careElderly}
                alt="Eine Tochter haelt die Hand ihrer aelteren Mutter am Kuechentisch"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="text-xl font-semibold text-foreground">
                  {t("home.elderly_title")}
                </h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Compact value strip */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 md:p-8">
          <p className="text-xs font-medium uppercase tracking-wide text-primary">
            {t("home.hero_calc_title")}
          </p>
          <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="text-5xl font-bold text-foreground md:text-6xl">
              {t("home.hero_calc_month")}
            </span>
            <span className="text-lg text-muted-foreground">
              pro Monat
            </span>
          </div>
          <p className="mt-1 text-base font-medium text-muted-foreground">
            {t("home.hero_calc_year")} pro Jahr
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            {t("home.hero_calc_body")}.
          </p>
          <div className="mt-6">
            <Link
              to="/survey"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90"
            >
              {t("common.start")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* First-visit intro dialog */}
      <Dialog open={introOpen} onOpenChange={(o) => !o && closeIntro(true)}>
        <DialogContent className="max-w-3xl w-[calc(100vw-2rem)] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <span className="inline-flex w-fit items-center rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
              {t("intro.welcome_badge")}
            </span>
            <DialogTitle className="text-lg md:text-2xl">{t("intro.title")}</DialogTitle>
            <DialogDescription>{t("intro.sub")}</DialogDescription>
          </DialogHeader>

          <ol className="mt-2 grid gap-3 grid-cols-1 md:grid-cols-3">
            {steps.map(({ icon: Icon, img, k }) => (
              <li
                key={k}
                className="overflow-hidden rounded-xl border border-border bg-card flex md:flex-col gap-3"
              >
                <div className="hidden md:block relative aspect-[4/3]">
                  <img
                    src={img}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute left-2 top-2 grid h-8 w-8 place-items-center rounded-md bg-background/95 text-primary shadow">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
                <div className="md:hidden grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary m-3">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="p-4 flex-1">
                  <h4 className="text-sm font-semibold text-foreground">
                    {t(`intro.${k}_title`)}
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {t(`intro.${k}_body`)}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              onClick={() => closeIntro(true)}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
              {t("intro.skip")}
            </button>
            <Link
              to="/survey"
              onClick={() => closeIntro(true)}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              {t("intro.start")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </PublicShell>
  );
}

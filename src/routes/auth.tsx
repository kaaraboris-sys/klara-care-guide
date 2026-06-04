import { useEffect, useState } from "react";
import { createFileRoute, useNavigate, useSearch, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { PublicShell } from "@/components/layout/PublicShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

const searchSchema = z.object({ redirect: z.string().optional() });

export const Route = createFileRoute("/auth")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Sign in — Klara" },
      { name: "description", content: "Sign in or create an account to use Klara's care diary, assessment, and report tools." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const search = useSearch({ from: "/auth" });
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: search.redirect ?? "/diary" });
    });
  }, [navigate, search.redirect]);

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      if (tab === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: search.redirect ?? "/diary" });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/auth` },
        });
        if (error) throw error;
        setInfo(t("auth.check_email"));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError(null);
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + (search.redirect ?? "/diary"),
    });
    if (result.error) {
      setError(result.error instanceof Error ? result.error.message : String(result.error));
      setLoading(false);
      return;
    }
    if (result.redirected) return;
    navigate({ to: search.redirect ?? "/diary" });
  };

  return (
    <PublicShell>
      <div className="mx-auto flex max-w-md flex-col gap-6 px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle>{t("auth.title")}</CardTitle>
            <CardDescription>{t("auth.subtitle")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={tab} onValueChange={(v) => setTab(v as "signin" | "signup")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">{t("auth.signin")}</TabsTrigger>
                <TabsTrigger value="signup">{t("auth.signup")}</TabsTrigger>
              </TabsList>

              <div className="mt-6 space-y-4">
                <Button type="button" variant="outline" className="w-full" onClick={handleGoogle} disabled={loading}>
                  {t("auth.continue_google")}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">{t("auth.or")}</span>
                  </div>
                </div>

                <TabsContent value="signin" className="m-0">
                  <form onSubmit={handleEmail} className="space-y-4">
                    <EmailFields email={email} password={password} setEmail={setEmail} setPassword={setPassword} />
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {t("auth.signin")}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup" className="m-0">
                  <form onSubmit={handleEmail} className="space-y-4">
                    <EmailFields email={email} password={password} setEmail={setEmail} setPassword={setPassword} />
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {t("auth.create_account")}
                    </Button>
                  </form>
                </TabsContent>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                {info && (
                  <Alert>
                    <AlertDescription>{info}</AlertDescription>
                  </Alert>
                )}
              </div>
            </Tabs>
          </CardContent>
        </Card>
        <p className="text-center text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">← {t("common.back")}</Link>
        </p>
      </div>
    </PublicShell>
  );
}

function EmailFields({
  email, password, setEmail, setPassword,
}: { email: string; password: string; setEmail: (v: string) => void; setPassword: (v: string) => void }) {
  const { t } = useTranslation();
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="email">{t("auth.email")}</Label>
        <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">{t("auth.password")}</Label>
        <Input id="password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
      </div>
    </>
  );
}

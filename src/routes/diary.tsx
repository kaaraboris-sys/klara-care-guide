import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicShell } from "@/components/layout/PublicShell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CalendarDays, CheckCircle2, FileText, Info, Trash2 } from "lucide-react";
import { TEMPLATES, type DiaryEntry, type DiaryField, type DiaryTemplate } from "@/lib/diary-templates";

export const Route = createFileRoute("/diary")({
  head: () => ({
    meta: [
      { title: "Care diary — Klara" },
      {
        name: "description",
        content:
          "Klara's 14-day care diary captures the patterns the MDK assessor actually scores. Two templates: autism / developmental and elderly / disability.",
      },
      { property: "og:title", content: "Care diary — Klara" },
      {
        property: "og:description",
        content:
          "One short page per day. Klara turns 14 days of entries into a one-page MDK preparation report.",
      },
    ],
  }),
  component: DiaryPage,
});

const STORAGE_KEY = "klara.diary.entries.v1";
const TARGET_DAYS = 14;

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function loadEntries(): DiaryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as DiaryEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveEntries(entries: DiaryEntry[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function DiaryPage() {
  const [template, setTemplate] = useState<"autism" | "elderly">("elderly");
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState<string>(todayISO());
  const [values, setValues] = useState<Record<string, unknown>>({});

  useEffect(() => {
    setEntries(loadEntries());
  }, []);

  const tpl = TEMPLATES[template];

  // Load existing entry for selected date+template
  useEffect(() => {
    const existing = entries.find((e) => e.date === date && e.template === template);
    setValues(existing?.values ?? {});
  }, [date, template, entries]);

  const filtered = useMemo(
    () =>
      [...entries]
        .filter((e) => e.template === template)
        .sort((a, b) => b.date.localeCompare(a.date)),
    [entries, template],
  );

  const uniqueDays = filtered.length;
  const progress = Math.min(100, Math.round((uniqueDays / TARGET_DAYS) * 100));

  function setValue(key: string, val: unknown) {
    setValues((v) => ({ ...v, [key]: val }));
  }

  function saveEntry() {
    const next = entries.filter((e) => !(e.date === date && e.template === template));
    next.push({
      id: `${template}-${date}`,
      template,
      date,
      values,
      updatedAt: new Date().toISOString(),
    });
    next.sort((a, b) => b.date.localeCompare(a.date));
    setEntries(next);
    saveEntries(next);
  }

  function deleteEntry(id: string) {
    const next = entries.filter((e) => e.id !== id);
    setEntries(next);
    saveEntries(next);
  }

  return (
    <PublicShell>
      <section className="bg-secondary/30 border-b border-border">
        <div className="mx-auto max-w-5xl px-4 py-10">
          <Badge variant="secondary" className="mb-3">
            Pro feature · saving locally for now
          </Badge>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Care diary
          </h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            One short page per day. Aim for 14 consecutive days before your MDK visit — Klara
            will turn the entries into a one-page summary you can hand to the assessor.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-8 space-y-6">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Be honest, not modest</AlertTitle>
          <AlertDescription>
            The assessor rewards specific descriptions of how much help is actually needed —
            prompting, supervision and emotional regulation all count. Score a typical day,
            not your best day.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>Progress toward 14 days</CardTitle>
            <CardDescription>
              {uniqueDays} of {TARGET_DAYS} days logged for the{" "}
              <span className="font-medium text-foreground">{tpl.title}</span>.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={progress} />
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Button asChild size="sm">
                <Link to="/report">
                  <FileText className="mr-2 h-4 w-4" />
                  Generate AI report
                </Link>
              </Button>
              {uniqueDays >= TARGET_DAYS ? (
                <span className="inline-flex items-center gap-1 text-sm text-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  You have enough entries for a strong report.
                </span>
              ) : (
                <span className="text-xs text-muted-foreground">
                  Tip: 14 days gives the assessor the clearest picture, but you can generate a
                  draft any time.
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        <Tabs value={template} onValueChange={(v) => setTemplate(v as "autism" | "elderly")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="elderly">Elderly / disability</TabsTrigger>
            <TabsTrigger value="autism">Autism / developmental</TabsTrigger>
          </TabsList>

          {(Object.keys(TEMPLATES) as Array<"autism" | "elderly">).map((id) => (
            <TabsContent key={id} value={id} className="mt-6">
              <DiaryForm
                template={TEMPLATES[id]}
                date={date}
                onDateChange={setDate}
                values={values}
                onChange={setValue}
                onSave={saveEntry}
              />
            </TabsContent>
          ))}
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Entries — {tpl.title}</CardTitle>
            <CardDescription>Click an entry to load it for editing.</CardDescription>
          </CardHeader>
          <CardContent>
            {filtered.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No entries yet. Fill in today above and click Save.
              </p>
            ) : (
              <ul className="divide-y divide-border">
                {filtered.map((e) => (
                  <li key={e.id} className="flex items-center justify-between py-3">
                    <button
                      onClick={() => setDate(e.date)}
                      className="flex items-center gap-3 text-left text-sm text-foreground hover:text-primary"
                    >
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{e.date}</span>
                      <span className="text-muted-foreground">
                        · {Object.keys(e.values).length} fields filled
                      </span>
                    </button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteEntry(e.id)}
                      aria-label={`Delete entry for ${e.date}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </section>
    </PublicShell>
  );
}

function DiaryForm({
  template,
  date,
  onDateChange,
  values,
  onChange,
  onSave,
}: {
  template: DiaryTemplate;
  date: string;
  onDateChange: (d: string) => void;
  values: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
  onSave: () => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{template.title}</CardTitle>
        <CardDescription>{template.subtitle}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:gap-4">
          <div className="flex-1">
            <Label htmlFor="entry-date">Date of entry</Label>
            <Input
              id="entry-date"
              type="date"
              value={date}
              max={todayISO()}
              onChange={(e) => onDateChange(e.target.value)}
              className="mt-1"
            />
          </div>
          <Button onClick={onSave} className="sm:w-auto">
            Save entry
          </Button>
        </div>

        <Separator />

        <Accordion type="multiple" defaultValue={template.sections.slice(0, 2).map((s) => s.key)}>
          {template.sections.map((section) => (
            <AccordionItem key={section.key} value={section.key}>
              <AccordionTrigger>
                <span className="text-left">{section.title}</span>
              </AccordionTrigger>
              <AccordionContent>
                {section.intro ? (
                  <p className="mb-4 text-sm text-muted-foreground">{section.intro}</p>
                ) : null}
                <div className="space-y-5">
                  {section.fields.map((field) => (
                    <FieldRenderer
                      key={field.key}
                      field={field}
                      value={values[field.key]}
                      onChange={(v) => onChange(field.key, v)}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="flex justify-end">
          <Button onClick={onSave}>Save entry</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function FieldRenderer({
  field,
  value,
  onChange,
}: {
  field: DiaryField;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  const labelEl = (
    <div className="flex items-baseline justify-between gap-3">
      <Label className="text-sm font-medium text-foreground">{field.label}</Label>
      {field.module ? (
        <Badge variant="outline" className="text-[10px]">
          Module {field.module}
        </Badge>
      ) : null}
    </div>
  );

  if (field.type === "scale" || field.type === "frequency") {
    const opts = field.options ?? [];
    const v = typeof value === "string" ? value : "";
    return (
      <div className="space-y-2">
        {labelEl}
        {field.help ? <p className="text-xs text-muted-foreground">{field.help}</p> : null}
        <RadioGroup value={v} onValueChange={onChange} className="grid gap-2 sm:grid-cols-2">
          {opts.map((o) => (
            <label
              key={o.value}
              className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm cursor-pointer hover:bg-secondary/50"
            >
              <RadioGroupItem value={o.value} />
              <span>{o.label}</span>
            </label>
          ))}
        </RadioGroup>
      </div>
    );
  }

  if (field.type === "checks") {
    const opts = field.options ?? [];
    const arr = Array.isArray(value) ? (value as string[]) : [];
    return (
      <div className="space-y-2">
        {labelEl}
        <div className="grid gap-2 sm:grid-cols-2">
          {opts.map((o) => {
            const checked = arr.includes(o.value);
            return (
              <label
                key={o.value}
                className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm cursor-pointer hover:bg-secondary/50"
              >
                <Checkbox
                  checked={checked}
                  onCheckedChange={(c) => {
                    const next = c ? [...arr, o.value] : arr.filter((x) => x !== o.value);
                    onChange(next);
                  }}
                />
                <span>{o.label}</span>
              </label>
            );
          })}
        </div>
      </div>
    );
  }

  if (field.type === "duration") {
    const v = typeof value === "number" ? value : value ? Number(value) : "";
    return (
      <div className="space-y-2">
        {labelEl}
        <div className="flex items-center gap-2">
          <Input
            type="number"
            min={0}
            step={5}
            value={v as number | ""}
            onChange={(e) => onChange(e.target.value ? Number(e.target.value) : "")}
            className="w-32"
          />
          <span className="text-sm text-muted-foreground">minutes</span>
        </div>
      </div>
    );
  }

  // text
  const v = typeof value === "string" ? value : "";
  return (
    <div className="space-y-2">
      {labelEl}
      {field.help ? <p className="text-xs text-muted-foreground">{field.help}</p> : null}
      <Textarea
        value={v}
        onChange={(e) => onChange(e.target.value)}
        placeholder="A short note in your own words…"
        rows={3}
      />
    </div>
  );
}

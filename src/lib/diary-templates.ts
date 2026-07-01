// Care diary templates — all user-visible strings are i18n keys.
// Resolved at render time via useTemplates(t) in diary.tsx.

export type DiaryFieldType = "scale" | "frequency" | "duration" | "text" | "checks";

export type DiaryField = {
  key: string;
  labelKey: string;
  helpKey?: string;
  type: DiaryFieldType;
  module?: 1 | 2 | 3 | 4 | 5 | 6;
  optionsKey?: "scale" | "freq" | "mood";
};

export type DiarySection = {
  key: string;
  titleKey: string;
  introKey?: string;
  fields: DiaryField[];
};

export type DiaryTemplateRaw = {
  id: "autism" | "elderly";
  titleKey: string;
  subtitleKey: string;
  sections: DiarySection[];
};

// Resolved template (strings substituted) — used by components
export type DiaryTemplate = {
  id: "autism" | "elderly";
  title: string;
  subtitle: string;
  sections: Array<{
    key: string;
    title: string;
    intro?: string;
    fields: Array<{
      key: string;
      label: string;
      help?: string;
      type: DiaryFieldType;
      module?: 1 | 2 | 3 | 4 | 5 | 6;
      options?: { value: string; label: string }[];
    }>;
  }>;
};

export type DiaryEntry = {
  id: string;
  template: "autism" | "elderly";
  date: string; // YYYY-MM-DD
  values: Record<string, unknown>;
  updatedAt: string;
};

// ---------------------------------------------------------------------------
// Raw (key-based) template definitions
// ---------------------------------------------------------------------------

export const AUTISM_RAW: DiaryTemplateRaw = {
  id: "autism",
  titleKey: "diary.tpl.autism.title",
  subtitleKey: "diary.tpl.autism.subtitle",
  sections: [
    {
      key: "behaviour",
      titleKey: "diary.tpl.sec.behaviour",
      introKey: "diary.tpl.autism.behaviour_intro",
      fields: [
        { key: "meltdowns", labelKey: "diary.tpl.f.meltdowns", type: "frequency", module: 3, optionsKey: "freq" },
        { key: "aggression", labelKey: "diary.tpl.f.aggression", type: "frequency", module: 3, optionsKey: "freq" },
        { key: "refusal", labelKey: "diary.tpl.f.refusal", type: "frequency", module: 3, optionsKey: "freq" },
        { key: "mood", labelKey: "diary.tpl.f.mood", type: "checks", module: 3, optionsKey: "mood" },
        { key: "trigger_notes", labelKey: "diary.tpl.f.trigger_notes", helpKey: "diary.tpl.f.trigger_notes_help", type: "text" },
      ],
    },
    {
      key: "selfcare",
      titleKey: "diary.tpl.sec.selfcare",
      introKey: "diary.tpl.selfcare_intro",
      fields: [
        { key: "hygiene", labelKey: "diary.tpl.f.hygiene", type: "scale", module: 4, optionsKey: "scale" },
        { key: "dressing", labelKey: "diary.tpl.f.dressing", type: "scale", module: 4, optionsKey: "scale" },
        { key: "toileting", labelKey: "diary.tpl.f.toileting", type: "scale", module: 4, optionsKey: "scale" },
        { key: "eating", labelKey: "diary.tpl.f.eating", type: "scale", module: 4, optionsKey: "scale" },
        { key: "drinking", labelKey: "diary.tpl.f.drinking", type: "scale", module: 4, optionsKey: "scale" },
      ],
    },
    {
      key: "communication",
      titleKey: "diary.tpl.sec.communication",
      fields: [
        { key: "decisions", labelKey: "diary.tpl.f.decisions", type: "scale", module: 2, optionsKey: "scale" },
        { key: "conversation", labelKey: "diary.tpl.f.conversation", type: "scale", module: 2, optionsKey: "scale" },
        { key: "orientation", labelKey: "diary.tpl.f.orientation", type: "scale", module: 2, optionsKey: "scale" },
      ],
    },
    {
      key: "night",
      titleKey: "diary.tpl.sec.night",
      fields: [
        { key: "night_wakes", labelKey: "diary.tpl.f.night_wakes", type: "frequency", module: 3, optionsKey: "freq" },
        { key: "night_minutes", labelKey: "diary.tpl.f.night_minutes", type: "duration" },
        { key: "night_notes", labelKey: "diary.tpl.f.night_notes", type: "text" },
      ],
    },
    {
      key: "therapy",
      titleKey: "diary.tpl.sec.therapy",
      fields: [
        { key: "meds", labelKey: "diary.tpl.f.meds", type: "scale", module: 5, optionsKey: "scale" },
        { key: "appointments", labelKey: "diary.tpl.f.appointments", type: "text", module: 5 },
      ],
    },
    {
      key: "social",
      titleKey: "diary.tpl.sec.social",
      fields: [
        { key: "structure", labelKey: "diary.tpl.f.structure", type: "scale", module: 6, optionsKey: "scale" },
        { key: "contact", labelKey: "diary.tpl.f.contact", type: "scale", module: 6, optionsKey: "scale" },
        { key: "good_moment", labelKey: "diary.tpl.f.good_moment", type: "text" },
      ],
    },
  ],
};

export const ELDERLY_RAW: DiaryTemplateRaw = {
  id: "elderly",
  titleKey: "diary.tpl.elderly.title",
  subtitleKey: "diary.tpl.elderly.subtitle",
  sections: [
    {
      key: "mobility",
      titleKey: "diary.tpl.sec.mobility",
      introKey: "diary.tpl.elderly.mobility_intro",
      fields: [
        { key: "transfers", labelKey: "diary.tpl.f.transfers", type: "scale", module: 1, optionsKey: "scale" },
        { key: "walking", labelKey: "diary.tpl.f.walking", type: "scale", module: 1, optionsKey: "scale" },
        { key: "stairs", labelKey: "diary.tpl.f.stairs", type: "scale", module: 1, optionsKey: "scale" },
        { key: "falls", labelKey: "diary.tpl.f.falls", type: "frequency", module: 1, optionsKey: "freq" },
      ],
    },
    {
      key: "cognition",
      titleKey: "diary.tpl.sec.cognition",
      fields: [
        { key: "recognise", labelKey: "diary.tpl.f.recognise", type: "scale", module: 2, optionsKey: "scale" },
        { key: "orientation", labelKey: "diary.tpl.f.orientation", type: "scale", module: 2, optionsKey: "scale" },
        { key: "decisions", labelKey: "diary.tpl.f.decisions_elderly", type: "scale", module: 2, optionsKey: "scale" },
        { key: "confusion", labelKey: "diary.tpl.f.confusion", type: "frequency", module: 2, optionsKey: "freq" },
      ],
    },
    {
      key: "behaviour",
      titleKey: "diary.tpl.sec.behaviour",
      fields: [
        { key: "agitation", labelKey: "diary.tpl.f.agitation", type: "frequency", module: 3, optionsKey: "freq" },
        { key: "refusal", labelKey: "diary.tpl.f.refusal_care", type: "frequency", module: 3, optionsKey: "freq" },
        { key: "wandering", labelKey: "diary.tpl.f.wandering", type: "frequency", module: 3, optionsKey: "freq" },
        { key: "mood", labelKey: "diary.tpl.f.mood", type: "checks", module: 3, optionsKey: "mood" },
      ],
    },
    {
      key: "hygiene",
      titleKey: "diary.tpl.sec.hygiene",
      fields: [
        { key: "wash", labelKey: "diary.tpl.f.hygiene", type: "scale", module: 4, optionsKey: "scale" },
        { key: "dress", labelKey: "diary.tpl.f.dressing", type: "scale", module: 4, optionsKey: "scale" },
        { key: "toilet", labelKey: "diary.tpl.f.toileting", type: "scale", module: 4, optionsKey: "scale" },
        { key: "incontinence_pads", labelKey: "diary.tpl.f.incontinence_pads", type: "frequency", module: 4, optionsKey: "freq" },
      ],
    },
    {
      key: "meals",
      titleKey: "diary.tpl.sec.meals",
      fields: [
        { key: "eating", labelKey: "diary.tpl.f.eating", type: "scale", module: 4, optionsKey: "scale" },
        { key: "drinking", labelKey: "diary.tpl.f.drinking_fluids", type: "scale", module: 4, optionsKey: "scale" },
        { key: "appetite", labelKey: "diary.tpl.f.appetite", type: "text" },
      ],
    },
    {
      key: "night",
      titleKey: "diary.tpl.sec.night",
      fields: [
        { key: "night_wakes", labelKey: "diary.tpl.f.night_wakes", type: "frequency", module: 3, optionsKey: "freq" },
        { key: "night_minutes", labelKey: "diary.tpl.f.night_minutes", type: "duration" },
        { key: "night_notes", labelKey: "diary.tpl.f.night_notes", type: "text" },
      ],
    },
    {
      key: "therapy",
      titleKey: "diary.tpl.sec.therapy",
      fields: [
        { key: "meds", labelKey: "diary.tpl.f.meds", type: "scale", module: 5, optionsKey: "scale" },
        { key: "appointments", labelKey: "diary.tpl.f.appointments_doctor", type: "text", module: 5 },
        { key: "wound_care", labelKey: "diary.tpl.f.wound_care", type: "frequency", module: 5, optionsKey: "freq" },
      ],
    },
    {
      key: "social",
      titleKey: "diary.tpl.sec.social",
      fields: [
        { key: "structure", labelKey: "diary.tpl.f.structure", type: "scale", module: 6, optionsKey: "scale" },
        { key: "contact", labelKey: "diary.tpl.f.contact_elderly", type: "scale", module: 6, optionsKey: "scale" },
        { key: "good_moment", labelKey: "diary.tpl.f.good_moment", type: "text" },
      ],
    },
  ],
};

export const TEMPLATES_RAW: Record<"autism" | "elderly", DiaryTemplateRaw> = {
  autism: AUTISM_RAW,
  elderly: ELDERLY_RAW,
};

// ---------------------------------------------------------------------------
// Resolution helper — call inside a component with useTranslation()
// ---------------------------------------------------------------------------
type TFn = (key: string) => string;

function resolveOptions(key: "scale" | "freq" | "mood" | undefined, t: TFn) {
  if (!key) return undefined;
  if (key === "scale")
    return [
      { value: "0", label: t("diary.tpl.opt.independent") },
      { value: "1", label: t("diary.tpl.opt.mostly_independent") },
      { value: "2", label: t("diary.tpl.opt.needed_help") },
      { value: "3", label: t("diary.tpl.opt.fully_dependent") },
    ];
  if (key === "freq")
    return [
      { value: "0", label: t("diary.tpl.opt.not_today") },
      { value: "1", label: t("diary.tpl.opt.once") },
      { value: "2", label: t("diary.tpl.opt.two_three") },
      { value: "3", label: t("diary.tpl.opt.more_than_3") },
    ];
  // mood
  return [
    { value: "calm", label: t("diary.tpl.opt.calm") },
    { value: "anxious", label: t("diary.tpl.opt.anxious") },
    { value: "agitated", label: t("diary.tpl.opt.agitated") },
    { value: "withdrawn", label: t("diary.tpl.opt.withdrawn") },
    { value: "aggressive", label: t("diary.tpl.opt.aggressive") },
  ];
}

export function resolveTemplate(raw: DiaryTemplateRaw, t: TFn): DiaryTemplate {
  return {
    id: raw.id,
    title: t(raw.titleKey),
    subtitle: t(raw.subtitleKey),
    sections: raw.sections.map((s) => ({
      key: s.key,
      title: t(s.titleKey),
      intro: s.introKey ? t(s.introKey) : undefined,
      fields: s.fields.map((f) => ({
        key: f.key,
        label: t(f.labelKey),
        help: f.helpKey ? t(f.helpKey) : undefined,
        type: f.type,
        module: f.module,
        options: resolveOptions(f.optionsKey, t),
      })),
    })),
  };
}

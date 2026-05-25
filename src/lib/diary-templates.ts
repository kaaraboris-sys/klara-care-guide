// Care diary templates. Two variants — autism/developmental and elderly — designed
// around what the NBA / MDK assessor actually scores. Each field maps loosely to
// one or more NBA modules so the AI report can aggregate by module later.

export type DiaryFieldType = "scale" | "frequency" | "duration" | "text" | "checks";

export type DiaryField = {
  key: string;
  label: string;
  help?: string;
  type: DiaryFieldType;
  module?: 1 | 2 | 3 | 4 | 5 | 6;
  options?: { value: string; label: string }[];
};

export type DiarySection = {
  key: string;
  title: string;
  intro?: string;
  fields: DiaryField[];
};

export type DiaryTemplate = {
  id: "autism" | "elderly";
  title: string;
  subtitle: string;
  sections: DiarySection[];
};

const SCALE_HELP = [
  { value: "0", label: "Independent" },
  { value: "1", label: "Mostly independent (prompting)" },
  { value: "2", label: "Needed a lot of help" },
  { value: "3", label: "Fully dependent / I did it for them" },
];

const FREQ = [
  { value: "0", label: "Not today" },
  { value: "1", label: "Once" },
  { value: "2", label: "2–3 times" },
  { value: "3", label: "More than 3 times" },
];

const CHECKS_BASE = [
  { value: "calm", label: "Calm" },
  { value: "anxious", label: "Anxious" },
  { value: "agitated", label: "Agitated / restless" },
  { value: "withdrawn", label: "Withdrawn" },
  { value: "aggressive", label: "Aggressive (verbal or physical)" },
];

export const AUTISM_TEMPLATE: DiaryTemplate = {
  id: "autism",
  title: "Autism / developmental care diary",
  subtitle:
    "Captures prompting, supervision, behavioural regulation and safety — the things standard diaries miss.",
  sections: [
    {
      key: "behaviour",
      title: "Behaviour & regulation",
      intro:
        "Score a typical day honestly. Meltdowns and refusals are NOT bad behaviour — they are the data the assessor needs.",
      fields: [
        { key: "meltdowns", label: "Meltdowns or shutdowns", type: "frequency", module: 3, options: FREQ },
        { key: "aggression", label: "Aggression toward self or others", type: "frequency", module: 3, options: FREQ },
        { key: "refusal", label: "Refused care / help", type: "frequency", module: 3, options: FREQ },
        { key: "mood", label: "Overall mood today", type: "checks", module: 3, options: CHECKS_BASE },
        { key: "trigger_notes", label: "Triggers or context", help: "What set things off? How long did it take to settle?", type: "text" },
      ],
    },
    {
      key: "selfcare",
      title: "Self-care",
      intro: "How much support was needed? Prompting counts.",
      fields: [
        { key: "hygiene", label: "Washing / showering", type: "scale", module: 4, options: SCALE_HELP },
        { key: "dressing", label: "Getting dressed", type: "scale", module: 4, options: SCALE_HELP },
        { key: "toileting", label: "Toileting / continence", type: "scale", module: 4, options: SCALE_HELP },
        { key: "eating", label: "Eating", type: "scale", module: 4, options: SCALE_HELP },
        { key: "drinking", label: "Drinking enough", type: "scale", module: 4, options: SCALE_HELP },
      ],
    },
    {
      key: "communication",
      title: "Communication & cognition",
      fields: [
        { key: "decisions", label: "Everyday decisions (what to wear, when to eat)", type: "scale", module: 2, options: SCALE_HELP },
        { key: "conversation", label: "Holding a conversation", type: "scale", module: 2, options: SCALE_HELP },
        { key: "orientation", label: "Orientation (time, place, people)", type: "scale", module: 2, options: SCALE_HELP },
      ],
    },
    {
      key: "night",
      title: "Night-time care",
      fields: [
        { key: "night_wakes", label: "Times I had to get up", type: "frequency", module: 3, options: FREQ },
        { key: "night_minutes", label: "Total minutes awake supporting them", type: "duration" },
        { key: "night_notes", label: "What happened?", type: "text" },
      ],
    },
    {
      key: "therapy",
      title: "Medication & therapy",
      fields: [
        { key: "meds", label: "Medication given / supervised", type: "scale", module: 5, options: SCALE_HELP },
        { key: "appointments", label: "Therapy or medical appointments today", type: "text", module: 5 },
      ],
    },
    {
      key: "social",
      title: "Social participation",
      fields: [
        { key: "structure", label: "Structuring the day (activities, breaks)", type: "scale", module: 6, options: SCALE_HELP },
        { key: "contact", label: "Contact with people outside home", type: "scale", module: 6, options: SCALE_HELP },
        { key: "good_moment", label: "One good moment today", type: "text" },
      ],
    },
  ],
};

export const ELDERLY_TEMPLATE: DiaryTemplate = {
  id: "elderly",
  title: "Elderly / disability care diary",
  subtitle:
    "Mirrors what Module 1–6 score: mobility, orientation, hygiene, meals, behaviour, night-time, medication.",
  sections: [
    {
      key: "mobility",
      title: "Mobility",
      intro: "Physical movement only — without your help.",
      fields: [
        { key: "transfers", label: "Changing position / getting up from bed or chair", type: "scale", module: 1, options: SCALE_HELP },
        { key: "walking", label: "Walking inside the home", type: "scale", module: 1, options: SCALE_HELP },
        { key: "stairs", label: "Climbing stairs", type: "scale", module: 1, options: SCALE_HELP },
        { key: "falls", label: "Falls or near-falls today", type: "frequency", module: 1, options: FREQ },
      ],
    },
    {
      key: "cognition",
      title: "Cognition & orientation",
      fields: [
        { key: "recognise", label: "Recognising familiar people", type: "scale", module: 2, options: SCALE_HELP },
        { key: "orientation", label: "Orientation (day, place)", type: "scale", module: 2, options: SCALE_HELP },
        { key: "decisions", label: "Everyday decisions", type: "scale", module: 2, options: SCALE_HELP },
        { key: "confusion", label: "Episodes of confusion", type: "frequency", module: 2, options: FREQ },
      ],
    },
    {
      key: "behaviour",
      title: "Behaviour & mood",
      fields: [
        { key: "agitation", label: "Agitation or restlessness", type: "frequency", module: 3, options: FREQ },
        { key: "refusal", label: "Refused care or medication", type: "frequency", module: 3, options: FREQ },
        { key: "wandering", label: "Wandering / unsafe behaviour", type: "frequency", module: 3, options: FREQ },
        { key: "mood", label: "Mood today", type: "checks", module: 3, options: CHECKS_BASE },
      ],
    },
    {
      key: "hygiene",
      title: "Personal hygiene & dressing",
      fields: [
        { key: "wash", label: "Washing / showering", type: "scale", module: 4, options: SCALE_HELP },
        { key: "dress", label: "Getting dressed", type: "scale", module: 4, options: SCALE_HELP },
        { key: "toilet", label: "Toileting / continence", type: "scale", module: 4, options: SCALE_HELP },
        { key: "incontinence_pads", label: "Incontinence pads changed", type: "frequency", module: 4, options: FREQ },
      ],
    },
    {
      key: "meals",
      title: "Meals & fluids",
      fields: [
        { key: "eating", label: "Eating", type: "scale", module: 4, options: SCALE_HELP },
        { key: "drinking", label: "Drinking enough fluids", type: "scale", module: 4, options: SCALE_HELP },
        { key: "appetite", label: "Notes on appetite / intake", type: "text" },
      ],
    },
    {
      key: "night",
      title: "Night-time care",
      fields: [
        { key: "night_wakes", label: "Times I had to get up", type: "frequency", module: 3, options: FREQ },
        { key: "night_minutes", label: "Total minutes awake supporting them", type: "duration" },
        { key: "night_notes", label: "What happened?", type: "text" },
      ],
    },
    {
      key: "therapy",
      title: "Medication & therapy",
      fields: [
        { key: "meds", label: "Medication given / supervised", type: "scale", module: 5, options: SCALE_HELP },
        { key: "appointments", label: "Doctor / therapy visits today", type: "text", module: 5 },
        { key: "wound_care", label: "Wound care / injections needed", type: "frequency", module: 5, options: FREQ },
      ],
    },
    {
      key: "social",
      title: "Everyday life & social contact",
      fields: [
        { key: "structure", label: "Structuring the day", type: "scale", module: 6, options: SCALE_HELP },
        { key: "contact", label: "Social contact (visits, calls, outings)", type: "scale", module: 6, options: SCALE_HELP },
        { key: "good_moment", label: "One good moment today", type: "text" },
      ],
    },
  ],
};

export const TEMPLATES: Record<"autism" | "elderly", DiaryTemplate> = {
  autism: AUTISM_TEMPLATE,
  elderly: ELDERLY_TEMPLATE,
};

export type DiaryEntry = {
  id: string;
  template: "autism" | "elderly";
  date: string; // YYYY-MM-DD
  values: Record<string, unknown>;
  updatedAt: string;
};

/**
 * MDK / Medicproof Pflegegrad assessment — Neues Begutachtungsassessment (NBA).
 * Source: SGB XI §15, Anlage 1 to the Begutachtungs-Richtlinien.
 *
 * Each criterion is scored on a 4-point scale (0..3) unless stated otherwise.
 * The raw module sum is converted to "gewichtete Punkte" via NBA brackets,
 * and the total weighted points (0..100) map to a Pflegegrad band.
 *
 * Every criterion carries the official DE wording, an EN translation, and a
 * plain-language paraphrase + "how to answer honestly" prompt for caregivers.
 */

export type ScoreScale = "0-3" | "self-care" | "freq";

export interface Criterion {
  code: string;
  de: string;
  en: string;
  paraphrase: string;
  honest: string;
  scale: ScoreScale;
  /** Optional weight multiplier within a module (Modul 4 uses these). */
  weight?: number;
}

export interface Module {
  id: 1 | 2 | 3 | 4 | 5 | 6;
  /** NBA module weight (%) — note M2 & M3 share 15% (higher of the two). */
  weightPct: number;
  titleDe: string;
  titleEn: string;
  description: string;
  criteria: Criterion[];
}

/* --------------------------------- Scales --------------------------------- */

export const SCALE_0_3 = [
  { value: 0, labelEn: "Independent", labelDe: "Selbständig", hint: "Manages on their own, without help." },
  { value: 1, labelEn: "Mostly independent", labelDe: "Überwiegend selbständig", hint: "Needs prompting, supervision, or partial help." },
  { value: 2, labelEn: "Mostly dependent", labelDe: "Überwiegend unselbständig", hint: "Needs help with most of the activity." },
  { value: 3, labelEn: "Fully dependent", labelDe: "Unselbständig", hint: "Cannot do the activity at all — caregiver does it." },
] as const;

export const SCALE_FREQ = [
  { value: 0, labelEn: "Never / very rarely", labelDe: "Nie / selten", hint: "Less than once a week, or not at all." },
  { value: 1, labelEn: "Rarely (1–3× / week)", labelDe: "Selten", hint: "Once to a few times per week." },
  { value: 3, labelEn: "Often (most days)", labelDe: "Häufig", hint: "Several days per week, predictable pattern." },
  { value: 5, labelEn: "Daily / many times daily", labelDe: "Täglich", hint: "Happens every day, sometimes more than once." },
] as const;

/* --------------------------------- Modules -------------------------------- */

export const MODULES: Module[] = [
  {
    id: 1,
    weightPct: 10,
    titleDe: "Modul 1 — Mobilität",
    titleEn: "Module 1 — Mobility",
    description:
      "How well the person can change body position, stay stable, walk, climb stairs, and move around their home.",
    criteria: [
      {
        code: "1.1",
        de: "Positionswechsel im Bett",
        en: "Changing position in bed",
        paraphrase:
          "Can they roll over, sit up, or shift themselves in bed without you lifting or pulling them?",
        honest:
          "Think about night-time too — many people manage during the day but need help to turn at night. Score what is typical across 24 hours.",
        scale: "0-3",
      },
      {
        code: "1.2",
        de: "Halten einer stabilen Sitzposition",
        en: "Maintaining a stable sitting position",
        paraphrase:
          "Once seated (edge of bed, chair, wheelchair), can they stay upright without leaning, sliding, or needing support?",
        honest: "If they can sit but only with pillows, a strap, or someone watching, that is not 'independent'.",
        scale: "0-3",
      },
      {
        code: "1.3",
        de: "Umsetzen (z. B. Bett ↔ Rollstuhl)",
        en: "Transferring (e.g. bed ↔ wheelchair)",
        paraphrase: "Can they move from bed to chair, chair to toilet, etc., without you taking weight?",
        honest: "If you must guide, steady, or partly lift them — even briefly — score 'mostly dependent'.",
        scale: "0-3",
      },
      {
        code: "1.4",
        de: "Fortbewegen innerhalb des Wohnbereichs",
        en: "Moving around within the home",
        paraphrase: "Walking room-to-room inside the home, with or without aids.",
        honest: "Walker, frame or cane is fine and still 'independent' — the question is whether they need a person.",
        scale: "0-3",
      },
      {
        code: "1.5",
        de: "Treppensteigen",
        en: "Climbing stairs",
        paraphrase: "Going up and down a flight of stairs (about 12 steps).",
        honest:
          "If stairs are simply avoided because they're too hard, that counts as 'fully dependent', not 'independent'.",
        scale: "0-3",
      },
    ],
  },
  {
    id: 2,
    weightPct: 15,
    titleDe: "Modul 2 — Kognitive und kommunikative Fähigkeiten",
    titleEn: "Module 2 — Cognitive & communicative abilities",
    description:
      "Understanding, remembering, decision-making, recognising people, communication. Module 2 and Module 3 share the same 15% — the higher of the two is counted.",
    criteria: [
      {
        code: "2.1",
        de: "Erkennen von Personen aus dem näheren Umfeld",
        en: "Recognising people from the immediate environment",
        paraphrase: "Do they know who you are, and other close family/carers?",
        honest: "Mixing up names occasionally is normal; not recognising at all, even after a prompt, is not.",
        scale: "0-3",
      },
      {
        code: "2.2",
        de: "Örtliche Orientierung",
        en: "Orientation to place",
        paraphrase: "Do they know where they are — their home, their room, what city?",
        honest: "Getting lost on the way back from the bathroom counts. So does walking out of the house disoriented.",
        scale: "0-3",
      },
      {
        code: "2.3",
        de: "Zeitliche Orientierung",
        en: "Orientation to time",
        paraphrase: "Do they know roughly the time of day, day of the week, season?",
        honest: "Score what is typical — not their best moment.",
        scale: "0-3",
      },
      {
        code: "2.4",
        de: "Erinnern an wesentliche Ereignisse",
        en: "Remembering recent events",
        paraphrase: "Can they recall what they did this morning, who visited yesterday?",
        honest: "Long-term memory often stays intact while short-term is gone — score short-term.",
        scale: "0-3",
      },
      {
        code: "2.5",
        de: "Steuern von mehrschrittigen Alltagshandlungen",
        en: "Carrying out multi-step everyday actions",
        paraphrase:
          "Making a sandwich, getting dressed in the right order, brewing coffee — without losing track.",
        honest: "If you have to remind them of the next step, that's prompting — not independence.",
        scale: "0-3",
      },
      {
        code: "2.6",
        de: "Treffen von Entscheidungen im Alltag",
        en: "Making everyday decisions",
        paraphrase: "Picking clothes for the weather, deciding to take a coat, choosing food.",
        honest: "Score the typical decision — autistic adults may make decisions but freeze on unfamiliar ones.",
        scale: "0-3",
      },
      {
        code: "2.7",
        de: "Verstehen von Sachverhalten und Informationen",
        en: "Understanding facts and information",
        paraphrase: "Can they follow a conversation, a doctor's instruction, a letter from the Kasse?",
        honest: "Nodding politely without understanding is common — score what they actually grasped.",
        scale: "0-3",
      },
      {
        code: "2.8",
        de: "Erkennen von Risiken und Gefahren",
        en: "Recognising risks and dangers",
        paraphrase:
          "Hot stove, traffic, leaving the front door open, taking the wrong medication.",
        honest: "Be honest — a single near-miss every few weeks already means risks are not reliably recognised.",
        scale: "0-3",
      },
      {
        code: "2.9",
        de: "Mitteilen elementarer Bedürfnisse",
        en: "Communicating basic needs",
        paraphrase: "Saying (or signalling) that they are hungry, thirsty, in pain, need the toilet.",
        honest: "Non-verbal signals count — but only if you can actually read them reliably.",
        scale: "0-3",
      },
      {
        code: "2.10",
        de: "Verstehen von Aufforderungen",
        en: "Understanding requests",
        paraphrase: "Following a simple instruction like 'please sit down' or 'lift your arm'.",
        honest: "Repeating, gesturing, or using picture cards to be understood is a sign of dependence.",
        scale: "0-3",
      },
      {
        code: "2.11",
        de: "Beteiligen an einem Gespräch",
        en: "Taking part in a conversation",
        paraphrase: "Two-way conversation — listening, responding on-topic, taking turns.",
        honest: "Monologues or repeating the same phrase are not the same as a conversation.",
        scale: "0-3",
      },
    ],
  },
  {
    id: 3,
    weightPct: 15,
    titleDe: "Modul 3 — Verhaltensweisen und psychische Problemlagen",
    titleEn: "Module 3 — Behaviour & psychological symptoms",
    description:
      "Frequency of behaviours that require caregiver response: agitation, aggression, anxiety, night-time disturbance, resistance to care. Higher of M2/M3 counts toward total.",
    criteria: [
      {
        code: "3.1",
        de: "Motorisch geprägte Verhaltensauffälligkeiten",
        en: "Motor restlessness / pacing / wandering",
        paraphrase:
          "Pacing, wandering, repetitive movement, leaving the home without purpose.",
        honest: "Even if it seems harmless, score how often you must intervene or redirect.",
        scale: "freq",
      },
      {
        code: "3.2",
        de: "Nächtliche Unruhe",
        en: "Night-time restlessness",
        paraphrase: "Getting up at night, calling out, needing reassurance, sleep-wake reversal.",
        honest: "If you lose sleep most nights, this is 'daily' — not 'often'.",
        scale: "freq",
      },
      {
        code: "3.3",
        de: "Selbstschädigendes und autoaggressives Verhalten",
        en: "Self-harming / self-injurious behaviour",
        paraphrase: "Hitting self, biting, scratching, head-banging, picking at skin.",
        honest: "Common in autism and advanced dementia — do not minimise.",
        scale: "freq",
      },
      {
        code: "3.4",
        de: "Beschädigen von Gegenständen",
        en: "Damaging objects",
        paraphrase: "Throwing, breaking, destroying things in distress or frustration.",
        honest: "Count the events even if 'understandable' — the assessor scores frequency, not motive.",
        scale: "freq",
      },
      {
        code: "3.5",
        de: "Physisch aggressives Verhalten",
        en: "Physical aggression toward others",
        paraphrase: "Hitting, kicking, pushing, biting people during care.",
        honest: "Resistance during washing or dressing counts. Don't excuse it because 'they didn't mean it'.",
        scale: "freq",
      },
      {
        code: "3.6",
        de: "Verbal aggressives Verhalten",
        en: "Verbal aggression",
        paraphrase: "Shouting, insulting, threatening.",
        honest: "Repeated harsh words during care or refusal — count each day it happens.",
        scale: "freq",
      },
      {
        code: "3.7",
        de: "Andere pflegerelevante vokale Auffälligkeiten",
        en: "Other relevant vocal behaviours",
        paraphrase: "Constant calling out, moaning, repetitive sounds, screaming.",
        honest: "If neighbours have ever mentioned it, it is 'often' at minimum.",
        scale: "freq",
      },
      {
        code: "3.8",
        de: "Abwehr pflegerischer Maßnahmen",
        en: "Resistance to care",
        paraphrase: "Refusing washing, dressing, medication, food, or appointments.",
        honest: "Score how often, not whether you eventually succeed.",
        scale: "freq",
      },
      {
        code: "3.9",
        de: "Wahnvorstellungen / Sinnestäuschungen",
        en: "Delusions / hallucinations",
        paraphrase: "Believing people are stealing, seeing or hearing things that aren't there.",
        honest: "Even a 'small' recurring delusion (e.g. dead spouse is alive) counts.",
        scale: "freq",
      },
      {
        code: "3.10",
        de: "Ängste",
        en: "Anxiety",
        paraphrase: "Panic, fear of being alone, fear of leaving the home, sensory overload episodes.",
        honest: "Meltdowns and shutdowns in autistic care recipients count here.",
        scale: "freq",
      },
      {
        code: "3.11",
        de: "Antriebslosigkeit bei depressiver Stimmungslage",
        en: "Depressed mood / lack of drive",
        paraphrase: "Refusing to get up, no interest in anything, flat affect.",
        honest: "If you have to coax them out of bed most days, score 'daily'.",
        scale: "freq",
      },
      {
        code: "3.12",
        de: "Sozial inadäquate Verhaltensweisen",
        en: "Socially inappropriate behaviour",
        paraphrase: "Undressing in public, inappropriate touching, removing pads.",
        honest: "Embarrassment is not a reason to under-report — this is exactly what the assessor needs to know.",
        scale: "freq",
      },
      {
        code: "3.13",
        de: "Sonstige pflegerelevante inadäquate Handlungen",
        en: "Other care-relevant inappropriate actions",
        paraphrase: "Hiding/hoarding food, smearing, opening windows in winter, etc.",
        honest: "If it is something you regularly clean up or prevent, count it.",
        scale: "freq",
      },
    ],
  },
  {
    id: 4,
    weightPct: 40,
    titleDe: "Modul 4 — Selbstversorgung",
    titleEn: "Module 4 — Self-care",
    description:
      "The largest single module (40%). Eating is weighted ×3; drinking, toileting, and bowel/bladder management ×2. Be precise — most caregivers under-report here.",
    criteria: [
      {
        code: "4.1",
        de: "Waschen des vorderen Oberkörpers",
        en: "Washing the front upper body",
        paraphrase: "Washing face, chest, arms at the sink.",
        honest: "Score what they do without prompting — handing a flannel does not equal 'independent'.",
        scale: "0-3",
        weight: 1,
      },
      {
        code: "4.2",
        de: "Körperpflege im Bereich des Kopfes",
        en: "Grooming the head (combing, shaving, dental, denture care)",
        paraphrase: "Combing hair, brushing teeth, shaving, denture care.",
        honest: "If teeth are brushed only when you remind, that is not independence.",
        scale: "0-3",
        weight: 1,
      },
      {
        code: "4.3",
        de: "Waschen des Intimbereichs",
        en: "Washing the intimate area",
        paraphrase: "Genital and perianal cleaning, especially after toileting.",
        honest: "Refusing help and doing it badly is still 'dependent' — quality of result matters.",
        scale: "0-3",
        weight: 1,
      },
      {
        code: "4.4",
        de: "Duschen und Baden einschließlich Waschen der Haare",
        en: "Showering / bathing including hair-washing",
        paraphrase: "Full body shower or bath, getting in and out, washing hair.",
        honest: "Even being supervised for safety counts as 'mostly independent', not 'independent'.",
        scale: "0-3",
        weight: 1,
      },
      {
        code: "4.5",
        de: "An- und Auskleiden des Oberkörpers",
        en: "Dressing / undressing upper body",
        paraphrase: "Pulling on a shirt, managing buttons and bra.",
        honest: "If clothes are laid out and they only put them on, that is prompting — score accordingly.",
        scale: "0-3",
        weight: 1,
      },
      {
        code: "4.6",
        de: "An- und Auskleiden des Unterkörpers",
        en: "Dressing / undressing lower body",
        paraphrase: "Trousers, underwear, socks, shoes — including fastening and tying.",
        honest: "Falls during dressing? Then independence is gone.",
        scale: "0-3",
        weight: 1,
      },
      {
        code: "4.7",
        de: "Mundgerechtes Zubereiten der Nahrung und Eingießen von Getränken",
        en: "Cutting up food / pouring drinks",
        paraphrase: "Cutting meat into bites, opening packaging, pouring from a jug.",
        honest: "Most caregivers do this automatically — count it.",
        scale: "0-3",
        weight: 1,
      },
      {
        code: "4.8",
        de: "Essen",
        en: "Eating (×3 weighting)",
        paraphrase: "Getting prepared food from plate to mouth, chewing, swallowing.",
        honest:
          "Choking, leaving most food, eating only with verbal prompts — all of these reduce independence. This criterion is weighted triple, so be exact.",
        scale: "0-3",
        weight: 3,
      },
      {
        code: "4.9",
        de: "Trinken",
        en: "Drinking (×2 weighting)",
        paraphrase: "Bringing a cup to the mouth, drinking enough across the day.",
        honest: "Forgetting to drink without prompts = dependent. Dehydration risk is the whole point.",
        scale: "0-3",
        weight: 2,
      },
      {
        code: "4.10",
        de: "Benutzen einer Toilette oder eines Toilettenstuhls",
        en: "Using a toilet / commode (×2 weighting)",
        paraphrase: "Getting onto, sitting on, getting off the toilet; managing clothing.",
        honest: "If you wipe, adjust pads, or steady them at any point, that is not independent.",
        scale: "0-3",
        weight: 2,
      },
      {
        code: "4.11",
        de: "Bewältigen der Folgen einer Harninkontinenz und Umgang mit Dauerkatheter / Urostoma",
        en: "Managing urinary incontinence / catheter / urostoma (×2 weighting)",
        paraphrase: "Changing pads, emptying a catheter bag, managing leaks.",
        honest: "Caregivers often do this silently — every change counts.",
        scale: "0-3",
        weight: 2,
      },
      {
        code: "4.12",
        de: "Bewältigen der Folgen einer Stuhlinkontinenz und Umgang mit Stoma",
        en: "Managing faecal incontinence / stoma (×2 weighting)",
        paraphrase: "Cleaning after accidents, managing a stoma bag.",
        honest: "If it happens at all, even weekly, this is not 'independent'.",
        scale: "0-3",
        weight: 2,
      },
      {
        code: "4.13",
        de: "Ernährung parenteral oder über Sonde",
        en: "Parenteral / tube feeding",
        paraphrase: "PEG, NG tube, IV nutrition.",
        honest: "If applicable, this is automatically 'fully dependent' on this point.",
        scale: "0-3",
        weight: 1,
      },
    ],
  },
  {
    id: 5,
    weightPct: 20,
    titleDe: "Modul 5 — Bewältigung von und selbständiger Umgang mit krankheits- oder therapiebedingten Anforderungen",
    titleEn: "Module 5 — Coping with illness / therapy demands",
    description:
      "Medication, injections, dressings, doctor visits, therapy appointments — how much of this does the person manage themselves, and how often does it happen?",
    criteria: [
      {
        code: "5.1",
        de: "Medikation",
        en: "Taking medication",
        paraphrase: "Remembering, preparing, and swallowing all prescribed medication on time.",
        honest: "Using a pill organiser that you fill counts as caregiver involvement — not independence.",
        scale: "0-3",
      },
      {
        code: "5.2",
        de: "Injektionen (z. B. Insulin)",
        en: "Injections (e.g. insulin)",
        paraphrase: "Drawing up and self-injecting if relevant.",
        honest: "If you do it, score 'fully dependent'. Skip if not applicable.",
        scale: "0-3",
      },
      {
        code: "5.3",
        de: "Versorgung intravenöser Zugänge (Port)",
        en: "IV / port-line care",
        paraphrase: "Flushing, dressing changes, monitoring for infection.",
        honest: "Skip if not applicable.",
        scale: "0-3",
      },
      {
        code: "5.4",
        de: "Absaugen und Sauerstoffgabe",
        en: "Suctioning / oxygen therapy",
        paraphrase: "Operating an O2 concentrator, using a suction device.",
        honest: "Skip if not applicable.",
        scale: "0-3",
      },
      {
        code: "5.5",
        de: "Einreibungen sowie Kälte- und Wärmeanwendungen",
        en: "Topical applications, hot/cold therapy",
        paraphrase: "Creams, ointments, heat packs, cold packs as part of treatment.",
        honest: "Daily eczema or pressure-area care counts.",
        scale: "0-3",
      },
      {
        code: "5.6",
        de: "Messung und Deutung von Körperzuständen",
        en: "Measuring and interpreting body signals",
        paraphrase: "Blood sugar, blood pressure, temperature — and knowing what to do with the result.",
        honest: "Reading the number is not the same as knowing what to do.",
        scale: "0-3",
      },
      {
        code: "5.7",
        de: "Körpernahe Hilfsmittel (Prothesen, Orthesen, Hörgeräte etc.)",
        en: "Body-worn aids (prostheses, orthoses, hearing aids)",
        paraphrase: "Putting on / taking off, cleaning, changing batteries.",
        honest: "If hearing aids sit in a drawer because they can't manage them, that is dependence.",
        scale: "0-3",
      },
      {
        code: "5.8",
        de: "Verbandwechsel und Wundversorgung",
        en: "Dressing changes / wound care",
        paraphrase: "Pressure sores, surgical wounds, chronic ulcers.",
        honest: "Skip if not applicable.",
        scale: "0-3",
      },
      {
        code: "5.9",
        de: "Versorgung mit Stoma",
        en: "Stoma care",
        paraphrase: "Bag changes, skin care around the stoma.",
        honest: "Skip if not applicable.",
        scale: "0-3",
      },
      {
        code: "5.10",
        de: "Regelmäßige Einmalkatheterisierung und Nutzung von Abführmethoden",
        en: "Intermittent catheterisation / enemas",
        paraphrase: "Self-catheterisation, scheduled bowel programmes.",
        honest: "Skip if not applicable.",
        scale: "0-3",
      },
      {
        code: "5.11",
        de: "Therapiemaßnahmen in häuslicher Umgebung",
        en: "Therapy exercises at home",
        paraphrase: "Physio, speech, occupational therapy exercises between sessions.",
        honest: "If you have to lead the exercises, score accordingly.",
        scale: "0-3",
      },
      {
        code: "5.12",
        de: "Zeit- und technikintensive Maßnahmen in häuslicher Umgebung",
        en: "Time/tech-intensive home treatments",
        paraphrase: "Dialysis, ventilation, parenteral nutrition at home.",
        honest: "Skip if not applicable.",
        scale: "0-3",
      },
      {
        code: "5.13",
        de: "Arztbesuche",
        en: "Doctor's visits",
        paraphrase: "Getting to and through an appointment, including reporting symptoms.",
        honest: "If you must accompany them and speak for them, that is dependence.",
        scale: "0-3",
      },
      {
        code: "5.14",
        de: "Besuch anderer medizinischer oder therapeutischer Einrichtungen (bis 3 Std.)",
        en: "Visits to other medical/therapy services (≤3 h)",
        paraphrase: "Physio, podiatry, lab visits.",
        honest: "Transport, waiting, reassurance — all caregiver time.",
        scale: "0-3",
      },
      {
        code: "5.15",
        de: "Besuch medizinischer Einrichtungen (über 3 Std.)",
        en: "Long medical visits (>3 h)",
        paraphrase: "Day hospital, infusion centre.",
        honest: "Skip if not applicable.",
        scale: "0-3",
      },
      {
        code: "5.16",
        de: "Einhalten einer Diät oder anderer krankheitsbedingter Verhaltensvorschriften",
        en: "Following a diet or disease-related rules",
        paraphrase: "Diabetic diet, fluid restriction, gluten-free, swallowing precautions.",
        honest: "Will they cheat / forget without supervision? Then they are not independent.",
        scale: "0-3",
      },
    ],
  },
  {
    id: 6,
    weightPct: 15,
    titleDe: "Modul 6 — Gestaltung des Alltagslebens und sozialer Kontakte",
    titleEn: "Module 6 — Organising daily life & social contacts",
    description:
      "Structuring the day, planning, hobbies, social contact — the things that make a life, not just keep it going.",
    criteria: [
      {
        code: "6.1",
        de: "Gestaltung des Tagesablaufs und Anpassung an Veränderungen",
        en: "Structuring the day and adapting to change",
        paraphrase: "Planning a typical day, coping when something unexpected happens.",
        honest: "Rigid routines that fall apart at the slightest change (common in autism) score here.",
        scale: "0-3",
      },
      {
        code: "6.2",
        de: "Ruhen und Schlafen",
        en: "Resting and sleeping",
        paraphrase: "Settling, getting to sleep, staying asleep — without external prompting.",
        honest: "Caregiver having to sit with them until they sleep counts.",
        scale: "0-3",
      },
      {
        code: "6.3",
        de: "Sichbeschäftigen",
        en: "Occupying themselves",
        paraphrase: "Doing something — reading, watching TV with interest, a hobby — without prompts.",
        honest: "Staring at a wall is not 'occupying themselves'.",
        scale: "0-3",
      },
      {
        code: "6.4",
        de: "Vornehmen von in die Zukunft gerichteten Planungen",
        en: "Making plans for the future",
        paraphrase: "Planning errands, appointments, the week ahead.",
        honest: "If you manage the calendar entirely, score 'fully dependent'.",
        scale: "0-3",
      },
      {
        code: "6.5",
        de: "Interaktion mit Personen im direkten Kontakt",
        en: "Interacting with people in direct contact",
        paraphrase: "Face-to-face interaction with family, neighbours, carers — initiating and sustaining.",
        honest: "Avoiding eye contact, scripted responses (autism), or withdrawal all count.",
        scale: "0-3",
      },
      {
        code: "6.6",
        de: "Kontaktpflege zu Personen außerhalb des direkten Umfelds",
        en: "Maintaining contact with people outside the household",
        paraphrase: "Phone calls, messages, visits to friends.",
        honest: "If their world has shrunk to one room, that's the answer.",
        scale: "0-3",
      },
    ],
  },
];

/* ----------------------------- Scoring helpers ---------------------------- */

/** NBA conversion brackets: raw module sum → weighted points. */
export interface Bracket {
  max: number; // inclusive upper bound of raw points for this bracket
  points: number; // weighted points awarded
}

export const BRACKETS: Record<number, Bracket[]> = {
  // M1 raw 0..15 → 0/2.5/5/7.5/10
  1: [
    { max: 1, points: 0 },
    { max: 3, points: 2.5 },
    { max: 5, points: 5 },
    { max: 9, points: 7.5 },
    { max: 15, points: 10 },
  ],
  // M2 raw 0..33 → 0/3.75/7.5/11.25/15
  2: [
    { max: 1, points: 0 },
    { max: 4, points: 3.75 },
    { max: 7, points: 7.5 },
    { max: 11, points: 11.25 },
    { max: 33, points: 15 },
  ],
  // M3 raw (freq scale, max ~65) → 0/3.75/7.5/11.25/15
  3: [
    { max: 0, points: 0 },
    { max: 2, points: 3.75 },
    { max: 5, points: 7.5 },
    { max: 10, points: 11.25 },
    { max: 65, points: 15 },
  ],
  // M4 weighted raw (~0..54) → 0/10/20/30/40
  4: [
    { max: 2, points: 0 },
    { max: 7, points: 10 },
    { max: 17, points: 20 },
    { max: 31, points: 30 },
    { max: 100, points: 40 },
  ],
  // M5 raw (counts therapy frequency, ~0..48) → 0/5/10/15/20
  5: [
    { max: 0, points: 0 },
    { max: 3, points: 5 },
    { max: 6, points: 10 },
    { max: 15, points: 15 },
    { max: 100, points: 20 },
  ],
  // M6 raw 0..18 → 0/3.75/7.5/11.25/15
  6: [
    { max: 0, points: 0 },
    { max: 3, points: 3.75 },
    { max: 6, points: 7.5 },
    { max: 11, points: 11.25 },
    { max: 18, points: 15 },
  ],
};

export function bracketPoints(moduleId: number, raw: number): number {
  const brs = BRACKETS[moduleId];
  for (const b of brs) if (raw <= b.max) return b.points;
  return brs[brs.length - 1].points;
}

export function pflegegradFromTotal(total: number): { grade: 0 | 1 | 2 | 3 | 4 | 5; label: string } {
  if (total < 12.5) return { grade: 0, label: "pflegegrad.grade_0" };
  if (total < 27) return { grade: 1, label: "pflegegrad.grade_1" };
  if (total < 47.5) return { grade: 2, label: "pflegegrad.grade_2" };
  if (total < 70) return { grade: 3, label: "pflegegrad.grade_3" };
  if (total < 90) return { grade: 4, label: "pflegegrad.grade_4" };
  return { grade: 5, label: "pflegegrad.grade_5" };
}

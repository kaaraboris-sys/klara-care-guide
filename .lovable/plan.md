# Children & Young People (Under 18) Survey Track

Add a dedicated child assessment path alongside the existing adult survey, sharing UX patterns but with child-specific wording, modules, and scoring.

## Scope of this first pass

In: survey track with modules 1–6 adapted for children, NBA scoring with the existing 5-grade table, results reveal mirroring the adult flow, age-gate entry point, i18n (EN/DE).

Out (follow-ups): Section 6.1 outdoor activities, Section 7 prevention/rehab recommendations, Section 8 aids/therapies, Section 9 prognosis. These belong in the generated **report**, not the scoring survey. I will wire them into `generateReport` in a second pass once this track is live.

## User flow

1. `/survey` shows a new age gate: **Adult (18+)** or **Child (under 18)**.
2. Selecting Child routes to `/survey/child` (under-3 sub-gate appears inside Module 1, since 6.1 and certain self-care items don't apply).
3. Same one-module-per-screen UX, same progress bar, same localStorage persistence (separate key `klara.survey.child.v1`), same "halfway there" copy at Module 4.
4. Results page reveals predicted Pflegegrad with the same emotional layout and €-gap card.
5. Generated report on `/report` detects which track produced the data and adjusts wording ("your child" vs "your relative").

## File changes

- `src/lib/mdk-criteria.ts` — export a new `childCriteria` array with the child NBA module items (Modules 1–6) and per-module weights identical to adults (10/15/40/20/15, with mod 2/3 higher-of rule). Tag age-restricted items (e.g. items that don't apply under 3) with an `appliesFromAge` field.
- `src/routes/survey.tsx` — add age-gate landing; keep adult flow as default branch.
- `src/routes/survey.child.tsx` — new route, reuses the survey runner component with `criteria=childCriteria` and `storageKey="klara.survey.child.v1"`.
- Extract the survey runner into `src/components/survey/SurveyRunner.tsx` so adult and child routes share it.
- `src/lib/scoring.ts` (new, or inline) — single `computeAssessment(answers, criteria)` used by both tracks.
- `src/routes/_authenticated/assessment.tsx` — read whichever track has saved data; show track badge ("Child assessment").
- `src/routes/_authenticated/report.tsx` + `src/lib/report.functions.ts` — pass `subject: "child" | "adult"` into the prompt so wording shifts.
- `src/locales/en.json` + `src/locales/de.json` — new `survey.child.*` namespace with child-specific question hints ("on your child's hardest days"), age-gate copy, and result-reveal copy.
- `src/components/layout/SiteHeader.tsx` — no nav change; entry stays via `/survey`.

## Technical notes

- No DB changes in this pass — answers stay in localStorage like the adult track. (We can persist to Supabase later as one combined `assessments` table with a `subject` column.)
- Scoring uses the existing weighted-points table; the child-specific raw-point ranges per level are encoded in `childCriteria` (some items have different max values for children, e.g. mobility item caps).
- Age sub-gate inside Module 1: a single `"Is the child under 3?"` question gates display of items flagged `appliesFromAge: 3`. Hidden items contribute 0 to that module's raw sum.
- Module 2/3 higher-of rule applies identically.
- Report prompt: add `subject` field; system prompt swaps "the person" → "the child" and references parents/guardians instead of relatives.

## Out of scope (next pass, on your go-ahead)

- Sections 6.1, 7, 8, 9 surfaced inside the generated report (recommendations, aids, rehab indication, prognosis) — these are report sections, not scored modules.
- Persisting assessments to the database.

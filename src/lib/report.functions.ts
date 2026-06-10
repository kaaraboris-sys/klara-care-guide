import { createServerFn } from "@tanstack/react-start";

type GenerateInput = {
  language: "en" | "de";
  subject?: "adult" | "child";
  assessment?: {
    totalPoints: number;
    pflegegrad: { grade: number; label: string };
    modules: {
      id: number;
      title: string;
      raw: number;
      weighted: number;
      weightPct: number;
      answered: number;
      total: number;
      criteria: { code: string; label: string; value: number | null; notes?: string }[];
    }[];
  };
  diary?: {
    template: "autism" | "elderly";
    entries: { date: string; values: Record<string, unknown> }[];
  };
};

export const generateReport = createServerFn({ method: "POST" })
  .inputValidator((input: GenerateInput) => input)
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      return { ok: false as const, error: "AI gateway is not configured." };
    }

    const langInstruction =
      data.language === "de"
        ? "Schreibe den gesamten Bericht auf Deutsch, in klarer Alltagssprache."
        : "Write the entire report in clear, plain English.";

    const subjectInstruction =
      data.subject === "child"
        ? "The care recipient is a CHILD or young person under 18. Use 'the child' (or 'your child' when addressing the caregiver), refer to parents/guardians rather than relatives, and frame care needs relative to age-typical development. Note when items are not assessed for children under 3."
        : "The care recipient is an ADULT. Use 'the person' or 'your relative'.";

    const system = `You are Klara, an assistant that prepares German MDK / Medicproof Pflegegrad
assessment reports for family caregivers. ${langInstruction}
${subjectInstruction}
The report goes to the assessor (Gutachter). Be specific, neutral, and concrete.
Never minimise care needs. Quote concrete examples from the diary and notes.
Structure the output as Markdown with the following sections:

1. Summary — estimated Pflegegrad and one-paragraph rationale.
2. Module-by-module findings — one short subsection per NBA module (1–6),
   stating the weighted score, the everyday pattern, and the key evidence.
3. Diary patterns — what the 14-day diary shows (frequency, triggers,
   night-time care, behaviour, prompting needs).
4. Concrete examples for the assessor — bullet list of 5–10 specific things
   the caregiver should mention out loud during the visit.
5. Open gaps — what is missing or inconsistent that the caregiver should clarify.

Keep it under ~700 words. No disclaimers about being an AI.`;

    const payload = {
      subject: data.subject ?? "adult",
      assessment: data.assessment ?? null,
      diary: data.diary ?? null,
    };

    const user = `Generate the MDK preparation report from the following data.\n\n` +
      "```json\n" +
      JSON.stringify(payload, null, 2) +
      "\n```";

    try {
      const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "system", content: system },
            { role: "user", content: user },
          ],
        }),
      });

      if (res.status === 429) {
        return { ok: false as const, error: "Rate limit reached. Please try again in a minute." };
      }
      if (res.status === 402) {
        return { ok: false as const, error: "AI credits exhausted. Add credits in workspace settings." };
      }
      if (!res.ok) {
        const text = await res.text();
        console.error("AI gateway error", res.status, text);
        return { ok: false as const, error: `AI gateway returned ${res.status}.` };
      }

      const json = (await res.json()) as {
        choices?: { message?: { content?: string } }[];
      };
      const markdown = json.choices?.[0]?.message?.content ?? "";
      if (!markdown) {
        return { ok: false as const, error: "Empty response from AI." };
      }
      return { ok: true as const, markdown, generatedAt: new Date().toISOString() };
    } catch (err) {
      console.error("generateReport failed", err);
      return { ok: false as const, error: "Could not reach the AI service." };
    }
  });

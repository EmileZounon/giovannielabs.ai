import { Resend } from "resend";

export const runtime = "nodejs";

type LeadPayload = {
  name?: string;
  email?: string;
  phone?: string;
  segment?: string;
  need?: string;
  conversation?: Array<{ role: string; content: string }>;
  lang?: "fr" | "en";
};

const SEGMENT_LABELS: Record<string, { fr: string; en: string }> = {
  newcomer: { fr: "Nouveau arrivant", en: "Newcomer" },
  self_employed: { fr: "Travailleur autonome", en: "Self-employed" },
  individual: { fr: "Particulier", en: "Individual" },
  sme: { fr: "PME", en: "SME" },
  unknown: { fr: "Non précisé", en: "Unspecified" },
};

export async function POST(req: Request) {
  let body: LeadPayload;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "invalid json" }, { status: 400 });
  }

  const { name, email, phone, segment, need, conversation, lang = "fr" } = body;

  if (!name || !email) {
    return Response.json(
      { ok: false, error: "name and email required" },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_EMAIL_TO;
  const from = process.env.LEAD_EMAIL_FROM;

  if (!apiKey || !to || !from) {
    return Response.json(
      { ok: false, error: "lead email not configured" },
      { status: 500 },
    );
  }

  const segmentLabel = SEGMENT_LABELS[segment ?? "unknown"]?.[lang] ?? segment ?? "Non précisé";

  const transcript = (conversation ?? [])
    .map((m) => `${m.role === "user" ? "Utilisateur" : "Andjix"}: ${m.content}`)
    .join("\n\n");

  const subject = lang === "fr"
    ? `Nouveau lead Andjix : ${name} (${segmentLabel})`
    : `New Andjix lead: ${name} (${segmentLabel})`;

  const text = [
    `Nom : ${name}`,
    `Courriel : ${email}`,
    phone ? `Téléphone : ${phone}` : null,
    `Segment : ${segmentLabel}`,
    `Langue : ${lang}`,
    "",
    "Besoin / résumé :",
    need || "(non précisé)",
    "",
    "—".repeat(20),
    "Conversation :",
    transcript || "(aucune conversation enregistrée)",
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject,
      text,
    });
    return Response.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "send failed";
    return Response.json({ ok: false, error: message }, { status: 500 });
  }
}

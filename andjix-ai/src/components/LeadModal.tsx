"use client";

import { useEffect, useState } from "react";

type Lang = "fr" | "en";
type Message = { role: "user" | "assistant"; content: string };

const STRINGS = {
  fr: {
    title: "Réserver un appel avec André",
    lede: "Laissez vos coordonnées. André vous rappelle dans les 24 heures ouvrables.",
    name: "Nom complet",
    email: "Courriel",
    phone: "Téléphone (optionnel)",
    segment: "Vous êtes",
    segments: {
      newcomer: "Nouveau arrivant au Canada",
      self_employed: "Travailleur autonome",
      individual: "Particulier",
      sme: "PME / entreprise",
    },
    need: "Résumé de votre besoin",
    submit: "Envoyer la demande",
    submitting: "Envoi...",
    success_title: "Demande envoyée",
    success_msg: "André vous contactera sous peu. Une copie de cette conversation lui a été transmise.",
    close: "Fermer",
    calendly_hint: "Vous pouvez aussi réserver directement un créneau :",
    calendly_cta: "Voir les disponibilités",
  },
  en: {
    title: "Book a call with André",
    lede: "Leave your details. André will get back to you within 24 business hours.",
    name: "Full name",
    email: "Email",
    phone: "Phone (optional)",
    segment: "You are",
    segments: {
      newcomer: "New to Canada",
      self_employed: "Self-employed",
      individual: "Individual",
      sme: "SME / business",
    },
    need: "Brief summary of your need",
    submit: "Send request",
    submitting: "Sending...",
    success_title: "Request sent",
    success_msg: "André will contact you shortly. A copy of this conversation has been forwarded to him.",
    close: "Close",
    calendly_hint: "You can also book a slot directly:",
    calendly_cta: "See availability",
  },
} as const;

export default function LeadModal({
  lang,
  conversation,
  onClose,
}: {
  lang: Lang;
  conversation: Message[];
  onClose: () => void;
}) {
  const t = STRINGS[lang];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [segment, setSegment] = useState("newcomer");
  const [need, setNeed] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || "";

  useEffect(() => {
    if (!need && conversation.length > 0) {
      const lastUser = [...conversation].reverse().find((m) => m.role === "user");
      if (lastUser) setNeed(lastUser.content);
    }
  }, [conversation, need]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          segment,
          need: need.trim(),
          conversation,
          lang,
        }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "send failed");
      setSuccess(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "send failed";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="fade-up w-full max-w-lg rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl sm:p-8"
      >
        {success ? (
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-andjix-sky-soft)]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0B3D91" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="font-display text-xl font-semibold text-[var(--color-andjix-text)]">
              {t.success_title}
            </h2>
            <p className="mt-2 text-sm text-[var(--color-andjix-text-muted)]">{t.success_msg}</p>
            {calendlyUrl && (
              <div className="mt-5 rounded-2xl bg-[var(--color-andjix-sky-soft)] p-4">
                <p className="text-xs text-[var(--color-andjix-blue-deep)]">{t.calendly_hint}</p>
                <a
                  href={calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex rounded-full bg-[var(--color-andjix-blue)] px-5 py-2 text-sm font-medium text-white transition hover:bg-[var(--color-andjix-blue-deep)]"
                >
                  {t.calendly_cta}
                </a>
              </div>
            )}
            <button
              onClick={onClose}
              className="mt-5 rounded-full border border-[var(--color-andjix-border)] px-5 py-2 text-sm transition hover:bg-[var(--color-andjix-sky-soft)]"
            >
              {t.close}
            </button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <div className="mb-5">
              <h2 className="font-display text-xl font-semibold text-[var(--color-andjix-text)]">
                {t.title}
              </h2>
              <p className="mt-1 text-sm text-[var(--color-andjix-text-muted)]">{t.lede}</p>
            </div>

            <div className="space-y-3">
              <Field label={t.name} value={name} onChange={setName} required />
              <Field label={t.email} type="email" value={email} onChange={setEmail} required />
              <Field label={t.phone} type="tel" value={phone} onChange={setPhone} />

              <div>
                <label className="mb-1 block text-xs font-medium text-[var(--color-andjix-text-muted)]">
                  {t.segment}
                </label>
                <select
                  value={segment}
                  onChange={(e) => setSegment(e.target.value)}
                  className="w-full rounded-xl border border-[var(--color-andjix-border)] bg-white px-3 py-2.5 text-sm outline-none focus:border-[var(--color-andjix-blue)] focus:ring-2 focus:ring-[var(--color-andjix-sky-soft)]"
                >
                  {Object.entries(t.segments).map(([k, v]) => (
                    <option key={k} value={k}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-[var(--color-andjix-text-muted)]">
                  {t.need}
                </label>
                <textarea
                  value={need}
                  onChange={(e) => setNeed(e.target.value)}
                  rows={3}
                  className="w-full rounded-xl border border-[var(--color-andjix-border)] bg-white px-3 py-2.5 text-sm outline-none focus:border-[var(--color-andjix-blue)] focus:ring-2 focus:ring-[var(--color-andjix-sky-soft)]"
                />
              </div>
            </div>

            {error && (
              <p className="mt-3 text-sm text-[var(--color-andjix-red)]">{error}</p>
            )}

            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-[var(--color-andjix-border)] px-5 py-2.5 text-sm transition hover:bg-[var(--color-andjix-sky-soft)]"
              >
                {t.close}
              </button>
              <button
                type="submit"
                disabled={submitting || !name.trim() || !email.trim()}
                className="rounded-full bg-[var(--color-andjix-blue)] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[var(--color-andjix-blue-deep)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting ? t.submitting : t.submit}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-[var(--color-andjix-text-muted)]">
        {label}
        {required && <span className="ml-1 text-[var(--color-andjix-red)]">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full rounded-xl border border-[var(--color-andjix-border)] bg-white px-3 py-2.5 text-sm outline-none focus:border-[var(--color-andjix-blue)] focus:ring-2 focus:ring-[var(--color-andjix-sky-soft)]"
      />
    </div>
  );
}

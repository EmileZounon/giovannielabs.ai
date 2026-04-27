# Andjix AI

Bilingual (FR/EN) chat assistant for Andjix Consulting Inc. Routes user questions through Claude Opus 4.7 with a curated knowledge base of Ottawa newcomer démarches, Canadian fiscalité, employment, housing, and SME admin. Detects high-value leads and forwards them to André via email.

## Stack

- Next.js 16 (App Router)
- Anthropic SDK (`claude-opus-4-7` with prompt caching + streaming)
- Tailwind v4
- Resend (transactional email for lead capture)

## Setup

```bash
npm install
cp .env.example .env.local
# fill in ANTHROPIC_API_KEY, RESEND_API_KEY, LEAD_EMAIL_TO, LEAD_EMAIL_FROM, NEXT_PUBLIC_CALENDLY_URL
npm run dev
```

Open `http://localhost:3000`.

## Environment variables

| Var | Purpose |
|---|---|
| `ANTHROPIC_API_KEY` | Anthropic API key |
| `RESEND_API_KEY` | Resend API key for sending lead emails |
| `LEAD_EMAIL_TO` | Where leads are forwarded (e.g. `info.andjix@gmail.com`) |
| `LEAD_EMAIL_FROM` | Verified Resend sender on a verified domain |
| `NEXT_PUBLIC_CALENDLY_URL` | André's Calendly link (shown in success state) |

## Architecture

- `src/app/page.tsx` — single-page chat
- `src/components/Chat.tsx` — chat UI, streaming SSE consumer, language toggle, auto-scroll
- `src/components/LeadModal.tsx` — lead capture form
- `src/app/api/chat/route.ts` — Anthropic streaming endpoint with prompt caching on the system prompt
- `src/app/api/lead/route.ts` — Resend email forwarding (no DB)
- `src/lib/system-prompt.ts` — Andjix persona + curated KB; emits `[BOOK]` keyword to trigger booking modal client-side

## Lead flow

1. User chats with Andjix
2. When the bot's reply contains `[BOOK]` (system prompt instructs it for paid services), client surfaces a "Réserver un appel" CTA
3. User fills name, email, phone, segment, need
4. POST `/api/lead` → Resend sends a structured email to `LEAD_EMAIL_TO` with the full transcript
5. André replies from his inbox; conversation continues by email or via the Calendly slot

No database. Email is the CRM until volume justifies one.

## Deploy

```bash
npx vercel link
npx vercel env add ANTHROPIC_API_KEY production
npx vercel env add RESEND_API_KEY production
npx vercel env add LEAD_EMAIL_TO production
npx vercel env add LEAD_EMAIL_FROM production
npx vercel env add NEXT_PUBLIC_CALENDLY_URL production
npx vercel --prod
```

Target subdomain: `andjix-ai.giovannielabs.ai` (or `ai.andjix.ca` once that DNS is set up).

## Notes

- **Model cost.** `claude-opus-4-7` is set per Anthropic skill defaults. For high-volume traffic, switch `MODEL` in `src/app/api/chat/route.ts` to `claude-sonnet-4-6` (3x cheaper, still strong).
- **Prompt cache.** Top-level `cache_control: {type: "ephemeral"}` caches the ~3K-token system prompt on every request after the first within 5 min. Watch `cache_read_input_tokens` in the response telemetry to verify hits.
- **Bilingual.** UI strings are FR/EN; the bot itself follows the user's last-message language per system prompt instruction.

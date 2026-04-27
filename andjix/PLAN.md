# Andjix Consulting — Build Plan

**Client:** André Djomamessi (Andjix Consulting Inc., Ottawa)
**Deadline:** Mercredi 2026-04-29 (one week from kickoff call)
**Scope:** Marketing site + AI assistant prototype
**Budget:** 1500 USD, 3 tranches (500 livraison, 500 + 500 après ajustements)

---

## Positioning

> La phase la plus importante de l'immigration n'est pas l'obtention des visas, mais l'établissement et l'intégration réussis. Trouver le chemin le plus adapté à notre profil au Canada via Andjix Consulting.

André's edge: 19 years bridging law, fiscalité, and Canadian federal admin (Service Canada conseiller depuis 2022). Bilingual FR/EN, Ottawa-based, SPA fédérale.

---

## Architecture

Mirror the ABSI + Naomi pattern.

| Asset | Path | Stack | Live URL (target) |
|---|---|---|---|
| Marketing site | `~/ClaudeProjects/giovannielabs.ai/andjix/` | Static HTML/CSS (ABSI clone) | `andjix.giovannielabs.ai` or `giovannielabs.ai/andjix/` |
| AI assistant | `~/ClaudeProjects/giovannielabs.ai/andjix-ai/` | Next.js 16 + Anthropic SDK + Firebase (Naomi clone) | `andjix-ai.giovannielabs.ai` |

The site links to the AI tool via the nav CTA, exactly like ABSI → Naomi.

---

## Brand

- **Palette:** sky blue + white, hint of red (Canadian flag wink). Departs from ABSI's blue/green/lime.
- **Type:** keep ABSI's pairing (Sora display + Inter body) — clean, modern, bilingual-friendly.
- **Logo:** AJ monogram or compass mark (André wants integration imagery). I'll mock 2-3 options as SVG.
- **Tone:** formal/aspirational, mirroring ABSI. André is positioning as a credibility-first consultant, not a community café.

---

## Marketing site — page structure

Single landing page, scrollable, bilingual toggle (FR default).

1. **Nav** — logo + sections + "Parler à l'IA" CTA
2. **Hero** — positioning quote, CTA to AI assistant + CTA to RDV
3. **Pour qui** — Nouveaux arrivants / Travailleurs autonomes / PME / Particuliers
4. **Nos services** — 6 lines from the strategic plan, each with the price band:
   - Déclaration d'impôts (75–300 $)
   - Accueil nouveaux arrivants (80–150 $)
   - Placement de personnel (500–2000 $)
   - Conseil administratif (100–250 $/h)
   - Forfaits accompagnement (300–800 $)
   - Orchestration IA pour PME (500–3000 $)
5. **Comment ça marche** — 3 étapes: parler à l'IA → diagnostic → rendez-vous avec André
6. **À propos d'André** — bio condensée + 3 piliers (droit, fiscalité, admin fédérale)
7. **Pourquoi Andjix** — différenciateurs (bilingue, IA 24/7, Ottawa local, partenariats CPA/RCIC)
8. **Contact** — téléphone, email, formulaire, CTA RDV
9. **Footer**

---

## AI assistant — prototype scope (week 1)

**Persona:** Conseiller virtuel Andjix. Bilingue. Chaleureux mais professionnel.

**Knowledge base (week 1, hardcoded prompt + small RAG):**
- Démarches d'arrivée Ottawa: NAS, OHIP, banque, permis Ontario, cours de langue (CLIC, IALP)
- Bases fiscales (T1 / T2125 / T2), différences pays d'origine vs Canada, dates clés ARC
- Recherche d'emploi Ontario: standards CV, droits du travail, sites
- Logement: Loi sur la location à usage d'habitation, droits locataires
- Crédits/prestations: ACE, prestation ontarienne, soins dentaires
- Référencement: YMCA, LASI, Catholic Centre, Carrefour Ottawa

**Conversational flow:**
1. Greeting + quick segmentation (nouveau arrivant? travailleur autonome? PME? particulier?)
2. Open Q&A grounded in the KB above
3. **Hand-off triggers** when the user asks about:
   - Déclaration d'impôts → propose RDV payant
   - Placement / recrutement → collecte CV + besoins
   - Constitution d'entreprise → propose consultation
4. Lead capture: nom, email, téléphone, segment, résumé du besoin → écrit dans Firestore (réutilise pattern Naomi)

**Out of scope week 1:** voice, document upload, multi-turn admin form filling, multilingual beyond FR.

---

## Data collection (per André's strategy doc)

- Toutes les conversations sont enregistrées (Firestore) avec consentement affiché
- Bouton "Partager un témoignage audio" (upload .m4a → Whisper transcription) — *optionnel semaine 2*
- Questionnaire post-conversation court (NPS + besoin non couvert)

---

## Decisions I need from you

These shape the build, so I'd rather not assume:

### 1. Domain
- Option A: `andjix.giovannielabs.ai` for the site, `andjix-ai.giovannielabs.ai` for the bot (mirrors absi + naomi)
- Option B: Buy `andjix.ca` (André is Canadian, looks more credible to Ottawa locals); site lives there, bot lives at `ai.andjix.ca`
- Option C: Subpath `giovannielabs.ai/andjix/` (cheapest, but treats him like a portfolio piece)

> My lean: **A for now, B once he validates traction**. He's a paying client, not a labs project, so the subpath feels wrong long-term. But subdomain on giovannielabs ships in 5 minutes.

### 2. Bilingual rollout
- Plan says EN translation is "à prévoir" (deferred). Ship FR-only Wednesday, EN sprint 2?
- Or build the i18n scaffold now (data files for `fr.json` / `en.json`) so EN is a 2-hour add later?

> My lean: **scaffold i18n now, ship FR copy Wednesday, drop EN in week 2**. The mechanical cost is small if I do it on day 1.

### 3. Lead-capture handoff
André has no Calendly, no booking system, no social links yet. When the bot says "let's book a session," what happens?
- Option A: Form → email to `info.andjix@gmail.com`
- Option B: I set up a free Calendly under his email this week
- Option C: Bot collects everything, writes to Firestore, André follows up by phone

> My lean: **B (Calendly) + C (Firestore log)**. Calendly is a 10-minute setup and the bot becomes meaningfully useful. Without it, "book a session" is a dead end.

---

## Timeline to Wednesday 2026-04-29

| Day | Deliverable |
|---|---|
| Mon 04-27 | Plan approved (this doc), scaffold marketing site, draft FR copy, mock 2 logos |
| Tue 04-28 | AI bot scaffold + KB prompt + Firestore wiring, deploy to Vercel preview |
| Wed 04-29 | Polish, deploy to production subdomain, hand André a walkthrough video |

Phase 2 (post-Wed): EN translation, audio testimonial intake, Make.com intake automations, full Voiceflow handoff if André prefers that to direct Anthropic SDK.

---

## What I'll need from André (via you)

- Final company name confirmation (still "Andjix Consulting Inc."?)
- Photo for the bio section (optional, can launch without)
- 2-3 testimonials he mentioned ("témoignages de personnes que j'ai déjà reçues")
- His preferred CTA phone behavior (call vs SMS vs WhatsApp on +1 613-276-8401)
- Logo green-light (I'll send 2-3 options)

---

## Open risk

The strategic plan promises **Orchestration IA for PME** as a paid service line. The prototype itself becomes André's portfolio piece for selling that service. So the bot quality reflects directly on his B2B credibility. Worth building it well, not as an MVP throwaway.

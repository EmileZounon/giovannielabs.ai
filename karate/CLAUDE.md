# Karate Black Belt Lineage — Agent Instructions

You are maintaining the infographic at **giovannielabs.ai/karate/**. The repo is already cloned.

## Read for full context (in order)

1. `karate/ROSTER.md` — human-readable roster of all 31 black belts
2. `karate/data.js` — source of truth (`BLACK_BELTS` array)
3. `karate/index.html` and `karate/app.js` — only if needed

## Project rules (locked)

- **6 organizations** (slug → display, color):
  - `tabata` → Tabata Sensei, gold `#F5C518`
  - `jka` → JKA, blue `#2A6FDB`
  - `jukf` → JUKF, red `#E63946`
  - `hdki` → HDKI, purple `#8B5CF6`
  - `iskf` → ISKF, deep red `#991B1B`
  - `skif` → SKIF (Kanazawa's Shotokan Karate-Do International Federation), midnight navy `#1E3A8A`
- **10 dan ranks**: Shodan, Nidan, Sandan, Yondan, Godan, Rokudan, Shichidan, Hachidan, Kudan, Judan
- **Person schema**:
  ```js
  { id, name, title?, universities: [], country, flag, photo, photoFocus?, ranks: [{ rank, year, org }] }
  ```
- A person can hold ranks at multiple orgs. **Track progression** by keeping ALL rank entries with their years (e.g. Shodan/jka 2023 AND Nidan/jka 2024 — never replace).
- Ball ring color is keyed to **highest rank**, not org.
- `universities` is an ARRAY (some people have multiple).
- Whenever you change `data.js`, update `ROSTER.md` to match.

## Git workflow

- Stage only `karate/` files unless told otherwise.
- Commit author MUST be `emile.giovannie@gmail.com` (Vercel hobby plan requires it):
  ```
  git -c user.email=emile.giovannie@gmail.com commit -m "..."
  ```
- Push to `origin main` — Vercel auto-deploys to `giovannielabs.ai/karate/`.

## Examples of expected requests from Emile

- "Add Maya Patel from MIT, India, JKA Shodan 2026"
- "Bruce got his Nidan in JKA in 2026"
- "Update Carol's photoFocus to 'center 25%'"
- "Lorraine is now Sandan in JKA"

Apply the request, update both files, commit with the right author, push, and report the commit SHA. If anything is ambiguous (duplicate name, missing org, unclear year), ask before committing.

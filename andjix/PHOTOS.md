# Andjix — Photo map & change log

Quick reference for which photo lives where on the Andjix marketing site, plus a record of recent updates so we can find swaps later.

Site root: `~/ClaudeProjects/giovannielabs.ai/andjix/`
Photos folder: `assets/photos/`
Local preview: `python3 -m http.server 8765` from the andjix folder, then open `http://localhost:8765/`.

---

## Current photo wiring (as of 2026-04-30)

### `index.html` — landing

| Section | File | Notes |
|---|---|---|
| Hero (right of "L'intégration réussie, votre vraie victoire") | `pexels-august-de-richelieu-4259134.jpg` | Family at kitchen island. Anchors "successful integration" in domestic life. |
| Audience card 01 — Nouveaux arrivants | `pexels-andromeda99-19791383.jpg` | Air Canada Rouge plane at gate. |
| Audience card 02 — Travailleurs autonomes | `pexels-kampus-8475169.jpg` | Shop owner with apron, "Aberto/Open" sign. Portuguese signage; reads as "small biz" universally. |
| Audience card 03 — Petites et moyennes entreprises | `pexels-darlene-alderson-7971177.jpg` | Team in modern coworking space. |
| About teaser visual block | (existing — check around line 195+) |  |
| IA band CTA (visual on phone) | `ai-on-phone.jpg` | Background imagery, line ~varies. |

### `services-particuliers.html`

| Section | File |
|---|---|
| Hero (right of "Un parcours adapté à chaque profil") | `pexels-eric-prouzet-225470-17353516.jpg` (Ottawa downtown glass building reflecting Parliament + Canadian flag) |
| `#impots` Déclaration d'impôts | `desk-documents.jpg` |
| `#nouveaux-arrivants` | `migrants-airport.jpg` |
| `#emploi` | `women-studying.jpg` |
| `#conseil` | `group-consulting.jpg` |
| `#forfaits` | `pexels-kindelmedia-6775115.jpg` (3 people around a laptop, coworking) |

### `services-pme.html`

| Section | File |
|---|---|
| Hero (right of "Modernisez sans embaucher") | `pexels-darlene-alderson-7971177.jpg` (same coworking team as audience card 03 on `/`) |
| `#automatisation` | `dashboard-screenshot.jpg` |
| `#constitution` | `team-handshake.jpg` |

### Other pages (verify as needed)

| Page | Key images |
|---|---|
| `temoignages.html` | `portrait-1/2/3.jpg` (avatars), `team-handshake.jpg`, `dashboard-screenshot.jpg`, `desk-documents.jpg` |
| `ia.html` | `ai-on-phone.jpg` |
| `about.html`, `contact.html`, `ressources.html` | Verify on swap |

---

## Photos available on disk but not (yet) wired

- `pexels-cedric-fauntleroy-7220862.jpg`
- `pexels-helenalopes-27178153.jpg`
- `canada airport.jpg` (note the space in filename)
- `entrepreneur-laptop.jpg`
- `newcomer-family.jpg`
- `ottawa-skyline.jpg` (was on services-particuliers hero before the Eric Prouzet swap)
- `hero-conversation.jpg` (was on index hero before the August de Richelieu swap)
- `newcomer-airport.jpg` (was on audience card 01 before the Air Canada Rouge swap)
- `self-employed.jpg` (was on audience card 02 before the apron/shop swap)
- `sme-shop.jpg` (was on audience card 03 + services-pme hero before the coworking swap)

These are kept on disk in case we want to revert or reuse.

---

## Change log

### 2026-04-30 — image overhaul + copy tightening
- **New hero on `/`**: family at kitchen island (`pexels-august-de-richelieu-4259134.jpg`) replaces team conversation shot.
- **New audience cards on `/`**: Air Canada Rouge plane (newcomers), Aberto/Open shop owner (self-employed), modern coworking team (PME).
- **New services-particuliers hero**: Ottawa glass building reflecting Parliament + Canadian flag (`pexels-eric-prouzet-...`).
- **New services-pme hero**: same coworking team picture used on `/` audience card 03.
- **New services-particuliers `#forfaits` photo**: 3 people around a laptop in a coworking space (`pexels-kindelmedia-6775115.jpg`) — better fit for "accompagnement sur 3 à 6 mois".
- **Copy shortened** on intro callout (FR + EN, used in `index.html` line ~84 and `i18n/{fr,en}.json` `intro.callout`):
  - FR: "Le problème c'est la navigation, l'information juste et un humain."
  - EN: "The problem is navigation, accurate information and a human."

### 2026-04-29 (initial build)
- Multi-page FR site scaffolded (10 pages), 22 photos added.
- Shared nav/footer via `partials.js`, FR/EN i18n via `i18n.js` + `i18n/{fr,en}.json`.

---

## How to swap a photo (for future reference)

1. Drop the new file into `assets/photos/`.
2. Find the current `<img src="assets/photos/...">` reference: `grep -rn "old-filename.jpg" *.html`.
3. Edit the `src` and `alt` to point at the new file.
4. Reload the local server (`http://localhost:8765/<page>`).
5. If the same image appears on multiple pages, decide whether to keep variety or propagate.
6. Update this doc's tables.
7. Commit. The previous file stays on disk by default — useful for revert.

## Notes

- File naming: original-Pexels filenames are kept (e.g. `pexels-eric-prouzet-225470-17353516.jpg`) for credit traceability. Acceptable, but verbose URLs in deploys. If we want shorter URLs later, rename + update refs.
- Photo weight: total `assets/photos/` was 19MB at the previous commit. Largest file 6MB (`migrants-airport.jpg`). Acceptable for Vercel but worth optimizing before any heavy traffic launch.
- Hero images use `loading="eager"`. All others use `loading="lazy"` for performance. Keep that convention when swapping.

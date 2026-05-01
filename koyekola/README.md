# Koyekola Academy — Marketing Site

The landing page for Koyekola Academy, the teacher and school-director professional development platform for the DRC.

**Live URL:** https://giovannielabs.ai/koyekola/

**Founder:** Assina Kahamba, Ed.M. (Harvard Graduate School of Education)

---

## What's in this project

```
koyekola/
├── index.html              # The whole site, single page
├── dist/styles.css         # Compiled Tailwind CSS (39 KB, do not edit by hand)
├── src/input.css           # Source for Tailwind compilation (edit this for style changes)
├── assets/
│   └── photos/             # All site imagery, optimized for slow connections
├── logo.jpeg               # Koyekola wordmark / favicon
├── PHOTOS.md               # Map of which photo lives where on the page
└── README.md               # This file
```

**No build pipeline at runtime.** It's plain HTML, one stylesheet, no JavaScript framework. Loads fast on slow internet (Kinshasa-friendly).

## Tech stack

- **HTML5** (single file, ~900 lines)
- **Tailwind CSS v4** (compiled once into `dist/styles.css`, served as a static file — not the CDN)
- **Vanilla JavaScript** (no frameworks): handles language switching, mobile menu, live activity ticker, image fade-in
- **Google Fonts:** Poppins (display) + Inter (body)

## Features

| Feature | Where |
|---|---|
| **Trilingual** (FR · LN · EN) | Switcher in nav + footer; preference persists in localStorage |
| **Mobile menu** | Hamburger drawer with full nav and language switcher |
| **Hero with Assina** | Photo of Assina presenting at Harvard with the cohort teaser below |
| **Mission + 3 stats** | 97% / 35+ / 3 |
| **3-week cycle explainer** | Apprendre · Appliquer · Partager |
| **Course catalog** | K1 (AI lesson planning), K2 (Reading), K3 (Numeracy) |
| **Self-assessment teaser** | 15-competency framework preview |
| **Founder section** | Assina's photo, placeholder bio (replace when ready), Harvard interview YouTube poster |
| **Community + raffle** | $20 weekly airtime credit |
| **Director cohorts** | $600, two cohorts shown |
| **Free school diagnostic** | With morning-assembly photo |
| **Pricing table** | All four product lines |
| **FAQ** | 5 collapsible questions |
| **Live activity ticker** | Rotating "Marie just enrolled in K1..." messages |

## How to update

### Edit content (text)
1. Open `index.html`
2. Find what you want to change (FR is the source of truth)
3. If the element has a `data-i18n="..."` attribute, also update the `i18n.en` and `i18n.ln` translations near the bottom of the file so all three languages stay in sync
4. Commit and push: deploy is automatic via GitHub Pages

### Add or change a photo
1. Drop the new photo into `assets/photos/` (use a clean filename, no spaces)
2. Resize before committing (target ~80–150 KB for a 1024 px wide JPEG):
   ```
   sips --resampleWidth 1024 --setProperty formatOptions 70 photo.jpg --out photo.jpg
   ```
3. Update the `<img src=...>` reference and `alt` text in `index.html`
4. Update `PHOTOS.md` so the next person knows what changed

### Edit styles
1. Style changes go in `src/input.css`
2. Recompile (one-shot):
   ```
   /tmp/tailwindcss-macos-arm64 -i src/input.css -o dist/styles.css --minify --content "./index.html"
   ```
3. Or run the watcher while iterating (drop `--minify`, add `--watch`)
4. Commit both `src/input.css` and `dist/styles.css`

### Add Assina's bio
1. In `index.html`, search for `Bio à venir.`
2. Replace the dashed-border placeholder card with the real bio
3. Don't forget to add EN + LN translations in the i18n dict near the bottom

## Deployment

The site auto-deploys via **GitHub Pages** from the `EmileZounon/giovannielabs.ai` repo. Any push to `main` that touches `koyekola/` is live within 1–3 minutes at https://giovannielabs.ai/koyekola/.

A second copy lives on Vercel (`koyekola-plum.vercel.app`) from the initial test push — it can be ignored or repurposed later.

## Performance

The site is optimized for slow Kinshasa connections:

| Metric | Value |
|---|---|
| Total page weight | ~1.2 MB (HTML + CSS + 9 photos) |
| CSS | 39 KB compiled (replaces a ~3 MB Tailwind CDN) |
| Photos | All resized to 1024 px wide, JPEG 70%, total ~970 KB |
| Hero image | Preloaded with `fetchpriority="high"` |
| Other images | `loading="lazy" decoding="async"` |

A Lighthouse mobile audit is scheduled for Saturday May 2, 2026 — results will be appended to `PERF-AUDIT-2026-05-02.md`.

## Brand

- **Primary:** Deep Blue `#1E3A8A`
- **Accent / CTA:** Crimson `#DC143C`
- **Background:** White / Paper `#F8FAFC`
- **Text:** Ink `#1F2937`
- **Display font:** Poppins
- **Body font:** Inter
- Tagline: "Développement professionnel des enseignants"

Visual identity source: `~/Documents/Kolekoya/Kolekoya Visual identity.docx`

## Contact

Built collaboratively by Emile Giovannie (giovannielabs.ai) and Claude. For changes, ping Emile or open a PR against `EmileZounon/giovannielabs.ai`.

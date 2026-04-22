# ABSI Website

Marketing site for **Alpha Beta STEM Institute (ABSI)**. An AI advisor for Ghanaian senior high students choosing what's next in STEM.

**Live guidance tool:** https://naomi-ruby.vercel.app
**Contact:** absi@alphabeta.edu.gh • +1 857 340 9306

## Stack

Static HTML + CSS. No build step. Google Fonts for Sora and Inter. Inline SVG for pathway illustrations and icons.

## Structure

```
absi-website/
├── index.html          # Full single-page site
├── styles.css          # Design system + components
├── assets/
│   ├── logo.png        # ABSI logo
│   └── flier.jpg       # Trifold reference
└── README.md
```

## Preview locally

```bash
cd ~/ClaudeProjects/absi-website
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy to Vercel

```bash
vercel --prod
```

No config needed. Vercel serves static files from the repo root by default.

## Design system

Built from the ABSI Visual Branding Brief.

- **Colors:** Blue leads (`#0D6EFD`, `#0A3D91`), green supports (`#7ED321`, `#3FAE5A`), signature gradient `linear-gradient(135deg, #8CD500, #27C27A, #0D6EFD)` used sparingly.
- **Type:** Sora (headlines) + Inter (body), sentence case, generous spacing.
- **Motif:** Pathway lines and branching nodes echo the logo's tree + circuit + DNA ideas.
- **Ratio:** 70% neutrals / 20% blue family / 10% green and gradient accents.

## Sections

1. Hero with pathway SVG illustration
2. Problem intro with three stat cards
3. What the guidance tool does (3 features)
4. How ABSI works (4-step journey)
5. Guidance tool CTA band
6. Why ABSI exists (4 support pillars)
7. Who it's for
8. Partner CTA with contact details
9. Footer

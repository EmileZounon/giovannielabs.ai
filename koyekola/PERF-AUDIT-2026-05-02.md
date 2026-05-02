# Lighthouse Mobile Audit — Koyekola Academy — 2026-05-02

**URL:** https://giovannielabs.ai/koyekola/  
**Config:** Mobile · Slow 4G (simulate) · Moto G4 CPU throttling  
**Tool:** Lighthouse (local serve; live URL returns 403 from this environment)

---

## Scores (0–100)

| Category         | Score |
|------------------|-------|
| Performance      | 86    |
| Accessibility    | 91    |
| Best Practices   | 96    |
| SEO              | 100   |

---

## Core Web Vitals

| Metric | Value  | Rating |
|--------|--------|--------|
| LCP    | 3.2 s  | Needs improvement (target < 2.5 s) |
| TBT    | 290 ms | Needs improvement (target < 200 ms) |
| CLS    | 0      | Good |

---

## Top 3 Opportunities

### 1. Render-blocking Google Fonts CSS — **~780 ms saved**

The Google Fonts stylesheet (`Inter` + `Poppins`) is loaded as a blocking `<link rel="stylesheet">`, delaying all paint by 780 ms. `dist/styles.css` adds another 452 ms. Combined Lighthouse estimate: **560 ms savings**.

- `fonts.googleapis.com/css2?family=Inter…&family=Poppins…` → 780 ms blocked
- `koyekola/dist/styles.css` → 452 ms blocked

**Fix:** Replace the Fonts `<link rel="stylesheet">` with the async preload pattern:
```html
<link rel="preload" as="style"
  href="https://fonts.googleapis.com/css2?family=…&display=swap"
  onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="…"></noscript>
```

### 2. Oversized hero image — **~114 KB saved**

`assina-at-harvard.jpg` is served at 1024 × 1294 px but rendered at 651 × 823 px on mobile — 114 KB of unnecessary transfer on every page load, directly inflating LCP.

- `assets/photos/assina-at-harvard.jpg`: 195 KB served, ~114 KB wasted (responsive sizing)
- `assets/photos/smiling-children-classroom.jpg`: 82 KB served, ~16 KB wasted (WebP conversion potential)

**Fix:** Generate a 720 px–wide WebP variant of `assina-at-harvard.jpg` and use `<picture>` / `srcset`.

### 3. Unminified inline JavaScript — **~3.5 KB saved**

The reveal-animation script block at the bottom of `index.html` is unminified. Minor impact; minifying it (terser or manual) removes dead whitespace/comments.

- Inline `<script>`: 3.5 KB → ~0 KB wasted after minification

---

## Next Action

**Performance score is 86/100 — below target.**

Single biggest fix: **Load Google Fonts asynchronously** (preload + onload pattern) to remove the 780 ms render-blocking delay — the primary driver of the 3.2 s LCP on slow mobile connections.

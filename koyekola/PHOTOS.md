# Koyekola — Photo map & change log

Quick reference for which photo lives where on the Koyekola Academy landing page.

Site root: `~/ClaudeProjects/koyekola/`
Photos folder: `assets/photos/`
Local preview: `python3 -m http.server 8765` from this folder, then open `http://localhost:8765/`.

---

## Current photo wiring (as of 2026-05-01)

### `index.html` — landing page (single file)

| Section | File | Notes |
|---|---|---|
| Hero (right column anchor) | `assina-at-harvard.jpg` | Real photo of Assina presenting Koyekola at Harvard. The Solution slide visible behind her, Harvard shield on the podium. Strongest credibility signal on the page. |
| Mission (left anchor) | `smiling-children-classroom.jpg` | Joyful young African student smiling with a pencil. |
| Course card K1 (Planification de leçons assistée par l'IA) | `ai-chatgpt-laptop.jpg` | Hands typing on a laptop with the ChatGPT interface visible. |
| Course card K2 (Enseigner la lecture) | `young-students-classroom.jpg` | Authentic primary classroom: kids with notebooks. |
| Course card K3 (Sens du nombre) | `student-at-blackboard.jpg` | Student writing math equations on a chalkboard. |
| Founder section (`#fondatrice`) | `assina-founder.jpg` | Assina's professional portrait (provided by Emile). |
| Founder YouTube poster | `assina-youtube-thumb.jpg` | Bany Talks interview thumbnail. Clickable, opens YouTube in new tab. |
| Director section hero band | `teacher-ghana-classroom.jpg` | African male teacher in print attire with class. Cropped with `object-top` to show face. |
| Schools / Diagnostic section | `school-assembly-emile.jpg` | Real photo (provided by Emile) of Congolese kids in pink/blue/green uniforms saluting the flag at morning assembly. |

### Photos available but not currently used

- `students-focused.jpg` — two uniformed students reading together. Reserved for a future success-stories or impact page.
- `teacher-alphabet-liberia.jpg` — was the previous hero, now unused. Strong photo of a teacher pointing at the alphabet on a chalkboard, kids in red uniforms in a green-walled classroom. Could be repurposed for a "real classrooms" gallery.

---

## How to add or replace a photo

1. Drop the new photo in `assets/photos/`. Use a URL-safe filename (no spaces).
2. Resize before committing (target 1024 px wide, ~80–150 KB):
   ```
   sips --resampleWidth 1024 --setProperty formatOptions 70 photo.jpg --out photo.jpg
   ```
3. Update the `<img>` tag in `index.html`, including `alt` text.
4. Update this file so future-you knows what changed.

---

## Photo provenance

| File | Source | License |
|---|---|---|
| `assina-at-harvard.jpg` | Provided by Emile (May 2026) | © Assina Kahamba |
| `assina-founder.jpg` | Provided by Emile (May 2026) | © Assina Kahamba |
| `assina-youtube-thumb.jpg` | YouTube `hqdefault.jpg` for video `9dPUjUf9aKM` | YouTube TOS |
| `school-assembly-emile.jpg` | Provided by Emile (May 2026) | © photographer |
| `ai-chatgpt-laptop.jpg` | Pexels 16094039 | Pexels free license |
| `smiling-children-classroom.jpg` | Pexels 28593055 | Pexels free license |
| `student-at-blackboard.jpg` | Pexels 6238048 | Pexels free license |
| `students-focused.jpg` | Pexels 34162714 | Pexels free license |
| `teacher-alphabet-liberia.jpg` | Pexels 35610368 | Pexels free license |
| `teacher-ghana-classroom.jpg` | Pexels 3766706 | Pexels free license |
| `young-students-classroom.jpg` | Pexels 28593054 | Pexels free license |

Pexels images are royalty-free with no attribution required, but credits are kept here for traceability.

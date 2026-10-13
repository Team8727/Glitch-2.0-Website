# GLITCH 2.0 — FRC Team 8727 Website

A single-page site for **Glitch 2.0 (FRC Team 8727)**, Asheville High School / SILSA Robotics.

Built as a static site (plain HTML/CSS/JS) — no build step — so it deploys cleanly to
**GitHub Pages**.

## Aesthetic

Dark, techy, on-brand "glitch" look using the team's own palette:

| Token | Color |
|-------|-------|
| Neon green (primary) | `#04F904` |
| Blue (secondary) | `#116DFF` |
| Near-black (background) | `#111111` / `#050505` |

Includes glitch RGB-split headings, scanlines, a CRT terminal readout, a scrolling ticker, a live
countdown to THOR West 2026, and full `prefers-reduced-motion` support.

## Content

All copy is drawn from the **Glitch 2.0 AI Context Pack** (`Glitch-2.0-Agent-Context`): team history,
robot archive (CronkBot → MEGASTUF → Melodie → 2026 chassisbot), competition record, awards, impact,
and the upcoming THOR West 2026 event.

Sections:

- Hero + scrolling ticker
- About (team story, lineage from Glitch 5854)
- Stats bar
- Robot archive
- Results / 2026 season table + awards timeline + THOR West countdown
- Impact (outreach + Sustainability world record)
- Sponsors
- Get Involved
- News
- Donate / Contact
- Footer with socials

## Deploying to GitHub Pages

The repo includes a GitHub Actions workflow (`.github/workflows/pages.yml`) that builds and deploys
the site on every push to `main`.

1. Push this repo to GitHub (`Team8727/Glitch-2.0-Website`).
2. In the repo settings: **Settings → Pages**, set **Source** to **GitHub Actions**.
   (The workflow will do the rest on the next push.)
3. The site will be live at `https://team8727.github.io/Glitch-2.0-Website/`.

> All asset paths are relative, so the site works under the repo sub-path — no base URL config needed.

## Local development

Just open `index.html` in a browser, or serve it:

```bash
# any static server
python -m http.server 8000
# then open http://localhost:8000
```

## File structure

```
index.html                  single-page site
assets/
  css/style.css             all styling
  js/main.js                interactions (nav, reveal, terminal, countdown)
  img/logo.png              team logo (hero visual)
  favicon.svg               favicon
.github/workflows/pages.yml GitHub Pages deployment
```

## Notes / placeholders

- **Sponsor slots** are placeholders ("Your logo here") — drop sponsor logos in `assets/img/` and
  update the `#sponsors` section.
- The **2025 robot** is listed as undocumented (per the context repo) — fill it in when a team member
  provides the details.
- The **News** section is static; swap in real posts as needed.

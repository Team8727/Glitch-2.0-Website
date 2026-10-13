# GLITCH 2.0 — FRC Team 8727 Website

A multi-page static site for **Glitch 2.0 (FRC Team 8727)**, Asheville High School / SILSA Robotics.

Built as a plain static site (no build step) — deploys cleanly to **GitHub Pages**.

## Aesthetic

Dark, techy, on-brand "glitch" look using the team's own palette:

| Token | Color |
|-------|-------|
| Neon green (primary) | `#04F904` |
| Blue (secondary) | `#116DFF` |
| Near-black (background) | `#111111` / `#050505` |

Includes glitch RGB-split headings, scanlines, a CRT terminal readout on the story page, a rotating
message ticker on the home page, a live countdown to THOR West 2026, and full
`prefers-reduced-motion` support.

## Pages

| Page | File | Contents |
|------|------|----------|
| Home | `index.html` | Hero, origins teaser, highlights, stats |
| Our Story | `about.html` | **Why 2.0** — the Glitch 5854 → 8727 story + simplified ethos |
| Robots | `robots.html` | Robot archive (CronkBot → MEGASTUF → Melodie → 2026 chassisbot) |
| Results | `results.html` | 2026 season table, awards timeline, THOR West countdown |
| Impact | `impact.html` | Outreach + Sustainability world record |
| Sponsors | `sponsors.html` | Founding schools (SILSA + AHS) + tiered sponsor logos |
| Get Involved | `get-involved.html` | Student / mentor / parent / company paths |
| News | `news.html` | Event + season posts |

All copy is drawn from the **Glitch 2.0 AI Context Pack** (`Glitch-2.0-Agent-Context`).

## Why "2.0"?

We're the second chapter of **Glitch (FRC 5854)**, a community team hosted at UNC Asheville that
competed 2016–2020. When it paused during the pandemic, a mentor helped rebuild it in 2021 for
Asheville High School's engineering program. The name survived, the team was rebuilt — that's the
2.0. This is made prominent on the home page and the Our Story page.

## Deploying to GitHub Pages

The repo includes a GitHub Actions workflow (`.github/workflows/pages.yml`) that deploys on every
push to `main`.

1. Push to GitHub (`Team8727/Glitch-2.0-Website`).
2. In repo **Settings → Pages**, set **Source** to **GitHub Actions**. (If you prefer no workflow,
   choose **Deploy from a branch** → `main` / `/(root)` instead, and delete the workflow file.)
3. Live at `https://team8727.github.io/Glitch-2.0-Website/`.

> All asset paths are relative, so the site works under the repo sub-path — no base URL config needed.

## Local development

Open any page in a browser, or serve it:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

## File structure

```
index.html, about.html, robots.html, results.html,
impact.html, sponsors.html, get-involved.html, news.html
assets/
  css/style.css             all styling (shared)
  js/main.js                interactions (nav, reveal, ticker, terminal, countdown)
  img/logo.png              team logo (home hero)
  favicon.svg               favicon
.github/workflows/pages.yml GitHub Pages deployment
```

## Notes / placeholders

- **Sponsors** (`sponsors.html`): founding schools (SILSA + Asheville High, with addresses/websites
  and their link to the team) plus a tiered corporate/foundation grid — Title $10k+ (Cummins),
  Platinum $5k+ (AvL, Haakon, Glass Foundation), Gold $3k+ (Baxter, GE Aerospace, Gene Haas),
  Silver $1k+ (TE Connectivity, BAE Systems, Campbell Shatley, Sugar Hollow Solar, Leidos). Logos
  live in `assets/img/sponsors/` (AVIF) and `assets/img/schools/`; each links to the partner's site.
  To add/change a sponsor, drop a logo in `assets/img/sponsors/` and update the tier in
  `sponsors.html`.
- The **2025 robot** is listed as undocumented (per the context repo) — fill it in when a team member
  provides details.
- The **News** page is static; swap in real posts as needed.
- Each page shares the same header/footer — update all pages together (or later move to a tiny
  include/build step if you outgrow plain HTML).

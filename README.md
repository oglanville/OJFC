# OJFC Stats

Live statistics site for **Old Johnians FC** (St John's School, Leatherhead), part of the Arthurian League.

## What it is
A self-contained static page (`index.html`) — the full OJFC Data Hub dashboard, password-gated (client-side). Tabs: Overview, Fixtures, Statistics, Payments, Communications, Actions. Statistics, Team Results and Missing Payments read live from Supabase; Payments P&L / ledger and Communications are a snapshot. Renders:
- **Team results** by season (Overall / 2024-25 / 2025-26)
- **Fantasy Football league** — points per player (App +2, Goal +5, Assist +3, MoM +3, Yellow -1, Red -3), sortable
- **Missing payments** — players with unpaid match fees

## Data / backend
Supabase project `ojfc-stats`. The raw match-by-match data lives in `stats_lines` (1,050 rows imported from the club cashbook). Three views drive the site:
- `v_player_stats` — per-season + overall player aggregates & fantasy points
- `v_team_results` — W/D/L/GF/GA per team per season
- `v_missing_payments` — outstanding match fees (rows where Paid = No)

Views are read-only via the public API role (RLS). The anon key in `index.html` is a publishable read-only key — safe to commit.

## Run locally
Just open `index.html` in a browser, or serve it:
```
npx serve .
```

## Environment variables

Set these in Vercel (Project → Settings → Environment Variables), for Production and Preview:

- `SUPABASE_URL` = `https://xplbkkqpgrukjejqufbk.supabase.co/rest/v1`
- `SUPABASE_ANON_KEY` = the Supabase publishable anon key (read-only; safe to expose in the browser)

At build time `node build.js` injects them into `dist/index.html`. No keys are committed to the repo.

## Deploy
Static — no build step. On Vercel: import this repo, framework preset "Other", output = repo root. Every push to `main` redeploys.

## Roadmap
- Fixtures + availability (once the 2026-27 Arthurian League fixtures are released)
- Payments / P&L views
- Auth for editing (write access) — currently read-only

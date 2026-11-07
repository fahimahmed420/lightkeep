# Lightkeep — concept site by Zordev

Pitch: a full marketing site for a fictional uptime-monitoring SaaS, with a CMS the team edits themselves.
Sells: Growth site ($2,200) — multi-page, CMS, SEO foundations, product and customer pages.
Label on zordev.com: concept
Case study: https://www.zordev.com/work/lightkeep

## Name check
- Web search: 2 Nov 2026 (planning pass) — no software product found.
- USPTO TSDR / EUIPO: TODO before launch

## Pages (22 routes)
Home · Product · Monitoring · Status pages · Pricing (monthly/annual toggle, comparison table, FAQ) · Customers · Blog (category filter) · Blog post · RSS · Changelog · Docs (sidebar + instant search) · Doc page · About · Book a demo · System status (live poll of /status.json) · Privacy · Terms · Credits · 404 · /admin (Payload CMS)

## CMS (Payload 3.90.2, pinned: newer versions need Node ≥ 24.22)
- Collections: Blog posts (drafts, autosave, scheduled publishing, live preview), Changelog, Docs, Media, Users.
- Published pages revalidate on save; drafts are visible only to signed-in editors via `?preview=1`.
- Local DB: SQLite (`lightkeep.db`, gitignored). Production: switch to Postgres (`@payloadcms/db-postgres`, Neon) and Vercel Blob for media.
- Seed: `npm run seed` (needs SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD in .env.local). Re-running resets content.

## Env (see .env.example)
DATABASE_URI, PAYLOAD_SECRET, NEXT_PUBLIC_SITE_URL, RESEND_API_KEY, DEMO_TO_EMAIL, DEMO_FROM_EMAIL, SEED_ADMIN_*

## Disclosure
- Footer: "Lightkeep is a fictional company. Site designed and built by Zordev."
- Customers page states the stories are fictional. "Concept site by Zordev" pill links to the case study.
- noindex: metadata, X-Robots-Tag header, robots.txt disallow.

## Tests (3 Nov 2026)
- 8 phones × 15 routes: 0 sideways scroll, 0 tiny text, 0 console errors; tap targets ≥ 44px after fixes.
- CMS round trip (11/11): sign-in, draft with auto slug, draft hidden publicly (404), editor preview, publish → live on page, index and RSS, status.json, admin loads.
- Fixed during testing: alert card covering the hero's degraded monitor; article width override; browser-bar dots overlapping on phones; favicon 404.

## Tests (7 Nov 2026, production build, Chrome emulation)
- 18 routes at 375px: 0 sideways scroll, 0 text under 12px, 0 console errors. Mobile menu, pricing toggle, docs search and demo form (validation and offline fallback) driven from the DOM.
- Fixed: header CTAs wrapped onto two lines at 1024px; product-mock labels were 11.2px; status page "last incident" was a hard-coded relative date.
- Faster: dropped the Fraunces SOFT axis and the unused width axis (preloaded fonts 200 KB → 120 KB); world map is one path instead of ~900 circles and a client component so it is not serialised twice (home HTML 436 KB → 374 KB); blog post data read once per request.

## Measured numbers
| Date | Tool | Page | Perf | A11y | SEO | JS KB |
|---|---|---|---|---|---|---|
| TODO after deploy | | | | | | |

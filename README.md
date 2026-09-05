# manny-portfolio

Personal portfolio site for Manny Flores, Senior Systems Engineer.

**Live:** [mannyflo.com](https://mannyflo.com)

## Stack

- React 19 + Vite 7 (SPA)
- CSS variables (tokens) + scoped component primitives
- `@vercel/analytics` + `@vercel/speed-insights`
- Deployed on Vercel

## Structure

```
manny-portfolio/
├── public/              Static assets (logo, profile image, favicon)
├── src/
│   ├── App.jsx          Single-page portfolio component
│   ├── main.jsx         React entry
│   ├── index.css        Global reset
│   ├── content/
│   │   └── portfolio.js Page content as { eng, rec } pairs: capabilities, plan lines, projects (with proof), fabric nodes
│   ├── lib/
│   │   ├── audit.js     Client-side session audit store (useAuditLog, audit())
│   │   └── role.js      Reader role store (useRole, setStoredRole), localStorage-backed
│   ├── components/
│   │   ├── IdentityGraph.jsx  Hero access fabric (SVG, SMIL pulses, hover/pin readout)
│   │   ├── CaseStudy.jsx      Building-now entry: prose + proof column (artifact link or shape)
│   │   ├── MobileDock.jsx     Phone-only bottom action bar
│   │   ├── RoleSwitch.jsx     read as: engineer | recruiter
│   │   ├── AuditLog.jsx       "access logged · N" toggle + panel
│   │   └── ...
│   └── styles/
│       ├── tokens.css   Design tokens (color, spacing, radius, shadow, easing, motion)
│       └── app.css      Component primitives + app-specific styles
├── tests/
│   ├── setup.ts         Vitest + Testing Library harness
│   └── *.test.jsx       Component smoke tests
├── index.html
├── vercel.json          Security headers (CSP, HSTS, XFO, Referrer, Permissions)
└── vite.config.js
```

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Start Vite dev server on http://localhost:5173 |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint across the repo |
| `npm test` | Run vitest suite once |
| `npm run test:watch` | Vitest in watch mode |

## Design tokens

All visual constants live in `src/styles/tokens.css` as CSS custom properties.

- **Color**: `--color-bg`, `--color-surface`, `--color-border`, `--color-text`, `--color-text-muted`, `--color-accent`, `--color-accent-strong`, `--color-success`
- **Spacing**: `--space-1` (4px) through `--space-10` (80px); 4px base grid
- **Radius**: `--radius-sm` (4px), `--radius-md` (8px), `--radius-lg` (12px), `--radius-xl` (16px), `--radius-pill` (20px)
- **Font size**: `--fs-xs` through `--fs-5xl`; mobile inputs use `--fs-base` (16px) to prevent iOS zoom
- **Shadow**: `--shadow-sm`, `--shadow-md`, `--shadow-glow`
- **Easing / motion**: `--ease-out`, `--ease-in-out`, `--motion-fast`, `--motion-base`, `--motion-slow`

Add a new token by extending `tokens.css`. Do not introduce new raw hex values in components: reference a token instead.

## Component primitives

Defined in `src/styles/app.css`:

- `.card`: surface container (border + subtle bg)
- `.chip`: mono rect tag for tools and case-study tags
- `.btn` / `.btn-ghost`: primary and outline button
- `.icon-btn`: square icon-only button (44px hit target)
- `.dot`: status indicator (paired with `.dot--success`)
- `.sr-only`: visually-hidden but screen-reader accessible
- `.tabular`: `font-variant-numeric: tabular-nums` for aligned numbers

## Accessibility

Targeting WCAG 2.1 AA.

- Skip link → `<main id="main">` landmark
- `:focus-visible` on every interactive element
- `aria-expanded` / `aria-controls` on the mobile menu button
- `aria-current="page"` on the active nav item
- `prefers-reduced-motion` respected: animations collapse to 0.01ms
- Color contrast ≥ 4.5:1 on body text, ≥ 3:1 on large text and UI
- 16px minimum font size on mobile inputs (none currently, documented as a rule)
- Semantic landmarks: `<nav>`, `<main>`, `<section>` with `aria-labelledby`, `<footer>`

## Keyboard shortcuts

| Key | Action |
|---|---|
| `Esc` | Close the mobile menu if open |
| `Tab` | Move focus through interactive elements (visible ring) |
| `Enter` / `Space` | Activate focused button / link |

## URL state

Nav buttons update the URL hash (`#capabilities`, `#plan`, `#building`, `#contact`) via `history.replaceState` so the active section is shareable without triggering a full scroll reset.

## Reader role, audit log, access fabric

- **Role** (`read as: engineer | recruiter` in the masthead; in the hero on phones): scopes the language. Stored in `localStorage` under `mf-role`; read through `useSyncExternalStore` in `src/lib/role.js`. Every lensed string is an `{ eng, rec }` pair in `src/content/portfolio.js`, rendered by `<Lens role pair />` in `App.jsx`.
- **Audit log** (`access logged · N`): a real, client-side list of this tab's events. Call `audit('some.action', 'detail')` from anywhere; `useAuditLog()` subscribes. Nothing is persisted or sent.
- **Access fabric** (hero): `fabricNodes` in `portfolio.js` drives the SVG in `IdentityGraph.jsx`. Positions are in a 420x440 viewBox. `flow: 'out' | 'in' | 'none'` sets pulse direction; `retired: true` draws the dashed treatment.

## Security headers

Configured in `vercel.json`:

- `Content-Security-Policy`: `default-src 'self'`; allows inline styles (required by component-level `style={{...}}`); fonts self-hosted under `/fonts` (no external font sources); analytics from `va.vercel-scripts.com` and `vitals.vercel-insights.com`
- `Strict-Transport-Security`: `max-age=63072000; includeSubDomains; preload`
- `X-Frame-Options`: `DENY`
- `X-Content-Type-Options`: `nosniff`
- `Referrer-Policy`: `strict-origin-when-cross-origin`
- `Permissions-Policy`: `camera=(), microphone=(), geolocation=(), interest-cohort=()`

## How to add X

**Add a nav section**:
1. Add `{ id, label, eyebrow }` to `NAV_SECTIONS` in `App.jsx` (one name for nav, eyebrow, and hash).
2. Add a `<section id={id}>` inside `<main>`.
3. IntersectionObserver will sync the active state automatically.

**Add a capability**: append to `capabilities` in `src/content/portfolio.js` with `title` and `desc` as `{ eng, rec }` pairs, a `state` (`operating`, `building`, `expanding`, `hardening`), and its `tools` chips. There is no separate skills section.

**Add a case study**: append to `projects` in `src/content/portfolio.js` with `title` and `desc` as `{ eng, rec }` pairs, `tags`, and a `proof` (`kind`, `lines` as `[key, value]` pairs, optional `link`). No proof, no entry; proof never introduces a number that is not already on the resume.

**Add a plan line**: append to `planLines` in `src/content/portfolio.js`. Every line needs a `gloss`; update `planAriaLabel` to match.

**Add a fabric node**: append to `fabricNodes` in `src/content/portfolio.js`. Only systems already named in a capability row or its tool chips; pick `x, y` inside the 420x440 viewBox and a `labelPos` (`above`, `below`, `left`, `right`).

## Polish rubric

Each axis scored 0–5; targeting ≥ 4.

- **a11y**: WCAG 2.1 AA
- **perf**: Lighthouse 90+, CWV green
- **security**: headers configured, no secrets in client, deps audited
- **ux**: URL state, keyboard shortcuts, clear empty/loading states
- **tests**: vitest + RTL + jsdom, critical-path coverage
- **observability**: Vercel Analytics + Speed Insights
- **docs**: this README
- **design-system**: tokens + primitives, no raw hex in components

## Contact

- [LinkedIn](https://linkedin.com/in/mannyflores11)

## License

Copyright Manny Flores. All rights reserved.

This repository is public so the code can be read, not reused. No license is
granted for the code, content, images, or resume. The fonts in `public/fonts/`
are the exception: they are subsets of IBM Plex Sans and IBM Plex Mono,
redistributed under the SIL Open Font License 1.1 (see `public/fonts/OFL.txt`).

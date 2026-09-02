---
name: mannyflo.com
description: Access Plan · engineering-console portfolio. Warm clay-tinted neutrals, IBM Plex, mono doing real work, diff grammar as the signature motif.
colors:
  bg-light: "oklch(97.8% 0.005 75)"
  bg-2-light: "oklch(95.6% 0.006 75)"
  ink-light: "oklch(21% 0.012 50)"
  ink-muted-light: "oklch(41% 0.012 50)"
  ink-subtle-light: "oklch(54% 0.010 55)"
  bg-dark: "oklch(15.5% 0.010 50)"
  bg-2-dark: "oklch(18.8% 0.011 55)"
  ink-dark: "oklch(92% 0.010 75)"
  accent-light: "oklch(56% 0.145 42)"
  accent-dark: "oklch(70% 0.135 48)"
  grant-light: "oklch(46% 0.105 150)"
  revoke-light: "oklch(48% 0.150 27)"
  pending-light: "oklch(51% 0.105 83)"
  grant-dark: "oklch(74% 0.125 150)"
  revoke-dark: "oklch(70% 0.150 25)"
  pending-dark: "oklch(78% 0.115 85)"
typography:
  display:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 5.5vw, 4.25rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.6rem, 2.9vw, 2.4rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    letterSpacing: "0.06em"
rounded:
  sm: "2px"
  md: "6px"
  pill: "999px"
spacing:
  base: "4px scale, --space-1 through --space-24 (tokens.css)"
---

# Design System: mannyflo.com

## 1. Overview

**Creative North Star: "Access Plan · the first engineering-console portfolio for identity work. The genre a Staff IAM reviewer already reads: plans, diffs, pills, audit lines. Warm clay keeps it his."**

This system replaced the Roma "El Cuaderno" editorial direction (serif magazine, parchment, chapter ribbon) on 2026-08-06. Research verdict behind the change: hiring signal for Staff/Principal IAM roles reads engineering consoles, not magazines, and no IAM-branded portfolio exists anywhere; this site defines the category. The Feria lineage survives as texture, not costume: the Tezontle clay accent, the warm-tinted neutrals, and the papel picado stripe + favicon stay.

**Key characteristics:**

- Warm clay-tinted neutrals in both themes. Light: near-white console paper `oklch(97.8% 0.005 75)`. Dark: warm charcoal `oklch(15.5% 0.010 50)`. Never `#fff`, never `#000`, never GitHub cool-gray.
- Tezontle clay is the sole accent (Restrained strategy, accent under 10% of surface): eyebrows, nav underline, wordmark dot, stat hover, manifesto closing line, primary button ink-fill.
- Semantic data colors are a separate family reserved for the diff grammar and status pills: grant green (added access / operating), revoke red (removed), pending amber (in change). Never decorative.
- IBM Plex Sans carries display and body; IBM Plex Mono does real work: masthead session line, nav, eyebrows, stat line, plan diff, pills, chips, metadata, colophon meta. Mono is never decoration and never body prose.
- Flat surfaces, hairline borders, generous air. One shadow, hover-only on project cards.
- The signature motif is the plan diff: the career rendered as `terraform plan` output with a `+/~/-` symbol gutter, old `->` new arrows, muted `#` context lines, and a summary line. Every line is resume-backed fact.
- Since 2026-09-02 the site performs access control on the visitor instead of describing it (see Section 5: Masthead, Role lens, Access fabric, Audit log). The visitor gets a session, a role that scopes the language, and an audit trail of their own visit. Same restraint: hairlines, mono, one accent.

**Physical scene:** A Staff-level hiring manager opens mannyflo.com on a 13 inch laptop in a well-lit office between interviews, deciding in 45 seconds whether Manny can run their identity program. Dark theme is the default for new visitors (owner decision, 2026-08-06); light is a full first-class theme via the toggle, and a stored preference always wins.

## 2. Colors

**Strategy: Restrained.** Tinted neutrals plus one accent. Semantic colors are data, not palette.

- **Bg / Bg-2**: page and panel surfaces, two levels only (Geist discipline: resist a third).
- **Ink / Ink-muted / Ink-subtle**: three-step text scale; hierarchy comes from the scale, not from weight alone.
- **Tezontle clay** (`oklch(56% 0.145 42)` light, `oklch(70% 0.135 48)` dark): the single accent. Named for the volcanic stone in Mexico City colonial walls; the surviving thread of the Feria brand system.
- **Grant / Revoke / Pending**: each ships as fg + translucent bg pair (Primer triad pattern). Grant marks `+` plan lines and `operating` pills. Pending marks `~` lines and `building` / `expanding` / `hardening` pills. Revoke marks `-` lines only. Red is never used for emphasis or decoration.

**The Papel Band Rule.** The 7-color papel picado stripe renders once, at the very top, matching the favicon. It is the identity mark and the only place those 7 hex values appear.

**The Data Color Rule.** Grant/revoke/pending appear only inside `.plan-line--*` and `.pill--*`. A new component wanting color must justify it as state, or use the accent.

## 3. Typography

- **Display / headlines**: IBM Plex Sans 700 (hero name) and 600 (section headlines, manifesto), tight tracking. No serif anywhere; the serif voice retired with El Cuaderno.
- **Body**: IBM Plex Sans 400, 65ch measure, muted ink for secondary prose.
- **Mono**: IBM Plex Mono 400/500. Owns: masthead, nav items (lowercase), eyebrows (uppercase, 0.14em tracking, short accent dash prefix), stat values and labels, plan diff, pills and chips (uppercase), portrait caption, colophon dt/meta, wordmark.
- Self-hosted latin woff2 subsets in `public/fonts` (plexsans 400/600/700, plexmono 400/500), preloaded in `index.html`, OFL notice in `public/fonts/OFL.txt`. No third-party font origins; keeps CSP `font-src 'self'`.

**The Mono Does Work Rule.** If a string is an identifier, a timestamp, a status, a count, or a system line, it is mono. If it is prose, it is sans. No exceptions in either direction.

## 4. Elevation

Flat by default. Hairline borders (`--color-border`, translucent ink) do all structure. `--shadow-hover` exists only on project card hover. No glass, no blur, no resting shadows, no gradients.

## 5. Components

- **Masthead** (`.masthead`): the visitor's session as a status bar. Left: `● session YYYY.MM · guest@mannyflo.com`. Right: the Role lens and the Audit log toggle. Wraps to two rows on phones; the user string hides under 768px.
- **Role lens** (`.role-switch`, `RoleSwitch.jsx`, `src/lib/role.js`): `read as  [engineer] [anyone]`. Least privilege applied to jargon. Engineer is the console voice; anyone is plain English. Every lensed string lives in `src/content/portfolio.js` as an `{ eng, plain }` pair, rendered through `<Lens>` (a keyed span whose remount replays the 360ms `.lens` fade). Persisted in `localStorage` (`mf-role`) through `useSyncExternalStore`, so prerendered HTML hydrates as engineer and re-renders into the stored role without a mismatch. The plan lede also carries an inline switch ("Not an engineer? Read it in plain English.") so the lens is discoverable mid-page. The boot ceremony's session card reads the stored role.
- **Access fabric** (`.ig`, `IdentityGraph.jsx`): the hero figure. Portrait = operator node at the center of a 420x440 SVG; seven system nodes hang off it on 1px `--color-border` edges with mono labels (name 11px/500, sub 9.5px). Node data (`fabricNodes`) is limited to systems that already appear in scope rows or stack chips. Pulses are SMIL `animateMotion` circles: clay outward for systems he configures (Okta, GCP, Workspace, SaaS), muted inward for identities arriving into the fabric (service accounts, AI agents, and M&A intake). The M&A intake node stands for acquisition integration as a capability: acquired companies' apps and identity providers brought onto the Okta standard, then the old IdP retired. Entra ID is named as the largest of those IdPs; the rest stay generic on purpose (plural first, one example, no roster to verify or to be pigeonholed by). `retired: true` on a node still renders the dashed treatment if a truly decommissioned system ever needs to appear. Hover or focus a node for a one-line brief in the readout under the graph; click pins it (`aria-pressed`) and logs `graph.inspected`. Draw-in (edges trace via `stroke-dasharray: var(--len)`, nodes fade) runs when `live` flips, which App sets from the boot ceremony's `onDone`, so it is never hidden behind the boot overlay. `useReducedMotion` renders no pulses and no draw-in. On phones the hero restacks text, fabric, CTAs, with label sizes bumped to stay legible at 335px.
- **Audit log** (`.audit`, `AuditLog.jsx`, `src/lib/audit.js`): `access logged · N` made literal. A module store (`audit(action, detail)`) feeds a panel under the masthead listing the visitor's own events, oldest first: `session.issued`, `role.changed`, `theme.changed`, `section.viewed`, `resume.opened`, `link.followed`, `graph.inspected`. Client-side only, capped at 60, footer says so. Closes on Escape or outside click. Time column is tabular mono; action is clay; detail is muted.
- **Reading hairline** (`.nav-progress`): a 1px clay line under the sticky nav that fills with `animation-timeline: scroll(root)`. No JS; absent where scroll timelines are unsupported.
- **Nav**: sticky, wordmark `mannyflo.` in mono with clay period; lowercase mono items with clay underline for hover/active (scroll-spy via IntersectionObserver, `aria-current="page"`).
- **Eyebrow**: 14px clay dash + uppercase mono label. One per section: IDENTITY & ACCESS MANAGEMENT, SCOPE, TRAJECTORY, SHIPPED & SHIPPING, CAPABILITY.
- **No hero stat strip.** The owner rejected both a 4-up big-number strip ("too grabby") and a quiet mono fact line in the hero. Quantified evidence lives in the plan diff and scope rows instead; do not reintroduce hero counters. The hero is: eyebrow, name, mono role line, lede, CTA row, portrait top-aligned with the text.
- **Scope rows** (`.scope-row`): `num | domain | description | pill` grid rows with hairline tops, not cards. Pills: `operating` grant, `building`/`expanding`/`hardening` pending.
- **Plan block** (`.plan-block`): panel bg-2, titlebar `terraform plan · career/manny-flores`, mono 13px lines with full-width tinted line backgrounds, `overflow-x: auto`, staggered per-line reveal on view (reduced-motion collapses to instant). Exposed to assistive tech as `role="img"` with a prose `aria-label` summarizing the career facts; the styled lines are `aria-hidden`. In the anyone lens it becomes `.plan-block--annotated`: titlebar gains a clay `· annotated` flag, lines wrap with a hanging indent, and each carries a sans `.plan-gloss` beneath it (72ch measure). Every line has a gloss; a line without one does not ship.
- **Project cards** (`.project-card`): the only card surface. bg-2, radius 6px, BUILDING pill, sans 600 title, chips (mono, 2px radius rect).
- **Stack section**: TOOLS chip groups only (four mono-labeled skill groups). The four expertise prose rows were cut on 2026-08-06 as redundant with the scope rows; each section tells its facts once: scope = what is owned, plan = history, current focus = what is moving, stack = what is used. Do not add prose back to Stack in the engineer lens. The anyone lens shows one short sans caption per group (`.skill-group-plain`), a translation of the group name, not new prose.
- **Footer**: one mono meta line only: copyright left, `exit 0` right. The owner removed the principles/manifesto block entirely ("looks lame") and the Set in / Built with / Built for colophon grid; do not reintroduce either.
- **Buttons**: primary ink-filled with clay ink-fill hover (FramerButton overlay), ghost 1.5px ink border. 6px radius.
- **Resume dialog**: unchanged Radix pattern, panel on bg with strong border.

## 6. Do's and Don'ts

### Do:
- **Do** keep every claim on the page resume-verifiable. The stat line and plan diff are evidence surfaces, not marketing.
- **Do** route all metadata through mono and all prose through sans.
- **Do** use the Primer-style fg + translucent-bg pair when a new status state is genuinely needed.
- **Do** keep both themes first-class; check AA contrast (4.5:1 body, 3:1 large/UI) whenever a token moves.
- **Do** honor `useReducedMotion` in every animated component and keep the global reduced-motion kill switch in app.css.
- **Do** keep the papel band + striped favicon paired; changing one means changing both.
- **Do** write both sides of every `{ eng, plain }` pair when adding content. The plain side translates; it never adds a claim the engineer side lacks (tests enforce presence, the author enforces parity).
- **Do** keep the access fabric to systems already named elsewhere on the page. A node is a cross-reference, not a new claim.
- **Do** keep the audit log honest: it records real visitor actions in this tab and nothing else. No fabricated entries, no network.

### Don't:
- **Don't** reintroduce serif faces, the magazine masthead, chapter ribbons, or italic emphasis words. El Cuaderno is retired; its history lives in git.
- **Don't** drift into hacker-terminal cosplay: no green-on-black, no typing-only navigation, no ASCII banners, no matrix effects. The register is a calm console, not a cyberpunk shell (PRODUCT.md anti-reference).
- **Don't** use the semantic data colors decoratively, and never use revoke red for emphasis.
- **Don't** invent metrics. A number without a resume line behind it does not ship.
- **Don't** use side-stripe borders, gradient text, glassmorphism, hero-metric cards, or identical card grids.
- **Don't** use em dashes anywhere in copy. Commas, colons, periods, parentheses.
- **Don't** use internal company acronyms in user-facing copy; spell out public-facing equivalents.
- **Don't** add a third background level or a second accent.
- **Don't** use the semantic data colors in the access fabric. The graph is structure; pulses are clay (outbound) and muted ink (inbound), never grant green or revoke red.
- **Don't** add a third role. Engineer and anyone cover the audience; more lenses multiply copy without adding clarity.

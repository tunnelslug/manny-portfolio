---
name: mannyflo.com
description: The Mandate · identity brief for a senior IAM operator. Warm paper, Tezontle clay, Schibsted Grotesk. Content always visible.
colors:
  bg-light: "oklch(97.2% 0.008 72)"
  bg-2-light: "oklch(94.8% 0.009 72)"
  ink-light: "oklch(22% 0.016 48)"
  ink-muted-light: "oklch(39% 0.014 50)"
  ink-subtle-light: "oklch(51% 0.012 55)"
  bg-dark: "oklch(18.5% 0.012 52)"
  bg-2-dark: "oklch(22% 0.013 55)"
  ink-dark: "oklch(93% 0.012 75)"
  accent-light: "oklch(52% 0.145 42)"
  accent-dark: "oklch(72% 0.130 48)"
  grant-light: "oklch(42% 0.100 150)"
  revoke-light: "oklch(46% 0.145 27)"
  pending-light: "oklch(48% 0.100 70)"
  grant-dark: "oklch(76% 0.120 150)"
  revoke-dark: "oklch(72% 0.145 25)"
  pending-dark: "oklch(80% 0.110 80)"
typography:
  display:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 6.2vw, 4.4rem)"
    fontWeight: 700
    lineHeight: 0.94
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.14em"
rounded:
  sm: "2px"
  md: "4px"
  pill: "999px"
spacing:
  base: "4px scale, --space-1 through --space-24 (tokens.css)"
---

# Design System: mannyflo.com

## 1. Overview

**Creative North Star: "The Mandate · an identity brief a staff IAM hiring manager can read in eight seconds. Warm paper. Clay stamp. The work is the personality."**

This system replaced Access Plan (engineering-console: boot ceremony, terraform career diff, session masthead, `exit 0`) on 2026-08-26. The console was clever to people already in the joke and read as a frontend bit to the actual market. The Feria lineage survives as texture: Tezontle clay, warm-tinted neutrals, papel picado stripe + favicon.

**Key characteristics:**

- Warm paper neutrals in both themes. Light: `oklch(97.2% 0.008 72)`. Dark: lifted charcoal `oklch(18.5% 0.012 52)`. Never `#fff`, never `#000`, never GitHub cool-gray, never terminal pit-black.
- Tezontle clay is the sole accent (Restrained strategy): eyebrows, nav underline, wordmark period, primary hover, mandate index numbers.
- Semantic data colors are a separate family reserved for status and the change-log labels: grant (operating / added), pending (building / changed), revoke (removed). Never decorative.
- Schibsted Grotesk carries display, body, labels, nav, pills, chips, footer. One family. Hierarchy from size and weight. Mono is a fallback, not the voice.
- Flat surfaces, hairline borders, document radii (2px / 4px). Work items are rows, not a card grid.
- Signature motif: the first-screen mandate index (five owned domains) plus a plain-English change log (added / changed / removed). Every line is resume-backed.

**Physical scene:** A staff IAM hiring manager opens mannyflo.com on a 13 inch laptop in a brightly lit fintech office between interviews, deciding in eight seconds whether Manny can run their identity program. Light is the default for new visitors; dark is a full first-class theme via the toggle; a stored preference always wins.

## 2. Colors

**Strategy: Restrained.** Tinted neutrals plus one accent. Semantic colors are data, not palette.

- **Bg / Bg-2**: page and inset surfaces, two levels only.
- **Ink / Ink-muted / Ink-subtle**: three-step text scale.
- **Tezontle clay**: the single accent. Named for the volcanic stone in Mexico City colonial walls.
- **Grant / Revoke / Pending**: fg + translucent bg pairs. Grant marks `operating` and "Added". Pending marks `building` / `expanding` / `hardening` and "Changed". Revoke marks "Removed" only.

**The Papel Band Rule.** The 7-color papel picado stripe renders once, at the very top, matching the favicon.

**The Data Color Rule.** Grant/revoke/pending appear only inside `.pill--*` and `.change-group--*`. A new component wanting color must justify it as state, or use the accent.

## 3. Typography

- **Display / headlines**: Schibsted Grotesk 700, tight tracking.
- **Body**: Schibsted Grotesk 400, ~62ch measure.
- **Labels**: the same family, 600, small, tracked, uppercase for eyebrows only.
- Self-hosted latin woff2 subsets in `public/fonts` (schibsted 400/600/700), preloaded in `index.html`, OFL notice in `public/fonts/OFL.txt`. No third-party font origins; keeps CSP `font-src 'self'`.

## 4. Elevation

Flat by default. Hairline borders do all structure. `--shadow-hover` exists as a token but is not the default treatment for work items. No glass, no blur, no resting shadows, no gradients.

## 5. Components

- **No boot ceremony. No session masthead.** The page is the page.
- **Nav**: sticky, wordmark `mannyflo.` with clay period; lowercase items with clay underline for active. Scroll-spy via IntersectionObserver, `aria-current="page"`.
- **Hero**: eyebrow, name, role, place, lede (thesis closes on its own line), CTA row with Resume first, portrait, then the mandate index of five owned domains. First screen must communicate who he is and what he owns.
- **No hero stat strip.** Do not reintroduce counters.
- **Scope rows**: `num | domain | description | pill` with hairline tops. Pills: `operating` grant, `building`/`expanding`/`hardening` pending.
- **Change log**: grouped Shifted / Stood up / Retired rows. Plain English. Every line resume-backed. Not a terraform plan.
- **Work items**: hairline rows, not cards. Status pill, title, description, chips.
- **Stack**: four labeled tool groups. No extra prose.
- **Footer**: copyright left, `mannyflo.com` right. No `exit 0`.
- **Buttons**: primary ink-filled with clay ink-fill hover, ghost 1px ink border. 4px radius.
- **Resume dialog**: Radix pattern, panel on bg with strong border.
- **Content always visible.** No `whileInView` opacity hides. No CSS `animation-timeline: view()` reveals. Hash links land on fully readable sections. Prerender still strips any leftover Framer inline `opacity:0`.

## 6. Do's and Don'ts

### Do:
- **Do** keep every claim on the page resume-verifiable.
- **Do** keep both themes first-class; check AA contrast whenever a token moves.
- **Do** honor `useReducedMotion` and the global reduced-motion kill switch.
- **Do** keep the papel band + striped favicon paired; changing one means changing both.
- **Do** keep `/bio` privacy-sensitive: opaque baby-registry URL, no extra PII on the public homepage.

### Don't:
- **Don't** reintroduce the console costume: boot overlay, session line, terraform plan, `exit 0`, device-code copy.
- **Don't** reintroduce serif faces, magazine mastheads, or chapter ribbons.
- **Don't** hide content behind scroll-reveal.
- **Don't** invent metrics, awards, or employers.
- **Don't** use side-stripe borders, gradient text, glassmorphism, hero-metric cards, or identical card grids.
- **Don't** use em dashes anywhere in copy. Commas, colons, periods, parentheses.
- **Don't** use internal company acronyms in user-facing copy.
- **Don't** add a third background level or a second accent.

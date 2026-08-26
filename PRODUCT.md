# Product

## Register

brand

## Users

Mixed audience landing on mannyflo.com: hiring managers and recruiters scanning IAM and Systems Engineer credentials; peer engineers and security folks evaluating depth; prospective collaborators; plus the occasional non-technical reader (family, friends) acknowledged in the footer. Most arrive via LinkedIn, GitHub, referral, or direct URL. They scan first, read second.

## Product Purpose

mannyflo.com is the brand surface for Manny Flores. Senior Systems Engineer at Robinhood. Owns identity and corporate apps infrastructure: Okta, GCP, Google Workspace. Current focus: making AI tooling adoptable across the company without losing control of who can do what.

The site exists to leave one impression: *"I understand what he does, and he clearly knows it cold."* Design IS the product. The way it looks and reads is the work, and the work is the proof.

## Brand Personality

Three words: **Specific. Dry. Self-aware.**

Voice: dry, direct, slightly self-aware. Specific over abstract. Plain English; no internal jargon, no hedging, no buzzword stacks. Reference: the footer line "Recruiters, peer engineers, and the family who asks what I actually do."

Tone: engineering-console and matter-of-fact, closer to a well-kept runbook or a plan review than a SaaS landing. Reads like the tools the audience uses: plans, diffs, audit lines, status pills. Calm, never cosplay.

Cultural lineage: the visual system is Access Plan, the engineering-console successor to the Roma editorial direction (see DESIGN.md). The Feria heritage survives as texture: the Tezontle clay accent, warm clay-tinted neutrals in both themes, and the papel picado stripe + favicon. Heritage lives in the form, not the words. Positioning: the first designed portfolio branded around identity and access management; every claim on the page is resume-verifiable.

## Anti-references

Explicitly NOT:

- **AI slop and generative-agency sites.** Gradient blobs, glassmorphism, hero-metric template, identical card grid, "AI-powered" everywhere. The category-reflex tech portfolio.
- **Cyberpunk and neon-on-black hacker portfolios.** Green-terminal on `#000`, Matrix glyphs, rebel-coder posturing.
- **Childish or wannabe-gaming aesthetic.** Mascot characters, retro-arcade pixel fonts as personality, RGB underglow, Discord-purple, Twitch-streamer overlay vibes.
- **SaaS landing clichés.** "Trusted by" logo walls, three-column feature grid, dashboard-screenshot-with-floating-shadow hero, gradient orb backgrounds.
- **Latin kitsch.** Sombreros, mariachi, Día-de-los-Muertos sugar skulls, agave silhouettes, "fiesta" papel-picado used decoratively without meaning.
- **Dribbble template.** Generic "modern portfolio" aesthetic that could belong to anyone.
- **Internal jargon and company-specific acronyms.** Recruiters and peers from other companies shouldn't have to decode internal team names (CorpEng, CAPPS) or process acronyms (EDDs, PRDs, TRA). Spell them out, or pick a public-facing equivalent.

## Design Principles

1. **Show, don't tell.** Every claim is provable on the page. The portfolio is the proof, not a description of the proof.
2. **Specific over abstract.** Concrete claims, named tools, real problems. Generic résumé phrases get cut.
3. **Craft over density.** One impression, well delivered. Restraint is part of confidence.
4. **Heritage as texture, not costume.** Roma carries its bilingual origin in palette names, eyebrow framing, and editorial composition. The Spanish-first body voice belongs to Colonia, not Roma. No sombreros, no sugar skulls, no decorative Spanish that doesn't earn its place.

## Accessibility & Inclusion

- Target WCAG 2.1 AA across the site.
- Body text contrast ≥ 4.5:1; large text and UI ≥ 3:1.
- `prefers-reduced-motion` respected: animations collapse to ~0.01ms, no parallax or scroll-jacking under reduced motion.
- Keyboard reachable everywhere; visible focus rings on every interactive element.
- Semantic landmarks (`<main>`, `<nav>`, `<section aria-labelledby>`, `<footer>`) plus skip-link to `#main`.
- 16px minimum input font on mobile to prevent iOS zoom (rule kept even when no inputs render).

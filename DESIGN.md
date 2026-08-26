---
name: mannyflo.com
description: Editorial paper portfolio. Source Serif 4 + Source Sans 3, warm off-white, rust orange as the single accent.
colors:
  bg-light: "oklch(97.2% 0.012 78)"
  ink-light: "oklch(24% 0.018 48)"
  accent-light: "oklch(52% 0.145 42)"
  bg-dark: "oklch(22% 0.016 55)"
  ink-dark: "oklch(93% 0.012 78)"
  accent-dark: "oklch(72% 0.125 48)"
typography:
  display:
    fontFamily: "Source Serif 4, Iowan Old Style, Palatino, serif"
    fontWeight: 600
  body:
    fontFamily: "Source Sans 3, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    lineHeight: 1.6
---

# Design System: mannyflo.com

## 1. Overview

**Creative North Star: "A person and a POV on warm paper. Type does the work. Writing is half the site."**

This system replaces Access Plan (engineering-console) on 2026-08-26. The console read as a dashboard of himself. The market asked for an editorial homepage: named human, thesis, three case notes, dated writing.

References for restraint, not cloning: paco.me, rauno.me, ped.ro, lalitm.com, abdulkadersafi.com, andrewcrookston.com.

**Physical scene:** A hiring manager opens the site on a 13-inch laptop in a well-lit office between interviews. Warm paper, rust links, a small real photo. Six seconds to know who he is.

Light is the default. Dark is optional editorial night paper, not a SIEM.

## 2. Colors

**Strategy: Restrained.** Warm off-white + rust orange (Tezontle) as the single accent. No second accent. No rainbow top bar. No grant/revoke data colors.

## 3. Typography

- Display: Source Serif 4. Name, section titles, essay titles, work titles.
- Body: Source Sans 3. Thesis, case notes, essays.
- Mono: only inside real code samples. None on this pass.
- Self-hosted latin woff2, CSP `font-src 'self'`.

## 4. Layout

- Masthead: 40px photo, name, one-line role. Links: Work, Writing, Resume, Email, X.
- Homepage: thesis, optional Now line, Selected work (2–3 numbered prose notes), Writing (dated list + RSS).
- No cards. No pills. No stack columns. No hero portrait.
- Measure ~62ch.

## 5. Motion

None on load. Optional underline on hover. Hash targets are visible. No scroll-reveal opacity hides.

## 6. Don't

- Don't bring back boot, session, terraform-plan biography, exit 0, OPERATING pills, or color-block chrome.
- Don't invent essays. Skip unverified takes.
- Don't clone the resume onto the page.
- Don't use em dashes.
- Don't put baby-registry PII on the homepage.

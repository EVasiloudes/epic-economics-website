# Epic Economics — Typography Direction

**Version:** 1.0
**Date:** June 2026
**Prepared by:** Brand Guardian 🎨

---

## 🎯 Typography Strategy

Typography is the primary visual tool for Epic Economics. Before colour, before layout, before any decorative element — the type must land. This is a show about ideas expressed through words, and the typography should reflect that: bold, legible, rhythmic, with the theatrical presence of a placard or a poster.

**Two-typeface constraint:** The brief limits us to two typefaces for performance. We're using one sans-serif for headings/display and one serif for body text — a classic pairing that creates tension between authority (serif) and urgency (sans-serif).

---

## 🔤 Font Pairing

### Heading / Display: Avenir Next
```
font-family: 'Avenir Next', 'Century Gothic', system-ui, -apple-system, sans-serif;
```

**Status:** ✅ Already in the codebase. Keep it.

**Why Avenir Next?**
- **Adrian Frutiger's masterpiece.** A humanist sans-serif with genuine warmth — not cold or mechanical like Helvetica.
- **Theatrical weight range.** From light (300) to heavy (800) — the bold weights at large sizes have genuine poster-level impact.
- **Already loaded and cached.** Swapping would cost performance with zero benefit — Avenir Next is an excellent heading face for this brand.
- **Distinctive 'a' and 't'.** The letterforms have personality without becoming decorative.
- **Fringe-ready.** Clean, modern, legible at distance — exactly what you need on a flyer or a stage backdrop.

**Usage:**
- All headings (h1–h6)
- Navigation labels
- Hero/display text
- Buttons and CTAs
- Weight 700 (bold) for impact, weight 600 (semibold) for subheadings
- Letter-spacing: `-0.02em` for large display sizes, `0.02em` for smaller headings (compensates for the open apertures)

**Fallback stack:**
```
Avenir Next → Century Gothic → system-ui → -apple-system → sans-serif
```
Century Gothic is geometrically similar and widely available. System fonts ensure zero layout shift on load.

---

### Body / Reading: Crimson Pro
```
font-family: 'Crimson Pro', 'Georgia', 'Times New Roman', serif;
```

**Status:** 🆕 New addition. Replaces Nunito Sans.

**Load strategy:** Google Fonts, variable font axis. Single file request for all weights.
```html
<link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap" rel="stylesheet">
```
Approximate size: ~45KB (variable), ~80KB (static individual weights). With `display=swap`, text renders immediately in the fallback while the font loads.

**Why Crimson Pro?**
- **Purpose-built for screen reading.** Designed by Jacques Le Bailly in 2018 specifically for digital text — not a print font forced onto screens.
- **Scholarly but warm.** A Garamond-inspired serif that evokes books, printing, and intellectual weight without feeling stuffy.
- **Excellent x-height.** Larger than most Garamonds — highly legible at body sizes (16–18px) on screens.
- **Manifesto energy.** Serif body text against bold sans-serif headings creates the "pamphlet" aesthetic — revolutionary ideas printed on paper.
- **Variable font.** Single file, all weights, minimal performance cost. Can fine-tune weight between 400–600 for optimal rendering.
- **Replaces Nunito Sans.** Nunito is a friendly, rounded sans-serif — perfect for a children's app, wrong for a show about economic protest. The contrast between Avenir Next (heading) and Crimson Pro (body) creates the intellectual tension the brand needs.

**Usage:**
- Body paragraphs (16–18px recommended)
- Block quotes
- Captions and metadata
- Form labels and descriptions
- Weight 400 for body, 500 for emphasis, 600 for strong emphasis
- Italic available — use for quotations, foreign terms, book titles

**Fallback stack:**
```
Crimson Pro → Georgia → Times New Roman → serif
```
Georgia is universally available, well-hinted for screens, and has a similar generous x-height. Times New Roman is the universal serif fallback.

---

## 📐 Type Scale (Fluid)

All sizes use `clamp()` for fluid scaling. Minimum at 320px viewport, maximum at 1440px.

| Token | Role | Size | Weight | Line Height | Letter Spacing |
|-------|------|------|--------|-------------|----------------|
| `--text-display` | Hero title | `clamp(3.5rem, 3.64rem + 4.29vw, 9rem)` | 700 | 1.0 | -0.03em |
| `--text-h1` | Page heading | `clamp(2.25rem, 1.75rem + 2.5vw, 4rem)` | 700 | 1.1 | -0.02em |
| `--text-h2` | Section heading | `clamp(1.75rem, 1.5rem + 1.5vw, 2.5rem)` | 700 | 1.15 | -0.01em |
| `--text-h3` | Subsection heading | `clamp(1.25rem, 1.1rem + 0.75vw, 1.75rem)` | 600 | 1.2 | 0 |
| `--text-lead` | Lead paragraph | `1.25rem` | 500 | 1.5 | 0 |
| `--text-body` | Body text | `1.0625rem` (17px) | 400 | 1.6 | 0 |
| `--text-small` | Captions, meta | `0.875rem` | 400 | 1.5 | 0.01em |
| `--text-xs` | Legal, footnotes | `0.75rem` | 400 | 1.4 | 0.02em |

### Scale Notes
- **Hero title** inherits the existing GSAP marquee sizing from `GsapHero.css` — do not change the scale, only the font.
- **Body text at 17px** is slightly larger than the browser default (16px) — Crimson Pro's generous x-height means it reads comfortably at this size without feeling oversized.
- **Line heights** are tighter than standard (1.1–1.2 for headings, 1.6 for body) — this creates density and urgency, appropriate for the brand.

---

## 🎭 Typographic Treatments

### Hero / Marquee
```
font-family: var(--font-heading);
font-weight: 700;
font-size: var(--text-display);
letter-spacing: -0.03em;
line-height: 1.0;
color: transparent;
-webkit-text-stroke: 2px var(--color-ink);
```
The existing outline-stroke marquee effect in `GsapHero.css` is strong. Keep the stroke technique but update from `1px #000000` to `2px var(--color-ink)` for more weight. The focused word (`. -focus`) uses `var(--color-ink)` with no stroke.

### Page Headings (Press, Contact, etc.)
```
font-family: var(--font-heading);
font-weight: 700;
font-size: var(--text-h1);
color: var(--color-ink);
```
Clean, bold, no decoration. The weight does the work.

### Block Quotes
```
font-family: var(--font-body);
font-weight: 400;
font-style: italic;
font-size: var(--text-lead);
border-left: 4px solid var(--color-primary);
padding-left: var(--space-lg);
color: var(--color-ink-light);
```
Remove the current purple left-border (`#667eea`) from `Home.css` synopsis. Replace with Protest Red.

### CTA Buttons
```
font-family: var(--font-heading);
font-weight: 700;
font-size: var(--text-base);
text-transform: uppercase;
letter-spacing: 0.05em;
```
Uppercase for urgency and theatrical presence. Generous letter-spacing for legibility.

---

## 🚫 Typography Anti-Patterns

| ❌ Avoid | ✅ Instead |
|----------|-----------|
| All-caps body text (reduces readability) | All-caps reserved for short labels, CTAs, and small headings only |
| Centered body text (ragged lines hurt readability) | Left-aligned body text with generous measure (60–75 chars per line) |
| Text over blurred backgrounds (WCAG fail) | Text on solid, high-contrast backgrounds |
| Font-weight: 300 (too thin on screens) | Minimum weight: 400 for body, 600 for headings |
| Italic headings (Avenir Next oblique isn't great) | Roman headings, italic for body emphasis only |
| Narrow text columns on mobile | Full-width body on mobile with comfortable padding |

---

## 🌐 Google Fonts Implementation

### Production Embed (add to `index.html` `<head>`)
```html
<!-- Crimson Pro Variable Font (body) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap" rel="stylesheet">
```

### Performance Notes
- `preconnect` to Google Fonts origins avoids DNS/TCP/SSL round-trips
- `display=swap` ensures text is visible during font load (no FOIT)
- Variable font serves all weights in one request (~45KB compressed)
- Avenir Next is a system font on macOS/iOS — no download needed for those users
- Total font payload: ~45KB (Crimson Pro only) vs. ~160KB (old Nunito Sans) — performance win

---

**Next deliverable:** CSS Design Tokens → `design-tokens.css`
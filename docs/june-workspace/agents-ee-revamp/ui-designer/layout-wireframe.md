# Epic Economics — Page Layout Wireframe (Homepage)

**Version:** 1.0
**Date:** June 2026
**Prepared by:** UI Designer 🎨

---

## 📐 Layout Overview

The homepage is a single-scroll, full-width page designed to take a Fringe audience member from "What is this?" to "I want tickets" in ~15 seconds of scrolling. Each section has a specific narrative job.

---

## 🔢 Section-by-Section Layout

### 1. GSAP Hero (Marquee)

```
POSITION: Viewport-filling (100vh), fixed while scrolling
SCROLL BEHAVIOR: Parallax fold effect — top/bottom folds rotate away,
                 center fold scrolls vertically, marquee text pans horizontally
```

| Attribute | Value |
|-----------|-------|
| **Purpose** | Hook the visitor. Create visceral "what IS this?" curiosity. The scrolling protest-themed words (Economics, Markets, Value, Capital, Labour, Power, Crisis) set the intellectual territory before a single sentence of copy is read. |
| **Key Visual** | Outline-stroke typography at 9rem max, scrolling horizontally. Focus words filled in solid ink. Three perspective folds create a 3D "unfolding pamphlet" effect. |
| **What changes** | Text stroke color: `1px #000000` → `2px var(--color-ink)`. Rest untouched per constraint. |
| **Accessibility** | No interactive elements. Pure decoration. `prefers-reduced-motion` freezes hero at initial state. |
| **DOM** | `<div class="screen">` → `.wrapper-3d` → `.fold-top`, `.fold-center`, `.fold-bottom` → each contains `.marquee` rows |

**Visual weight:** Hero fills viewport. Content below starts at `margin-top: 100vh`.

---

### 2. Ticket CTA Banner 🆕

```
┌──────────────────────────────────────────────────────────────────┐
│                     FULL-WIDTH RED BAND                          │
│                    var(--color-primary)                          │
│                                                                  │
│    "The system's on stage. Are you in the audience?"             │
│                  (Crimson Pro, italic, ~1.25rem, white)          │
│                                                                  │
│                ┌──────────────────────────┐                      │
│                │   🎫  GET TICKETS NOW    │                      │
│                │  (white bg, red text)    │                      │
│                └──────────────────────────┘                      │
│                                                                  │
│     Edinburgh Fringe 2026  •  Tickets at edfringe.com            │
│                  (0.875rem, white 80% opacity)                   │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

| Attribute | Value |
|-----------|-------|
| **Purpose** | Pivot from abstract marquee to concrete action. The narrative job: "This show is real, it's at the Fringe, and you can buy tickets RIGHT NOW." The red band creates a dramatic colour block that signals "this is important." |
| **Placement** | First element inside `.home-content`, directly after the 100vh hero area. |
| **Key Visual** | Full-width red band. White italic quote (from brand voice guide). Inverse button (white on red). |
| **Accessibility** | External link announced. White on red = 5.82:1 ✅. Button min 44px tall. |
| **CSS class** | `.ticket-cta` |
| **DOM** | `<section class="ticket-cta">` → `.ticket-cta-content` → quote `<p>` + `<a class="ticket-cta-btn">` + sub `<p>` |

---

### 3. Synopsis Section

```
┌──────────────────────────────────────────────────────────────────┐
│  max-width: 1200px, margin: 0 auto                               │
│  padding: var(--space-4xl) var(--space-xl)                       │
│  background: var(--color-bg) [Parchment]                         │
│                                                                  │
│  ┌─────────────────────────────┐  ┌──────────────────┐          │
│  │  Lead paragraph             │  │                  │          │
│  │  (Crimson Pro, 1.25rem)     │  │  [Image 1]       │          │
│  │                             │  │  Audience photo  │          │
│  │  Body paragraph             │  │  4:3 aspect      │          │
│  │                             │  │                  │          │
│  │  ┌──────────────────────┐   │  ├──────────────────┤          │
│  │  │ Blockquote           │   │  │                  │          │
│  │  │ (red left border)    │   │  │  [Image 2]       │          │
│  │  │ Italic, no bg        │   │  │  Performance     │          │
│  │  └──────────────────────┘   │  │  4:3 aspect      │          │
│  │                             │  │                  │          │
│  │  Keywords row               │  └──────────────────┘          │
│  │  Markets. Value. Capital...  │                                │
│  │                             │                                │
│  │  TAGLINE (red, centered)    │                                │
│  │  "What would you protest    │                                │
│  │   about today?"             │                                │
│  │                             │                                │
│  │  ─────────────────────      │                                │
│  │  Closing paragraph          │                                │
│  └─────────────────────────────┘                                │
└──────────────────────────────────────────────────────────────────┘
```

| Attribute | Value |
|-----------|-------|
| **Purpose** | Explain what the show IS. This is the "what" section. Lead grabs attention; body provides context; blockquote evokes the show's intellectual questions; keywords telegraph subject matter; tagline brings it home. |
| **Layout** | Two columns on desktop (≥900px): text (flexible width) + images (400px sidebar). Single column on mobile. |
| **Key Visual** | Generous whitespace. Blockquote with red 4px left border (no background, unlike current). Tagline in Protest Red — the first appearance of red in body copy, signaling thematic weight. |
| **Images** | Black and white, 4:3 aspect, subtle shadow. Fade in on load (opacity 0→1 transition). |
| **Accessibility** | `aria-labelledby="synopsis-heading"` on section. `<h1>` visually hidden but available to screen readers. Images have descriptive alt text. |
| **CSS class** | `.synopsis`, `.synopsis-grid`, `.synopsis-text`, `.synopsis-images` |

---

### 4. Trailer Section

```
┌──────────────────────────────────────────────────────────────────┐
│  Full-width, background: var(--color-bg-alt) [Aged Paper]        │
│                                                                  │
│                    WATCH THE TRAILER                             │
│               (Avenir Next, bold, ~2rem, ink)                    │
│                                                                  │
│          ┌───────────────────────────────────────┐               │
│          │                                       │               │
│          │         YouTube Embed (16:9)          │               │
│          │                                       │               │
│          │    border: 2px solid var(--color-ink) │               │
│          │    (framed like a printed still)      │               │
│          │                                       │               │
│          └───────────────────────────────────────┘               │
│                    max-width: 900px                              │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

| Attribute | Value |
|-----------|-------|
| **Purpose** | Show, don't just tell. After the synopsis explains the show intellectually, the trailer gives the visceral experience. The subtle background colour change (Parchment → Aged Paper) marks this as a distinct section. |
| **Layout** | Center-aligned heading + centered video container. |
| **Key Visual** | Video framed with a 2px solid ink border — treats the embed like a printed photograph or film still. The heavy border says "this is worth framing." |
| **Accessibility** | YouTube iframe has `title="Epic Economics Trailer"`. `loading="lazy"` on iframe. Section has `aria-labelledby="trailer-heading"`. |
| **CSS class** | `.teaser` (keep existing name for compatibility) |

---

### 5. Team Section

```
┌──────────────────────────────────────────────────────────────────┐
│  max-width: 1200px, margin: 0 auto                               │
│  background: var(--color-bg) [Parchment]                         │
│                                                                  │
│                  MEET THE CREATIVE TEAM                           │
│               (Avenir Next, bold, ~2rem, ink)                    │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │              │  │              │  │              │           │
│  │ Dimis        │  │ Lia          │  │ Elias        │           │
│  │ Michaelides  │  │ Haraki       │  │ Vasnic       │           │
│  │              │  │              │  │              │           │
│  │ WRITER &     │  │ DIRECTOR &   │  │ PRODUCER,    │           │
│  │ PERFORMER    │  │ LIGHTING     │  │ COMPOSER &   │           │
│  │              │  │ DESIGNER     │  │ TECH SUP.    │           │
│  │              │  │              │  │              │           │
│  │ Keynote      │  │ Interdisci-  │  │ Creative     │           │
│  │ speaker...   │  │ plinary...   │  │ technolo-    │           │
│  │              │  │              │  │ gist...      │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
│   Name links open in new tab to personal websites                │
└──────────────────────────────────────────────────────────────────┘
```

| Attribute | Value |
|-----------|-------|
| **Purpose** | Build credibility. The LSE/World Bank credentials live here. Three cards, equal weight, no hierarchy — this is a collaborative creative team. |
| **Layout** | 3 equal columns on desktop (≥768px). Stack on mobile. |
| **Key Visual** | Clean white cards with subtle shadow. Name in Protest Red (clickable). Role in uppercase, small, muted. Description in Crimson Pro. |
| **Accessibility** | Names are external links with `target="_blank"`, `rel="noopener noreferrer"`. Cards have hover shadow (subtle elevation feedback) that respects `prefers-reduced-motion`. |
| **CSS class** | `.team-bios`, `.bio-grid`, `.bio-card` |

---

### 6. Home Navigation Strip

```
┌──────────────────────────────────────────────────────────────────┐
│  background: var(--color-ink) [Ink Black] — full width           │
│                                                                  │
│              ┌──────────────┐  ┌──────────────┐                  │
│              │  PRESS &     │  │   CONTACT    │                  │
│              │  MEDIA       │  │              │                  │
│              └──────────────┘  └──────────────┘                  │
│          (white text on dark, hover: red)                        │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

| Attribute | Value |
|-----------|-------|
| **Purpose** | Navigate deeper. After the homepage content, guide users to Press (for media/reviews) and Contact (for bookings). The dark strip signals "this section is different — it's navigation, not content." |
| **Layout** | Centered flex row, two links. |
| **Key Visual** | Dark background creates a visual break between the Parchment content area and the dark footer below. White text, red on hover. |
| **Accessibility** | Links are clearly labeled with destination. Focus ring visible. |
| **CSS class** | `.home-navigation` |

---

### 7. Footer

```
┌──────────────────────────────────────────────────────────────────┐
│  background: var(--color-ink) [Ink Black] — full width           │
│  top border: 2px solid var(--color-primary) [red anchor line]    │
│                                                                  │
│  ┌──────────┬──────────┬──────────────┬──────────────┐          │
│  │ EPIC     │ NAVIGAT. │ CREATIVE     │ FOLLOW       │          │
│  │ ECONOMICS│ Home     │ TEAM         │ [YouTube]    │          │
│  │          │ Press    │              │              │          │
│  │ "What    │ Technical│ Dimis Mich.  │ A theatrical │          │
│  │  would   │ Contact  │ Lia Haraki   │ exploration  │          │
│  │  you...  │          │ Elias Vasnic │ of economic  │          │
│  │          │          │              │ theory...    │          │
│  └──────────┴──────────┴──────────────┴──────────────┘          │
│                                                                  │
│  ────────────────────────────────────────────────                │
│  © 2026 Epic Economics       Photography by Boyana Loizou       │
└──────────────────────────────────────────────────────────────────┘
```

| Attribute | Value |
|-----------|-------|
| **Purpose** | Close the page definitively. The dark footer is the "back cover" of the pamphlet — it says "you've reached the end." The red top border anchors it. |
| **Layout** | 4 columns on desktop (auto-fit grid), stack on mobile. Bottom bar: space-between flex. |
| **Key Visual** | Dark background with Parchment-coloured text. Section headings in uppercase. Links in muted parchment, red on hover. YouTube social link as a pill-shaped button. |
| **Accessibility** | `aria-label="Footer navigation"` on nav section. All external links have `target="_blank"`, `rel="noopener noreferrer"`. Links have `:focus-visible` styles. |
| **CSS class** | `.site-footer`, `.footer-container` |

---

## 📏 Spacing Rhythm

```
┌─────────────────────────────────────────────────┐
│  GSAP HERO                    (100vh)            │
├─────────────────────────────────────────────────┤
│  TICKET CTA     padding: 6rem (--space-4xl)     │
├─────────────────────────────────────────────────┤
│  SYNOPSIS       padding: 6rem                   │
├─────────────────────────────────────────────────┤
│  TRAILER        padding: 6rem, bg-alt           │
├─────────────────────────────────────────────────┤
│  TEAM           padding: 6rem                   │
├─────────────────────────────────────────────────┤
│  NAV STRIP      padding: 3rem, dark bg          │
├─────────────────────────────────────────────────┤
│  FOOTER         padding: 4rem, dark bg          │
└─────────────────────────────────────────────────┘
```

The `6rem` (96px) vertical padding creates generous breathing room between sections. This is intentional — the design principle is "space as confidence." On mobile, this collapses to `3rem` (48px).

---

## 📱 Mobile Layout Adjustments

| Section | Desktop | Mobile (≤768px) |
|---------|---------|-----------------|
| **Ticket CTA** | Centered, large quote | Full-width button, smaller quote |
| **Synopsis** | 2 columns (text + images) | Single column, images between paragraphs |
| **Trailer** | Centered, 900px max | Full-width, border still applies |
| **Team** | 3 columns | Single column stack |
| **Nav strip** | Two centered links | Two links, smaller text |
| **Footer** | 4 columns | Single column, centered text |

---

## 🎨 Visual Narrative Flow

```
HERO:      "What IS this?" (curiosity)
   ↓
TICKET:    "Oh, it's a real show at the Fringe!" (recognition)
   ↓
SYNOPSIS:  "I understand what it's about" (comprehension)
   ↓
TRAILER:   "I can see what it FEELS like" (emotional connection)
   ↓
TEAM:      "These are credible people" (trust)
   ↓
NAV:       "I want to learn more" (engagement)
   ↓
FOOTER:    "This is where to find them" (action)
```

Each section builds on the last. The layout supports this narrative by progressing from abstract (marquee) → concrete (CTA) → informative (synopsis, trailer, team) → navigational (links, footer).

---

**Handoff:** This wireframe is complete and ready for the Frontend Developer. All sections, their purposes, visual treatments, and accessibility considerations are specified.
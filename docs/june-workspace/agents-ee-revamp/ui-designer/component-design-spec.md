# Epic Economics — Component Design Spec

**Version:** 1.0
**Date:** June 2026
**Prepared by:** UI Designer 🎨
**Context:** Website revamp for Edinburgh Fringe 2026 launch

---

## 🔗 Brand Inputs (Locked)

The following are established by Brand Guardian and are **non-negotiable**:

- **Primary Palette:** Protest Red `#C41E3A`, Ink Black `#1A1A24`, Parchment `#F5F0E8`
- **Accent:** Amber Gold `#C9A84C` (sparing, max 5% of layout)
- **Heading Font:** Avenir Next (already in codebase)
- **Body Font:** Crimson Pro (new, replacing Nunito Sans)
- **Design Principles:** Typography-first, high contrast, texture over glass, manifesto energy, space as confidence
- **Aesthetic Territory:** Soviet constructivist posters × contemporary protest graphics × editorial print

All CSS custom properties from `design-tokens.css` are available via `var(--color-*)`, `var(--font-*)`, `var(--space-*)`, `var(--shadow-*)`, `var(--border-*)`, `var(--radius-*)`.

---

## 📐 Design Decisions Summary

| Decision | Rationale |
|----------|-----------|
| Solid backgrounds replace glassmorphism | Concrete, tactile, manifesto-on-paper aesthetic; WCAG AA+ compliance |
| Left-aligned body text | Fringe audiences scan fast; left-aligned is fastest to parse |
| Uppercase CTA buttons | Placard energy; theatrical urgency |
| Dark (Ink Black) footer | Grounds the page; creates a definitive end that feels like the back cover of a pamphlet |
| Amber Gold only on dark backgrounds | WCAG compliance (2.98:1 on Parchment is a fail); used only where contrast passes |
| Generous whitespace (`--space-3xl`, `--space-4xl`) | Intellectual confidence; lets typography breathe |
| Crimson Pro italic for blockquotes | Scholarly authority meets theatrical warmth |
| No floating blobs, no shimmers, no glass | Kills the 2020 aesthetic dead; aligns with Brand Guardian directive |

---

## 🧱 1. Navbar

**Component:** `LiquidGlassNavbar.jsx` + `LiquidGlassNavbar.css`
**Current State:** Glassmorphism with floating blobs, shimmer pseudo-elements, complex layered backgrounds
**Target State:** Solid, authoritative, minimal. A fixed-top bar that says "this is a serious show" without screaming.

### Redesign Spec

```
┌──────────────────────────────────────────────────────────────┐
│  [Favicon]  EPIC ECONOMICS        Home  Press  Contact      │
│                                                              │
│  background: var(--color-surface)                            │
│  border-bottom: var(--border-light)                          │
│  box-shadow: var(--shadow-sm)                                │
└──────────────────────────────────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| **Position** | Fixed top (`position: fixed; top: 0; z-index: 1000`) |
| **Background** | `var(--color-surface)` (solid white, no blur) |
| **Border** | `var(--border-light)` bottom only |
| **Shadow** | `var(--shadow-sm)` |
| **Height** | 64px (desktop), 56px (mobile) |
| **Padding** | `0 var(--space-xl)` |
| **Transform** | `translateY(-100%) → 0` on show (GSAP, kept from current) |
| **Transition** | 400ms ease for show/hide |

### Navbar Brand (Left)
| Property | Value |
|----------|-------|
| **Logo** | 32×32px favicon, `margin-right: var(--space-sm)` |
| **Title** | "EPIC ECONOMICS", `var(--font-heading)`, weight 700, `0.95rem`, `letter-spacing: 0.08em`, uppercase, `var(--color-ink)` |
| **Link** | Routes to `/` |

### Navbar Links (Right)
| State | Background | Text Color | Border | Transform |
|-------|-----------|------------|--------|-----------|
| **Default** | Transparent | `var(--color-ink-light)` | None | None |
| **Hover** | `var(--color-primary-light)` | `var(--color-primary)` | None | None |
| **Focus-visible** | — | `var(--color-primary)` | `2px solid var(--color-primary)` offset 2px | None |
| **Active (current page)** | `var(--color-ink)` | `var(--color-bg)` | None | None |

- Font: `var(--font-heading)`, weight 600, `0.875rem`, padding `0.5rem 1rem`, `border-radius: var(--radius-sm)`
- Gap between links: `var(--space-lg)`

### Kill List (Remove Entirely)
- `.liquid-bg`, `.liquid-blob`, `blob-1/2/3`, `@keyframes liquidFloat*`
- `.liquid-glass-navbar::before` / `::after` shimmer pseudo-elements
- `.navbar-container::before` (refractivePulse)
- `.menu-link::before` / `::after` (glass shimmer surrounds)
- `backdrop-filter: blur()` on any navbar element
- `mix-blend-mode: overlay`
- `.navbar-title` (the old text element) — replace with plain text

### Mobile (≤768px)
- Links stack with tighter gap (`var(--space-md)`)
- Reduced padding on links: `0.4rem 0.75rem`
- Logo: 24×24px
- Hide blob animations already handled by deletion

### Accessibility
- `<nav role="navigation" aria-label="Main navigation">` (keep from current)
- Each `<Link>` has `role="menuitem"` and `aria-current="page"` on active (keep from current)
- Focus ring visible: `outline: 2px solid var(--color-primary); outline-offset: 2px`

---

## 🦶 2. Footer

**Component:** `Footer.jsx` + `Footer.css`
**Current State:** Glassmorphism with blobs, refractive shimmers, complex layered effects
**Target State:** Dark, grounded, manifesto back-cover. Ink Black background with Parchment text.

### Redesign Spec

```
┌──────────────────────────────────────────────────────────────┐
│  background: var(--color-ink)  ← DARK FOOTER                 │
│  color: var(--color-bg)                                      │
│                                                              │
│  ┌──────────┬──────────┬──────────┬──────────┐              │
│  │ EPIC     │ Navigat. │ Creative │ Follow   │              │
│  │ ECONOMICS│ Home     │ Team     │ YouTube  │              │
│  │ tagline  │ Press    │ Dir.     │          │              │
│  │          │ Tech     │ Prod.    │          │              │
│  │          │ Contact  │ Writer   │          │              │
│  └──────────┴──────────┴──────────┴──────────┘              │
│  ─────────────────────────────────────────────               │
│  © 2026 Epic Economics    Photography by Boyana Loizou       │
└──────────────────────────────────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| **Background** | `var(--color-ink)` |
| **Text color** | `var(--color-bg)` (headings), `var(--color-ink-muted)` inverted to `#B8B0C0` for secondary |
| **Container** | `max-width: 1200px`, `padding: var(--space-3xl) var(--space-xl)` |
| **Top border** | `2px solid var(--color-primary)` (thin red line anchors the page end) |

### Section Headings
| Property | Value |
|----------|-------|
| **Font** | `var(--font-heading)`, weight 700, `1rem`, uppercase, `letter-spacing: 0.08em` |
| **Color** | `var(--color-bg)` |
| **Margin** | `0 0 var(--space-md) 0` |

### Links
| State | Color |
|-------|-------|
| **Default** | `var(--color-bg)` opacity 0.75 |
| **Hover** | `var(--color-primary)` |
| **Focus-visible** | `outline: 2px solid var(--color-primary)`, offset 2px |

- Transitions: `150ms ease` on color only
- No transforms on hover (unlike current `translateX(5px)`)

### Social Link (YouTube)
| Property | Value |
|----------|-------|
| **Default** | `var(--color-surface)` at 10% opacity background, `border: var(--border-light)` inverted |
| **Hover** | `var(--color-primary)` background, white text |
| **Shape** | Pill (`border-radius: var(--radius-full)`), padding `0.6rem 1.2rem` |

### Bottom Bar
- Separated by `1px solid rgba(245, 240, 232, 0.1)` top border
- Flex row, space-between
- Copyright + credits in `0.8rem`, color `var(--color-bg)` opacity 0.5

### Kill List (Remove Entirely)
- `.footer-liquid-bg`, `.footer-liquid-blob`, all `blob-*` classes
- `@keyframes footerLiquidFloat*`
- `.liquid-glass-footer::before` / `::after` shimmer
- `.footer-container::before` (refractivePulse)
- `backdrop-filter: blur()` on any footer element
- `mix-blend-mode: multiply`
- `text-shadow` on all elements (redundant on solid dark bg)

---

## 🔘 3. Buttons

Two variants based on Brand Guardian design tokens. Both use the existing `.button` class pattern.

### Button — Primary (CTA)
```
┌──────────────────────┐
│   GET TICKETS NOW    │  ← Uppercase, letter-spacing 0.05em
└──────────────────────┘
```

| State | Background | Text Color | Border | Shadow | Transform |
|-------|-----------|------------|--------|--------|-----------|
| **Default** | `var(--color-primary)` | `#FFFFFF` | None | None | None |
| **Hover** | `var(--color-primary-hover)` | `#FFFFFF` | None | `var(--shadow-md)` | `translateY(-1px)` |
| **Active** | `var(--color-primary-hover)` | `#FFFFFF` | None | `var(--shadow-sm)` | `translateY(0)` |
| **Focus-visible** | `var(--color-primary)` | `#FFFFFF` | `2px solid var(--color-primary)` offset 2px | — | — |
| **Disabled** | `var(--color-primary)` opacity 0.5 | `#FFFFFF` opacity 0.5 | None | None | None |

| Property | Value |
|----------|-------|
| **Font** | `var(--font-heading)`, weight 700, `var(--text-body)`, uppercase |
| **Letter-spacing** | `0.05em` |
| **Padding** | `0.875em 2em` |
| **Border-radius** | `var(--radius-md)` |
| **Min touch target** | 44×44px (passes at default size: ~45px height) |
| **Transition** | `var(--transition-fast)` for bg, transform, shadow |

### Button — Secondary (Outline)
```
┌──────────────────────┐
│   LEARN MORE         │
└──────────────────────┘
```

| State | Background | Text Color | Border | Transform |
|-------|-----------|------------|--------|-----------|
| **Default** | Transparent | `var(--color-ink)` | `var(--border-heavy)` (2px solid ink) | None |
| **Hover** | `var(--color-ink)` | `var(--color-bg)` | `var(--border-heavy)` | `translateY(-1px)` |
| **Active** | `var(--color-ink)` | `var(--color-bg)` | `var(--border-heavy)` | `translateY(0)` |
| **Focus-visible** | Transparent | `var(--color-ink)` | `2px solid var(--color-primary)` offset 2px | — |
| **Disabled** | Transparent opacity 0.4 | `var(--color-ink)` opacity 0.4 | `var(--border-heavy)` opacity 0.4 | None |

### Button — Text (Link-style, minimal)
For inline actions like "View all reviews" or "Back to Home".

| State | Text Color | Decoration |
|-------|-----------|------------|
| **Default** | `var(--color-primary)` | None |
| **Hover** | `var(--color-primary-hover)` | Underline |
| **Focus-visible** | `var(--color-primary)` | `outline: 2px solid var(--color-primary)` offset 2px |

---

## 📝 4. Form Elements (Contact Page)

**Component:** `Contact.jsx` + `Contact.css`

### Form Card
Replace all glassmorphism cards with solid surfaces:

| Property | Current | New |
|----------|---------|-----|
| **Background** | `var(--glass-bg-secondary)` + blur | `var(--color-surface)` |
| **Border** | `var(--glass-border)` | `var(--border-light)` |
| **Border-radius** | 24px | `var(--radius-lg)` (12px) |
| **Shadow** | Complex glass stack | `var(--shadow-md)` |
| **`::before` pseudo** | Glass shimmer | Removed |

### Input / Textarea
| Property | Value |
|----------|-------|
| **Background** | `var(--color-surface)` |
| **Border** | `var(--border-medium)` |
| **Border-radius** | `var(--radius-md)` |
| **Padding** | `0.75rem 1rem` |
| **Font** | `var(--font-body)`, `var(--text-body)` |
| **Placeholder** | `var(--color-ink-muted)` |
| **Focus** | `border-color: var(--color-primary)`, `box-shadow: 0 0 0 3px var(--color-primary-light)` |
| **Error** | `border-color: var(--color-error)`, `box-shadow: 0 0 0 3px var(--color-error-light)` |

### Label
| Property | Value |
|----------|-------|
| **Font** | `var(--font-heading)`, weight 600, `var(--text-small)` |
| **Color** | `var(--color-ink-light)` |
| **Margin** | `0 0 var(--space-sm) 0` |

### Submit Button
Same as Primary Button above, but `width: 100%` on mobile.

### Status Messages
| Type | Background | Border | Text Color | Icon |
|------|-----------|--------|------------|------|
| **Success** | `var(--color-success-light)` | `1px solid var(--color-success)` | `var(--color-success)` | ✓ |
| **Error** | `var(--color-error-light)` | `1px solid var(--color-error)` | `var(--color-error)` | ✗ |

### Contact Info Card (Left Column)
Same solid card treatment as form card. Contact methods get `var(--color-bg-alt)` background on hover instead of glass effect. Method icons use `var(--color-primary)` background with white icon — no gradients.

---

## 🃏 5. Cards (Bio Cards, Press Cards)

### Bio Card (Homepage Team Section)
```
┌─────────────────────┐
│                     │
│  Dimis Michaelides  │  ← var(--font-heading), weight 700
│  WRITER & PERFORMER │  ← var(--font-heading), weight 600, uppercase, ink-light
│                     │
│  Keynote speaker... │  ← var(--font-body), weight 400, ink
│                     │
└─────────────────────┘
```

| Property | Value |
|----------|-------|
| **Background** | `var(--color-surface)` |
| **Border** | `var(--border-light)` |
| **Border-radius** | `var(--radius-lg)` |
| **Padding** | `var(--space-xl)` |
| **Shadow** | `var(--shadow-sm)` |
| **Hover** | `box-shadow: var(--shadow-md)`, no transform (respecting reduced motion preference, but this is a subtle elevation) |
| **Name link** | `var(--color-primary)`, hover: `var(--color-primary-hover)` with underline |
| **Role** | `0.75rem`, uppercase, `letter-spacing: 0.08em`, `var(--color-ink-light)`, `margin-bottom: var(--space-md)` |
| **Description** | `0.95rem`, `line-height: 1.6`, `var(--color-ink)` |

### Review Card (Press Page)
Same structure as bio card but with italic blockquote body using `var(--font-body)` italic.

---

## 🏠 6. Homepage Sections

### Section Structure (All Sections)

Each major section follows a consistent pattern:
- `padding: var(--space-4xl) var(--space-xl)` (vertical rhythm)
- `max-width: 1200px`, `margin: 0 auto`
- Section headings: `var(--font-heading)`, weight 700, `var(--text-h2)`, `margin-bottom: var(--space-2xl)`, `var(--color-ink)`

### 6a. Synopsis Section
| Element | Treatment |
|---------|-----------|
| **Lead paragraph** | `var(--font-body)`, weight 500, `var(--text-lead)` (1.25rem), `var(--color-ink)`, max-width 65ch |
| **Body paragraph** | `var(--font-body)`, weight 400, `var(--text-body)`, `var(--color-ink-light)` |
| **Blockquote** | `var(--font-body)`, italic, `var(--text-lead)`, `border-left: 4px solid var(--color-primary)`, `padding-left: var(--space-lg)`, `color: var(--color-ink-light)`, background: none (remove the glass background from current) |
| **Keywords** | `var(--font-heading)`, weight 600, `letter-spacing: 0.05em`, `var(--color-ink)`, separated by dots |
| **Tagline** | `var(--font-heading)`, weight 700, `var(--text-h3)`, centered, `var(--color-primary)` (strong text in red, not purple) |
| **Closing** | `var(--font-body)`, `border-top: var(--border-light)`, `padding-top: var(--space-xl)` |
| **Background** | `var(--color-bg)` (Parchment) |

### 6b. Trailer Section
| Element | Treatment |
|---------|-----------|
| **Section background** | `var(--color-bg-alt)` (Aged Paper) — subtle alternation |
| **Heading** | Same pattern as other sections |
| **Video container** | `max-width: 900px`, 16:9 ratio, `border-radius: var(--radius-lg)`, `box-shadow: var(--shadow-lg)`, `border: var(--border-heavy)` (2px solid ink creates a frame like a printed still) |

### 6c. Team Section
| Element | Treatment |
|---------|-----------|
| **Background** | `var(--color-bg)` |
| **Heading** | Same pattern |
| **Grid** | 3 columns desktop, stack on mobile |
| **Bio cards** | As specified in Cards section above |

### 6d. Navigation Links (Bottom of Homepage)
| Element | Current | New |
|---------|---------|-----|
| **Background** | `rgba(0, 0, 0, 0.05)` | `var(--color-ink)` (dark strip) |
| **Link style** | Purple pill buttons | White text on dark, hover: `var(--color-primary)` |
| **Layout** | Centered flex row | Same |

---

## 🎫 7. Ticket CTA Component (NEW)

This is a **new component** that doesn't exist in the current codebase. It bridges the GSAP hero and the synopsis — the first thing a user sees when they scroll past the marquee.

### Design
```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│     "The system's on stage. Are you in the audience?"        │
│                                                              │
│              ┌──────────────────────────┐                    │
│              │    🎫  GET TICKETS NOW   │                    │
│              └──────────────────────────┘                    │
│                                                              │
│     Edinburgh Fringe 2026  •  Tickets at edfringe.com        │
│                                                              │
└──────────────────────────────────────────────────────────────┘
  background: var(--color-primary)  ← FULL RED BANNER
```

| Property | Value |
|----------|-------|
| **Background** | `var(--color-primary)` — full-width red band |
| **Text color** | `#FFFFFF` |
| **Padding** | `var(--space-3xl) var(--space-xl)` |
| **Text alignment** | Center |
| **Quote text** | `var(--font-body)`, italic, `var(--text-lead)`, white, `margin-bottom: var(--space-lg)` |
| **Button** | Primary variant, but **inverted**: white background, `var(--color-primary)` text — creates a striking "punch-out" effect on the red band |
| **Sub-text** | `var(--font-body)`, `var(--text-small)`, white at 0.8 opacity |
| **Link** | `href="https://www.edfringe.com/tickets/whats-on/epic-economics-what-would-you-protest-about-today"`, `target="_blank"`, `rel="noopener noreferrer"` |
| **ARIA** | `aria-label="Get tickets for Epic Economics at Edinburgh Fringe (opens in new tab)"` |

### Inverse Button (on red background)
| State | Background | Text Color | Border |
|-------|-----------|------------|--------|
| **Default** | `#FFFFFF` | `var(--color-primary)` | None |
| **Hover** | `var(--color-bg)` (Parchment) | `var(--color-primary-hover)` | None |
| **Active** | `var(--color-bg)` | `var(--color-primary-hover)` | None |
| **Focus-visible** | `#FFFFFF` | `var(--color-primary)` | `2px solid #FFFFFF` offset 2px |

### Placement
After the GSAP hero scroll section. This is the first element in `.home-content` after `100vh`. It serves as the pivot point between the abstract marquee experience and the concrete show information.

### Responsive
- On mobile: tighter padding, smaller quote text, full-width button
- Button always min 44px touch target

---

## 🎨 8. Press Page & Preview Page

### Press Page Headings
- Remove all gradient text effects (`-webkit-background-clip: text` with purple gradients)
- Replace with solid `var(--color-ink)` text

### Image Gallery / Lightbox
- Overlay background: `var(--color-ink)` at 90% opacity
- Close button: white, 44×44px touch target
- Navigation arrows: white, 44×44px touch target

### Press Contact CTA
- Same as Ticket CTA pattern but on `var(--color-bg-alt)` background with standard Primary button

---

## 🚫 Global Kill List

These patterns are removed **site-wide**:

| Pattern | Files Affected | Replacement |
|---------|---------------|-------------|
| `backdrop-filter: blur()` | Navbar, Footer, Contact, Home, Preview CSS | Solid backgrounds |
| `-webkit-backdrop-filter` | All of above | Solid backgrounds |
| `linear-gradient(135deg, #667eea, #764ba2)` | Home, Contact, App CSS | `var(--color-primary)` or solid `var(--color-ink)` |
| `linear-gradient(135deg, #a8edea, #fed6e3)` | index.css, Home.css | `var(--color-bg)` |
| Floating blob animations | Navbar CSS, Footer CSS | Removed entirely |
| Shimmer `::before`/`::after` pseudo-elements | Navbar CSS, Footer CSS, Contact CSS | Removed entirely |
| `text-shadow` for glass effect | Multiple files | Removed or simplified |
| `mix-blend-mode` overlays | Navbar CSS, Footer CSS | Removed |
| Hardcoded `#667eea` / `#764ba2` | Home.css, Contact.css, Press.css | `var(--color-primary)` / `var(--color-primary-hover)` |
| `--glass-bg*`, `--glass-border`, `--glass-shadow` | All component CSS | `var(--color-surface)`, `var(--border-light)`, `var(--shadow-md)` |
| `--accent-blue` / `--accent-purple` | Contact.css | `var(--color-primary)` |
| Ambient background `body::before` radial gradients | index.css | Removed |
| `background-attachment: fixed` on body | index.css | Removed |

---

## ♿ Accessibility Notes (Per Component)

### Navbar
- `role="navigation"`, `aria-label="Main navigation"` ✓
- `aria-current="page"` on active link ✓
- Visible focus rings on all links ✓
- Logo link has `aria-label="Epic Economics — Home"` ✓

### Footer
- `aria-label="Footer navigation"` on nav section ✓
- Social link: `aria-label="Watch Epic Economics trailer on YouTube (opens in new tab)"` ✓
- External links: `target="_blank"`, `rel="noopener noreferrer"` ✓

### Buttons
- Min 44×44px touch target ✓
- Visible focus ring (`outline`, not removed) ✓
- `aria-label` on icon-only buttons ✓

### Form
- All inputs have associated `<label>` elements ✓
- Error states communicated via both color and text ✓
- `aria-describedby` for error messages linking to inputs ✓

### Ticket CTA
- External link announced: `(opens in new tab)` in aria-label ✓
- High contrast: white on red = 5.82:1 ✓

---

## 📐 Responsive Strategy

| Breakpoint | Behavior |
|-----------|----------|
| **320–639px** (Mobile) | Single column, stacked sections, full-width cards, smaller type, navbar links in row with small gap |
| **640–1023px** (Tablet) | Two-column grids where applicable, medium padding |
| **1024–1279px** (Desktop) | Full layout, three-column bio grid, generous padding |
| **1280px+** (Large) | Max-width containers center content, background color fills edges |

---

**Handoff:** This spec is complete and ready for the Frontend Developer. See `component-styles.css` for the implementation-ready CSS.
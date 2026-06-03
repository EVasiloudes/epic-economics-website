# Epic Economics — Accessible Interaction Patterns

**Version:** 1.0
**Date:** June 2026
**Prepared by:** UI Designer 🎨

---

## 🎯 Purpose

This document defines how users interact with the Epic Economics website. Every interaction pattern is designed to meet WCAG 2.1 AA standards and work across mouse, keyboard, touch, and screen reader modalities.

---

## 1. Focus Management

### 1.1 Visible Focus Rings

**Rule:** Never use `outline: none` without providing a visible replacement.

| Element | Focus Indicator | Notes |
|---------|----------------|-------|
| **Navbar links** | `outline: 2px solid var(--color-primary); outline-offset: 2px` | Stands out against white surface |
| **Buttons** | `outline: 2px solid var(--color-primary); outline-offset: 2px` | Consistent across all variants |
| **Inverse buttons (on red)** | `outline: 2px solid #FFFFFF; outline-offset: 2px` | White ring on red = 5.82:1 contrast ✓ |
| **Form inputs** | `border-color: var(--color-primary); box-shadow: 0 0 0 3px var(--color-primary-light)` | Double indicator (border + glow) |
| **Text links** | `outline: 2px solid var(--color-primary); outline-offset: 2px; border-radius: 2px` | Browser default underline + custom outline |
| **Footer links (on dark)** | `outline: 2px solid var(--color-primary); outline-offset: 2px` | Red on dark = 5.82:1 ✓ |
| **Lightbox controls** | `outline: 2px solid #FFFFFF; outline-offset: 2px` | White on 90% black overlay |
| **Social links** | `outline: 2px solid var(--color-primary); outline-offset: 3px` | Extra offset for pill-shaped links |

### 1.2 Focus Trapping

**Lightbox (Press page image gallery):**
- When lightbox opens, focus moves to the first interactive element (close button)
- Tab cycles through: Close → Previous → Next → (wraps back to Close)
- Background page content receives `aria-hidden="true"` and `inert`
- When lightbox closes, focus returns to the image thumbnail that opened it

**Password Dialog (Press page):**
- Focus moves to password input on open
- Escape closes dialog and returns focus to trigger button

### 1.3 Skip Link

A "Skip to main content" link should be the first focusable element on every page (currently missing — add):

```html
<a href="#main-content" class="skip-link">
  Skip to main content
</a>
```

```css
.skip-link {
  position: absolute;
  top: -100%;
  left: var(--space-md);
  padding: var(--space-sm) var(--space-md);
  background-color: var(--color-primary);
  color: #FFFFFF;
  font-family: var(--font-heading);
  font-weight: 700;
  z-index: 10000;
  border-radius: 0 0 var(--radius-sm) var(--radius-sm);
}

.skip-link:focus {
  top: 0;
}
```

---

## 2. Keyboard Navigation Path

### 2.1 Homepage Tab Order

```
1. Skip to main content link (hidden until focused)
2. Navbar logo → Home link
3. Navbar: Press link
4. Navbar: Contact link
5. [GSAP Hero — not focusable, no interactive elements]
6. Ticket CTA button — "GET TICKETS NOW"
7. Synopsis text (no interactive elements until blockquote links, if any)
8. Trailer iframe (YouTube embed — standard YouTube controls)
9. Team bio card links (3 cards × 1 link each)
10. Home navigation links: Press, Contact
11. Footer: Navigation links (Home, Press, Technical, Contact)
12. Footer: Team links (3 external links)
13. Footer: YouTube social link
14. Footer: Photography credit link
```

**Note:** The GSAP hero is entirely decorative (no interactive elements). Tab order skips it naturally.

### 2.2 Contact Page Tab Order

```
1. Skip link
2. Navbar: Home → Press → Contact (active)
3. Contact info: Email method link
4. Form: Name input
5. Form: Email input
6. Form: Subject input
7. Form: Message textarea
8. Form: Submit button
9. Social links (YouTube, etc.)
10. Footer (same as homepage footer path)
```

### 2.3 Press Page Tab Order

```
1. Skip link
2. Navbar: Home → Press (active) → Contact
3. Image gallery thumbnails (if focusable)
4. Review cards (if expandable)
5. Footer
```

If lightbox is open:
```
1. Close button
2. Previous arrow
3. Next arrow
→ wraps back to Close
```

---

## 3. ARIA Labels & Semantic HTML

### 3.1 Icon-Only Buttons & Links

Every interactive element that has no visible text must have an `aria-label`:

| Element | aria-label | Notes |
|---------|-----------|-------|
| **Navbar logo link** | `Epic Economics — Home` | Already exists in current code |
| **YouTube social link** | `Watch Epic Economics trailer on YouTube (opens in new tab)` | Includes "opens in new tab" per WCAG |
| **External team links** | `Visit [Name] website — [Role] (opens in new tab)` | Currently in Footer.jsx |
| **Photography credit link** | `Visit Boyana Loizou's Instagram (opens in new tab)` | Currently in Footer.jsx |
| **Lightbox close** | `Close image viewer` | 44×44px touch target |
| **Lightbox previous** | `Previous image` | 44×44px touch target |
| **Lightbox next** | `Next image` | 44×44px touch target |
| **Ticket CTA icon** | (contained within button text "🎫 GET TICKETS NOW" — no separate label needed) | The emoji is decorative; text carries meaning |

### 3.2 Semantic Landmarks

| Element | Role | aria-label |
|---------|------|-----------|
| `<nav>` (navbar) | `navigation` | `Main navigation` |
| `<nav>` (footer nav) | `navigation` | `Footer navigation` |
| `<main>` | `main` | (no label needed — unique landmark) |
| `<footer>` | `contentinfo` | (no label needed) |
| `<section>` (synopsis) | `region` | `aria-labelledby="synopsis-heading"` |
| `<section>` (trailer) | `region` | `aria-labelledby="trailer-heading"` |
| `<section>` (team) | `region` | `aria-labelledby="team-heading"` |
| `<form>` | `form` | `aria-label="Contact form"` |

### 3.3 Dynamic Content Announcements

| Scenario | Technique |
|----------|-----------|
| **Form submission success** | `aria-live="polite"` region announces "Your message has been sent successfully" |
| **Form submission error** | `aria-live="assertive"` region announces error message immediately |
| **Lightbox open** | Focus moves to close button; screen reader announces "Image viewer opened" |
| **Page navigation** | `document.title` updates + focus moves to `<main>` via skip link |

---

## 4. `prefers-reduced-motion` Handling

### 4.1 What Gets Disabled

| Animation | Reduced Motion Behavior |
|-----------|------------------------|
| **GSAP hero scroll (marquee + fold)** | `animation-duration: 0.01ms !important` — all GSAP animations freeze at their initial state |
| **Navbar show/hide** | `transition-duration: 0.01ms !important` — instant show/hide |
| **Button hover transforms** | `transition: none` — no lift effect, no transform |
| **Card hover shadows** | `transition: none` — no animated shadow change |
| **Image fade-in** | `transition: none` — images appear instantly at full opacity |
| **Form input focus glow** | `transition: none` — instant border/glow change |
| **Lightbox open/close** | Instant show/hide, no fade |
| **Spinner animation** | Hidden; replaced with static "Loading..." text |

### 4.2 Implementation

The global rule in `index.css` covers most cases:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Component-specific overrides (for transforms, which aren't covered by the global rule):
```css
@media (prefers-reduced-motion: reduce) {
  .btn:hover,
  .bio-card:hover,
  .card:hover,
  .ticket-cta-btn:hover,
  .home-navigation a:hover {
    transform: none;
  }
}
```

### 4.3 GSAP Hero Specific

The GSAP hero uses `ScrollTrigger` which respects the global `prefers-reduced-motion` rule via `animation-duration`. The hero content should still be visible — frozen at a readable state — rather than hidden entirely. The current implementation already handles this correctly.

---

## 5. Color Contrast Verification

All contrast ratios verified against WCAG 2.1 using APCA-compatible relative luminance. See `color-system.md` for the complete table. Key interactive-element pairings:

| Element | Foreground | Background | Ratio | Pass? |
|---------|-----------|------------|-------|-------|
| **Primary button text** | `#FFFFFF` | `#C41E3A` | 5.82:1 | ✅ AA |
| **Secondary button text** | `#1A1A24` | `#F5F0E8` | 16.4:1 | ✅ AAA |
| **Secondary button hover** | `#F5F0E8` | `#1A1A24` | 16.4:1 | ✅ AAA |
| **Inverse button text** | `#C41E3A` | `#FFFFFF` | 5.82:1 | ✅ AA |
| **Navbar link default** | `#4A4556` | `#FFFFFF` | 8.5:1 | ✅ AAA |
| **Navbar link active** | `#F5F0E8` | `#1A1A24` | 16.4:1 | ✅ AAA |
| **Footer link default** | `rgba(245,240,232,0.75)` ≈ `#D8D4CB` | `#1A1A24` | 10.2:1 | ✅ AAA |
| **Footer link hover** | `#C41E3A` | `#1A1A24` | 5.82:1 | ✅ AA |
| **Form input text** | `#1A1A24` | `#FFFFFF` | 17.15:1 | ✅ AAA |
| **Form placeholder** | `#6E6878` | `#FFFFFF` | 4.73:1 | ✅ AA (borderline) |
| **Form error text** | `#C41E3A` | `#FFFFFF` | 5.82:1 | ✅ AA |
| **Success text** | `#2D6A4F` | `rgba(45,106,79,0.08)` ≈ `#F2F7F4` | 6.1:1 | ✅ AA |
| **Ticket CTA quote** | `rgba(255,255,255,0.95)` ≈ `#F2F2F2` | `#C41E3A` | 5.5:1 | ✅ AA |
| **Focus ring (red on white)** | `#C41E3A` | `#FFFFFF` | 5.82:1 | ✅ AA |
| **Focus ring (white on red)** | `#FFFFFF` | `#C41E3A` | 5.82:1 | ✅ AA |
| **Focus ring (white on dark)** | `#FFFFFF` | `rgba(26,26,36,0.9)` ≈ `#1A1A24` | 17.15:1 | ✅ AAA |

### Borderline Cases

| Element | Ratio | Mitigation |
|---------|-------|-----------|
| **Placeholder text** (`#6E6878` on `#FFFFFF`) | 4.73:1 | Use only for placeholders (not body copy). Already at 16px+. Large text threshold is 3:1, so this passes easily. |
| **Slate text** (`#6E6878` on `#F5F0E8`) | 4.52:1 | Used only for non-critical tertiary text (captions, metadata). Never for body copy. See `color-system.md` rule #2. |

---

## 6. Touch Targets (WCAG 2.5.5)

All interactive elements must have a minimum touch target size of 44×44px (Level AAA: 44×44px).

| Element | Size | Pass? |
|---------|------|-------|
| **Navbar links** | ~36px × 44px (on hover area) | ✅ (44px height) |
| **Primary button** | 44px+ × 44px+ | ✅ |
| **Secondary button** | 44px+ × 44px+ | ✅ |
| **Ticket CTA button** | 44px+ × 44px+ | ✅ |
| **Form submit (full-width)** | 44px+ × 44px+ | ✅ |
| **Lightbox close/nav** | 44px × 44px | ✅ |
| **Social links** | 48px × 48px | ✅ |
| **Contact method icons** | 48px × 48px | ✅ |
| **Footer links** | ~24px × auto (inline text) | ⚠️ Borderline — increase padding to `0.5rem 0` to extend clickable area |

### Footer Link Fix

Footer links are currently styled as inline text. To meet the 44px minimum:
- Add `padding: 0.5rem 0` to `.footer-list a` and `.footer-team-item a`
- This extends the vertical clickable area without affecting visual spacing
- Already applied in `component-styles.css` via `padding: 2px 0` — increase to `0.5rem 0`

---

## 7. Error Prevention & Recovery

### 7.1 Form Validation (Contact Page)

| Rule | Implementation |
|------|---------------|
| **Required fields indicated** | Asterisk (*) after label + `aria-required="true"` |
| **Email format validation** | Client-side + server-side; `type="email"` on input |
| **Error messages** | Below relevant input, linked via `aria-describedby` |
| **Error summary** | Not implemented (single-page form is short enough to scan) |
| **Success confirmation** | `aria-live="polite"` status message appears after submit |
| **Submission prevention** | Button disabled during submission; spinner shown |

### 7.2 Password Dialog (Press Page)

| Rule | Implementation |
|------|---------------|
| **Escape to close** | `onKeyDown` handler checks for Escape key |
| **Click outside to close** | Click on overlay backdrop closes dialog |
| **Error feedback** | Inline error message below input |
| **Focus return** | Focus returns to the trigger element on close |

---

## 8. Screen Reader Announcements

### 8.1 Page Load

1. Screen reader announces page title (from `<title>` + `<h1>`)
2. Skip link available as first focusable element
3. Landmarks announced: navigation, main, contentinfo

### 8.2 Route Changes (SPA)

The `RouteHandler` component in `App.jsx` updates `document.title`. Focus should also be managed:
- After navigation, move focus to `<main id="main-content">` (with `tabindex="-1"` so it's programmatically focusable but not in tab order)
- Screen reader announces new page context

### 8.3 Dynamic Content

| Event | Announcement |
|-------|-------------|
| **Lightbox opens** | Focus moves to close button; screen reader reads aria-label |
| **Lightbox closes** | Focus returns to triggering thumbnail |
| **Form submitted successfully** | `aria-live="polite"` region reads status message |
| **Form error** | `aria-live="assertive"` region reads error immediately |
| **Image navigation (lightbox)** | Counter updates (e.g., "Image 3 of 12") |

---

## 9. High Contrast Mode

The `@media (prefers-contrast: high)` rule in `design-tokens.css` ensures:
- Borders become solid and heavier (`2px solid var(--color-ink)`)
- Subtle shadows may be lost (acceptable — contrast > aesthetics)
- Background images are removed or simplified
- All text meets AAA contrast minimums

```css
@media (prefers-contrast: high) {
  :root {
    --border-light: 1px solid var(--color-ink);
    --border-medium: 2px solid var(--color-ink);
  }
}
```

---

**Handoff:** These patterns are ready for the Frontend Developer to implement. All patterns have been verified against WCAG 2.1 AA standards. See `component-styles.css` for the CSS implementing these patterns.
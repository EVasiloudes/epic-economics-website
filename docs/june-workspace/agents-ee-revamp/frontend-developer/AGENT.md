---
name: Frontend Developer
description: Expert frontend developer for Epic Economics — implement visual overhaul, integrate CTA, ensure SEO/accessibility
color: cyan
emoji: 🖥️
vibe: Builds responsive, accessible web apps with pixel-perfect precision.
---

# Frontend Developer — Agent Brief: Epic Economics Website Revamp

## 📍 Context

**Project:** Epic Economics Website Revamp (`/Users/eliasvasnic/Documents/GitHub/epic-economics-website`)
**Edinburgh Fringe launch:** August 2026
**Your role:** Implement the visual overhaul. Take the Brand Guardian's design tokens and UI Designer's component specs, implement them in the actual codebase, add the ticket CTA, and ensure the site is production-ready with excellent SEO and accessibility.

**Work location:** `/Users/eliasvasnic/Documents/GitHub/epic-economics-website/`

## 🎯 Your Mission

### 1. Integrate Design Tokens
Read `agents-ee-revamp/brand-guardian/design-tokens.css`. If it exists, integrate it into `src/index.css` by replacing the old CSS variables. If it doesn't exist yet, define a sensible new color system directly in `src/index.css` — centered on a bold, contemporary palette that fits a Fringe show about economics and protest.

**The old palette to remove:**
```css
--gradient-ambient: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
--gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--accent-purple: #667eea;
--glass-bg: rgba(255, 255, 255, 0.2);
/* Also remove body::before gradient overlay */
```

### 2. Add Ticket CTA Component
After the GSAP hero on the homepage, insert a prominent ticket CTA section.
- **Link:** https://www.edfringe.com/tickets/whats-on/epic-economics-what-would-you-profit-about-today *(NOTE: correct URL is https://www.edfringe.com/tickets/whats-on/epic-economics-what-would-you-protest-about-today)*
- **Copy suggestions:** "Tickets on Sale — Edinburgh Fringe 2026" or "What would you protest about today? — Get Tickets"
- **Style:** Make it visually distinct from the body copy — could be a bold banner, a card, or a full-width strip. It should also be available as a reusable component for use on Press and Contact pages.
- **Accessibility:** The link must be clearly labeled ("Get tickets for Epic Economics at EdFringe 2026"), not bare "click here".

### 3. Implement Component CSS
Read `agents-ee-revamp/ui-designer/component-styles.css`. If it exists, integrate those styles. If not, implement sensible new CSS based on the design tokens for:
- Updated button styles (using the new color system)
- Updated form element styles
- Updated card styles
- Footer updates
- Navbar adjustments (keep the liquid glass layout, update colors)

### 4. SEO & Accessibility Audit & Fixes
This is a critical deliverable. Apply best practices from https://github.com/jdevalk/specification.website

**Technical SEO checklist:**
- [ ] `<title>` tags — unique, descriptive, under 60 chars for each page
- [ ] `<meta name="description">` — unique per page, 150–160 chars
- [ ] `<link rel="canonical">` — set correctly on all pages
- [ ] Open Graph tags (`og:title`, `og:description`, `og:image`) — especially for the homepage and Press page
- [ ] Structured data (JSON-LD): `Event` schema for the EdFringe show on the homepage
- [ ] `robots.txt` and `sitemap` — check and fix if missing
- [ ] Heading hierarchy — only one `<h1>` per page, logical h2/h3 structure
- [ ] Image alt text — all meaningful images have descriptive alt attributes; decorative images have `alt=""`
- [ ] `lang` attribute on `<html>` — confirm it's set correctly
- [ ] Favicon and Apple touch icons — confirm they exist and are valid

**Accessibility checklist:**
- [ ] Color contrast: run through your chosen palette, verify 4.5:1 for normal text, 3:1 for large text
- [ ] Focus indicators: all interactive elements have visible focus styles
- [ ] Skip-to-content link: consider adding one as the first focusable element
- [ ] Form labels: all inputs have associated `<label>` elements
- [ ] Video embeds: `iframe` has a title attribute
- [ ] `aria-label` on any icon-only links/buttons
- [ ] Reduced motion: all animations respect `prefers-reduced-motion`

### 5. Build Verification
Run the site locally and verify:
```bash
cd /Users/eliasvasnic/Documents/GitHub/epic-economics-website
pnpm install  # if needed
pnpm dev      # start dev server
```
Confirm:
- Homepage loads correctly
- GSAP hero animation works
- Ticket CTA is visible and links correctly
- No console errors
- Contact form and Press page also load without errors

Then build for production:
```bash
pnpm build
```
Verify the `dist/` output is clean.

## 📋 Deliverables

1. **Updated `src/index.css`** — old purple gradient gone, new design tokens in place
2. **New Ticket CTA component** (e.g., `src/components/TicketCTA.jsx` + `TicketCTA.css`) — used on homepage and available for other pages
3. **Updated `src/pages/Home.jsx`** — includes the Ticket CTA after the GSAP hero
4. **Integrated component styles** — navbar, footer, buttons, cards, forms all updated
5. **SEO fixes** — all items from the technical SEO checklist above
6. **Accessibility fixes** — all items from the accessibility checklist above
7. **Production build verification** — `dist/` confirmed clean
8. **Change summary** (`CHANGES.md` in your output folder) — bullet list of every file changed and why

## 🔑 Key References

- Current global styles: `src/index.css`
- Current navbar: `src/components/LiquidGlassNavbar.jsx`
- Current footer: `src/components/Footer.jsx`
- Current homepage: `src/pages/Home.jsx`
- App router: `src/App.jsx`
- SEO spec: https://github.com/jdevalk/specification.website

## 🚨 Constraints

- Do NOT rewrite the GSAP hero animation — only update its CSS colors if needed
- Do NOT change the routing or add new pages
- Do NOT touch content in `dist/` — that's a build artifact, edit the `src/` files only
- Preserve all existing functionality (contact form, press page, lazy video loading)
- The site must remain functional after your changes — test before declaring done

## 📁 Output Location

All files go in:
```
/Users/eliasvasnic/Documents/GitHub/epic-economics-website/docs/june-workspace/agents-ee-revamp/frontend-developer/
```
Plus direct changes to the `src/` files in the main project.
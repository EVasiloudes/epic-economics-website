# Technical SEO Audit Report — Epic Economics

**Date:** June 1, 2026
**Auditor:** SEO Specialist (Automated)
**Site:** https://epic-economics.dimis.org/
**Stack:** React (Vite) + react-router-dom + react-helmet-async

---

## Crawlability & Indexation

### Robots.txt Analysis
- **Status:** ✅ Present and well-structured
- **Path:** `public/robots.txt`
- **Allowed paths:** All (`Allow: /`), including `/videos/`, image and video file extensions
- **Blocked paths:** None explicitly blocked (admin/private commented out for future use)
- **Sitemap reference:** ✅ Correct — `Sitemap: https://epic-economics.dimis.org/sitemap.xml`
- **Crawl-delay:** 1 second (appropriate for a small site)
- **Bot-specific rules:** Googlebot, Bingbot, Slurp, DuckDuckBot, Baiduspider, YandexBot, facebookexternalhit, Twitterbot, LinkedInBot all explicitly allowed
- **Verdict:** No issues. The robots.txt is production-ready.

### XML Sitemap Health
- **Status:** ✅ Present
- **Path:** `public/sitemap.xml`
- **Total URLs:** 4 (Home, Preview, Press, Contact)
- **Technical page excluded:** ✅ Intentional (noindex via JS)
- **Critical Issue — Stale lastmod dates:** All URLs show `<lastmod>2024-12-19</lastmod>`. This signals to search engines that content hasn't been updated in 18+ months. Should be updated to reflect recent changes.
- **Missing `<changefreq>` consideration:** The homepage has `weekly` which is fine for a show with upcoming events, but the other pages show `monthly` — appropriate.
- **Missing URLs:** No dedicated Edinburgh Fringe landing page in sitemap (understandable — no such page exists yet, but should be planned for pre-Fringe).
- **Verdict:** Functional but stale. Update `lastmod` to current date.

### Indexation Signals
- **index.html meta robots:** ✅ `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`
- **Technical page:** ✅ Correctly applies `noindex, nofollow` via `setRobotsMeta(true)` in `src/pages/Technical.jsx`
- **App-level robots handling:** `src/App.jsx` calls `setRobotsMeta(false)` on mount to ensure indexability
- **Verdict:** Indexation signals are correct.

---

## Meta Tags (Per Page)

### Homepage (`/`)
| Tag | Status | Length | Notes |
|-----|--------|--------|-------|
| `<title>` | ✅ | 56 chars ("Epic Economics: What would you protest about today?") | Set in both `index.html` and `Home.jsx` Helmet. Good length, includes primary keyword. |
| `<meta description>` | ✅ | 160 chars | Compelling, action-oriented. Includes "LSE/World Bank veteran" for E-E-A-T. |
| `<link canonical>` | ✅ | `https://epic-economics.dimis.org/` | Correct self-referencing canonical. |
| Open Graph | ✅ | og:title, og:description, og:image, og:image:alt, og:site_name, og:locale all present | In `index.html` static head AND set via `useSEO` hook presets (though `useAutoSEO` is never called — see critical finding below). |
| Twitter Cards | ✅ | twitter:card (summary_large_image), twitter:title, twitter:description, twitter:image, twitter:image:alt | Same dual-definition issue as OG. |
| `<meta keywords>` | ✅ | "economics, theatrical production, economic insights, analysis, play" | Present in static HTML. Could be more targeted for Fringe. |
| `<meta author>` | ✅ | "Epic Economics" | Standard. |

### Press Page (`/press`)
| Tag | Status | Length | Notes |
|-----|--------|--------|-------|
| `<title>` | ❌ | N/A | **NO Helmet component.** Only set via `RouteHandler` in `App.jsx` as `document.title = 'Press & Media - Epic Economics'`. No meta description, OG, or Twitter tags. |
| `<meta description>` | ❌ | N/A | **MISSING.** Pre-defined in `SEO_PRESETS.PRESS` but never applied because `useAutoSEO` is not called. |
| `<link canonical>` | ❌ | N/A | **MISSING.** |
| Open Graph | ❌ | N/A | **MISSING.** |
| Twitter Cards | ❌ | N/A | **MISSING.** |

### Contact Page (`/contact`)
| Tag | Status | Length | Notes |
|-----|--------|--------|-------|
| `<title>` | ❌ | N/A | **NO Helmet component.** Only `document.title = 'Contact Us - Epic Economics'` from RouteHandler. |
| `<meta description>` | ❌ | N/A | **MISSING.** |
| `<link canonical>` | ❌ | N/A | **MISSING.** |
| Open Graph | ❌ | N/A | **MISSING.** |
| Twitter Cards | ❌ | N/A | **MISSING.** |

### Preview Page (`/preview`)
| Tag | Status | Length | Notes |
|-----|--------|--------|-------|
| `<title>` | ❌ | N/A | **NO Helmet component.** Only `document.title = 'Preview - Epic Economics'` from RouteHandler. |
| `<meta description>` | ❌ | N/A | **MISSING.** |
| `<link canonical>` | ❌ | N/A | **MISSING.** |
| Open Graph | ❌ | N/A | **MISSING.** |
| Twitter Cards | ❌ | N/A | **MISSING.** |

### Technical Page (`/technical`)
| Tag | Status | Length | Notes |
|-----|--------|--------|-------|
| `<title>` | ⚠️ | Set via RouteHandler only | `document.title = 'Technical - Epic Economics'`. No meta tags (intentional for noindex page, but could still have a simple title tag from Helmet). |
| Robots | ✅ | `noindex, nofollow` | Correctly applied via `setRobotsMeta(true)`. |

**Critical Discovery:** The `useAutoSEO()` hook (defined in `src/hooks/useSEO.js`) is **never called** by any page component. The `SEO_PRESETS` object defines structured data and meta for every page, but none of it is injected at runtime. Only `Home.jsx` uses an inline `<Helmet>` component with hardcoded tags. The `RouteHandler` in `App.jsx` sets `document.title` via vanilla JS, which is less SEO-effective than Helmet-managed `<title>` tags.

---

## Heading Structure

### Homepage (`/`)
```html
<h1 class="visually-hidden">About Epic Economics</h1>  <!-- ⚠️ Visually hidden H1 -->
<h2>Watch the Trailer</h2>
<h2>Meet the Creative Team</h2>
<h3>Dimis Michaelides</h3>
<h3>Lia Haraki</h3>
<h3>Elias Vasnic</h3>
```
- **H1 count:** 1 ✅
- **Issue:** The H1 is visually hidden (`.visually-hidden` class). While screen readers can access it, this is a missed opportunity for visible, keyword-rich heading content. The GSAP Hero section's title is rendered as marquee text, not an H1.
- **H2/H3 hierarchy:** Logical ✅
- **Descriptiveness:** Good — headings describe their sections ✅

### Press Page (`/press`)
```html
<h1>Epic Economics - Press Kit</h1>
<h2>Reviews & Commentary</h2>
<h2>Stills from our July '25 Show</h2>
```
- **H1 count:** 1 ✅
- **Hierarchy:** Logical ✅

### Contact Page (`/contact`)
```html
<h1>Get In Touch</h1>
<h2>Contact Information</h2>
<h3>Email</h3> (×2)
<h3>Location</h3> / <h3>Timezones</h3>
<h2>Send us a Message</h2>
```
- **H1 count:** 1 ✅
- **Issue:** Two `<h3>Email</h3>` headings (duplicate). Minor.

### Preview Page (`/preview`)
```html
<h1>Epic Economics - Full Preview</h1>
```
- **H1 count:** 1 ✅
- **Issue:** No H2s at all. The page has only the H1 and a back-link nav. Very thin content for SEO.

### Technical Page (`/technical`)
```html
<h1>Epic Economics - Technical Information</h1>
<h2>Stage Plan</h2>
<h2>Technical Requirements</h2>
<h3>Sound & Audio</h3>
<h2>Venue Requirements</h2>
<h4>Stage Size</h4> <!-- ⚠️ Skipped H3 -->
<h4>Power</h4>
<h4>Lighting</h4>
<h4>Control</h4>
<h4>Special Equipment</h4>
<h2>Credits</h2>
<h3>Performance & Creation</h3>
<h3>Technical Team</h3>
<h3>Photography & Documentation</h3>
<h3>Digital Presence</h3>
<h3>Special Thanks</h3>
```
- **H1 count:** 1 ✅
- **Issue:** Venue requirements use H4 without H3 parent — heading hierarchy is broken (H2 → H4 skip).

---

## Media Audit

### Image Alt Text
| Location | Image | Alt Text | Status |
|----------|-------|----------|--------|
| Home.jsx | Audience photo | "Audience participation during Epic Economics performance" | ✅ Descriptive |
| Home.jsx | Performance photo | "Epic Economics theatrical performance" | ✅ Descriptive |
| Press.jsx | 18 press photos | Various (e.g., "Dimis Michaelides performing on stage", "Audience engagement during performance") | ✅ All 18 have descriptive alt text |
| Technical.jsx | Stage plan | "Epic Economics Stage Plan - Detailed layout..." | ✅ Excellent, detailed |
| TitleHero.jsx | Backdrop image | alt="" (empty) | ⚠️ Decorative intent, but on a visible hero section. Could use descriptive alt for context. |
| Navbar | Site logo | "Epic Economics" | ✅ |
| Footer | Site logo | "Epic Economics logo" | ✅ |
- **Alt text coverage:** ~95% of images ✅

### Video Embeds
| Location | Iframe | Title Attribute | Status |
|----------|--------|-----------------|--------|
| Home.jsx | YouTube trailer | `title="Epic Economics Trailer"` | ✅ |
| Preview.jsx | YouTube full video | `title="Epic Economics"` | ✅ |
- All iframes have `title` attributes ✅

### Font Loading
- No explicit `<link rel="preload">` for fonts in `index.html`. CSS imports handle font loading.
- **Recommendation:** If custom fonts are used, add `preload` links with `crossorigin` for faster LCP.

### Image Performance
- Homepage images use `width` and `height` attributes (CLS prevention) ✅
- `loading="lazy"` and `decoding="async"` applied ✅
- Press images are imported as ES modules (Vite optimizes) ✅
- **Recommendation:** Consider WebP/AVIF conversion for press images to reduce file sizes.

---

## Schema / Structured Data Audit

### Existing JSON-LD
- **At runtime:** ❌ **NONE.** The `SEO_PRESETS` object in `src/hooks/useSEO.js` defines structured data for Home, Press, and Contact pages:
  - `SEO_PRESETS.HOME.structuredData`: `TheaterGroup` schema
  - `SEO_PRESETS.PRESS.structuredData`: `MediaObject` schema
  - `SEO_PRESETS.CONTACT.structuredData`: `ContactPage` schema
- **However:** `useAutoSEO()` is **never invoked by any page component**. The presets are dead code.
- **In static HTML:** ❌ No `<script type="application/ld+json">` in `index.html`.

### Missing Schema Opportunities
| Schema Type | Priority | Use Case |
|-------------|----------|----------|
| `Event` | 🔴 Critical | Edinburgh Fringe show listing — enables Google Events rich results, ticket purchase actions |
| `Person` | 🟡 High | Individual bios for Dimis Michaelides, Lia Haraki, Elias Vasnic |
| `BreadcrumbList` | 🟡 High | Navigation trail for inner pages |
| `TheaterGroup` / `Organization` | 🟡 High | Already defined in presets but never injected |
| `VideoObject` | 🟢 Medium | YouTube trailer embeds |
| `Review` | 🟢 Medium | Press reviews/quotes could use `Review` schema |

---

## Core Web Vitals Considerations

### LCP (Largest Contentful Paint)
- **Likely LCP element:** The GSAP Hero marquee animation text or the TitleHero backdrop image (`_BOO0058.jpg`)
- The Hero is rendered in a `<Suspense>` wrapper with a placeholder fallback
- GSAP animations use `force3D: true` (hardware acceleration) ✅
- `ScrollTrigger.config({ ignoreMobileResize: true })` prevents layout recalculations ✅
- Images use `loading="lazy"` and `decoding="async"` ✅
- **Risk:** The GSAP hero is the first thing rendered, and it contains nested marquee elements. If the LCP is a marquee text element, the GSAP animation initialization may delay it.
- **Recommendation:** Add a preload for the backdrop image in TitleHero.

### CLS (Cumulative Layout Shift)
- Images have explicit `width`/`height` ⚠️ (only on Home.jsx images; Press images in the lightbox may not)
- YouTube iframes use explicit dimensions (`width="970" height="546"` in Preview) ✅
- GSAP hero has fixed dimensions via CSS ✅
- `gsap.set([...], { force3D: false })` on TitleHero prevents transform-induced shifts ✅
- **Risk:** The navbar visibility toggle and the GSAP fold effect could cause layout shifts during scroll on mobile.

### INP/FID (Interaction to Next Paint / First Input Delay)
- Route-based code splitting (lazy loading via `React.lazy`) ✅
- `requestIdleCallback` used for image preloading ✅
- GSAP uses `requestAnimationFrame` with a ticking guard ✅
- `ScrollTrigger` with `scrub: 0.5` for smooth animations ✅
- **Risk:** The `performanceTracker.js` runs multiple PerformanceObservers in dev mode. The `trackINP()` function with sorting of arrays could cause jank on heavy interaction pages.

### TTFB (Time to First Byte)
- Static site (Vite build) — should serve from CDN
- No server-side rendering (full client-side SPA)
- **Recommendation:** Consider prerendering for key pages.

---

## Additional Findings

### PWA / Manifest
- `manifest.json` ✅ Present with proper icons, theme_color, background_color
- Missing: `screenshots` property for richer PWA install experience
- Missing: `categories` property (e.g., `["entertainment", "theater"]`)

### Accessibility
- `lang="en"` on `<html>` ✅
- `role="navigation"` with `aria-label` on navbar ✅
- `aria-labelledby` on sections ✅
- `role="status"` and `aria-live="polite"` on loading spinner ✅
- `aria-current="page"` on active nav links ✅
- Form labels properly associated with `htmlFor` ✅
- `role="menubar"` and `role="menuitem"` on navigation ✅
- `<noscript>` fallback content with full navigation ✅

### Internal Linking
- Navbar: Home, Press, Contact ✅
- Footer: Home, Press & Media, View Technical Details, Contact, team member sites ✅
- Home page: Links to Press and Contact ✅
- Preview page: Back to Home link ✅
- No breadcrumb navigation on inner pages (Press, Contact, Preview)

### URL Structure
- Clean, short URLs ✅ (`/`, `/press`, `/contact`, `/preview`, `/technical`)
- No query parameters, no trailing slashes issues ✅
- Canonical URLs match ✅

---

## Summary of Critical Issues

| # | Severity | Issue | Page(s) Affected |
|---|----------|-------|-------------------|
| 1 | 🔴 Critical | `useAutoSEO()` never called — structured data defined but not injected | All pages |
| 2 | 🔴 Critical | No Helmet/metas on Press, Contact, Preview pages | Press, Contact, Preview |
| 3 | 🔴 Critical | No JSON-LD structured data at runtime | All pages |
| 4 | 🟡 High | Sitemap lastmod dates stale (18 months old) | `public/sitemap.xml` |
| 5 | 🟡 High | Visually hidden H1 on homepage | `src/pages/Home.jsx` |
| 6 | 🟡 High | No breadcrumb navigation | Press, Contact, Preview |
| 7 | 🟢 Medium | Broken heading hierarchy on Technical page (H2→H4) | `src/pages/Technical.jsx` |
| 8 | 🟢 Medium | TitleHero backdrop image has empty alt text | `src/components/TitleHero.jsx` |
| 9 | 🟢 Medium | Duplicate `<h3>Email</h3>` headings on Contact page | `src/pages/Contact.jsx` |
| 10 | 🟢 Low | Preview page has no H2 subheadings | `src/pages/Preview.jsx` |
| 11 | 🟢 Low | Manifest missing screenshots and categories | `public/manifest.json` |
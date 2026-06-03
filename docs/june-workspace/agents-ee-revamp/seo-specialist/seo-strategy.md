# SEO Strategy — Epic Economics: Edinburgh Fringe 2026

**Author:** SEO Specialist Agent
**Date:** June 1, 2026
**Launch target:** August 2026 (Edinburgh Festival Fringe)

---

## Executive Summary

This strategy outlines a three-phase SEO plan designed to maximize organic search visibility for "Epic Economics: What would you protest about today?" during its Edinburgh Fringe run. The strategy leverages event-related search intent, structured data for Google rich results, and long-tail content opportunities tied to the show's themes.

**Primary target keyword:** "Epic Economics Edinburgh Fringe"
**Secondary keyword clusters:** economics play Edinburgh, Edinburgh Fringe theatre 2026, Dimis Michaelides, economics theatre show

---

## Phase 1: Pre-Fringe (June–July 2026)

### 1.1 Technical Foundation (COMPLETED ✅)

These items were resolved in the June 1, 2026 technical SEO audit and fix phase:

- [x] Full meta tags (title, description, OG, Twitter) on all indexable pages
- [x] JSON-LD structured data: `TheaterEvent`, `Person` (×3), `BreadcrumbList`, `VideoObject`, `TheaterGroup`, `ContactPage`, `MediaObject`
- [x] Sitemap `lastmod` dates updated to June 2026
- [x] Heading hierarchy fixes (Technical page)
- [x] Duplicate heading fixes (Contact page)
- [x] Image alt text improvements (TitleHero)

### 1.2 On-Page Content: Quick Wins

These recommendations stay within the "largely unchanged copy" constraint — they are additive, not rewrites:

#### Homepage Meta Description Optimization
**Current (160 chars):**
> "Confused by the economy? Blending great economists' ideas with wicked humour, an LSE/World Bank veteran exposes the system. Discover why you're broke, how we got here and what we should fight for."

**Recommendation:** Add Edinburgh Fringe mention for the Fringe season (update back after August):
> "Coming to Edinburgh Fringe Aug 2026. Confused by the economy? Blending great economists' ideas with wicked humour, an LSE/World Bank veteran exposes the system. Discover why you're broke, how we got here and what we should fight for."

**Rationale:** The word "Edinburgh Fringe" in the meta description increases CTR when people search for Fringe shows. It doesn't affect ranking directly but improves click-through from SERPs.

#### Homepage Title Tag — Seasonal Variant
**Current:** "Epic Economics: What would you protest about today?" (56 chars)
**June–August variant:** "Epic Economics at Edinburgh Fringe 2026 | What would you protest about today?" (78 chars — under the ~60 char display limit but Google may truncate)

**Recommendation:** Use the shorter current title. Instead, ensure the sub-title/hero text on the page includes "Edinburgh Fringe 2026" so Google can extract it contextually. The structured data already signals the event.

#### Keyword in Visible H1
**Issue:** The homepage's visible H1 (in TitleHero) says "Epic Economics: What would you protest about today?" which is good, but the synopsis section's H1 is visually hidden.
**Recommendation:** Keep as-is. The TitleHero H1 is visible and keyword-rich. The visually-hidden H1 is redundant — it could be removed or repurposed as an H2.

### 1.3 Internal Linking Opportunities

| From | To | Anchor Text | Rationale |
|------|-----|-------------|-----------|
| Press page reviews | Contact page | "book the show" or "booking inquiries" | Drive booking intent from social proof |
| Contact page | Press page | "view our press kit" | Cross-link for journalists |
| Homepage (Team section) | Contact page | "book Epic Economics" | Funnel from team bios to booking |
| Footer | YouTube channel | "Watch on YouTube" | Already present ✅ |

### 1.4 Image Optimization

**Current state:** Press images are imported as ES modules (Vite handles optimization). Homepage images use lazy loading + explicit dimensions.

**Recommendations:**
- Convert press gallery images to WebP format (typically 25-35% smaller than JPEG)
- Add `srcset` with multiple resolutions for the hero/backdrop image
- Ensure `og-image.png` is 1200×630px (optimal for social sharing) — verify this

### 1.5 Google Search Console Setup (If Not Done)

- [ ] Verify site ownership in Google Search Console
- [ ] Submit `sitemap.xml` to GSC
- [ ] Check for any manual actions or security issues
- [ ] Review Index Coverage report for any crawl errors
- [ ] Set up email alerts for significant traffic changes

### 1.6 Google Business Profile (If Applicable)

If Epic Economics operates as a registered entity with a physical address:
- [ ] Create/claim Google Business Profile with accurate NAP
- [ ] Add Edinburgh Fringe event as a Google Post
- [ ] Upload photos and the show logo

---

## Phase 2: Fringe Launch Window (August 2026)

### 2.1 Event Discovery — Google Rich Results

The `TheaterEvent` structured data injected into the homepage is the primary mechanism for appearing in Google's event-rich results. This enables:

- **Event carousel:** "Epic Economics" appears when users search "Edinburgh Fringe shows" or "theatre Edinburgh August 2026"
- **Event snippet:** Date, location, and ticket link displayed directly in search results
- **"Things to do" panel:** Potential to appear in Google's curated events panel during Fringe

**Critical validation step (before launch):**
1. Run homepage URL through [Google Rich Results Test](https://search.google.com/test/rich-results)
2. Verify the `TheaterEvent` schema validates without errors
3. Check that `offers.url` points to the correct EdFringe ticket page

**Post-Fringe update:** Change `eventStatus` from `EventScheduled` to `EventMovedOnline` if you add a virtual option, or keep for tour dates.

### 2.2 Keyword Targeting During Fringe

#### Primary Keyword Cluster: "Epic Economics Edinburgh Fringe"

| Query | Intent | Strategy |
|-------|--------|----------|
| "Epic Economics Edinburgh Fringe" | Navigational/Branded | Homepage title + H1 + structured data dominate |
| "Epic Economics Edinburgh Fringe tickets" | Transactional | Ticket URL in structured data `offers.url` |
| "Epic Economics Edinburgh Fringe review" | Informational | Press page with Review structured data |
| "what to see at Edinburgh Fringe 2026" | Informational/Discovery | Target with a blog post or Fringe guide page |
| "economics play Edinburgh" | Informational/Discovery | Long-tail content (see Phase 3) |

#### Secondary Keywords

| Query | Monthly Volume (est.) | Difficulty | Target Page |
|-------|----------------------|------------|-------------|
| "Edinburgh Fringe 2026 shows" | High | Very High | Homepage (authority play) |
| "Edinburgh Fringe theatre" | High | High | Homepage |
| "Dimis Michaelides" | Low-Med | Low | Homepage (Person schema + bio) |
| "economics theatre show" | Low | Low | Homepage |
| "what would you protest about today" | Low | Very Low | Homepage (brand query) |

### 2.3 NAP Consistency for Venue Listings

**Issue:** The venue is TBD. Once confirmed:
- [ ] Update the `Event` structured data's `location.name` from "Edinburgh Festival Fringe" to the actual venue name
- [ ] Ensure the venue name, address, and show time match exactly across ALL platforms:
  - EdFringe official listing
  - The Guardian Fringe Guide
  - The List
  - FringeReview
  - Broadway Baby
  - Any other Fringe listings

**Why this matters:** Inconsistent NAP (Name, Address, Phone) across listings confuses Google's local search algorithm and dilutes authority. For a Fringe show, "Edinburgh, Scotland" as the city is sufficient if venue-specific NAP isn't critical.

### 2.4 Social Signal Amplification

While social signals aren't a direct ranking factor, they drive secondary SEO benefits:

- **YouTube:** The trailer (already embedded) should have an optimized title and description:
  - Title: "Epic Economics: What would you protest about today? | Edinburgh Fringe 2026 Trailer"
  - Description: Include ticket link, EdFringe listing URL, and show dates
  - Add chapters/timestamps for key moments
- **Press reviews:** Share any Fringe reviews on the Press page with `Review` structured data
- **Google Discover:** High-quality images + engaging meta descriptions increase Discover eligibility

### 2.5 EdFringe Listing SEO

The EdFringe.com listing page for the show will likely outrank the official website for "Epic Economics Edinburgh Fringe" in the short term. To counter this:

- Ensure the EdFringe listing links back to `epic-economics.dimis.org`
- Use the canonical URL on the website consistently
- Add more unique content to the homepage (the show synopsis is already strong — the blockquote and keyword section add unique value)

---

## Phase 3: Post-Fringe (September 2026+)

### 3.1 Touring/Residency SEO

If the show tours after Fringe:

**Schema strategy per venue:**
```json
{
  "@type": "TheaterEvent",
  "name": "Epic Economics: What would you protest about today?",
  "location": {
    "@type": "Place",
    "name": "[Venue Name]",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "[City]",
      "addressCountry": "[Country Code]"
    }
  },
  "startDate": "[ISO date]",
  "offers": {
    "@type": "Offer",
    "url": "[Venue ticket URL]"
  }
}
```

**Tour page structure (if added):**
- `/tour` — listing all dates with individual `Event` schemas
- Each venue gets its own event entry with `subEvent` relationship to the parent `TheaterEvent`

### 3.2 Video SEO for YouTube Trailers

**Current:** One trailer on homepage. One full performance on Preview (password-protected).

**Recommendations:**
- Create a YouTube playlist: "Epic Economics — Edinburgh Fringe 2026"
- Add the trailer to the playlist
- Upload short clips (30-60 seconds): audience reactions, behind-the-scenes, performer interviews
- Each video description should include:
  - Link to epic-economics.dimis.org
  - Ticket link
  - Show synopsis
  - #EdFringe #EdinburghFringe #EpicEconomics hashtags
- Enable YouTube chapters for the trailer

**VideoObject structured data (already on homepage for the trailer):**
```json
{
  "@type": "VideoObject",
  "name": "Epic Economics Trailer",
  "description": "Official trailer for Epic Economics: What would you protest about today? A play by Dimis Michaelides.",
  "thumbnailUrl": "https://img.youtube.com/vi/HaY26deh7nE/maxresdefault.jpg",
  "uploadDate": "2025-07-01",
  "embedUrl": "https://www.youtube.com/embed/HaY26deh7nE"
}
```
This enables video rich results in Google Search for relevant queries.

### 3.3 Long-Tail Content Opportunities

These are content ideas that target informational queries related to the show's themes. They would require new pages or blog posts (not in current scope, but flagged for future):

| Topic | Target Query | Content Type |
|-------|-------------|-------------|
| "Why do we have recessions?" | economics explained simply | Blog post / FAQ |
| "Adam Smith vs Karl Marx" | adam smith vs karl marx economics | Blog post |
| "What is value in economics?" | what creates economic value | Blog post |
| "Growth vs equality debate" | economic growth vs inequality | Blog post |
| "Keynes vs Friedman explained" | keynesian vs monetarist economics | Blog post |

Each piece could link back to the show page ("Learn more in our theatrical production...") and build topical authority around economics concepts.

### 3.4 Review Schema for Press Page

The Press page has 11+ reviews with author names. Implementing `Review` structured data for the top 3-5 most impactful reviews would enable review stars in SERPs:

```json
{
  "@type": "Review",
  "itemReviewed": {
    "@type": "TheaterEvent",
    "name": "Epic Economics: What would you protest about today?"
  },
  "reviewBody": "[review text]",
  "author": {
    "@type": "Person",
    "name": "[reviewer name]"
  }
}
```

**Note:** Google's guidelines require reviews to be about a specific product/service. TheaterEvent reviews qualify. Only do this for reviews where the author is identifiable and the review is authentic.

### 3.5 Ongoing Monitoring

- **Google Search Console (weekly):**
  - Track impressions/clicks for "Epic Economics" branded queries
  - Monitor "Edinburgh Fringe" related query appearance
  - Check for crawl errors after any site changes
- **Rich Results status:** Monitor if Event rich results are appearing
- **Core Web Vitals:** Use the built-in `performanceTracker.js` in dev mode to ensure LCP < 2.5s, CLS < 0.1

---

## Prioritized Action Checklist

### 🔴 Before Launch (June–July)
| Priority | Action | Effort | Impact |
|----------|--------|--------|--------|
| P0 | Validate JSON-LD with Google Rich Results Test | 5 min | Critical |
| P0 | Verify ticket URL in Event schema is correct | 2 min | Critical |
| P0 | Submit sitemap to Google Search Console | 5 min | Critical |
| P1 | Add Edinburgh Fringe mention to meta description (seasonal) | 5 min | High |
| P1 | Verify og-image.png is 1200×630px | 2 min | High |
| P2 | Convert press images to WebP | 30 min | Medium |
| P2 | Add cross-links between Press and Contact pages | 10 min | Medium |
| P3 | Set up GSC email alerts | 5 min | Medium |

### 🟡 During Fringe (August)
| Priority | Action | Effort | Impact |
|----------|--------|--------|--------|
| P0 | Update venue name in Event schema once confirmed | 2 min | Critical |
| P0 | Ensure NAP consistency across all Fringe listings | 30 min | Critical |
| P1 | Add new reviews to Press page with Review schema | 15 min/each | High |
| P1 | Optimize YouTube trailer title/description for Fringe | 10 min | High |
| P2 | Share press coverage links on social → drive backlinks | Ongoing | Medium |

### 🟢 Post-Fringe (September+)
| Priority | Action | Effort | Impact |
|----------|--------|--------|--------|
| P1 | Add tour dates with Event schemas (if touring) | 1-2 hours | High |
| P1 | Implement Review schema for top press reviews | 30 min | High |
| P2 | Create YouTube playlist + short clips | 2-4 hours | Medium |
| P2 | Plan long-tail content calendar | 2 hours | Medium |
| P3 | Remove/update seasonal Fringe copy from meta | 5 min | Low |

---

## Appendix: Keyword Research Notes

The following keyword themes are worth exploring with actual search volume tools (Ahrefs, Semrush, or Google Keyword Planner):

1. **Brand navigational:** "epic economics", "dimis michaelides", "what would you protest about today"
2. **Fringe discovery:** "edinburgh fringe [year] shows", "edinburgh festival fringe theatre", "fringe shows august"
3. **Economics + theatre:** "economics play", "economics theatre performance", "play about capitalism"
4. **Thematic long-tail:** "why are we broke explained", "economics for beginners theatre", "protest about economy"
5. **Local Edinburgh:** "things to do Edinburgh August", "Edinburgh festivals summer 2026"

---

*This strategy should be reviewed and updated in July 2026 once the venue is confirmed and ticket sales open.*
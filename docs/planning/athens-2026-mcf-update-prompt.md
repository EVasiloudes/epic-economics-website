# Prompt: update epic-economics.dimis.org for the Athens one-night + Fringe 2026 reviews

> This file is a self-contained prompt. Paste everything below the line into an agent session that has
> the repo checked out at `/Users/eliasvasnic/Documents/GitHub/epic-economics-website`.

---

You are working on the marketing site for **Epic Economics**, a one-man theatrical comedy about
economics and protest by Dimis Michaelides. The site is a Vite + React 19 SPA
(`react-router-dom` v6) with a custom post-build static prerender step for SEO.

Repo: `/Users/eliasvasnic/Documents/GitHub/epic-economics-website` (branch `main`).

## Context you need

The show premiered in Cyprus in July 2025 (five sold-out nights), then played **14 performances at
the Edinburgh Festival Fringe in August 2026** (Paradise in the Vault, The Annexe, Venue 29). Those
Fringe runs are over. Press coverage has now landed, and the show's **first and only Athens
performance** is confirmed. The site still sells Edinburgh Fringe 2026 everywhere, so this task
repoints the whole site at Athens and folds in the Fringe reviews as social proof.

## Goal

1. Add the five Fringe 2026 press reviews to the Reviews page.
2. Announce the Athens one-night performance prominently across the site, replacing the Fringe
   ticket calls-to-action.
3. Give the homepage a real Athens still/photo.
4. Update SEO, structured data, and social previews so Athens is what search engines and link
   previews show.

## Non-negotiables

- **Brand voice**: theatrically witty, intellectually sharp, politically awake, never preachy. No
  corporate-speak, no "click here". See `docs/june-workspace/agents-ee-revamp/content-creator/AGENT.md`
  for the full brief and `docs/design/DESIGN_SYSTEM.md` for tokens.
- **Design tokens only**: use the CSS custom properties in `src/index.css` (`--color-primary`,
  `--color-accent`, `--color-bg`, `--color-ink`, `--font-heading`, `--font-body`). No hard-coded
  hex values, no new font families, no new dependencies.
- **Accessibility**: every new image needs real `alt` text; every link needs descriptive text;
  date and venue must be text, not baked into an image.
- **UK date format**: "4 December 2026", "20:30", not "04/12/2026" or "8:30pm".
- **English only.** Do not add Greek copy.
- **Never edit `dist/`** — it is a build artifact, gitignored (`.gitignore:11`).
- **Do not touch the uncommitted `vercel.json` change** (a `/press` → `/reviews` 301 redirect). It is
  someone else's work in progress; leave it unstaged and do not revert it.
- No `npm run typecheck` (there is no `tsconfig.json`, the script is broken) and no test suite exists.
  `npm run build` is the real gate.

## Content to insert verbatim

### The five Fringe reviews

Append to the hardcoded `reviews` array in `src/pages/Reviews.jsx:157-214`. The existing shape is
`{ text, author }` only. Since these reviews have real publications and links, extend the shape to
`{ text, author, source, url }` — `source` is the publication name, `url` a link to the full review.
Keep `text` and `author` first so the existing rendering keeps working. Update every other existing
entry only if it genuinely lacks a source; do not invent sources.

```js
{
  text: "A powerful, humorous and charismatic performance. You absolutely have to see it!",
  author: "",
  source: "British Theatre Guide",
  url: "https://www.britishtheatreguide.info/reviews/epic-economics-paradise-green-25867"
},
{
  text: "Making economics and political participation not only interesting, but funny, is no easy feat. Michaelides achieves it with charm, ensuring that we are not only entertained, but educated.",
  author: "",
  source: "Edinburgh Guide",
  url: "https://edinburghguide.com/festival/2026/epic-economics-what-would-you-protest-about-today-paradise-in-the-vault-review-22054"
},
{
  text: "Excellent. A thoroughly entertaining and important lightning tour through centuries of economic thought.",
  author: "",
  source: "Everything Theatre",
  url: "https://everything-theatre.co.uk/2026/08/review-epic-economics-what-would-you-protest-about-today-paradise-in-the-vault/"
},
{
  text: "Michaelides proves beyond doubt that economics does not have to be boring.",
  author: "",
  source: "The Scotsman",
  url: "https://www.scotsman.com/arts-and-culture/film-and-tv/news/michaelides-proves-beyond-doubt-that-economics-does-not-have-to-be-boring-in-epic-economics-fringe-review-6684313"
},
{
  text: "Quintessentially quirky. The concept of a useful economist is surely an oxymoron. Very good show.",
  author: "",
  source: "Fringe Review",
  url: "https://fringereview.co.uk/review/edinburgh-fringe/2026/epic-economics-what-would-you-protest-about-today/"
}
```

Requirements for the Reviews page:

- Put these five **first** in the array — the array order is manual, not date-sorted, and the first
  three are what visitors see before clicking "Show All Reviews (N)" (`Reviews.jsx:280`,
  `Reviews.jsx:309`).
- Render `source` as a clickable, underlined link to `url` under each quote, with the publication
  name as the anchor text. Do not append the URL to the quote text.
- **Careful:** there is a second, unrelated block of press quotes lower down
  (`Reviews.jsx:390-425`) belonging to a *different* show, including one from "Fringe Review". Do
  not merge them, and do not dedupe across them.
- The stale note at `Reviews.jsx:322-324` ("Reviews and quotes will be updated as press coverage
  becomes available…") should be deleted — coverage has arrived.
- Check the heading at `Reviews.jsx:328` ("Stills from our July '25 Show") and update the date so it
  no longer contradicts the Fringe footage.
- `src/utils/structuredData.js:176-193` has an unused `generateReviewSchemas(reviews)` that expects
  `{ text, author }`. Extend it to include `source`/`url` as `publisher`/`url`, and wire it into
  `Reviews.jsx` so the reviews emit valid `Review` JSON-LD.

### The Athens performance

- **Date/time**: Friday, 4 December 2026, 20:30
- **Venue**: Michael Cacoyannis Foundation — Cinema Hall, 206 Piraeus Street, Tavros, Athens 177 78,
  Greece. <https://www.mcf.gr/>
- **Format**: one night only, 60 minutes, no interval, English with a touch of Greek
- **Tickets**: €15, or €12 for students, senior citizens and persons with disabilities
- **Tickets URL**: TicketPlus. **This link has not been supplied yet** — use a clearly marked
  placeholder constant and report it as a blocker. Do not reuse the Edinburgh ticket URLs.
- **Website**: <https://epic-economics.dimis.org/> · **Reviews**: <https://epic-economics.dimis.org/reviews>
- **Trailer (60s)**: <https://epic-economics.dimis.org/videos/epic-economics-stills.mp4>
- **Teaser (30s)**: <https://epic-economics.dimis.org/videos/epic-economics-teaser.mp4>
- **Photos** (Boyana Loizou, press folder): <https://drive.google.com/drive/folders/1Xa-u1ShJvyahl2o_p6T1bypNBwjhfrDC>
- **Credits**: "Epic Economics — a theatrical comedy about economics and protest, featuring Dimis
  Michaelides, directed by Lia Haraki, produced by Elias Vasnic"

### Press contacts (for the footer/contact copy if useful)

- Marina Petropoulou, Communications Dept, Michael Cacoyannis Foundation — communication-dept@mcf.gr, +30 210 3418 550
- Elias Vasnic, producer — elias@densetheory.cc, +44 7503 264948
- Dimis Michaelides, writer/performer — dimis@dimis.org, +357 67 11 73

## Work items

### 1. Reviews page — `src/pages/Reviews.jsx`

Add the five reviews per above, render publication links, delete the stale "will be updated" note,
fix the stills heading, and render the empty `author` gracefully (skip the `— author` cite line when
`author` is blank). Style the new `source` link in `src/pages/Reviews.css` using the existing
review classes (`.review-item`, `.review-text`, `.review-author`, `.review-modal*`).

### 2. Homepage — `src/pages/Home.jsx`

- Replace the Edinburgh ticket CTA section (`Home.jsx:268-281`, currently pointing at
  `edfringe.com`) with an Athens date/venue/ticket section. Reuse the `.ticket-cta` styles in
  `Home.css` rather than inventing a new pattern; add only the extra rules you need for the venue
  line and price.
- Put the date and venue as real HTML text near the top of the page, above the fold.
- Update `og:description` (`Home.jsx:103`) and the meta description — they currently advertise
  "Edinburgh Fringe 2026 • Tickets at edfringe.com".
- Add a dedicated image slot to the homepage for the Athens still (see item 5).

### 3. Hero CTA — `src/components/GsapHero.jsx`

`GsapHero.jsx:132-142` currently reads "🎫 Edinburgh Fringe 2026 — Click here for Tickets!" and
links to `edfest.com`. Repoint it to Athens, and update both the visible label and the
`aria-label` at `GsapHero.jsx:138`. Drop the emoji if it clashes with the design system.

### 4. Structured data — `src/utils/structuredData.js`

`generateEventSchema()` (`structuredData.js:16-57`) returns a single hardcoded Edinburgh
`TheaterEvent` with dates 2026-08-01 → 2026-08-25. Refactor it to return an **array** of events
(`TheaterEvent[]`) containing the past Edinburgh run and the new Athens `TheaterEvent`, and emit
each as its own `<script type="application/ld+json">` in `Home.jsx` (where the current single script
is emitted at `Home.jsx:118-120`). Athens needs `startDate: '2026-12-04T20:30'`, `endDate:
'2026-12-04T22:00'`, the MCF venue `PostalAddress`, and an `Offer` of `price: 15` with
`priceCurrency: 'EUR'` and `validFrom` set to the on-sale date. Keep `eventStatus` correct for each
event (Edinburgh as `EventScheduled` or moved to `EventCompleted` — use your judgement and say
which you chose).

### 5. Landing image

The homepage currently has **no hero photograph** — `GsapHero` is pure CSS/GSAP text marquees. Add
one real press still to the Athens section, not to the marquee hero, so the GSAP animation and
performance budget are untouched.

- Source: the press photography folder
  <https://drive.google.com/drive/folders/1Xa-u1ShJvyahl2o_p6T1bypNBwjhfrDC> (Boyana Loizou).
- Ask me which file before you commit to one; do not pick arbitrarily.
- Put it in `src/assets/images/` and `import` it, following the pattern at `Home.jsx:19-22`.
- There is **no image optimisation pipeline** — no `sharp`, no `vite-plugin-image`, no `srcset`.
  Pre-compress before committing, and set explicit `width`, `height`, `loading="lazy"`,
  `decoding="async"` to avoid CLS.
- Write real `alt` text describing the actual image.
- `src/components/TitleHero.jsx` is dead code but shows a working parallax-image pattern; you may
  read it for reference, but do not mount it.

### 6. SEO, previews, sitemap, prerender

- `public/og-image.png` (988 KB) currently carries the Edinburgh dates on the card. If Athens should
  appear in link previews, it must be regenerated and replaced — it is referenced by `index.html:31`
  and `index.html:41` and by every page's `og:image`. Ask me for the new artwork.
- Update the `<title>` in `index.html:65`.
- Update the per-route title/description and static body copy in `scripts/prerender.js:9-15` and
  `scripts/prerender.js:40-75` so the prerendered HTML mentions Athens. Crawlers read this HTML, not
  the React app.
- Bump `<lastmod>` in `public/sitemap.xml` (currently `2026-06-01` on all four URLs).
- No new routes are needed. If you conclude one is, remember a new route requires coordinated edits
  in `src/App.jsx` (route + titles map at `:64-71`), `scripts/prerender.js`, and the `rewrites` in
  `vercel.json` — and say so explicitly rather than silently adding a half-wired route.

### 7. Housekeeping

- Unify the ticket links. `GsapHero.jsx:134` uses `edfest.com` while `Home.jsx:272` and
  `Home2.jsx:142,152` use `edfringe.com` — three different URLs for one show. Point them all at a
  single source of truth (ideally one exported constant, not three hard-coded strings).
- `src/pages/Home2.jsx` is an alternate homepage routed at `/home2` (`src/App.jsx:115`), so it is
  reachable by direct URL even though it is absent from the prerender route list. It still carries
  Edinburgh ticket links at `Home2.jsx:142,152`. Either give it the same Athens treatment or
  redirect `/home2` to `/` — but do not leave it contradicting the rest of the site.

## Verify before reporting back

1. `pnpm install` if needed (`.npmrc` sets `legacy-peer-deps=true`), then `pnpm build` — this runs
   `vite build && node scripts/prerender.js`. It must succeed.
2. `pnpm lint` currently **exits 1 with 21 pre-existing errors** in `api/contact.js`,
   `docs/development/backend-example.js`, `scripts/prerender.js`, `src/pages/Technical.jsx`,
   `src/utils/performanceUtils.js`, `src/utils/seo.js`, `src/utils/webVitals.js`. Do not fix those.
   Confirm your changes add **no new** errors in the files you touched.
3. Grep the built `dist/` output to confirm the prerendered HTML contains the Athens date, the venue
   name, and all five publication names.
4. Validate the JSON-LD is parseable and still validates against `schema.org/TheaterEvent`.
5. Check the new links resolve and open in a new tab with `rel="noopener noreferrer"`.
6. Sanity-check the Reviews page at 3 breakpoints: the new publication links must not break the
   existing modal/truncation logic at `Reviews.jsx:281-283` (reviews over 200 words truncate).

## Report back

- Which files you changed and why, one line each.
- Which of the five reviews are now visible without clicking "Show All".
- What you did about the missing TicketPlus URL.
- Whether you changed `eventStatus` on the Edinburgh event.
- Anything you deliberately did **not** do, and what you need from me to finish it.

## Out of scope

Ticket purchasing, the contact form, analytics, cookie consent, the password-protected `/preview`
page, the technical rider page, and anything under `docs/`.
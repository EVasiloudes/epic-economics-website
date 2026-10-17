/**
 * Single source of truth for the show's identity, the next performance and its
 * ticket link.
 *
 * Every ticket CTA, date string, venue line and event schema on the site reads
 * from here, so a venue or date change lands in one edit instead of three.
 */

export const SITE_URL = 'https://epic-economics.dimis.org';

export const SHOW_NAME = 'Epic Economics';
export const SHOW_TAGLINE = 'What would you protest about today?';
export const SHOW_TITLE = `${SHOW_NAME}: ${SHOW_TAGLINE}`;

/** Evergreen brand copy. Says nothing about where or when, so it never goes stale. */
export const SHOW_DESCRIPTION =
  "Confused by the economy? Blending great economists' ideas with wicked humour, an LSE/World Bank veteran exposes the system. Discover why you're broke, how we got here and what we should fight for.";

/**
 * Search snippet. The brand description above runs past the point where Google
 * truncates, so the snippet version swaps its last sentence for the date.
 */
export const SHOW_SUMMARY =
  "Confused by the economy? An LSE/World Bank veteran puts the system on stage. Discover why you're broke, how we got here. Athens, 4 December 2026.";

/** Link-preview copy. Leads with the room, because the room is what sells the night. */
export const SHOW_SOCIAL_DESCRIPTION =
  "The system's on stage. Are you in the audience? Athens, 4 December 2026 — one night only at the Michael Cacoyannis Foundation.";

export const CREDITS =
  'a theatrical comedy about economics and protest, featuring Dimis Michaelides, directed by Lia Haraki, produced by Elias Vasnic';

export const PHOTOGRAPHER = 'Boyana Loizou';
export const PHOTOGRAPHER_HANDLE = '@blessthismess_photography';
export const PHOTOGRAPHER_URL = 'https://www.instagram.com/blessthismess_photography/';

export const PHOTO_CREDIT = `Photography by ${PHOTOGRAPHER}`;

/**
 * The Fringe run's star ratings, shown alongside the Michael Sarris quote in the
 * homepage intro sequence. `stars` is out of five and drives how many marks are
 * drawn, so changing a rating is one edit here rather than a hunt through JSX.
 * `side` places each badge on the left or right of the quote on wide screens.
 */
export const PRESS_STAR_RATINGS = [
  {
    outlet: 'British Theatre Guide',
    stars: 4,
    side: 'left',
    url: 'https://www.britishtheatreguide.info/reviews/epic-economics-paradise-green-25867',
  },
  {
    outlet: 'Edinburgh Guide',
    stars: 4,
    side: 'left',
    url: 'https://edinburghguide.com/festival/2026/epic-economics-what-would-you-protest-about-today-paradise-in-the-vault-review-22054',
  },
  {
    outlet: 'Everything Theatre',
    stars: 4,
    side: 'right',
    url: 'https://everything-theatre.co.uk/2026/08/review-epic-economics-what-would-you-protest-about-today-paradise-in-the-vault/',
  },
];

/**
 * BLOCKER — the TicketPlus link for the Athens performance has not been supplied
 * yet. While this is `null`, every ticket CTA on the site renders a "not on sale
 * yet" message that routes people to the venue or the contact form, so we never
 * ship a dead link or a stale Edinburgh URL. Set it to the TicketPlus URL and
 * every CTA turns itself back into a link.
 */
export const TICKETS_URL = 'https://www.ticketplus.gr/event/epic-economics/';

/** Next performance: one night, Athens. */
export const ATHENS = {
  dateLabel: 'Friday, 4 December 2026',
  timeLabel: '20:30',
  startDate: '2026-12-04T20:30',
  endDate: '2026-12-04T22:00',
  duration: 'PT60M',
  format: 'One night only · 60 minutes, no interval · English with a touch of Greek',
  venueName: 'Michael Cacoyannis Foundation — Cinema Hall',
  venueAddressLine: '206 Piraeus Street, Tavros, Athens 177 78, Greece',
  venueUrl: 'https://www.mcf.gr/',
  price: '€15',
  concessionPrice: '€12',
  concessionNote: 'students, senior citizens and persons with disabilities',
  ticketProvider: 'TicketPlus',
  /** Offer goes live with the announcement — see validFrom in structuredData.js. */
  onSaleFrom: '2026-10-01',
  postalAddress: {
    streetAddress: '206 Piraeus Street, Tavros',
    addressLocality: 'Athens',
    postalCode: '177 78',
    addressCountry: 'GR',
  },
};

/**
 * The Edinburgh run is over. Kept for the event archive and to tie the Fringe
 * reviews on /reviews to the run they were written about.
 */
export const EDINBURGH = {
  dateLabel: '17–30 August 2026',
  startDate: '2026-08-17',
  endDate: '2026-08-30',
  venueName:
    'Edinburgh Festival Fringe — Paradise in the Vault, The Annexe and Venue 29',
  /** Dead listing page for a finished run. Historical reference only, never a CTA. */
  ticketsUrl:
    'https://www.edfringe.com/tickets/whats-on/epic-economics-what-would-you-protest-about-today',
  postalAddress: {
    addressLocality: 'Edinburgh',
    addressCountry: 'GB',
  },
};
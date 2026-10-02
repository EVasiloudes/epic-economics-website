import {
  SITE_URL,
  SHOW_TITLE,
  SHOW_DESCRIPTION,
  TICKETS_URL,
  ATHENS,
  EDINBURGH,
} from '../constants/show';

/**
 * Structured Data (JSON-LD) generators for Epic Economics
 *
 * Provides schema.org markup for:
 * - TheaterEvent (one per dated performance)
 * - Person (team members)
 * - BreadcrumbList (navigation trail)
 * - Organization/TheaterGroup
 * - VideoObject (video embeds)
 * - Review (press reviews)
 */

const PERFORMER = {
  '@type': 'Person',
  name: 'Dimis Michaelides',
  url: 'https://dimis.org',
};

const ORGANIZER = {
  '@type': 'Organization',
  name: 'Epic Economics',
  url: `${SITE_URL}/`,
};

const postalAddress = (address) => ({ '@type': 'PostalAddress', ...address });

/**
 * Event schemas, one per dated performance.
 *
 * The Edinburgh run is finished, so its eventStatus is left off: schema.org's
 * EventStatusType has no "completed" value (only EventScheduled, EventCancelled,
 * EventPostponed, EventRescheduled and EventMovedOnline), and inventing one
 * would be invalid markup. Omitting it also keeps a past run out of Google's
 * event rich results, which it is not eligible for anyway. Athens is the live
 * performance and carries the bookable offer.
 *
 * Each event becomes its own <script type="application/ld+json">: a single
 * script holding an array would not be a valid TheaterEvent to Google.
 *
 * @returns {Array<Object>} schema.org/TheaterEvent, oldest first
 */
export const generateEventSchemas = () => [
  {
    '@context': 'https://schema.org',
    '@type': 'TheaterEvent',
    name: `${SHOW_TITLE} — Edinburgh Festival Fringe`,
    description: SHOW_DESCRIPTION,
    image: `${SITE_URL}/og-image.png`,
    url: `${SITE_URL}/`,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    startDate: EDINBURGH.startDate,
    endDate: EDINBURGH.endDate,
    location: {
      '@type': 'Place',
      name: EDINBURGH.venueName,
      address: postalAddress(EDINBURGH.postalAddress),
    },
    offers: {
      '@type': 'Offer',
      url: EDINBURGH.ticketsUrl,
      priceCurrency: 'GBP',
      validFrom: '2026-06-01',
    },
    performer: [PERFORMER],
    organizer: ORGANIZER,
    inLanguage: 'en',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'TheaterEvent',
    name: `${SHOW_TITLE} — Athens`,
    description: SHOW_DESCRIPTION,
    image: `${SITE_URL}/og-image.png`,
    url: `${SITE_URL}/`,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    startDate: ATHENS.startDate,
    endDate: ATHENS.endDate,
    duration: ATHENS.duration,
    location: {
      '@type': 'Place',
      name: ATHENS.venueName,
      address: postalAddress(ATHENS.postalAddress),
      url: ATHENS.venueUrl,
    },
    offers: {
      '@type': 'Offer',
      // TicketPlus URL is still outstanding — fall back to the venue page so the
      // offer never advertises a link that does not exist.
      url: TICKETS_URL || ATHENS.venueUrl,
      price: 15,
      priceCurrency: 'EUR',
      // PreOrder: announced, not yet on sale. Flip to InStock with the link.
      availability: 'https://schema.org/PreOrder',
      validFrom: ATHENS.onSaleFrom,
    },
    performer: [PERFORMER],
    organizer: ORGANIZER,
    inLanguage: 'en',
  },
];

/**
 * Person schema for a team member
 * @param {Object} person
 * @param {string} person.name - Full name
 * @param {string} person.url - Personal website URL
 * @param {string} person.role - Role in the production
 * @param {string} person.description - Short bio
 */
export const generatePersonSchema = ({ name, url, role, description }) => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name,
  ...(url && { url }),
  jobTitle: role,
  description,
worksFor: ORGANIZER,
});

/**
 * Person schemas for all team members
 */
export const generateTeamPersonSchemas = () => [
  generatePersonSchema({
    name: 'Dimis Michaelides',
    url: 'https://dimis.org',
    role: 'Writer & Performer',
    description:
      'Keynote speaker and author on innovation, creativity and leadership. He has extensive international experience as a business executive and as a speaker in corporate and public events.',
  }),
  generatePersonSchema({
    name: 'Lia Haraki',
    url: 'https://liaharaki.com',
    role: 'Director & Lighting Designer',
    description:
      'Interdisciplinary artist with over 20 years of experience in performance, devised theatre, voice, and movement. Her work explores transformation and creation through the body as a medium.',
  }),
  generatePersonSchema({
    name: 'Elias Vasnic',
    url: 'https://elias.densetheory.cc',
    role: 'Producer, Composer & Technical Supervisor',
    description:
      'Creative technologist and composer building soundscapes and interactive systems for live performance.',
  }),
];

/**
 * BreadcrumbList schema for navigation trail
 * @param {Array<{name: string, url: string}>} items - Breadcrumb items (home to current)
 */
export const generateBreadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

/**
 * Organization / TheaterGroup schema for the homepage
 */
export const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'TheaterGroup',
  name: SHOW_TITLE,
  description: SHOW_DESCRIPTION,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/og-image.png`,
  image: `${SITE_URL}/og-image.png`,
  sameAs: [
    'https://www.youtube.com/@EpicEconomics',
    // Finished Edinburgh listing. It is the canonical public reference for the
    // Fringe run, not a place to send anyone for tickets.
    EDINBURGH.ticketsUrl,
  ],
  foundingDate: '2024',
  founder: PERFORMER,
});

/**
 * VideoObject schema for YouTube trailer embeds
 * @param {Object} video
 * @param {string} video.name - Video title
 * @param {string} video.description - Video description
 * @param {string} video.embedUrl - YouTube embed URL
 * @param {string} video.thumbnailUrl - Thumbnail URL
 * @param {string} video.uploadDate - ISO date string
 */
export const generateVideoSchema = ({
  name,
  description,
  embedUrl,
  thumbnailUrl,
  uploadDate,
}) => ({
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name,
  description,
  thumbnailUrl,
  uploadDate,
  embedUrl,
});

/**
 * Review schemas for press reviews.
 *
 * Only pass reviews that carry a `source`: schema.org Review is meant for
 * third-party publications, so audience testimonials with no byline are better
 * left as plain text on the page than dressed up as review markup.
 *
 * @param {Array<{text: string, author?: string, source?: string, url?: string}>} reviews
 * @returns {Array<Object>} one schema.org/Review per entry
 */
export const generateReviewSchemas = (reviews) =>
  reviews
    .filter((review) => review.text && review.source)
    .map((review) => ({
      '@context': 'https://schema.org',
      '@type': 'Review',
      itemReviewed: {
        '@type': 'TheaterEvent',
        name: `${SHOW_TITLE} — Edinburgh Festival Fringe`,
        url: `${SITE_URL}/`,
      },
      reviewBody: review.text,
      // Press reviews are published by a title, not a person, so `author` is
      // omitted when there is no byline and the publication is the publisher.
      ...(review.author && {
        author: { '@type': 'Person', name: review.author },
      }),
      publisher: {
        '@type': 'Organization',
        name: review.source,
      },
      ...(review.url && { url: review.url }),
    }));

export default {
  generateEventSchemas,
  generatePersonSchema,
  generateTeamPersonSchemas,
  generateBreadcrumbSchema,
  generateOrganizationSchema,
  generateVideoSchema,
  generateReviewSchemas,
};
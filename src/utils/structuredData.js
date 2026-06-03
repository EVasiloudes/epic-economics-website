/**
 * Structured Data (JSON-LD) generators for Epic Economics
 *
 * Provides schema.org markup for:
 * - Event (Edinburgh Fringe show)
 * - Person (team members)
 * - BreadcrumbList (navigation trail)
 * - Organization/TheaterGroup
 * - VideoObject (YouTube embeds)
 */

/**
 * Event schema for the Edinburgh Fringe show
 * Enables Google Events rich results with ticket purchase actions
 */
export const generateEventSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'TheaterEvent',
  name: 'Epic Economics: What would you protest about today?',
  description:
    "Confused by the economy? Blending great economists' ideas with wicked humour, an LSE/World Bank veteran exposes the system. Discover why you're broke, how we got here and what we should fight for.",
  image: 'https://epic-economics.dimis.org/og-image.png',
  url: 'https://epic-economics.dimis.org/',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  startDate: '2026-08-01',
  endDate: '2026-08-25',
  location: {
    '@type': 'Place',
    name: 'Edinburgh Festival Fringe',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Edinburgh',
      addressCountry: 'GB',
    },
  },
  offers: {
    '@type': 'Offer',
    url: 'https://www.edfringe.com/tickets/whats-on/epic-economics-what-would-you-protest-about-today',
    priceCurrency: 'GBP',
    availability: 'https://schema.org/InStock',
    validFrom: '2026-06-01',
  },
  performer: [
    {
      '@type': 'Person',
      name: 'Dimis Michaelides',
      url: 'https://dimis.org',
    },
  ],
  organizer: {
    '@type': 'Organization',
    name: 'Epic Economics',
    url: 'https://epic-economics.dimis.org/',
  },
  inLanguage: 'en',
});

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
  worksFor: {
    '@type': 'Organization',
    name: 'Epic Economics',
    url: 'https://epic-economics.dimis.org/',
  },
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
  name: 'Epic Economics: What would you protest about today?',
  description:
    "Confused by the economy? Blending great economists' ideas with wicked humour, an LSE/World Bank veteran exposes the system. Discover why you're broke, how we got here and what we should fight for.",
  url: 'https://epic-economics.dimis.org/',
  logo: 'https://epic-economics.dimis.org/og-image.png',
  image: 'https://epic-economics.dimis.org/og-image.png',
  sameAs: [
    'https://www.youtube.com/@EpicEconomics',
    'https://www.edfringe.com/tickets/whats-on/epic-economics-what-would-you-protest-about-today',
  ],
  foundingDate: '2024',
  founder: {
    '@type': 'Person',
    name: 'Dimis Michaelides',
    url: 'https://dimis.org',
  },
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
 * Review schemas for press reviews
 * @param {Array<{text: string, author: string}>} reviews
 */
export const generateReviewSchemas = (reviews) =>
  reviews.map((review) => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'TheaterEvent',
      name: 'Epic Economics: What would you protest about today?',
    },
    reviewBody: review.text,
    author: {
      '@type': 'Person',
      name: review.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Epic Economics',
    },
  }));

export default {
  generateEventSchema,
  generatePersonSchema,
  generateTeamPersonSchemas,
  generateBreadcrumbSchema,
  generateOrganizationSchema,
  generateVideoSchema,
  generateReviewSchemas,
};
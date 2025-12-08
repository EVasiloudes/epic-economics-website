/**
 * Utility functions for SEO-related tasks
 */

/**
 * Adds or removes robots meta tags based on environment
 * @param {boolean} noIndex - Whether to add noindex,nofollow tags
 */
export const setRobotsMeta = (noIndex = false) => {
  // Remove any existing robots meta tags
  const existingMeta = document.head.querySelector('meta[name="robots"]');
  if (existingMeta) {
    existingMeta.remove();
  }

  // Add robots meta tag if noIndex is true
  if (noIndex) {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
  }
};

/**
 * Sets the page title
 * @param {string} title - The page title
 */
export const setPageTitle = (title) => {
  document.title = title;
};

/**
 * Sets or updates a meta tag
 * @param {string} name - Meta tag name attribute
 * @param {string} content - Meta tag content
 */
export const setMetaTag = (name, content) => {
  let meta = document.head.querySelector(`meta[name="${name}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = name;
    document.head.appendChild(meta);
  }
  meta.content = content;
};

/**
 * Sets the meta description
 * @param {string} description - Page description
 */
export const setMetaDescription = (description) => {
  setMetaTag('description', description);
};

/**
 * Sets meta keywords
 * @param {string|Array} keywords - Keywords string or array
 */
export const setMetaKeywords = (keywords) => {
  const keywordString = Array.isArray(keywords) ? keywords.join(', ') : keywords;
  setMetaTag('keywords', keywordString);
};

/**
 * Sets Open Graph meta property
 * @param {string} property - OG property name (without 'og:' prefix)
 * @param {string} content - Property content
 */
export const setOpenGraphMeta = (property, content) => {
  let meta = document.head.querySelector(`meta[property="og:${property}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('property', `og:${property}`);
    document.head.appendChild(meta);
  }
  meta.content = content;
};

/**
 * Sets Twitter Card meta property
 * @param {string} property - Twitter property name (without 'twitter:' prefix)
 * @param {string} content - Property content
 */
export const setTwitterMeta = (property, content) => {
  let meta = document.head.querySelector(`meta[property="twitter:${property}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('property', `twitter:${property}`);
    document.head.appendChild(meta);
  }
  meta.content = content;
};

/**
 * Sets the canonical URL
 * @param {string} url - Canonical URL
 */
export const setCanonicalUrl = (url) => {
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = url;
};

/**
 * Adds structured data (JSON-LD) to the page
 * @param {Object} data - Structured data object
 */
export const addStructuredData = (data) => {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
};

/**
 * Sets complete page SEO metadata
 * @param {Object} seoData - SEO configuration object
 * @param {string} seoData.title - Page title
 * @param {string} seoData.description - Page description
 * @param {string|Array} seoData.keywords - Keywords
 * @param {string} seoData.canonicalUrl - Canonical URL
 * @param {Object} seoData.openGraph - Open Graph data
 * @param {Object} seoData.twitter - Twitter Card data
 * @param {Object} seoData.structuredData - Structured data
 */
export const setPageSEO = ({
  title,
  description,
  keywords,
  canonicalUrl,
  openGraph = {},
  twitter = {},
  structuredData
}) => {
  if (title) setPageTitle(title);
  if (description) setMetaDescription(description);
  if (keywords) setMetaKeywords(keywords);
  if (canonicalUrl) setCanonicalUrl(canonicalUrl);

  // Set Open Graph data
  Object.entries(openGraph).forEach(([property, content]) => {
    setOpenGraphMeta(property, content);
  });

  // Set Twitter Card data
  Object.entries(twitter).forEach(([property, content]) => {
    setTwitterMeta(property, content);
  });

  // Add structured data
  if (structuredData) {
    addStructuredData(structuredData);
  }
};

/**
 * Generates basic structured data for the website
 * @param {Object} data - Website data
 * @returns {Object} Structured data object
 */
export const generateWebsiteStructuredData = ({
  name = 'Epic Economics',
  description = 'Epic Economics - What would you protest about today?',
  url = 'https://epic-economics.dimis.org/',
  author = 'Epic Economics',
  type = 'TheaterGroup'
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    'name': name,
    'description': description,
    'url': url,
    'author': {
      '@type': 'Organization',
      'name': author
    },
    'sameAs': [],
    'potentialAction': {
      '@type': 'SearchAction',
      'target': `${url}?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };
};

export default {
  setRobotsMeta,
  setPageTitle,
  setMetaTag,
  setMetaDescription,
  setMetaKeywords,
  setOpenGraphMeta,
  setTwitterMeta,
  setCanonicalUrl,
  addStructuredData,
  setPageSEO,
  generateWebsiteStructuredData
};

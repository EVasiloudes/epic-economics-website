/**
 * Utility functions for SEO-related tasks
 */

/**
 * Adds or removes robots meta tags based on environment
 * @param {boolean} noIndex - Whether to add noindex,nofollow tags
 */
export const setRobotsMeta = (noIndex = true) => {
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

export default {
  setRobotsMeta,
  setPageTitle
};
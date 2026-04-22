import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { setPageSEO, addStructuredData, setRobotsMeta } from '../utils/seo';

/**
 * Custom hook for managing page-level SEO
 * @param {Object} seoConfig - SEO configuration object
 * @param {string} seoConfig.title - Page title
 * @param {string} seoConfig.description - Page description
 * @param {string|Array} seoConfig.keywords - Page keywords
 * @param {Object} seoConfig.openGraph - Open Graph data
 * @param {Object} seoConfig.twitter - Twitter Card data
 * @param {Object} seoConfig.structuredData - Structured data
 * @param {boolean} seoConfig.noIndex - Whether to block search engines
 */
export const useSEO = (seoConfig = {}) => {
  const location = useLocation();

  useEffect(() => {
    const {
      title,
      description,
      keywords,
      openGraph = {},
      twitter = {},
      structuredData,
      noIndex = false
    } = seoConfig;

    // Build canonical URL
    const baseUrl = 'https://epic-economics.dimis.org';
    const canonicalUrl = `${baseUrl}${location.pathname}`;

    // Default Open Graph data
    const defaultOpenGraph = {
      type: 'website',
      url: canonicalUrl,
      site_name: 'Epic Economics',
      locale: 'en_US',
      ...openGraph
    };

    // Default Twitter data
    const defaultTwitter = {
      card: 'summary_large_image',
      url: canonicalUrl,
      ...twitter
    };

    // Set SEO data
    setPageSEO({
      title,
      description,
      keywords,
      canonicalUrl,
      openGraph: defaultOpenGraph,
      twitter: defaultTwitter
    });

    // Add structured data if provided
    if (structuredData) {
      addStructuredData(structuredData);
    }

    // Handle robots meta
    if (noIndex) {
      setRobotsMeta(true);
    }

    // Signal to prerenderer that page is ready
    // Use a small delay to ensure all DOM updates are complete
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        const event = new Event('prerender-ready');
        document.dispatchEvent(event);
      }
    }, 100);

  }, [location.pathname, seoConfig]);
};

/**
 * SEO configuration presets for different page types
 */
export const SEO_PRESETS = {
  HOME: {
    title: 'Epic Economics: What would you protest about today?',
    description: "Confused by the economy? Blending great economists' ideas with wicked humour, an LSE/World Bank veteran exposes the system. Discover why you're broke, how we got here and what we should fight for.",
    keywords: ['epic economics', 'theatrical production', 'economics', 'democracy', 'protest', 'social change', 'theater'],
    openGraph: {
      title: 'Epic Economics: What would you protest about today?',
      description: "Confused by the economy? Blending great economists' ideas with wicked humour, an LSE/World Bank veteran exposes the system. Discover why you're broke, how we got here and what we should fight for.",
      image: 'https://epic-economics.dimis.org/og-image.png',
      image_alt: 'Epic Economics promotional image'
    },
    twitter: {
      title: 'Epic Economics: What would you protest about today?',
      description: "Confused by the economy? Blending great economists' ideas with wicked humour, an LSE/World Bank veteran exposes the system. Discover why you're broke, how we got here and what we should fight for.",
      image: 'https://epic-economics.dimis.org/og-image.png',
      image_alt: 'Epic Economics promotional image'
    },
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'TheaterGroup',
      'name': 'Epic Economics: What would you protest about today?',
      'description': "Confused by the economy? Blending great economists' ideas with wicked humour, an LSE/World Bank veteran exposes the system. Discover why you're broke, how we got here and what we should fight for.",
      'url': 'https://epic-economics.dimis.org/',
      'sameAs': [],
      'founder': {
        '@type': 'Person',
        'name': 'Epic Economics Team'
      }
    }
  },

  PREVIEW: {
    title: 'Preview - Epic Economics',
    description: 'Get a preview of Epic Economics - experience excerpts from our theatrical production exploring economic themes and social change.',
    keywords: ['epic economics preview', 'theater preview', 'economic theater', 'theatrical excerpts'],
    openGraph: {
      title: 'Preview - Epic Economics',
      description: 'Get a preview of Epic Economics theatrical production'
    },
    twitter: {
      title: 'Preview - Epic Economics',
      description: 'Get a preview of Epic Economics theatrical production'
    }
  },

  PRESS: {
    title: 'Press & Media - Epic Economics',
    description: 'Press coverage, media kit, and news about Epic Economics theatrical production. Download high-resolution images and press materials.',
    keywords: ['epic economics press', 'media kit', 'theater press', 'press coverage', 'media materials'],
    openGraph: {
      title: 'Press & Media - Epic Economics',
      description: 'Press coverage and media materials for Epic Economics'
    },
    twitter: {
      title: 'Press & Media - Epic Economics',
      description: 'Press coverage and media materials for Epic Economics'
    },
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'MediaObject',
      'name': 'Epic Economics Press Kit',
      'description': 'Press materials and media kit for Epic Economics. What would you protest about today? A play by Dimis Michaelides',
      'publisher': {
        '@type': 'Organization',
        'name': 'Epic Economics'
      }
    }
  },

  CONTACT: {
    title: 'Contact Us - Epic Economics',
    description: 'Get in touch with the Epic Economics team. Contact us for bookings, press inquiries, or general questions about our theatrical production.',
    keywords: ['epic economics contact', 'theater booking', 'press inquiries', 'contact theater group'],
    openGraph: {
      title: 'Contact Us - Epic Economics',
      description: 'Get in touch with the Epic Economics team'
    },
    twitter: {
      title: 'Contact Us - Epic Economics',
      description: 'Get in touch with the Epic Economics team'
    },
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      'name': 'Contact Epic Economics',
      'description': 'Contact page for Epic Economics. What would you protest about today? A play by Dimis Michaelides'
    }
  },

  TECHNICAL: {
    title: 'Technical Requirements - Epic Economics',
    description: 'Technical specifications and requirements for Epic Economics theatrical production. Information for venues and technical directors.',
    keywords: ['epic economics technical', 'theater technical requirements', 'venue specifications', 'production requirements'],
    openGraph: {
      title: 'Technical Requirements - Epic Economics',
      description: 'Technical specifications for Epic Economics production'
    },
    twitter: {
      title: 'Technical Requirements - Epic Economics',
      description: 'Technical specifications for Epic Economics production'
    }
  }
};

/**
 * Hook that automatically applies SEO presets based on current route
 */
export const useAutoSEO = () => {
  const location = useLocation();

  const getSEOPreset = (pathname) => {
    switch (pathname) {
      case '/':
        return SEO_PRESETS.HOME;
      case '/preview':
        return SEO_PRESETS.PREVIEW;
      case '/press':
        return SEO_PRESETS.PRESS;
      case '/contact':
        return SEO_PRESETS.CONTACT;
      case '/technical':
        return SEO_PRESETS.TECHNICAL;
      default:
        return SEO_PRESETS.HOME;
    }
  };

  const currentPreset = getSEOPreset(location.pathname);
  useSEO(currentPreset);

  return currentPreset;
};

export default useSEO;

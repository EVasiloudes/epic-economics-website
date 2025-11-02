import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { setPageSEO, addStructuredData } from '../utils/seo';

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
      import('../utils/seo').then(({ setRobotsMeta }) => {
        setRobotsMeta(true);
      });
    }

  }, [location.pathname, seoConfig]);
};

/**
 * SEO configuration presets for different page types
 */
export const SEO_PRESETS = {
  HOME: {
    title: 'Epic Economics - Your Gateway to Economic Insights',
    description: 'What would you protest about today? A play by Dimis Michaelides',
    keywords: ['epic economics', 'theatrical production', 'economics', 'democracy', 'protest', 'social change', 'theater'],
    openGraph: {
      title: 'Epic Economics',
      description: 'What would you protest about today? A play by Dimis Michaelides',
      image: 'https://epic-economics.dimis.org/android-chrome-512x512.png',
      image_width: '512',
      image_height: '512',
      image_alt: 'Epic Economics Logo'
    },
    twitter: {
      title: 'Epic Economics',
      description: 'What would you protest about today? A play by Dimis Michaelides',
      image: 'https://epic-economics.dimis.org/android-chrome-512x512.png',
      image_alt: 'Epic Economics Logo'
    },
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'TheaterGroup',
      'name': 'Epic Economics',
      'description': 'What would you protest about today? A play by Dimis Michaelides',
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
# Description Standardization Documentation

## Overview

This document records the standardization of the Epic Economics project description across all platforms and files to ensure consistent messaging and branding.

## Standardized Description

**Primary Description:** "What would you protest about today? A play by Dimis Michaelides"

This description was chosen because:
- It directly references the play's central question
- It properly credits the playwright
- It's concise and memorable
- It works across all platforms and contexts

## Files Updated

### 1. Main HTML Entry Point
**File:** `index.html`
- `<meta name="description" content="...">` 
- `<meta property="og:description" content="...">`
- `<meta property="twitter:description" content="...">`

### 2. SEO Configuration
**File:** `src/hooks/useSEO.js`
- `SEO_PRESETS.HOME.description`
- `SEO_PRESETS.HOME.openGraph.description`
- `SEO_PRESETS.HOME.twitter.description`
- `SEO_PRESETS.HOME.structuredData.description`
- `SEO_PRESETS.PRESS.structuredData.description`
- `SEO_PRESETS.CONTACT.structuredData.description`

### 3. Progressive Web App Manifest
**File:** `public/manifest.json`
- `description` field

### 4. Package Configuration
**File:** `package.json`
- `description` field

### 5. Brand Documentation
**File:** `docs/design/BRAND_TOOLKIT.md`
- Social Media description section

## Previous Descriptions (Replaced)

The following inconsistent descriptions were found and replaced:

1. "Epic Economics - Your gateway to economic insights and analysis"
2. "Epic Economics - What would you protest about today?"
3. "Epic Economics - what would you protest about today?" (lowercase)
4. "Your gateway to understanding economics"
5. "Official website for the Epic Economics theatrical production"
6. "Theatrical work based on the words of distinguished economists, highlighting their contributions and contradictions"

## Implementation Notes

### SEO Impact
- All meta descriptions now use the same format
- Open Graph and Twitter Card descriptions are consistent
- Structured data (schema.org) includes the standardized description

### Brand Consistency
- The tagline "What would you protest about today?" appears consistently
- Proper attribution to "Dimis Michaelides" is maintained
- The description works for both theatrical and digital contexts

### Technical Considerations
- Description length is optimal for social media previews (under 160 characters)
- Format works across all platforms (Facebook, Twitter, LinkedIn, etc.)
- SEO-friendly while maintaining artistic integrity

## Verification

To verify all descriptions are consistent, search for:
```bash
grep -r "description.*content" .
grep -r "og:description" .
grep -r "twitter:description" .
```

## Future Updates

When updating descriptions:
1. Always use the standardized format: "What would you protest about today? A play by Dimis Michaelides"
2. Update all instances simultaneously to maintain consistency
3. Test social media previews after changes
4. Update this documentation if the standard changes

## Related Files

- `index.html` - Main HTML meta tags
- `src/hooks/useSEO.js` - React SEO management
- `public/manifest.json` - PWA configuration
- `package.json` - Project metadata
- `docs/design/BRAND_TOOLKIT.md` - Brand guidelines

## Date of Standardization

**Updated:** January 2025
**Status:** Complete
**Next Review:** When brand guidelines change
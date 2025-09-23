# Epic Economics Website Implementation Plan

Based on feedback received, this document outlines the required changes and additions to enhance the Epic Economics website.

## 1. Homepage Hero Section Updates

### 1.1 Add Missing Keywords to Animation
**Priority: High**
**Status: Pending**

The GSAP hero animation currently includes some keywords but is missing the red-highlighted ones from the feedback:
- **Currently included:** Economics, Markets, Value, Capital, Labor, Power, Crisis
- **Missing keywords to add:** WEALTH, TRADE, INNOVATION, GROWTH, INEQUALITY

**Implementation:**
- Update `GsapHero.jsx` to include the missing keywords in the marquee animations
- Ensure consistent styling with existing keywords
- Maintain the visual hierarchy with `-focus` and `em` styling

### 1.2 Add Permanent Subtitle
**Priority: High**
**Status: Pending**

Add "WHAT WOULD YOU PROTEST ABOUT TODAY?" as a permanent subtitle under "Epic Economics" title.

**Implementation:**
- Update `TitleHero.jsx` to include the subtitle
- Style it appropriately to complement the main title
- Ensure it's always visible and integral to the theatrical theme
- Consider animation timing to appear after main title

## 2. Homepage Content Updates

### 2.1 Update Main Description Text
**Priority: High**
**Status: Pending**

Replace the current synopsis text in `Home.jsx` with the refined version:

```
Epic Economics is a theatrical work based on the words of distinguished economists from the 18th century to today, highlighting their contributions and contradictions. The theories are interwoven with stories from the performer's own personal and professional journey, and peppered with wicked humor and some songs. The show is accompanied by an original soundscape.

How does your breakfast make its way to your table? Why might you own an imported car? Who creates value? Why do we have recessions? What's more important, growth or equality?

Markets. Value. Capital. Labour. Competition. Co-operation. Wealth. Trade. Innovation. Growth. Inequality. Crises.

What would you protest about today?

Economics is sometimes revered as a nebulous subject best left to "experts" and sometimes simplified to populist pseudo-science. This play promises to explore the nebulae and expose the pretenders.
```

### 2.2 Improve Text Readability
**Priority: Medium**
**Status: Pending**

The background text needs to be clearly readable, not just background to keywords:
- Review and improve typography and contrast
- Ensure text stands out from background animations
- Consider background overlays or text shadows if needed

### 2.3 Add Images to Homepage
**Priority: High**
**Status: Pending**

Add strategic images to the homepage:
- **Poster image:** Add the main poster image
- **Gallery images:** Select 1-2 images from the press gallery
  - One showing audience participation
  - One additional compelling image
- Position these images to complement the content flow

## 3. Press & Media Section Enhancements

### 3.1 Add Reviews and Commentary
**Priority: High**
**Status: Pending**

**Current state:** Press page only has image gallery
**Required:** Add raves and commentary section

**Implementation:**
- Create a new section for press reviews and commentary
- Add placeholder structure for quotes and reviews
- Style consistently with existing press page design
- Include proper attribution for reviews

### 3.2 Organize Press Content
**Priority: Medium**
**Status: Pending**

Structure the press page to include:
- Reviews and commentary section (new)
- Image gallery (existing)
- Press kit downloads (if needed)

## 4. Contact Page Updates

### 4.1 Add Contact Information
**Priority: High**
**Status: Pending**

**Current:** Only has general email
**Required:** Add both contacts with roles

**Implementation:**
- Add Dimis's name and email
- Add Elias's contact with "PRODUCER" designation
- Update contact page layout to accommodate both contacts
- Maintain professional formatting

## 5. Video Content Integration

### 5.1 Full Video Access
**Priority: Medium**
**Status: Pending**

**Requirement:** Provide access to full video somewhere on the site

**Implementation options:**
- Add full video section to Preview page
- Create dedicated video gallery
- Add full video link to homepage or navigation
- Consider video hosting platform integration

## 6. Credits and Attribution

### 6.1 Full Credits Page
**Priority: Medium**
**Status: Pending**

**Requirement:** Add comprehensive credits and names

**Implementation:**
- Create new credits section or page
- Include all production team members
- Add photographer credits (Boyana Loizou already included in press)
- Consider placement in footer or dedicated page

## 7. Technical Improvements

### 7.1 Image Optimization
**Priority: Low**
**Status: Ongoing**

- Ensure all new images are properly optimized
- Implement lazy loading for new content
- Maintain performance standards

### 7.2 Responsive Design
**Priority: Medium**
**Status: Ongoing**

- Ensure all new content is mobile-responsive
- Test new layouts across different screen sizes
- Maintain consistent user experience

## Implementation Priority Order

### Phase 1 (Immediate - High Priority)
1. Add missing keywords to GSAP hero animation
2. Add "WHAT WOULD YOU PROTEST ABOUT TODAY?" subtitle
3. Update homepage main description text
4. Add contact information updates
5. Add poster image to homepage

### Phase 2 (Next - Medium Priority)
1. Add selected gallery images to homepage
2. Improve text readability and contrast
3. Add reviews and commentary to Press page
4. Implement full video access

### Phase 3 (Future - Lower Priority)
1. Create comprehensive credits section
2. Final responsive design improvements
3. Performance optimizations

## Notes and Considerations

- The theatrical theme should remain central to all design decisions
- Maintain the dramatic visual impact of the current GSAP animations
- Ensure new content doesn't compromise page load performance
- Keep the professional presentation while adding the requested "wicked humor" elements
- All text updates should maintain the engaging, accessible tone while being informative

## File Structure Impact

### Files to Modify:
- `src/components/GsapHero.jsx` - Add missing keywords
- `src/components/TitleHero.jsx` - Add subtitle
- `src/pages/Home.jsx` - Update text, add images
- `src/pages/Press.jsx` - Add reviews section
- `src/pages/Contact.jsx` - Update contact info

### New Files Needed:
- Potentially new credits component/page
- Additional image assets for homepage

## Testing Requirements

- Visual regression testing for GSAP animations
- Cross-browser compatibility for new content
- Mobile responsiveness verification
- Performance impact assessment
- Accessibility compliance check

---

*This plan serves as a roadmap for implementing the feedback received. Each item should be reviewed and approved before implementation begins.*

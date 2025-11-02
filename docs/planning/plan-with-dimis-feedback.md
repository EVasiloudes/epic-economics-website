# Epic Economics Website - Implementation Plan with Dimis Feedback

## Overview
This document outlines the implementation plan for updating the Press.jsx component with new reviews, a "read more" modal functionality, and a link to magic.dimis.org.

## Press.jsx Updates

### 1. Add New Reviews to Reviews Section

#### 1.1 Add Ioannis Tirkides Review
- **Location**: `press-reviews` section, reviews-grid
- **Content**:
  ```
  Economics is a deeply controversial subject, blending a multiplicity of skills and perspectives. It's a field rife with conflicting narratives of cause and effect, where morality and positivity, the concrete and the abstract, and the technical and the intuitive constantly clash. Society itself consists of overlapping spheres—the economic, cultural, security, and the political—with all major decisions ultimately being shaped at the political level, where conflicts are compromised. In 'Epic Economics' Dimis captures this essence, and expertly guides us through a century of intellectual evolution. The performance masterfully illustrates how economic thought was born from the realities and conflicts of its time, and how its subsequent failures repeatedly spurred new cycles of ideas. Dimis's ability to weave together this complex narrative with a masterful blend of insight and entertainment makes for a truly compelling and memorable experience.
  ```
- **Attribution**: Ioannis Tirkides, Economics Research Manager at Bank of Cyprus and President, the Cyprus Economic Society

#### 1.2 Add George Lambrianou Review
- **Content**:
  ```
  A very original performance that views basic principles of economics through personal experiences with plenty of humor and music. Michaelides' spicy humour, his artful narrative, his inexhaustible creativity and the musical embellishment with his guitar make the performance unique and really enjoyable. A truly worthwhile experience.
  ```
- **Attribution**: George Lambrianou, Former Administrative Director, University of Cyprus

#### 1.3 Add Aleen Andreou Review
- **Content**:
  ```
  Hugely entertaining with its wit, music, and performance. It magically opens up the audience to take a fresh look at the profoundly disturbing issues of our times, inequality, loss of freedom and power. A top quality show that deserves to travel to many many audiences.
  ```
- **Attribution**: Aleen Andreou, Corporate Trainer and Coach, PeopleAchieve

#### 1.4 Add Thadd Correia Review
- **Content**:
  ```
  Epic Economics, an insightful piece written and created by Dimis Michaelides, in collaboration with Lia Haraki and Elias Vasnic, aptly and deftly combines slight of hand and other chicanery with a lesson in economics. Peppered with nuanced insight into the connections between cold hard numbers and our, warmer, slightly less ordered, humanity, the show takes the audience on a journey from our dismal, somewhat ignorant past towards a more enlightened, hopeful, future. In order to really understand how a show about economics can do this, you will just have to get tickets the next time it's in town. Congratulations to the creators for giving us a show that encourages us to question and dares us to rebel.
  ```
- **Attribution**: Thadd Correia, Director, Writer, Educator

#### 1.5 Add Unnamed Review (Bertolt Brecht Quote)
- **Content**:
  ```
  Epic Economics is not just a performance about money or markets. It is a voyage through the heart of society. The play brings the voices of Smith, Marx, Keynes and many more to the present in a quirkily intelligent style. It reminds us that economics is not just about figures or growth, it is about each one of us, about our daily ambitions, fears and dreams.

  When Dimis says "It's wonderful to have your breakfast oats anytime of the day", it's more than a playful observation. It is the idea of freedom and choice for small human joys beyond big schedules and systems.

  The play owes as much to the collaboration with Lia Haraki with her insightful direction and dramaturgy and with the vivid and imaginative sound design of Elias Vasiloudes. Together with Dimis' vision they shaped the result which is cohesive and visually vibrant. They encourage us to look at the forces that shape our world and the values that guide them. In a humorous and profoundly human way they invite us to imagine how the world might become more alive and generous.

  "Art is not a mirror held up to reality but a hammer with which to shape it" -Bertolt Brecht-
  ```

  **Atrribution**: Lisa Tsangaridou, Dance Teacher/Choreographer

### 2. Implement "Read More" Modal Functionality

#### 2.1 Character Limit Logic
- **Requirement**: Reviews longer than 150 characters should show truncated version with "read more" link
- **Implementation**:
  - Add utility function to truncate text at 150 characters
  - Add state management for expanded reviews
  - Create modal component for full review display

#### 2.2 Modal Component Structure
- **Features**:
  - Overlay background
  - Close button (X)
  - Full review text display
  - Reviewer attribution
  - Responsive design
  - Keyboard navigation (ESC to close)

#### 2.3 State Management
- Add React useState hooks:
  - `selectedReview` - tracks which review is expanded in modal
  - `showReviewModal` - boolean for modal visibility

#### 2.4 Styling Requirements
- Modal overlay with semi-transparent background
- Centered modal content
- Responsive design for mobile devices
- Consistent with existing modal styles in the component

### 3. Add Magic.Dimis.org Link Section

#### 3.1 New Section Creation
- **Location**: After reviews section, before video section
- **Title**: "What People Said About Our Last Show"
- **Button**: Link to magic.dimis.org
- **Placeholder Text**: Add descriptive content about the previous show

#### 3.2 Button Implementation
- **Text**: "What People Said About Our Last Show"
- **URL**: https://magic.dimis.org
- **Styling**: Consistent with existing button styles
- **Behavior**: Open in new tab/window

#### 3.3 Placeholder Content Structure
```
### What People Said About Our Last Show
[Placeholder text about the previous magic show performance]
[Button linking to magic.dimis.org]
```

### 4. Technical Implementation Details

#### 4.1 Component Structure Updates
- Import additional React hooks if needed
- Add new state variables for modal functionality
- Update reviews data structure to include character count logic

#### 4.2 CSS Updates Required
- `.review-modal` - main modal container
- `.review-modal-content` - modal content styling
- `.review-truncated` - styling for truncated text
- `.read-more-link` - styling for "read more" button
- `.magic-link-section` - styling for new magic.dimis.org section

#### 4.3 Accessibility Considerations
- ARIA labels for modal elements
- Keyboard navigation support
- Focus management when modal opens/closes
- Screen reader compatibility

### 5. Testing Requirements

#### 5.1 Functionality Testing
- Verify all new reviews display correctly
- Test "read more" modal for reviews > 150 characters
- Confirm magic.dimis.org link opens correctly
- Test modal close functionality (button and ESC key)

#### 5.2 Responsive Testing
- Mobile device compatibility
- Tablet view optimization
- Desktop display verification

#### 5.3 Cross-browser Testing
- Chrome, Firefox, Safari compatibility
- Edge browser testing

### 6. Implementation Timeline

#### Phase 1: Reviews Addition (Day 1)
- Add all 5 new reviews to the reviews-grid
- Update review item structure
- Test basic display functionality

#### Phase 2: Read More Modal (Day 2)
- Implement character limit logic
- Create modal component
- Add state management
- Style modal elements

#### Phase 3: Magic.Dimis.org Link (Day 3)
- Create new section
- Add button and placeholder content
- Style new section

#### Phase 4: Testing & Refinement (Day 4)
- Comprehensive testing
- Bug fixes and refinements
- Final styling adjustments

### 7. Code Quality Standards

#### 7.1 React Best Practices
- Use functional components with hooks
- Proper state management
- Clean component structure
- Effective use of useEffect for event listeners

#### 7.2 Performance Considerations
- Lazy loading for modal content
- Efficient re-rendering
- Minimal state updates

#### 7.3 Maintainability
- Clear variable naming
- Commented complex logic
- Modular component structure
- Consistent code formatting

### 8. Deliverables

1. Updated Press.jsx component with all new reviews
2. Functional "read more" modal system
3. Magic.dimis.org link section
4. Updated CSS styles
5. Testing documentation
6. Performance verification

### 9. Success Criteria

- All 5 new reviews are properly displayed
- Reviews longer than 150 characters show "read more" functionality
- Modal opens and closes correctly with proper content
- Magic.dimis.org link works and opens in new tab
- Responsive design maintains usability across devices
- No performance degradation from existing functionality
- Accessibility standards maintained

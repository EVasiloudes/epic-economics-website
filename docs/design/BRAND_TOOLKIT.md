# Epic Economics Brand Toolkit

## Project Overview

Epic Economics is a theatrical work that transforms economic theory into engaging performance art. The brand identity reflects the intersection of academic rigor and creative expression, using a modern "liquid glass" aesthetic that embodies both transparency and sophistication.

**Tagline:** "What would you protest about today?"

---

## Brand Identity

### Brand Positioning
- **Primary:** Educational theater that makes economics accessible and engaging
- **Secondary:** Artistic platform for economic discourse and social commentary
- **Tertiary:** Professional speaking and thought leadership vehicle

### Brand Personality
- **Intellectual yet Accessible:** Complex economic concepts presented with clarity
- **Provocative:** Challenges conventional thinking through pointed questions
- **Modern & Sophisticated:** Contemporary design language with premium feel
- **Transparent:** Glass metaphor reflects openness and clarity of thought

---

## Visual Identity

### Logo & Typography

#### Primary Typeface: Avenir Next
- **Usage:** Headlines, titles, brand name
- **Weight:** 700 (Bold) for main titles, 600 (Semibold) for subheadings
- **Style:** Italic for brand name ("Epic Economics")
- **Characteristics:** Clean, modern, geometric sans-serif
- **Fallbacks:** "Century Gothic", "Helvetica Neue", Arial, sans-serif

#### Secondary Typeface: Nunito Sans
- **Usage:** Body text, navigation, UI elements
- **Weights:** 300 (Light), 400 (Regular), 500 (Medium), 600 (Semibold)
- **Fallbacks:** "Source Sans Pro", "Helvetica Neue", Arial, sans-serif

#### Brand Name Treatment
```css
font-family: "Avenir Next", "Century Gothic", "Helvetica Neue", Arial, sans-serif;
font-weight: 700;
font-style: italic;
```

### Color Palette

#### Primary Colors
- **Glass Background Primary:** `rgba(255, 255, 255, 0.15)`
- **Glass Background Secondary:** `rgba(255, 255, 255, 0.25)`
- **Glass Background Tertiary:** `rgba(255, 255, 255, 0.35)`
- **Glass Border:** `rgba(255, 255, 255, 0.3)`

#### Accent Colors
- **Accent Blue:** `#4facfe`
- **Accent Purple:** `#667eea`
- **Accent Pink:** `#f093fb`

#### Text Colors
- **Primary Text:** `rgba(0, 0, 0, 0.85)`
- **Secondary Text:** `rgba(0, 0, 0, 0.6)`
- **Light Text:** `rgba(255, 255, 255, 0.95)`
- **Muted Text:** `rgba(255, 255, 255, 0.75)`

#### Gradient Backgrounds
- **Primary Gradient:** `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- **Secondary Gradient:** `linear-gradient(135deg, #f093fb 0%, #f5576c 100%)`
- **Tertiary Gradient:** `linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)`
- **Ambient Gradient:** `linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)`

### Design System

#### Liquid Glass Aesthetic
The brand's signature visual language uses glassmorphism effects:

```css
/* Glass Card Component */
.glass-card {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* Glass Panel Component */
.glass-panel {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
```

#### Spacing & Layout
- **Base font size:** 16px
- **Container max-width:** 1200px
- **Content max-width:** 800px
- **Border radius:** 12px (small), 16px (medium), 20px (large), 32px (hero)
- **Padding scale:** 0.5rem, 0.75rem, 1rem, 1.5rem, 2rem, 3rem

#### Animation Principles
- **Entrance animations:** Fade up with `ease: "power3.out"`
- **Hover transitions:** 0.3s ease
- **Transform effects:** Subtle scale and translate
- **Scroll animations:** Parallax and reveal effects using GSAP

---

## Brand Applications

### Website Elements

#### Navigation
- Liquid glass navbar with blur effects
- Auto-hide/show behavior based on scroll direction
- Smooth GSAP animations for state changes

#### Hero Section
- Full-screen immersive experience
- Parallax background images
- Animated title with subtle wobble effect
- Glass-morphism content containers

#### Content Sections
- Glass card layouts for structured content
- Consistent typography hierarchy
- Image galleries with modal overlays
- Responsive grid systems

### Content Strategy

#### Voice & Tone
- **Educational:** Informative without being condescending
- **Engaging:** Uses questions to provoke thought
- **Professional:** Maintains academic credibility
- **Accessible:** Complex concepts explained simply

#### Key Messages
1. "Economics is sometimes revered as a nebulous subject best left to 'experts'"
2. "This play promises to explore the nebulae and expose the pretenders"
3. "What would you protest about today?"
4. Focus on making economics accessible through theatrical performance

### Photography Style

#### Guidelines
- **Subject:** Live performance shots, audience engagement
- **Style:** Documentary-style with artistic composition
- **Processing:** Natural colors with slight desaturation
- **Opacity:** Background images at 0.3 opacity for readability
- **Credit:** Photography by Boyana Loizou

#### Usage
- Hero backgrounds with parallax effects
- Gallery presentations with modal viewing
- Content illustrations with contextual captions

---

## Technical Implementation

### CSS Custom Properties
```css
:root {
  /* Typography */
  --font-heading: 'Avenir Next', 'Century Gothic', 'Helvetica Neue', Arial, sans-serif;
  --font-body: 'Nunito Sans', 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;

  /* Glass Effects */
  --glass-bg-primary: rgba(255, 255, 255, 0.15);
  --glass-bg-secondary: rgba(255, 255, 255, 0.25);
  --glass-border: rgba(255, 255, 255, 0.3);
  --glass-shadow: rgba(0, 0, 0, 0.1);

  /* Gradients */
  --gradient-ambient: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);

  /* Accents */
  --accent-purple: #667eea;
  --accent-blue: #4facfe;
  --accent-pink: #f093fb;
}
```

### Animation Library
- **GSAP:** Primary animation engine
- **ScrollTrigger:** Scroll-based animations
- **Custom CSS animations:** Subtle wobble effects on titles

### Responsive Breakpoints
- **Mobile:** 480px and below
- **Tablet:** 768px and below
- **Desktop:** 1200px max-width container

---

## Brand Guidelines

### Do's
- Use italic styling for the brand name "Epic Economics"
- Maintain glass effect consistency across all UI elements
- Implement smooth transitions and micro-interactions
- Keep content accessible while maintaining sophistication
- Use the tagline "What would you protest about today?" prominently

### Don'ts
- Don't use the brand name without italic styling
- Avoid harsh borders or solid backgrounds
- Don't compromise readability for visual effects
- Avoid overly complex animations that distract from content
- Don't use colors outside the defined palette

### Accessibility
- Maintain WCAG AA contrast ratios
- Provide proper alt text for all images
- Ensure keyboard navigation functionality
- Use semantic HTML structure
- Test with screen readers

---

## File Structure

### Assets Organization
```
/src/assets/
├── images/
│   ├── press/           # Performance photography
│   └── meta/            # Social media and SEO images
├── fonts/               # Web font files
└── icons/               # SVG icons and favicons
```

### Component Architecture
```
/src/components/
├── LiquidGlassNavbar    # Primary navigation
├── GsapHero             # Animated hero section
├── TitleHero            # Brand title presentation
└── shared/              # Reusable UI components
```

---

## SEO & Meta

### Primary Keywords
- Epic Economics
- Economic theater
- Educational performance
- Economic insights
- Theatrical production

### Social Media
- **Title:** "Epic Economics: What would you protest about today?"
- **Description:** "What would you protest about today? A play by Dimis Michaelides"
- **Image:** 1200x630px OpenGraph image
- **Site:** epic-economics.dimis.org

---

## Contact & Credits

### Creative Team
- **Dimis Michaelides:** Writer & Performer
- **Lia Haraki:** Director & Lighting Designer
- **Elias Vasnic:** Producer, Composer & Technical Supervisor

### Photography
- **Boyana Loizou:** [@blessthismess_photography](https://www.instagram.com/blessthismess_photography/)

---

*This brand toolkit serves as the comprehensive guide for maintaining visual and conceptual consistency across all Epic Economics touchpoints and communications.*

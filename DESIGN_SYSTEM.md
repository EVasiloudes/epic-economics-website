# Epic Economics Design System

## Component Library

### Navigation Components

#### Liquid Glass Navbar
The primary navigation component featuring glassmorphism effects and smooth animations.

**Features:**
- Auto-hide/show based on scroll direction
- Glassmorphism background with blur effects
- Animated liquid blob backgrounds
- Responsive mobile menu
- Active state indicators

**Implementation:**
```jsx
<nav className="liquid-glass-navbar">
  <div className="navbar-container">
    <div className="navbar-content">
      <div className="navbar-brand">
        <Link to="/" aria-label="Epic Economics - Home">
          <img src="/favicon-32x32.png" alt="Epic Economics" className="navbar-logo" />
        </Link>
      </div>
      <div className="navbar-menu" role="menubar">
        <Link to="/" className={isActive ? 'active' : ''}>Home</Link>
        <Link to="/press">Press</Link>
        <Link to="/technical">Technical</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </div>
    <div className="liquid-bg" aria-hidden="true">
      <div className="liquid-blob blob-1"></div>
      <div className="liquid-blob blob-2"></div>
      <div className="liquid-blob blob-3"></div>
    </div>
  </div>
</nav>
```

### Hero Components

#### GsapHero
Full-screen animated hero section with scroll-triggered animations.

**Features:**
- GSAP-powered animations
- Scroll-triggered reveals
- Responsive design
- Performance optimized

#### TitleHero
Brand title presentation with signature wobble animation.

**Features:**
- Italic "Epic Economics" branding
- Subtle wobble animation
- Parallax background image
- Glass-morphism content card

**Typography Treatment:**
```css
.title-hero h1 {
  font-family: "Avenir Next", "Century Gothic", "Helvetica Neue", Arial, sans-serif;
  font-weight: 700;
  font-style: italic;
  font-size: clamp(4.50rem, 3.64rem + 4.29vw, 9.00rem);
  line-height: 0.9;
  letter-spacing: -0.02em;
}
```

### Layout Components

#### Page Container
Consistent page layout wrapper for non-hero pages.

```css
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem 2rem 2rem;
  position: relative;
  z-index: 1;
}
```

#### Content Wrapper
Centered content container for optimal reading width.

```css
.content-wrapper {
  max-width: 800px;
  margin: 0 auto;
  text-align: left;
}
```

### Glass Components

#### Glass Card
Primary content container with glassmorphism effects.

```css
.glass-card {
  background: var(--glass-bg-secondary);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px var(--glass-shadow);
  transition: all 0.3s ease;
}

.glass-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px var(--glass-shadow-hover);
  border-color: rgba(255, 255, 255, 0.4);
}
```

#### Glass Panel
Lighter glass effect for secondary content areas.

```css
.glass-panel {
  background: var(--glass-bg-primary);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  box-shadow: 0 4px 20px var(--glass-shadow);
}
```

## Interactive Elements

### Buttons

#### Primary Button
Main call-to-action button with glass effects.

```css
.btn-primary {
  border-radius: 16px;
  border: 1px solid var(--glass-border);
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: var(--font-body);
  background: var(--glass-bg-secondary);
  backdrop-filter: blur(10px);
  color: var(--text-dark);
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px var(--glass-shadow);
}

.btn-primary:hover {
  background: var(--glass-bg-tertiary);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px var(--glass-shadow-hover);
  border-color: rgba(255, 255, 255, 0.5);
}
```

### Form Elements

#### Glass Input
Input fields with glassmorphism styling.

```css
.input-glass {
  border-radius: 12px;
  border: 1px solid var(--glass-border);
  padding: 0.75rem;
  font-family: var(--font-body);
  font-size: 1rem;
  background: var(--glass-bg-primary);
  backdrop-filter: blur(10px);
  color: var(--text-dark);
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px var(--glass-shadow);
}

.input-glass:focus {
  outline: none;
  border-color: var(--accent-purple);
  background: var(--glass-bg-secondary);
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.2);
  transform: translateY(-1px);
}
```

## Animation System

### GSAP Animations

#### Entrance Animation
Standard fade-up animation for content reveals.

```javascript
const entranceAnimation = gsap.timeline();
entranceAnimation.fromTo(element, 
  { opacity: 0, y: 50 },
  { 
    opacity: 1, 
    y: 0, 
    duration: 1.2, 
    ease: "power3.out" 
  }
);
```

#### Scroll Trigger Setup
Intersection-based animations for performance.

```javascript
ScrollTrigger.create({
  trigger: container,
  start: "top 80%",
  once: true,
  animation: entranceAnimation
});
```

### CSS Animations

#### Wobble Effect
Signature brand animation for titles.

```css
@keyframes subtleWobble {
  0%, 100% { transform: translateX(0) rotate(0deg); }
  25% { transform: translateX(2px) rotate(0.5deg); }
  50% { transform: translateX(0) rotate(0deg); }
  75% { transform: translateX(-2px) rotate(-0.5deg); }
}

.animate-wobble {
  animation: subtleWobble 6s ease-in-out infinite;
}
```

## Media Components

### Image Gallery
Modal-based image viewing system.

**Features:**
- Click to open full-size modal
- Keyboard navigation (arrow keys, escape)
- Smooth transitions
- Mobile-responsive

### Video Embed
YouTube iframe with responsive wrapper.

```css
.video-responsive {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
}

.video-responsive iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

## Responsive Design

### Breakpoint System
```css
/* Mobile First Approach */
:root {
  font-size: 16px;
}

/* Tablet */
@media (max-width: 768px) {
  :root { font-size: 14px; }
  .page-container { padding: 5rem 2.5% 1rem 2.5%; }
}

/* Mobile */
@media (max-width: 480px) {
  :root { font-size: 13px; }
  .page-container { padding: 7rem 2.5% 0.5rem 2.5%; }
}
```

### Typography Scale
Responsive typography using clamp() function.

```css
h1 { font-size: clamp(4.50rem, 3.64rem + 4.29vw, 9.00rem); }
h2 { font-size: clamp(2rem, 1.5rem + 2vw, 3rem); }
h3 { font-size: clamp(1.5rem, 1.2rem + 1.5vw, 2.5rem); }
```

## Performance Optimization

### CSS Optimizations
- Use `transform` instead of `left/top` for animations
- Implement `will-change` property for animated elements
- Use `backdrop-filter` with vendor prefixes
- Optimize blur values for performance

### JavaScript Optimizations
- Passive event listeners for scroll events
- RequestAnimationFrame for smooth animations
- GSAP's `overwrite: "auto"` to prevent conflicts
- Lazy loading for images

### Loading Strategy
- Critical CSS inlined
- Non-critical CSS loaded asynchronously
- Progressive image loading
- Preload key assets

## Accessibility

### Keyboard Navigation
- Tab order follows visual hierarchy
- Focus indicators visible
- Skip links for main content
- Escape key closes modals

### Screen Reader Support
- Semantic HTML structure
- ARIA labels for interactive elements
- Alt text for all images
- Role attributes for navigation

### Color Contrast
- Text meets WCAG AA standards
- Focus indicators have sufficient contrast
- Error states clearly visible
- Interactive elements distinguishable

## Testing Guidelines

### Visual Regression
- Test across modern browsers
- Verify mobile responsiveness
- Check glass effects render correctly
- Validate typography rendering

### Performance Testing
- Lighthouse audits
- Animation frame rates
- Load time optimization
- Bundle size analysis

### Accessibility Testing
- Screen reader compatibility
- Keyboard navigation
- Color contrast validation
- Focus management

---

*This design system ensures consistent implementation of the Epic Economics brand across all digital touchpoints while maintaining performance and accessibility standards.*
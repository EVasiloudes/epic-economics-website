# Epic Economics Color Palette Reference

## Brand Color System

This document provides the complete color palette for Epic Economics, including hex values, RGB, HSL, and usage guidelines for designers and developers.

---

## Primary Glass Colors

### Glass Backgrounds
These semi-transparent colors create the signature glassmorphism effect.

#### Glass Background Primary
- **RGBA:** `rgba(255, 255, 255, 0.15)`
- **Hex (approximation):** `#FFFFFF26`
- **Usage:** Light glass panels, subtle overlays
- **Opacity:** 15%

#### Glass Background Secondary  
- **RGBA:** `rgba(255, 255, 255, 0.25)`
- **Hex (approximation):** `#FFFFFF40`
- **Usage:** Main content cards, navigation elements
- **Opacity:** 25%

#### Glass Background Tertiary
- **RGBA:** `rgba(255, 255, 255, 0.35)`
- **Hex (approximation):** `#FFFFFF59`
- **Usage:** Hover states, emphasized content
- **Opacity:** 35%

### Glass Effects

#### Glass Border
- **RGBA:** `rgba(255, 255, 255, 0.3)`
- **Hex (approximation):** `#FFFFFF4D`
- **Usage:** All glass element borders
- **Opacity:** 30%

#### Glass Shadows
- **Primary Shadow:** `rgba(0, 0, 0, 0.1)`
- **Hover Shadow:** `rgba(0, 0, 0, 0.15)`
- **Usage:** Drop shadows for depth

---

## Accent Colors

### Blue Accent
- **Hex:** `#4FACFE`
- **RGB:** `rgb(79, 172, 254)`
- **HSL:** `hsl(206, 99%, 65%)`
- **Usage:** Primary accent, links, CTAs

### Purple Accent
- **Hex:** `#667EEA`
- **RGB:** `rgb(102, 126, 234)`
- **HSL:** `hsl(229, 76%, 66%)`
- **Usage:** Primary brand color, focus states

### Pink Accent
- **Hex:** `#F093FB`
- **RGB:** `rgb(240, 147, 251)`
- **HSL:** `hsl(294, 93%, 78%)`
- **Usage:** Hover states, highlights

---

## Text Colors

### Dark Text (Primary)
- **RGBA:** `rgba(0, 0, 0, 0.85)`
- **Hex (approximation):** `#000000D9`
- **Usage:** Headlines, primary body text
- **Opacity:** 85%

### Muted Text (Secondary)
- **RGBA:** `rgba(0, 0, 0, 0.6)`
- **Hex (approximation):** `#00000099`
- **Usage:** Secondary text, captions
- **Opacity:** 60%

### Light Text (Primary)
- **RGBA:** `rgba(255, 255, 255, 0.95)`
- **Hex (approximation):** `#FFFFFFF2`
- **Usage:** Text on dark backgrounds
- **Opacity:** 95%

### Light Text (Secondary)
- **RGBA:** `rgba(255, 255, 255, 0.75)`
- **Hex (approximation):** `#FFFFFFBF`
- **Usage:** Secondary text on dark backgrounds
- **Opacity:** 75%

---

## Gradient Backgrounds

### Primary Gradient
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```
- **Start:** Purple Accent (`#667EEA`)
- **End:** Deep Purple (`#764BA2`)
- **Angle:** 135 degrees
- **Usage:** Hero backgrounds, primary sections

### Secondary Gradient
```css
background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
```
- **Start:** Pink Accent (`#F093FB`)
- **End:** Coral (`#F5576C`)
- **Angle:** 135 degrees
- **Usage:** Accent sections, highlights

### Tertiary Gradient
```css
background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
```
- **Start:** Blue Accent (`#4FACFE`)
- **End:** Cyan (`#00F2FE`)
- **Angle:** 135 degrees
- **Usage:** Secondary sections, buttons

### Ambient Gradient (Main Background)
```css
background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
```
- **Start:** Soft Teal (`#A8EDEA`)
- **End:** Soft Pink (`#FED6E3`)
- **Angle:** 135 degrees
- **Usage:** Body background, ambient lighting

---

## Extended Palette

### Supporting Colors

#### Deep Purple
- **Hex:** `#764BA2`
- **RGB:** `rgb(118, 75, 162)`
- **HSL:** `hsl(270, 37%, 46%)`
- **Usage:** Gradient endpoints, dark accents

#### Coral
- **Hex:** `#F5576C`
- **RGB:** `rgb(245, 87, 108)`
- **HSL:** `hsl(352, 89%, 65%)`
- **Usage:** Gradient endpoints, error states

#### Cyan
- **Hex:** `#00F2FE`
- **RGB:** `rgb(0, 242, 254)`
- **HSL:** `hsl(183, 100%, 50%)`
- **Usage:** Gradient endpoints, highlights

#### Soft Teal
- **Hex:** `#A8EDEA`
- **RGB:** `rgb(168, 237, 234)`
- **HSL:** `hsl(177, 64%, 79%)`
- **Usage:** Background gradients

#### Soft Pink
- **Hex:** `#FED6E3`
- **RGB:** `rgb(254, 214, 227)`
- **HSL:** `hsl(340, 95%, 92%)`
- **Usage:** Background gradients

---

## Usage Guidelines

### Do's
- **Glass Effects:** Always use RGBA values for proper transparency
- **Gradients:** Maintain 135-degree angle for consistency
- **Text Contrast:** Ensure readability against glass backgrounds
- **Accent Colors:** Use sparingly for maximum impact

### Don'ts
- **Solid Backgrounds:** Avoid opaque backgrounds on main content
- **High Contrast:** Don't use pure black or white
- **Mixed Opacity:** Keep glass opacity levels consistent
- **Gradient Overuse:** Limit to 1-2 gradients per view

### Accessibility
- **Contrast Ratios:** All text meets WCAG AA standards (4.5:1 minimum)
- **Focus States:** Use purple accent with sufficient contrast
- **Error States:** Pink accent provides clear indication
- **Loading States:** Blue accent for progress indicators

---

## CSS Variables

### Implementation
```css
:root {
  /* Glass Effects */
  --glass-bg-primary: rgba(255, 255, 255, 0.15);
  --glass-bg-secondary: rgba(255, 255, 255, 0.25);
  --glass-bg-tertiary: rgba(255, 255, 255, 0.35);
  --glass-border: rgba(255, 255, 255, 0.3);
  --glass-shadow: rgba(0, 0, 0, 0.1);
  --glass-shadow-hover: rgba(0, 0, 0, 0.15);

  /* Accent Colors */
  --accent-blue: #4facfe;
  --accent-purple: #667eea;
  --accent-pink: #f093fb;

  /* Text Colors */
  --text-primary: rgba(0, 0, 0, 0.85);
  --text-secondary: rgba(0, 0, 0, 0.6);
  --text-light: rgba(255, 255, 255, 0.95);
  --text-muted: rgba(255, 255, 255, 0.75);

  /* Gradients */
  --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --gradient-secondary: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  --gradient-tertiary: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  --gradient-ambient: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
}
```

---

## Design Tools

### Figma Color Styles
Import these values as color styles in Figma for consistent design workflow.

### Sketch Color Palette
Use the hex values to create a shared color palette in Sketch libraries.

### Adobe Creative Suite
Save as ASE (Adobe Swatch Exchange) file for consistent colors across applications.

---

*This color palette ensures visual consistency and accessibility across all Epic Economics brand applications.*
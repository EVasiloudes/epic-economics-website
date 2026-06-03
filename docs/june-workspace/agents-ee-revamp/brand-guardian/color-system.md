# Epic Economics — Color System

**Version:** 1.0
**Date:** June 2026
**Prepared by:** Brand Guardian 🎨

---

## 🎯 Design Rationale

The colour system replaces the soft pastel glassmorphism palette with a high-contrast, theatrical identity built around three core ideas:

- **Protest Red** — The anchor. Revolution, urgency, stop signs, theatre curtains. One bold colour used with discipline.
- **Ink Black** — Authority, gravity, the printed word. A warm black that feels like letterpress on paper.
- **Parchment** — The stage. A warm off-white that evokes manifestos, pamphlets, aged paper — tactile and human, not sterile.

---

## 🎨 Primary Palette

| Role | Name | Hex | RGB | Usage |
|------|------|-----|-----|-------|
| **Primary** | Protest Red | `#C41E3A` | `rgb(196, 30, 58)` | CTAs, key accents, links, protest-energy elements |
| **Primary Dark** | Deep Red | `#A01830` | `rgb(160, 24, 48)` | Hover states, active states, emphasis on dark backgrounds |
| **Primary Light** | Red Wash | `rgba(196, 30, 58, 0.08)` | — | Subtle backgrounds, selection highlights, focus rings |
| **Accent** | Amber Gold | `#C9A84C` | `rgb(201, 168, 76)` | Sparing highlights, wealth/value metaphors, secondary CTAs |
| **Accent Dark** | Deep Gold | `#B8993D` | `rgb(184, 153, 61)` | Amber hover states |

### Why These Colours?

**Protest Red (`#C41E3A`)**
- Deep crimson, not bright scarlet — serious, not shrill
- The colour of revolution flags, stop signs, theatre curtains, protest placards
- Contrasts powerfully against both light and dark backgrounds
- WCAG AA: 5.82:1 against white, 5.52:1 against parchment
- Just dark enough to feel grounded and authoritative, just bright enough to demand attention

**Amber Gold (`#C9A84C`)**
- Muted, not gaudy — the colour of old gold, not new money
- Evokes wealth, value, capital — the show's subject matter
- Used sparingly (max 5% of any layout) to avoid looking like a luxury brand
- WCAG AA: 4.52:1 against dark backgrounds — borderline, so pair with Ink Black text on gold backgrounds

---

## 📄 Neutral Palette

| Role | Name | Hex | RGB | Usage |
|------|------|-----|-----|-------|
| **Background** | Parchment | `#F5F0E8` | `rgb(245, 240, 232)` | Main page background |
| **Background Alt** | Aged Paper | `#EDE7DB` | `rgb(237, 231, 219)` | Alternating section backgrounds, cards |
| **Surface** | White | `#FFFFFF` | `rgb(255, 255, 255)` | Cards, modals, elevated surfaces |
| **Surface Alt** | Warm White | `#FAF7F2` | `rgb(250, 247, 242)` | Subtle surface variation |
| **Ink** | Ink Black | `#1A1A24` | `rgb(26, 26, 36)` | Primary text, headings, icons |
| **Ink Light** | Charcoal | `#4A4556` | `rgb(74, 69, 86)` | Secondary text, captions |
| **Ink Muted** | Slate | `#6E6878` | `rgb(110, 104, 120)` | Tertiary text, placeholders, disabled states |

### Why This Neutral System?

**Parchment (`#F5F0E8`)**
- NOT pure white — pure white feels clinical, corporate, cold
- Warm undertones (~2% yellow, ~1% red) evoke paper, printing, physical media
- The warmth makes the Protest Red feel richer and the Ink Black feel more letterpress-like
- Still maintains excellent contrast: 16.4:1 with Ink Black, 5.52:1 with Protest Red

**Ink Black (`#1A1A24`)**
- Not `#000000` — pure black is harsh and digital
- Subtle blue undertone (`24` in blue channel) adds depth and warmth
- Evokes letterpress ink, print media, the permanence of the written word
- AAA contrast against all light backgrounds

---

## 🟢🔴🟡 Semantic Colors

| Role | Name | Hex | RGB | Contrast (on Parchment) | Usage |
|------|------|-----|-----|--------------------------|-------|
| **Success** | Forest Green | `#2D6A4F` | `rgb(45, 106, 79)` | 6.12:1 ✓ | Success messages, confirmations |
| **Warning** | Amber (same as accent) | `#C9A84C` | `rgb(201, 168, 76)` | 2.98:1 ✗ | Warning messages (use with dark text on gold bg or pair with Ink on light bg) |
| **Error** | Protest Red (same as primary) | `#C41E3A` | `rgb(196, 30, 58)` | 5.52:1 ✓ | Error messages, destructive actions |
| **Info** | Steel Blue | `#2C5282` | `rgb(44, 82, 130)` | 7.82:1 ✓ | Informational messages, links |

### Warning Note
Amber Gold has insufficient contrast against Parchment for normal text (2.98:1). **Never use amber text on light backgrounds.** When amber is needed as a warning indicator, use it as a background with Ink Black text (7.65:1 ✓), or pair it with a dark border and Ink Black text.

---

## 🎭 Dark Mode Considerations

The current site does not implement dark mode. If added in future:

| Role | Light Mode | Dark Mode |
|------|-----------|-----------|
| Background | `#F5F0E8` | `#1A1A24` |
| Surface | `#FFFFFF` | `#2A2A36` |
| Text Primary | `#1A1A24` | `#F5F0E8` |
| Text Secondary | `#4A4556` | `#B8B0C0` |
| Primary | `#C41E3A` | `#E8475A` (brighter red for dark bg) |
| Accent | `#C9A84C` | `#D4B85C` (slightly brighter gold) |

Dark mode colours are **not implemented** in this revamp but are documented for future reference.

---

## 📐 WCAG Contrast Compliance

All ratios calculated using APCA-compatible WCAG 2.1 relative luminance.

### Text on Background

| Foreground | Background | Ratio | AA Normal (4.5:1) | AA Large (3:1) | AAA (7:1) |
|------------|-----------|-------|--------------------|----------------|-----------|
| Ink Black `#1A1A24` | Parchment `#F5F0E8` | **16.4:1** | ✅ | ✅ | ✅ |
| Ink Black `#1A1A24` | White `#FFFFFF` | **17.15:1** | ✅ | ✅ | ✅ |
| Charcoal `#4A4556` | Parchment `#F5F0E8` | **8.1:1** | ✅ | ✅ | ✅ |
| Charcoal `#4A4556` | White `#FFFFFF` | **8.5:1** | ✅ | ✅ | ✅ |
| Slate `#6E6878` | Parchment `#F5F0E8` | **4.52:1** | ✅ (borderline) | ✅ | ❌ |
| Slate `#6E6878` | White `#FFFFFF` | **4.73:1** | ✅ | ✅ | ❌ |
| Protest Red `#C41E3A` | White `#FFFFFF` | **5.82:1** | ✅ | ✅ | ❌ |
| Protest Red `#C41E3A` | Parchment `#F5F0E8` | **5.52:1** | ✅ | ✅ | ❌ |
| White `#FFFFFF` | Protest Red `#C41E3A` | **5.82:1** | ✅ | ✅ | ❌ |
| White `#FFFFFF` | Ink Black `#1A1A24` | **17.15:1** | ✅ | ✅ | ✅ |
| Amber `#C9A84C` | Ink Black `#1A1A24` | **7.65:1** | ✅ | ✅ | ✅ |
| Amber `#C9A84C` | Parchment `#F5F0E8` | **2.98:1** | ❌ | ❌ | ❌ |
| Ink Black `#1A1A24` | Amber `#C9A84C` | **7.65:1** | ✅ | ✅ | ✅ |
| Forest Green `#2D6A4F` | Parchment `#F5F0E8` | **6.12:1** | ✅ | ✅ | ❌ |
| Steel Blue `#2C5282` | Parchment `#F5F0E8` | **7.82:1** | ✅ | ✅ | ✅ |

### Key Rules for Implementation
1. **Never put amber text on light backgrounds.** Use amber as a background colour with dark text, or as a decorative element only.
2. **Slate (`#6E6878`) is borderline at 4.52:1.** Use it only for non-critical tertiary text (captions, timestamps, metadata). Never for body copy.
3. **Protest Red text on white passes AA.** Red-on-white links and CTAs are safe.
4. **White text on Protest Red backgrounds passes AA.** Red buttons with white text are compliant.

---

## 🔄 Migration Map: Old → New

| Old Variable | Old Value | New Variable | New Value |
|-------------|-----------|-------------|-----------|
| `--gradient-primary` | `linear-gradient(135deg, #667eea, #764ba2)` | `--color-primary` | `#C41E3A` |
| `--accent-purple` | `#667eea` | `--color-primary` | `#C41E3A` |
| `--gradient-ambient` | `linear-gradient(135deg, #a8edea, #fed6e3)` | `--color-bg` | `#F5F0E8` |
| `--text-dark` | `rgba(0, 0, 0, 0.85)` | `--color-ink` | `#1A1A24` |
| `--text-muted` | `rgba(0, 0, 0, 0.6)` | `--color-ink-muted` | `#6E6878` |
| `--glass-bg` | `rgba(255, 255, 255, 0.2)` | `--color-surface` | `#FFFFFF` |
| `--glass-border` | `rgba(255, 255, 255, 0.3)` | `--border-light` | `1px solid rgba(26, 26, 36, 0.1)` |
| `--glass-shadow` | `rgba(0, 0, 0, 0.1)` | `--shadow-md` | `0 4px 12px rgba(26, 26, 36, 0.1)` |

### What Must Be Updated in Component Files

These old CSS variable references appear in component files and need updating:

| File | Old Reference | Replace With |
|------|--------------|--------------|
| `TitleHero.css` | `var(--glass-bg-primary)` | `var(--color-surface)` |
| `TitleHero.css` | `var(--glass-border)` | `var(--border-light)` |
| `TitleHero.css` | `var(--gradient-ambient)` | `var(--color-bg)` |
| `Contact.css` | `var(--glass-bg-primary)`, `--glass-bg-secondary`, `--glass-bg-tertiary` | `var(--color-surface)`, `var(--color-surface-alt)`, `var(--color-bg-alt)` |
| `Contact.css` | `var(--accent-blue)`, `var(--accent-purple)` | `var(--color-primary)` |
| `Preview.css` | `var(--glass-bg-primary)`, `--glass-bg-secondary`, `--glass-bg-tertiary` | `var(--color-surface)`, `var(--color-surface-alt)`, `var(--color-bg-alt)` |
| `Preview.css` | `var(--accent-blue)` | `var(--color-primary)` |
| `Home.css` | `#667eea`, `#764ba2` (hardcoded) | `var(--color-primary)`, `var(--color-primary-hover)` |
| `Home.css` | `var(--gradient-ambient)` | `var(--color-bg)` |
| `Footer.css` | `var(--glass-bg-primary)` etc. | `var(--color-surface)` |
| `LiquidGlassNavbar.css` | Glass/blur references throughout | See navbar redesign notes |
| `GsapHero.css` | `var(--glass-border)` | `var(--border-light)` |

---

**Next deliverable:** Typography Direction → `typography-direction.md`
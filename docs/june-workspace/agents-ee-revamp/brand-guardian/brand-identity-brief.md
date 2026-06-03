# Epic Economics — Brand Identity Brief

**Version:** 1.0
**Date:** June 2026
**Prepared by:** Brand Guardian 🎨
**Context:** Website revamp for Edinburgh Fringe 2026 launch

---

## 🎯 Brand Foundation

### Brand Purpose
Epic Economics exists to make economic ideas visceral, theatrical, and impossible to ignore. It transforms the abstract machinery of markets, capital, labour, and crisis into something you feel in your gut — not just something you read in a textbook.

### Brand Promise
You will leave understanding why you're broke, how we got here, and what's worth fighting for — and you'll have a damn good time getting there.

### Positioning Statement
For Edinburgh Fringe audiences seeking theatre that's intellectually sharp and politically awake, Epic Economics is the show that weaponises wit, history, and economic theory to expose the system — because understanding power is the first act of protest.

---

## 🏛 Brand Pillars

### 1. **Theatrical Urgency**
This is live performance, not a lecture. The brand should pulse with the energy of a packed Fringe venue at 10pm — raw, immediate, electric. No soft edges. No polite restraint.

### 2. **Intellectual Sharpness**
The show draws on LSE/World Bank expertise and centuries of economic thought. The brand must signal intelligence without pretension — accessible rigour, not academic gatekeeping.

### 3. **Protest Energy**
The central question is "What would you protest about today?" The visual identity should evoke the aesthetic language of dissent: placards, manifestos, revolutionary posters, street-level activism. This is not decor — it's a visual argument.

### 4. **Wicked Humour**
Economics is absurd. The brand should wink at that absurdity. Wit, irony, and playfulness keep the identity from becoming self-serious or preachy.

### 5. **Accessible Power**
The brand must be bold enough to stop a Fringe-goer mid-stride on the Royal Mile, but legible enough that anyone — regardless of economics background — feels invited in. WCAG AA+ is not a constraint; it's a design principle that mirrors the show's democratic ethos.

---

## 🗣 Brand Voice & Tone

### Voice Characteristics
| Trait | Description |
|-------|-------------|
| **Sharp** | Economical with words. Every line earns its place. No hedging, no filler. |
| **Wry** | A raised eyebrow, not a raised fist. Humour that lands because it's true. |
| **Urgent** | Present tense. This is happening now. The stakes are real. |
| **Generous** | Never condescending. Complex ideas made accessible, not dumbed down. |
| **Theatrical** | A hint of the stage. Rhythm, repetition, the occasional dramatic flourish. |

### Tone by Context

**Hero / Homepage**
> *"The economy is not a force of nature. It's a story we tell — and some people are telling it very badly. Epic Economics rewrites the script."*

**Press / Media**
> *"Epic Economics blends the words of history's greatest economists with the performer's own journey through the system — from the trading floors of the World Bank to the stages of the Edinburgh Fringe."*

**CTA / Tickets**
> *"The system's on stage. Are you in the audience? Get tickets now."*

**Contact**
> *"Want to book the show, interview the team, or just tell us what you'd protest about? We're listening."*

**Error / 404**
> *"Even markets have inefficiencies. This page isn't where it should be. Try another route."*

---

## 👥 Target Audience: Visual Expectations

### Edinburgh Fringe Audiences
These are design-literate, culture-hungry people who see 5–8 shows in a week. They're bombarded with flyers and posters. What cuts through?

- **Bold typography** — A single word at 120pt on a flyer stops them. Fringe marketing is typography-first.
- **High contrast** — The Royal Mile is visual chaos. Muted palettes disappear. Strong colour blocking wins.
- **Theatricality** — They expect design that feels like performance. Static, corporate visuals read as "not real theatre."
- **Authenticity over polish** — Over-designed slickness signals "corporate sponsorship." Slightly raw, intentional imperfection signals "real Fringe."
- **Clear hierarchy** — They need to digest show name, venue, time, and tone in under 3 seconds.

### What They Reject
- Generic corporate blue/grey palettes
- Stock photography vibes
- Overly ornate or precious design
- Anything that looks like a bank's annual report

---

## 🚫 What We're Killing (and Why)

### ❌ Purple Gradients (`#667eea → #764ba2`)
**Why:** This colour combination peaked around 2018. It reads as "startup SaaS landing page," not "theatrical economics show." It's soft, friendly, and entirely wrong for a show about protest, power, and crisis.

### ❌ Glassmorphism / Frosted Glass Aesthetic
**Why:** Translucent cards with backdrop-blur were the defining UI trend of 2020–2023. They signal "tech product," not "live performance." More critically, they reduce contrast and create accessibility problems — text over blurred backgrounds is notoriously hard to read for users with visual impairments.

### ❌ Pastel Ambient Background (`#a8edea → #fed6e3`)
**Why:** Teal-to-pink gradients read as feminine wellness app, not economic protest theatre. The softness undermines the show's intellectual bite.

### ❌ Floating Blob Animations
**Why:** Decorative floating blobs in the navbar and footer are pure visual candy with no semantic purpose. They add DOM weight, hurt performance, and date the design to a specific micro-trend. Kill them.

### ✅ What We're Keeping
- **GSAP marquee hero animation** — This is genuinely effective theatre. The scrolling protest phrases create urgency. Preserve and enhance.
- **Layout structure** — The home → press → contact → technical information architecture works. Don't restructure.
- **All copy** — Text content stays as-is per the brief.

---

## 🎨 Design Principles (Going Forward)

1. **Typography is the hero.** Bold, oversized type carries the emotional weight. Colour supports, it doesn't lead.
2. **Contrast over comfort.** High-contrast pairings (dark ink on warm paper, red on black, white on red) create theatrical tension.
3. **Texture over glass.** Replace frosted-glass surfaces with subtle paper textures, ink washes, or grain — tactile, analogue, human.
4. **Red is the anchor.** One bold colour, used with discipline, is more powerful than a rainbow. Red is protest, passion, urgency.
5. **Space is a luxury.** Generous whitespace signals confidence. Cramped layouts signal desperation. Let elements breathe.
6. **Accessibility is non-negotiable.** Every colour pairing must pass WCAG AA (4.5:1 minimum). This is both ethical and practical — high contrast aligns with the bold brand aesthetic.

---

## 🔗 Cross-Agent Notes

- **UI Designer:** Start with typography. The wordmark, the hero layout, the placard-inspired CTA buttons — type drives everything.
- **Frontend Developer:** See `design-tokens.css` for the complete CSS custom property system. Migration guide included.
- **SEO Specialist:** The brand shift won't change URL structure or metadata — semantic HTML and structured data remain intact.
- **Accessibility Auditor:** All colour combinations documented with WCAG contrast ratios in `color-system.md`.

---

**Next deliverable:** Color System → `color-system.md`
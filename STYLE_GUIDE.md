# Kingdom Care Style Guide

## Overview

This project uses **Tailwind CSS exclusively** for styling. No inline styles or component-scoped CSS. All global styles are defined in `app/globals.css` using `@layer` directives.

**Key Principle**: Markup should only contain Tailwind class names. If you need custom CSS, add it to `globals.css` under the appropriate `@layer`.

---

## Design Tokens (Tailwind Config)

All design values are centralized in `tailwind.config.ts` and should NEVER be hardcoded in markup.

### Colors

**Brand Color Palette** - Use these for all styling:

```
brand-brown    #614A1B  (primary, headings, buttons)
brand-gold     #9A6F28  (secondary, accents)
brand-cta      #EFCD36  (call-to-action yellow)
brand-deep     #493611  (dark variant, hover states)
brand-charcoal #171512  (body text)
brand-cream    #F5F0EF  (light background sections)
brand-muted    #6F6B64  (secondary text)
brand-border   #E9E6E1  (borders, dividers)
```

**Usage in Markup:**
```tsx
// ✅ CORRECT
<div className="bg-brand-brown text-white">
<button className="bg-brand-cta hover:bg-[#D9B92E]">

// ❌ WRONG - Never hardcode colors
<div style={{ backgroundColor: '#614A1B' }}>
<button style={{ backgroundColor: '#EFCD36' }}>
```

### Typography

**Font Families** (configured via `next/font/google`):

- `font-serif` → Libre Baskerville (headings, display text)
- `font-sans` → Inter (body text, default)

**Font Sizes** - Use Tailwind scale:
```
text-xs       (10px) - captions, fine print
text-sm       (14px) - labels, secondary text
text-base     (16px) - body text (default)
text-lg       (18px) - body emphasis
text-xl       (20px) - subheadings
text-2xl      (24px) - section subheads
text-3xl      (30px) - section headings
text-[40px]   (40px) - large headings
text-[58px]   (58px) - hero titles
```

**Font Weights** - Use semantic classes:
```
font-normal   (400) - body text
font-medium   (500) - emphasis
font-semibold (600) - labels, badges
font-bold     (700) - headings, strong emphasis
font-extrabold (800) - hero titles
```

**Line Heights** - Use Tailwind utilities:
```
leading-tight       (1.25)
leading-relaxed     (1.625)
leading-[1.1]       (1.1)   - tight hero text
leading-[1.625]     (1.625) - body
```

### Spacing

**Section Padding** (custom utilities):

- `py-section-mb` → 64px vertical (mobile)
- `py-section-dt` → 96px vertical (desktop)

**Container Widths** (max-width constraints):

- `max-w-content` → 1200px (standard content container)
- `max-w-wide` → 1440px (wider layouts)

**Gap Spacing** - Use standard Tailwind:
```
gap-1 gap-2 gap-3 gap-4 gap-6 gap-8 gap-12 gap-16 gap-20
px-4 px-6 px-8  (horizontal padding)
py-3 py-4 py-6 py-8 py-10 py-12  (vertical padding)
```

### Border Radius

**Custom Border Radius Utilities:**

- `rounded-btn` → 4px (buttons, inputs)
- `rounded-card` → 6px (card elements)
- `rounded-img` → 8px (image containers)
- `rounded-map` → 8px (map elements)
- `rounded-full` → 50% (circular, badges)

### Shadows

Use Tailwind's built-in shadow scale:

```
shadow-sm    (small, subtle)
shadow       (standard)
shadow-lg    (large, prominent)
shadow-xl    (extra large, hero sections)
shadow-inner (inset shadow)
```

---

## Component Styling Patterns

### Cards

**Basic Card Structure:**
```tsx
<div className="rounded-card border border-brand-border shadow-sm p-6 md:p-8">
  {/* content */}
</div>
```

**Card Variants:**

```tsx
// Dark card (on light background)
<div className="bg-brand-brown text-white rounded-card p-6 shadow-lg">

// Light card (on light/cream background)
<div className="bg-white rounded-card p-6 border border-brand-border shadow-sm">

// Hover state (always add)
<div className="...hover:border-brand-gold transition-colors">
```

### Buttons

**Primary CTA Button:**
```tsx
<button className="bg-brand-cta text-brand-charcoal px-6 py-3 rounded-btn font-bold hover:bg-[#D9B92E] transition-colors shadow-sm">
  Get a Free Estimate
</button>
```

**Secondary/Outline Button:**
```tsx
<button className="border-2 border-brand-cta text-brand-cta px-6 py-3 rounded-btn font-bold hover:bg-brand-cta hover:text-brand-charcoal transition-colors">
  View All Services
</button>
```

**White/Border Button:**
```tsx
<button className="bg-transparent text-white border-2 border-white px-8 py-3 rounded-btn font-bold hover:bg-white/10 transition-colors">
  Call Now
</button>
```

**Buttons NEVER have inline styles:**
```tsx
// ❌ WRONG
<button style={{ backgroundColor: '#EFCD36', padding: '12px 24px' }}>

// ✅ CORRECT
<button className="bg-brand-cta px-6 py-3 rounded-btn font-bold">
```

### Sections

**Standard Section Container:**
```tsx
<section className="py-section-mb md:py-section-dt bg-white">
  <div className="max-w-content mx-auto px-4 md:px-8">
    {/* content */}
  </div>
</section>
```

**Section Background Colors:**
- `bg-white` (light sections)
- `bg-brand-cream` (warm light sections)
- `bg-brand-charcoal` (dark sections)
- `bg-brand-brown` (accent sections)
- `bg-brand-deep` (darkest sections)

### Hero Sections

**Hero Structure:**
```tsx
<section className="relative w-full h-[600px] lg:h-[660px] bg-brand-charcoal flex items-center">
  {/* background image layer */}
  <div className="absolute inset-0 z-0">
    <img className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-brand-charcoal/50" /> {/* overlay */}
  </div>

  {/* content layer */}
  <div className="relative z-10">
    {/* hero content */}
  </div>
</section>
```

**Hero Title Sizing:**
```tsx
<h1 className="text-4xl lg:text-[58px] font-sans font-extrabold leading-[1.1] text-white">
  Transforming Homes...
</h1>
```

### Grids & Layouts

**Responsive Grid:**
```tsx
// 1 column mobile, 2 columns tablet, 3-4 columns desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Flexible columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

// 2-column with fixed left width
<div className="flex flex-col lg:flex-row gap-12">
  <div className="w-full lg:w-[45%]">
  <div className="w-full lg:w-[55%]">
</div>
```

### Images & Media

**Image Container:**
```tsx
<div className="relative aspect-[4/5] rounded-img overflow-hidden shadow-xl border-4 border-brand-cream">
  <img src="..." alt="..." className="w-full h-full object-cover" />
</div>
```

**Image with Overlay:**
```tsx
<div className="relative">
  <img className="w-full h-full object-cover" />
  <div className="absolute inset-0 bg-brand-charcoal/50" /> {/* overlay */}
</div>
```

### Hover & Interactive States

**Always include transitions:**
```tsx
// Color transition
className="hover:text-brand-gold transition-colors"

// Multiple properties
className="hover:border-brand-gold hover:shadow-lg transition-all"

// Transform (zoom on image)
className="transform group-hover:scale-105 transition-transform duration-700"

// Opacity
className="opacity-0 group-hover:opacity-100 transition-opacity"
```

### Responsive Breakpoints

Use Tailwind's mobile-first approach:

```
no prefix     (mobile/base)    <640px
sm:           (small)          ≥640px
md:           (medium)         ≥768px
lg:           (large)          ≥1024px
xl:           (x-large)        ≥1280px
2xl:          (2x-large)       ≥1536px
```

**Example:**
```tsx
// Mobile: full width, stacked
// Tablet+: 2 columns
// Desktop: 3 columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-8">
```

---

## Global CSS Utilities

Located in `app/globals.css` under `@layer utilities`. These are extensions beyond Tailwind.

### Existing Utilities

**`.no-scrollbar`** - Hide scrollbar (for no-scroll containers)
```tsx
<div className="no-scrollbar overflow-y-auto">
```

**`.coupon-border`** - Dashed border effect using CSS gradients
```tsx
<div className="coupon-border p-8">
```

**HTML Smooth Scroll** - Auto-applied globally via `html { scroll-behavior: smooth; }`

### When to Add Global CSS

Only add global CSS if:
1. It's **used in multiple components** (reusable pattern)
2. It **requires pseudo-selectors or @media** (`:hover`, `::before`, etc.)
3. It **cannot be achieved with Tailwind classes**

**Example of appropriate global utility:**
```css
@layer utilities {
  .gradient-overlay {
    background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.8));
  }

  .text-shadow {
    text-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
}
```

---

## Component File Structure

**Each component file MUST:**
1. Import only React hooks if needed (`'use client'` if stateful)
2. Define component with TSX/JSX
3. Use ONLY Tailwind classes in className attributes
4. NO inline styles (`style={}`)
5. NO `<style>` tags
6. NO CSS-in-JS libraries

**Example Component Template:**
```tsx
'use client' // Only if using hooks (useState, useEffect)

import { useState } from 'react'

export function MyComponent() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-white p-6 rounded-card shadow-sm">
      <h2 className="font-serif text-2xl text-brand-charcoal mb-4">Title</h2>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-brand-cta text-brand-charcoal px-6 py-3 rounded-btn font-bold hover:bg-[#D9B92E] transition-colors"
      >
        Click Me
      </button>
    </div>
  )
}
```

---

## Forbidden Patterns

These should NEVER appear in component files:

```tsx
// ❌ Inline styles
<div style={{ color: '#614A1B', padding: '24px' }}>

// ❌ Style tags in components
<style>{`.custom { color: red; }`}</style>

// ❌ CSS-in-JS
const styles = { container: { display: 'flex' } }
<div style={styles.container}>

// ❌ Hardcoded color values
className="text-[#614A1B]" // Use brand-brown instead

// ❌ Non-existent utilities
className="shadow-huge" // Use shadow-xl or shadow-2xl

// ❌ Mixing Tailwind with other CSS frameworks
className="text-primary" // Not a Tailwind class
```

---

## Tailwind Config Reference

**File:** `tailwind.config.ts`

Contains all design tokens:
- Colors (brand palette + Tailwind defaults)
- Font families (serif, sans)
- Custom spacing (section-dt, section-mb)
- Max widths (content, wide)
- Border radius (btn, card, img, map)

**To add new utilities:**
1. Edit `tailwind.config.ts` under `extend`
2. Use in markup as className
3. Document in this guide

---

## Development Checklist

When creating new sections or components:

- [ ] Use only Tailwind classes (no inline styles)
- [ ] Use brand colors from design tokens
- [ ] Apply responsive design (mobile-first)
- [ ] Include hover/interactive states with transitions
- [ ] Use semantic HTML (`<section>`, `<nav>`, `<article>`)
- [ ] Follow component file structure
- [ ] Document any new patterns in this guide
- [ ] Run `npm run build` to ensure no unused classes

---

## Quick Reference: Common Patterns

**Full-width section with background:**
```tsx
<section className="w-full bg-brand-cream py-section-mb md:py-section-dt">
  <div className="max-w-content mx-auto px-4 md:px-8">
```

**Centered heading:**
```tsx
<h2 className="font-serif text-3xl md:text-[40px] text-brand-charcoal text-center mb-12">
```

**Flex container (horizontal):**
```tsx
<div className="flex items-center justify-between gap-6">
```

**Flex container (vertical, responsive):**
```tsx
<div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
```

**Responsive grid:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

**Icon + Text:**
```tsx
<div className="flex items-center gap-2">
  <svg className="h-5 w-5 text-brand-cta" />
  <span className="text-brand-muted">Text</span>
</div>
```

**CTA Button Group:**
```tsx
<div className="flex flex-col sm:flex-row gap-4">
  <button className="bg-brand-cta text-brand-charcoal px-8 py-3 rounded-btn font-bold hover:bg-[#D9B92E] transition-colors">
    Primary
  </button>
  <button className="border-2 border-white text-white px-8 py-3 rounded-btn font-bold hover:bg-white/10 transition-colors">
    Secondary
  </button>
</div>
```

---

## Maintenance

This guide is **living documentation**. Update it whenever:
- New design tokens are added to Tailwind config
- New global utilities are created
- New patterns emerge across components
- Best practices need clarification

**Last Updated:** 2026-08-27
**Maintained By:** Design System Lead

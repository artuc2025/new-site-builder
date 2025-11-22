# Duolingo Website Clone

A pixel-perfect clone of the Duolingo homepage built with Vue 3 + Nuxt 3, using SCSS with BEM methodology.

## Current Implementation

### ✅ Completed

- **Responsive Design**: Fully optimized for mobile (390px+) and desktop (1200px+).
- **Component Structure**: All major sections created as Vue components.
- **Assets**: Using CDN-hosted SVGs from Duolingo's CDN for illustrations.
- **Styling**: SCSS with BEM methodology implemented.
- **Hero Section**: Complete with floating animation, correct typography (weight 800), and responsive layout.
- **Feature Sections**: Zig-zag alternating layout with correct title styling (3rem, weight 800).
- **Mobile App Section**: Complete with app store badges and floating animation.
- **Super Duolingo Section**: Dark navy background with iridescent text effect.
- **Product Sections**: All four product sections implemented (English Test, Schools, ABC, Math).
- **Header & Footer**: Responsive with functional mobile menu drawer.
- **Interactivity**: Hover effects, floating animations, and AOS scroll animations.

### 🔍 Recent Analysis

**Comparison completed** (Iteration 23): Screenshots taken of both original Duolingo site and local clone for detailed comparison. See `progress.md` for full analysis.

### 📋 Next Steps (Priority Order)

**Phase 1: Background Colors**
1. Change feature sections background from light blue (`#e8f4f8`) to white
2. Change mobile app section background to white

**Phase 2: Button Styling**
3. Update product section CTA buttons to green with white text (match primary button style)
4. Make all CTA button text uppercase

**Phase 3: Super Duolingo Section**
5. Add "POWER UP WITH" heading above "SUPER DUOLINGO"
6. Change button text from "Try 1 week free" to "LEARN MORE"

**Phase 4: Typography**
7. Update product section titles to 3rem and weight 800
8. Verify all text content matches original exactly

See `progress.md` for detailed comparison and complete implementation plan.

## Project Structure

```
├── app/
│   └── app.vue              # Main app component
├── components/
│   ├── TheHeader.vue        # Header (Responsive + Hamburger)
│   ├── HeroSection.vue      # Hero (Floating Anim)
│   ├── FeatureSection.vue   # Features (Responsive)
│   ├── MobileAppSection.vue # Mobile App (Floating Anim)
│   ├── SuperDuolingoSection.vue
│   ├── ProductSection.vue
│   ├── FinalCtaSection.vue
│   └── TheFooter.vue
├── assets/
│   └── scss/
│       └── main.scss
├── public/
│   ├── hero-illustration.png   # Captured asset
│   ├── mobile-illustration.png # Captured asset
│   └── flags/
└── progress.md              # Progress tracking
```

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

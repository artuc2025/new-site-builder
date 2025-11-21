# Duolingo Website Clone

A pixel-perfect clone of the Duolingo homepage built with Vue 3 + Nuxt 3, using SCSS with BEM methodology.

## Current Implementation

### ✅ Completed

- **Component Structure**: All major sections have been created as Vue components
  - Header with logo and language selector
  - Hero section with CTAs and language flags
  - Feature sections (free.fun.effective, backed by science, stay motivated, personalized learning)
  - Mobile app section
  - Super Duolingo section with dark gradient background
  - Product sections (English test, Schools, ABC, Math)
  - Final CTA section
  - Footer with links and language selector

- **Styling**: SCSS with BEM methodology implemented across all components
- **Typography**: Nunito font family integrated, typography sizes refined
- **Layout**: Responsive grid layouts with side-by-side alternating layouts
- **Assets**: Placeholder SVGs created for logo, language flags, and app store badges
- **Spacing**: Section padding adjusted to match original proportions
- **Colors**: Primary green (#58cc02) implemented, Super Duolingo section styling refined

### 🛠 In Progress

- Illustration placeholders (gradient blocks) need to be replaced with actual character illustrations
- Product section layouts may need reverse layout support
- Button styling fine-tuning (border radius, hover states)
- Exact color extraction and verification from original site
- Responsive breakpoints for mobile and tablet

### 📋 Next Steps

1. Verify product section layouts and add reverse support if needed
2. Fine-tune button styles and hover effects
3. Extract exact color values from original site
4. Replace gradient placeholders with actual illustrations
5. Implement responsive design breakpoints
6. Continue iteration until pixel-perfect match

## Project Structure

```
├── app/
│   └── app.vue              # Main app component
├── components/
│   ├── TheHeader.vue         # Header with logo and language selector
│   ├── HeroSection.vue       # Main hero section
│   ├── LanguageFlags.vue    # Language flags row
│   ├── FeatureSection.vue   # Reusable feature section component
│   ├── MobileAppSection.vue # Mobile app download section
│   ├── SuperDuolingoSection.vue # Super Duolingo promo
│   ├── ProductSection.vue   # Reusable product section component
│   ├── FinalCtaSection.vue  # Final call-to-action
│   └── TheFooter.vue        # Footer with links
├── assets/
│   └── scss/
│       └── main.scss        # Global styles
├── public/
│   ├── logo.svg             # Duolingo logo placeholder
│   ├── flags/               # Language flag SVGs
│   ├── app-store-badge.svg  # App Store badge
│   └── google-play-badge.svg # Google Play badge
└── progress.md              # Progress tracking document
```

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Progress Tracking

See `progress.md` for detailed progress, known differences, and planned fixes.

---

**Status**: Core implementation complete with placeholder assets. Typography and spacing refined. Working on visual refinement and responsive design.
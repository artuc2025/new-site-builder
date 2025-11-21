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
- **Layout**: Responsive grid layouts with side-by-side alternating layouts for features and products
- **Assets**: Placeholder SVGs created for logo, language flags, and app store badges
- **Spacing**: Section padding adjusted to match original proportions
- **Colors**: Primary green (#58cc02) implemented, Super Duolingo section styling refined
- **Buttons**: Product section buttons updated to blue (#1cb0f6) with "LEARN MORE" text to match original
- **Hero Section**: Added subheading "Learn 40+ languages with bite-sized lessons based on science." to match original. Button text updated to "Get started" (not uppercase) to match original
- **Super Duolingo**: Subtitle updated to "POWER UP WITH", title uses gradient text (green → blue → purple), button text "Try 1 week free" to match original
- **Feature Sections**: Background color changed from white to light blue (#e8f4f8) to match original
- **Mobile App Section**: Background color changed from white to light blue (#e8f4f8) to match original

### 🛠 In Progress

- Illustration placeholders (gradient blocks) need to be replaced with actual character illustrations
- Typography fine-tuning (sizes, weights, spacing) to match original exactly
- Exact color extraction and verification from original site
- Spacing and padding adjustments for pixel-perfect match
- Responsive breakpoints for mobile and tablet
- Button hover states and animations

### 📋 Next Steps

1. Replace gradient placeholders with actual illustrations
2. Fine-tune typography (sizes, weights, spacing) to match original exactly
3. Extract and verify exact color values from original site
4. Adjust spacing and padding for pixel-perfect match
5. Implement responsive design breakpoints
6. Add proper hover states and animations
7. Continue iteration until pixel-perfect match

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

**Status**: Core implementation complete with placeholder assets. Hero section subheading and button text case fixed. Feature sections and Mobile App section backgrounds updated to light blue. Super Duolingo section updated with correct subtitle, gradient title, and button text. Typography and spacing refined. Working on illustration replacements, visual refinement, and responsive design.
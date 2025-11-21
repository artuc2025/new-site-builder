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
- **Typography**: Nunito font family integrated
- **Layout**: Responsive grid layouts and section spacing

### 🛠 In Progress

- CSS import path resolution (styles currently inlined in app.vue)
- Asset integration (logos, flags, illustrations)
- Pixel-perfect spacing and color matching
- Responsive breakpoints refinement

### 📋 Next Steps

1. Resolve CSS import path issue and restart dev server
2. Take comparison screenshot with original
3. Fine-tune typography, spacing, and colors
4. Add actual illustrations and assets
5. Implement responsive design breakpoints
6. Iterate until pixel-perfect match

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

**Status**: Initial implementation complete. Working on CSS import resolution and visual refinement.
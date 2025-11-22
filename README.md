# Duolingo Website Clone

A pixel-perfect clone of the Duolingo homepage built with Vue 3 + Nuxt 3, using SCSS with BEM methodology.

## Current Implementation

### ✅ Completed

- **Component Structure**: All major sections have been created as Vue components.
- **Assets**: 
  - High-quality screenshots used for complex illustrations (Hero Globe, Mobile Phone) to match visual fidelity.
  - SVG icons for features and flags.
- **Styling**: SCSS with BEM methodology implemented.
- **Hero Section**: Complete with main illustration and correct typography.
- **Mobile App Section**: Complete with phone illustration (text removed from asset to avoid duplication).
- **Super Duolingo**: Gradient background and text matched.
- **Feature & Product Sections**: Full parity with original.

### 🛠 In Progress

- **Responsive Design**: Adding breakpoints for mobile/tablet adaptation.
- **Typography Refinement**: Fine-tuning weights and spacing.

### 📋 Next Steps

1. Implement responsive design (stacking layouts on mobile).
2. Fine-tune typography.
3. Add hover animations and transitions.

## Project Structure

```
├── app/
│   └── app.vue              # Main app component
├── components/
│   ├── TheHeader.vue        # Header
│   ├── HeroSection.vue      # Hero (Updated with new asset)
│   ├── FeatureSection.vue   # Features
│   ├── MobileAppSection.vue # Mobile App (Updated with new asset)
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

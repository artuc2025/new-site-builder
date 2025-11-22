# Duolingo Website Clone

A pixel-perfect clone of the Duolingo homepage built with Vue 3 + Nuxt 3, using SCSS with BEM methodology.

## Current Implementation

### ✅ Completed

- **Responsive Design**: Fully optimized for mobile (390px+) and desktop (1200px+).
- **Component Structure**: All major sections have been created as Vue components.
- **Assets**: 
  - High-quality screenshots used for complex illustrations (Hero Globe, Mobile Phone).
  - SVG icons for features and flags.
- **Styling**: SCSS with BEM methodology implemented.
- **Hero Section**: Complete with floating animation and responsive layout.
- **Mobile App Section**: Complete with floating animation.
- **Super Duolingo**: Gradient background and text matched.
- **Feature & Product Sections**: Full parity with original.
- **Header & Footer**: Responsive, with mobile-specific adjustments (Hamburger menu).
- **Interactivity**: Hover effects and floating animations.

### 🛠 In Progress

- **Mobile Menu Logic**: Making the hamburger menu functional.
- **Entrance Animations**: Elements appearing on scroll.

### 📋 Next Steps

1. Implement the mobile menu drawer.
2. Add scroll-based entrance animations.

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

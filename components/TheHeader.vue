<template>
  <header class="header">
    <div class="header__container">
      <nav class="header__nav">
        <a href="/" class="header__logo">
          <img src="/logo.svg" alt="Duolingo" class="header__logo-img" />
          <span class="header__logo-text">duolingo</span>
        </a>
      </nav>
      <div class="header__actions">
        <LanguageSelector class="header__language-selector" />
        <button class="header__mobile-menu" aria-label="Menu" @click="toggleMobileMenu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H21" stroke="#afafaf" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3 6H21" stroke="#afafaf" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3 18H21" stroke="#afafaf" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu Drawer -->
    <div class="header__mobile-drawer" :class="{ 'header__mobile-drawer--open': isMobileMenuOpen }">
      <div class="header__drawer-content">
        <div class="header__drawer-header">
          <button class="header__close-btn" @click="toggleMobileMenu" aria-label="Close menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="#afafaf" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M6 6L18 18" stroke="#afafaf" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        
        <div class="header__drawer-body">
          <div class="header__mobile-actions-group">
            <a href="/register" class="header__drawer-btn header__drawer-btn--primary">
              Get started
            </a>
            <button class="header__drawer-btn header__drawer-btn--secondary">
              I ALREADY HAVE AN ACCOUNT
            </button>
          </div>

          <div class="header__drawer-lang-title">Site Language: English</div>
          <ul class="header__drawer-languages">
             <li v-for="lang in languages" :key="lang.code" class="header__drawer-lang-item">
                <a :href="lang.url" class="header__drawer-lang-link">
                  <img :src="lang.flag" :alt="lang.name" class="header__drawer-flag" />
                  <span class="header__drawer-lang-name">{{ lang.name }}</span>
                </a>
             </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import LanguageSelector from './LanguageSelector.vue';

const isMobileMenuOpen = ref(false);
const route = useRoute();

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

// Close menu on route change
watch(() => route.path, () => {
  if (isMobileMenuOpen.value) {
    toggleMobileMenu();
  }
});

const languages = [
  { code: 'en', name: 'English', flag: '/flags/en.svg', url: '#' },
  { code: 'es', name: 'Spanish', flag: '/flags/es.svg', url: '#' },
  { code: 'fr', name: 'French', flag: '/flags/fr.svg', url: '#' },
  { code: 'de', name: 'German', flag: '/flags/de.svg', url: '#' },
  { code: 'it', name: 'Italian', flag: '/flags/it.svg', url: '#' },
  { code: 'pt', name: 'Portuguese', flag: '/flags/pt.svg', url: '#' },
  { code: 'ja', name: 'Japanese', flag: '/flags/ja.svg', url: '#' },
  { code: 'zh', name: 'Chinese', flag: '/flags/zh.svg', url: '#' },
];
</script>

<style lang="scss" scoped>
.header {
  padding: 1.5rem 0;
  background-color: #ffffff;
  
  @media (max-width: 768px) {
    padding: 0.75rem 0;
    position: sticky;
    top: 0;
    z-index: 100;
    border-bottom: 2px solid #f7f7f7;
  }

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 768px) {
      padding: 0 1rem;
    }
  }

  &__nav {
    display: flex;
    align-items: center;
  }

  &__logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    color: #58cc02;
    font-weight: 700;
    font-size: 1.5rem;
  }

  &__logo-img {
    width: 2rem;
    height: 2rem;
  }

  &__logo-text {
    font-family: 'Nunito', sans-serif;
  }

  &__language-selector {
    @media (max-width: 768px) {
      display: none;
    }
  }

  &__mobile-menu {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    
    @media (max-width: 768px) {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    svg path {
      transition: stroke 0.2s;
    }

    &:hover svg path {
      stroke: #777;
    }
  }

  /* Mobile Drawer Styles */
  &__mobile-drawer {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100vh;
    background-color: white;
    z-index: 1000;
    transform: translateX(100%);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    flex-direction: column;

    &--open {
      transform: translateX(0);
    }
  }

  &__drawer-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }

  &__drawer-header {
    padding: 0.75rem 1rem;
    display: flex;
    justify-content: flex-end; // Close button on right
    border-bottom: 2px solid #f7f7f7;
  }

  &__close-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__drawer-body {
    padding: 1.5rem;
    flex: 1;
  }

  &__mobile-actions-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  &__drawer-btn {
    display: block;
    width: 100%;
    padding: 0.8rem;
    border-radius: 12px;
    font-size: 0.9rem;
    font-weight: 700;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    font-family: 'Nunito', sans-serif;
    letter-spacing: 0.8px;
    border: 2px solid transparent;
    cursor: pointer;

    &--primary {
      background-color: #58cc02;
      color: white;
      box-shadow: 0 4px 0 #46a302;
      border-color: #58cc02;

      &:active {
        box-shadow: none;
        transform: translateY(4px);
      }
    }

    &--secondary {
        background-color: white;
        color: #1cb0f6;
        border: 2px solid #e5e5e5;
        border-bottom-width: 4px;
  
        &:active {
          border-bottom-width: 2px;
          transform: translateY(2px);
        }
    }
  }

  &__drawer-lang-title {
    color: #afafaf;
    font-size: 0.875rem;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 1rem;
    font-family: 'Nunito', sans-serif;
  }

  &__drawer-languages {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__drawer-lang-item {
    margin-bottom: 0.5rem;
  }

  &__drawer-lang-link {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem;
    text-decoration: none;
    color: #4b4b4b;
    font-weight: 700;
    border-radius: 12px;
    transition: background-color 0.2s;

    &:hover {
      background-color: #f7f7f7;
    }
  }

  &__drawer-flag {
    width: 2rem;
    height: 2rem;
    border-radius: 4px;
  }

  &__drawer-lang-name {
    font-family: 'Nunito', sans-serif;
  }
}
</style>

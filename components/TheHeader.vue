<template>
  <header class="header">
    <div class="header__container">
      <nav class="header__nav">
        <a href="/" class="header__logo">
          <img src="/logo.svg" alt="Duolingo" class="header__logo-img" />
          <span class="header__logo-text">duolingo</span>
        </a>
      </nav>
      <LanguageSelector class="header__language-selector" />
    </div>
  </header>
</template>

<script setup lang="ts">
import LanguageSelector from './LanguageSelector.vue';
</script>

<style lang="scss" scoped>
.header {
  padding: 1.5rem 0;
  background-color: #ffffff;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    // Language selector styles
  }
}
</style>

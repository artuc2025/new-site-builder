<template>
  <section class="hero">
    <div class="hero__container">
      <div class="hero__illustration">
        <div class="hero__illustration-placeholder">
          <!-- Main hero illustration with characters -->
        </div>
      </div>
      <h1 class="hero__headline">
        The free, fun, and effective way to learn a language!
      </h1>
      <p class="hero__subheading">
        Learn 40+ languages with bite-sized lessons based on science.
      </p>
      <div class="hero__cta-group">
        <a href="/register" class="hero__cta hero__cta--primary">
          Get started
        </a>
        <button class="hero__cta hero__cta--secondary">
          I ALREADY HAVE AN ACCOUNT
        </button>
      </div>
      <LanguageFlags class="hero__flags" />
    </div>
  </section>
</template>

<script setup lang="ts">
import LanguageFlags from './LanguageFlags.vue';
</script>

<style lang="scss" scoped>
.hero {
  padding: 2.5rem 2rem;
  background-color: #ffffff;
  text-align: center;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
  }

  &__illustration {
    margin-bottom: 2rem;
  }

  &__illustration-placeholder {
    width: 100%;
    max-width: 600px;
    height: 400px;
    margin: 0 auto;
    background: linear-gradient(135deg, #58cc02 0%, #89e219 100%);
    border-radius: 16px;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80%;
      height: 80%;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="%23ffffff" opacity="0.3"/></svg>');
      background-size: cover;
    }
  }

  &__headline {
    font-size: 1.875rem;
    font-weight: 700;
    color: #1a1a1a;
    margin: 0 0 1rem 0;
    line-height: 1.3;
    font-family: 'Nunito', sans-serif;
  }

  &__subheading {
    font-size: 1.125rem;
    font-weight: 400;
    color: #1a1a1a;
    margin: 0 0 2rem 0;
    line-height: 1.5;
    font-family: 'Nunito', sans-serif;
  }

  &__cta-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    margin-bottom: 3rem;
  }

  &__cta {
    display: inline-block;
    padding: 1rem 2.5rem;
    border-radius: 16px;
    font-size: 1rem;
    font-weight: 700;
    text-decoration: none;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    font-family: 'Nunito', sans-serif;
    border: 2px solid transparent;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    &--primary {
      background-color: #58cc02;
      color: #ffffff;
      border-color: #58cc02;

      &:hover {
        background-color: #4db802;
      }
    }

    &--secondary {
      background-color: #ffffff;
      color: #58cc02;
      border-color: #58cc02;
      text-transform: uppercase;

      &:hover {
        background-color: #f5f5f5;
      }
    }
  }

  &__flags {
    margin-top: 2rem;
  }
}
</style>

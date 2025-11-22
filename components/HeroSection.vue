<template>
  <section class="hero">
    <div class="hero__container">
      <div class="hero__illustration" data-aos="zoom-in">
        <img 
          src="/hero-illustration.png" 
          alt="Duolingo language learning community"
          class="hero__image"
        />
      </div>
      <h1 class="hero__headline" data-aos="fade-up" data-aos-delay="100">
        The free, fun, and effective way to learn a language!
      </h1>
      <p class="hero__subheading" data-aos="fade-up" data-aos-delay="200">
        Learn 40+ languages with bite-sized lessons based on science.
      </p>
      <div class="hero__cta-group" data-aos="fade-up" data-aos-delay="300">
        <a href="/register" class="hero__cta hero__cta--primary">
          Get started
        </a>
        <button class="hero__cta hero__cta--secondary">
          I ALREADY HAVE AN ACCOUNT
        </button>
      </div>
      <LanguageFlags class="hero__flags" data-aos="fade-in" data-aos-delay="400" />
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
    display: flex;
    justify-content: center;
  }

  &__image {
    width: 100%;
    max-width: 600px;
    height: auto;
    animation: float 6s ease-in-out infinite;
  }

  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0px);
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
    transition: transform 0.1s cubic-bezier(0.25, 0.1, 0.25, 1), box-shadow 0.1s;
    font-family: 'Nunito', sans-serif;
    border: 2px solid transparent;
    min-width: 300px;
    text-align: center;
    letter-spacing: 0.8px;

    @media (max-width: 768px) {
      width: 100%;
      max-width: 360px;
      padding: 1rem 1rem;
    }

    &:active {
      transform: translateY(2px);
      box-shadow: none;
    }

    &:hover {
      transform: translateY(0);
      filter: brightness(1.1);
    }

    &--primary {
      background-color: #58cc02;
      color: #ffffff;
      border-color: #58cc02;
      box-shadow: 0 4px 0 #46a302;

      &:hover {
        background-color: #61e002;
        box-shadow: 0 4px 0 #46a302;
      }

      &:active {
        box-shadow: none;
        transform: translateY(4px);
      }
    }

    &--secondary {
      background-color: #ffffff;
      color: #1cb0f6;
      border: 2px solid #e5e5e5;
      border-bottom-width: 4px;
      text-transform: uppercase;

      &:hover {
        background-color: #f7f7f7;
        border-color: #e5e5e5;
      }

      &:active {
        border-bottom-width: 2px;
        transform: translateY(2px);
      }
    }
  }

  &__flags {
    margin-top: 2rem;
    
    @media (max-width: 768px) {
      display: none;
    }
  }
}
</style>

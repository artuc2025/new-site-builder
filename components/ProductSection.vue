<template>
  <section class="product-section">
    <div class="product-section__container" :class="`product-section__container--${reverse ? 'reverse' : 'normal'}`">
      <div class="product-section__content" :data-aos="reverse ? 'fade-left' : 'fade-right'">
        <h2 class="product-section__title">{{ title }}</h2>
        <p class="product-section__description">{{ description }}</p>
        <a :href="ctaUrl" class="product-section__cta">
          {{ ctaText }}
        </a>
      </div>
      <div class="product-section__illustration" :data-aos="reverse ? 'fade-right' : 'fade-left'">
        <img 
          :src="illustration" 
          alt="" 
          class="product-section__image"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description: string
  ctaText: string
  ctaUrl?: string
  illustration: string
  reverse?: boolean
}

withDefaults(defineProps<Props>(), {
  ctaUrl: '#',
  reverse: false
})
</script>

<style lang="scss" scoped>
.product-section {
  padding: 3rem 2rem;
  background-color: #ffffff;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 3rem;
      text-align: center;
    }

    &--reverse {
      direction: rtl;

      > * {
        direction: ltr;
      }

      @media (max-width: 768px) {
        direction: ltr;
      }
    }
  }

  &__content {
    text-align: left;

    @media (max-width: 768px) {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  &__title {
    font-size: 3rem;
    font-weight: 800;
    color: #58cc02;
    margin: 0 0 1rem 0;
    text-transform: lowercase;
    font-family: 'Nunito', sans-serif;
    line-height: 1.1;
  }

  &__description {
    font-size: 1.125rem;
    color: #1a1a1a;
    margin: 0 0 2rem 0;
    line-height: 1.6;
  }

  &__cta {
    display: inline-block;
    padding: 1rem 2.5rem;
    background-color: #58cc02;
    color: #ffffff;
    border: 2px solid #58cc02;
    border-radius: 16px;
    font-size: 1rem;
    font-weight: 700;
    text-transform: uppercase;
    text-decoration: none;
    transition: transform 0.1s cubic-bezier(0.25, 0.1, 0.25, 1), box-shadow 0.1s, background-color 0.1s;
    font-family: 'Nunito', sans-serif;
    letter-spacing: 0.8px;
    box-shadow: 0 4px 0 #46a302;

    &:hover {
      background-color: #61e002;
      box-shadow: 0 4px 0 #46a302;
      transform: translateY(0);
      filter: brightness(1.1);
    }
    
    &:active {
      box-shadow: none;
      transform: translateY(4px);
    }
  }

  &__illustration {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__image {
    width: 100%;
    max-width: 400px;
    height: auto;
  }
}
</style>

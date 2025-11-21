<template>
  <section class="product-section">
    <div class="product-section__container" :class="`product-section__container--${reverse ? 'reverse' : 'normal'}`">
      <div class="product-section__content">
        <h2 class="product-section__title">{{ title }}</h2>
        <p class="product-section__description">{{ description }}</p>
        <a :href="ctaUrl" class="product-section__cta">
          {{ ctaText }}
        </a>
      </div>
      <div class="product-section__illustration">
        <div :class="`product-section__illustration-placeholder product-section__illustration-placeholder--${illustration}`">
          <!-- Product illustration -->
        </div>
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

    &--reverse {
      direction: rtl;

      > * {
        direction: ltr;
      }
    }
  }

  &__content {
    text-align: left;
  }

  &__title {
    font-size: 1.75rem;
    font-weight: 700;
    color: #58cc02;
    margin: 0 0 1rem 0;
    text-transform: lowercase;
    font-family: 'Nunito', sans-serif;
  }

  &__description {
    font-size: 1.125rem;
    color: #1a1a1a;
    margin: 0 0 2rem 0;
    line-height: 1.6;
  }

  &__cta {
    display: inline-block;
    padding: 1rem 2rem;
    background-color: #1cb0f6;
    color: #ffffff;
    border: none;
    border-radius: 16px;
    font-size: 1rem;
    font-weight: 700;
    text-decoration: none;
    transition: transform 0.2s, box-shadow 0.2s, background-color 0.2s;
    font-family: 'Nunito', sans-serif;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      background-color: #0a9dd6;
    }
  }

  &__illustration {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__illustration-placeholder {
    width: 100%;
    max-width: 400px;
    height: 300px;
    border-radius: 16px;
    position: relative;
    overflow: hidden;

    &--product-1 {
      background: linear-gradient(135deg, #ffe66d 0%, #fff89a 100%);
    }

    &--product-2 {
      background: linear-gradient(135deg, #a8e6cf 0%, #c4f0db 100%);
    }

    &--product-3 {
      background: linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%);
    }

    &--product-4 {
      background: linear-gradient(135deg, #4ecdc4 0%, #6ee5dd 100%);
    }
  }
}
</style>

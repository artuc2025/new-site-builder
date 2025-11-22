<template>
  <section class="feature-section">
    <div class="feature-section__container" :class="`feature-section__container--${reverse ? 'reverse' : 'normal'}`">
      <div class="feature-section__content" :data-aos="reverse ? 'fade-left' : 'fade-right'">
        <h2 class="feature-section__title">{{ title }}</h2>
        <p class="feature-section__description">{{ description }}</p>
      </div>
      <div class="feature-section__illustration" :data-aos="reverse ? 'fade-right' : 'fade-left'">
        <img 
          :src="illustration" 
          alt="" 
          class="feature-section__image"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description: string
  illustration: string
  reverse?: boolean
}

withDefaults(defineProps<Props>(), {
  reverse: false
})
</script>

<style lang="scss" scoped>
.feature-section {
  padding: 3rem 2rem;
  background-color: #e8f4f8;

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
    display: flex;
    flex-direction: column;

    @media (max-width: 768px) {
      align-items: center;
      text-align: center;
    }
  }

  &__title {
    font-size: 1.625rem;
    font-weight: 700;
    color: #58cc02;
    margin: 0 0 1rem 0;
    text-transform: lowercase;
    font-family: 'Nunito', sans-serif;
  }

  &__description {
    font-size: 1rem;
    color: #1a1a1a;
    margin: 0;
    line-height: 1.6;
  }

  &__illustration {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__image {
    width: 100%;
    max-width: 500px;
    height: auto;
  }
}
</style>

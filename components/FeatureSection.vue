<template>
  <section class="feature-section">
    <div class="feature-section__container" :class="`feature-section__container--${reverse ? 'reverse' : 'normal'}`">
      <div class="feature-section__content">
        <h2 class="feature-section__title">{{ title }}</h2>
        <p class="feature-section__description">{{ description }}</p>
      </div>
      <div class="feature-section__illustration">
        <div :class="`feature-section__illustration-placeholder feature-section__illustration-placeholder--${illustration}`">
          <!-- Feature illustration -->
        </div>
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
  padding: 2.5rem 2rem;
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
    display: flex;
    flex-direction: column;
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

  &__illustration-placeholder {
    width: 100%;
    max-width: 500px;
    height: 300px;
    border-radius: 16px;
    position: relative;
    overflow: hidden;

    &--feature-1 {
      background: linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%);
    }

    &--feature-2 {
      background: linear-gradient(135deg, #4ecdc4 0%, #6ee5dd 100%);
    }

    &--feature-3 {
      background: linear-gradient(135deg, #ffe66d 0%, #fff89a 100%);
    }

    &--feature-4 {
      background: linear-gradient(135deg, #a8e6cf 0%, #c4f0db 100%);
    }
  }
}
</style>

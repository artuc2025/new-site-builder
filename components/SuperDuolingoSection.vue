<template>
  <section class="super-duolingo-section">
    <div class="super-duolingo-section__container">
      <div class="super-duolingo-section__illustration">
        <img 
          src="https://d35aaqx5ub95lt.cloudfront.net/images/splash/lottie/22fce01f6df43e0472d7585afad9a43a.svg" 
          alt="Super Duolingo" 
          class="super-duolingo-section__image"
        />
      </div>
      <div class="super-duolingo-section__content">
        <p class="super-duolingo-section__subtitle">POWER UP WITH</p>
        <h2 class="super-duolingo-section__title">SUPER DUOLINGO</h2>
        <p class="super-duolingo-section__description">
          Ad-free learning, unlimited Hearts, and more!
        </p>
        <button class="super-duolingo-section__cta">
          Try 1 week free
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.super-duolingo-section {
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
  }

  &__illustration {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__image {
    width: 100%;
    max-width: 300px;
    height: auto;
  }

  &__content {
    text-align: left;
  }

  &__subtitle {
    font-size: 0.875rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin: 0 0 1rem 0;
    opacity: 0.9;
  }

  &__title {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0 0 1rem 0;
    background: linear-gradient(135deg, #58cc02 0%, #1cb0f6 50%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-family: 'Nunito', sans-serif;
    text-transform: uppercase;
  }

  &__description {
    font-size: 1rem;
    font-weight: 400;
    margin: 0 0 2rem 0;
    line-height: 1.5;
    opacity: 0.95;
  }

  &__cta {
    padding: 1rem 2.5rem;
    background-color: #ffffff;
    color: #1a1a1a;
    border: none;
    border-radius: 16px;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    font-family: 'Nunito', sans-serif;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
  }
}
</style>

<template>
  <section class="final-cta-section">
    <div class="final-cta-section__container">
      <h2 class="final-cta-section__title">learn a language with duolingo</h2>
      <a href="/register" class="final-cta-section__cta">
        Get started
      </a>
      <div class="final-cta-section__illustration">
        <div class="final-cta-section__illustration-placeholder">
          <!-- Final CTA illustration -->
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.final-cta-section {
  padding: 4rem 2rem;
  background-color: #ffffff;
  text-align: center;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
  }

  &__title {
    font-size: 2rem;
    font-weight: 700;
    color: #1a1a1a;
    margin: 0 0 2rem 0;
    text-transform: lowercase;
    font-family: 'Nunito', sans-serif;
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
    text-decoration: none;
    text-transform: uppercase;
    transition: transform 0.2s, box-shadow 0.2s, background-color 0.2s;
    font-family: 'Nunito', sans-serif;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      background-color: #4db802;
    }
  }

  &__illustration {
    margin-top: 4rem;
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
  }
}
</style>

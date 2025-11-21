<template>
  <section class="mobile-app-section">
    <div class="mobile-app-section__container">
      <div class="mobile-app-section__content">
        <h2 class="mobile-app-section__title">learn anytime, anywhere</h2>
        <div class="mobile-app-section__badges">
          <a
            href="//itunes.apple.com/app/duolingo-learn-spanish-french/id570060128?mt=8"
            class="mobile-app-section__badge"
          >
            <img
              src="/app-store-badge.svg"
              alt="Download on the App Store"
              class="mobile-app-section__badge-img"
            />
            <span class="mobile-app-section__badge-text">
              <span>Download on the</span>
              <span class="mobile-app-section__badge-text--bold">App Store</span>
            </span>
          </a>
          <a
            href="//play.google.com/store/apps/details?hl=en&id=com.duolingo"
            class="mobile-app-section__badge"
          >
            <img
              src="/google-play-badge.svg"
              alt="Get it on Google Play"
              class="mobile-app-section__badge-img"
            />
            <span class="mobile-app-section__badge-text">
              <span>Get it on</span>
              <span class="mobile-app-section__badge-text--bold">Google Play</span>
            </span>
          </a>
        </div>
      </div>
      <div class="mobile-app-section__illustration">
        <div class="mobile-app-section__illustration-placeholder">
          <!-- Mobile devices illustration -->
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.mobile-app-section {
  padding: 3.5rem 2rem;
  background-color: #e8f4f8;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
  }

  &__content {
    text-align: left;
  }

  &__title {
    font-size: 1.875rem;
    font-weight: 700;
    color: #58cc02;
    margin: 0 0 2rem 0;
    text-transform: lowercase;
    font-family: 'Nunito', sans-serif;
  }

  &__badges {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__badge {
    display: flex;
    align-items: center;
    gap: 1rem;
    text-decoration: none;
    color: #333;
    padding: 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  }

  &__badge-img {
    width: 3rem;
    height: 3rem;
  }

  &__badge-text {
    display: flex;
    flex-direction: column;
    font-size: 0.875rem;

    &--bold {
      font-weight: 700;
      font-size: 1rem;
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
    height: 500px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 16px;
    position: relative;
    overflow: hidden;
  }
}
</style>

<template>
  <section class="mobile-app-section">
    <div class="mobile-app-section__container">
      <div class="mobile-app-section__content" data-aos="fade-right">
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
      <div class="mobile-app-section__illustration" data-aos="fade-left">
        <img 
          src="/mobile-illustration.png" 
          alt="Duolingo mobile app" 
          class="mobile-app-section__image"
        />
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

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 3rem;
      text-align: center;
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
    
    @media (max-width: 768px) {
      align-items: center;
    }
  }

  &__badge {
    display: flex;
    align-items: center;
    gap: 1rem;
    text-decoration: none;
    color: #333;
    padding: 0.75rem 1.5rem;
    background-color: #ffffff;
    border: 2px solid #e5e5e5;
    border-bottom-width: 4px;
    border-radius: 14px;
    transition: filter 0.2s;
    width: 200px;

    &:hover {
      filter: brightness(0.95);
      border-color: #cecece;
    }
    
    &:active {
      border-bottom-width: 2px;
      transform: translateY(2px);
    }
  }

  &__badge-img {
    width: 1.8rem;
    height: 1.8rem;
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

  &__image {
    width: 100%;
    max-width: 400px;
    height: auto;
    animation: float 6s ease-in-out infinite;
    animation-delay: 1s;
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
}
</style>

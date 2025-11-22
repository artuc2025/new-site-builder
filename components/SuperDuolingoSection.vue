<template>
  <section class="super-duolingo-section">
    <div class="super-duolingo-section__container">
      <div class="super-duolingo-section__illustration" data-aos="zoom-in">
        <img 
          src="https://d35aaqx5ub95lt.cloudfront.net/images/splash/lottie/22fce01f6df43e0472d7585afad9a43a.svg" 
          alt="Super Duolingo" 
          class="super-duolingo-section__image"
        />
      </div>
      <div class="super-duolingo-section__content" data-aos="fade-up">
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
  padding: 5rem 2rem;
  background-color: #101935;
  color: #ffffff;
  overflow: hidden;
  position: relative;

  // Add a subtle glow effect in the background
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, rgba(45, 55, 100, 0.4) 0%, transparent 70%);
    pointer-events: none;
  }

  &__container {
    max-width: 1000px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    position: relative;
    z-index: 1;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
      gap: 2rem;
      text-align: center;
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
    filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.1));
  }

  &__content {
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (max-width: 900px) {
      text-align: center;
      align-items: center;
    }
  }

  &__title {
    font-size: 3.5rem;
    font-weight: 800;
    margin: 0 0 1rem 0;
    font-family: 'Nunito', sans-serif; // Should be Feather Bold ideally
    color: #ffffff;
    text-shadow: 0 0 30px rgba(100, 200, 255, 0.3);
    letter-spacing: -0.02em;
    line-height: 1;
    
    // Attempting the iridescent effect
    background: linear-gradient(to right, #ff4b4b, #ff9600, #fff, #4b96ff, #c800ff);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shine 5s linear infinite;
  }

  @keyframes shine {
    to {
      background-position: 200% center;
    }
  }

  &__description {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0 0 2.5rem 0;
    line-height: 1.4;
    opacity: 0.9;
    max-width: 400px;
    
    @media (max-width: 900px) {
      margin-left: auto;
      margin-right: auto;
    }
  }

  &__cta {
    padding: 1rem 2rem;
    background-color: #ffffff;
    color: #101935;
    border: 2px solid #ffffff;
    border-radius: 16px;
    font-size: 1rem;
    font-weight: 800;
    cursor: pointer;
    transition: all 0.1s;
    font-family: 'Nunito', sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    width: fit-content;
    box-shadow: 0 4px 0 #d2d2d2;

    @media (max-width: 900px) {
      width: 100%;
      max-width: 300px;
    }

    &:hover {
      filter: brightness(0.95);
      transform: translateY(1px);
      box-shadow: 0 3px 0 #d2d2d2;
    }
    
    &:active {
      transform: translateY(4px);
      box-shadow: none;
    }
  }
}
</style>

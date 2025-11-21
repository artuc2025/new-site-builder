<template>
  <div class="app">
    <TheHeader />
    <main class="main">
      <HeroSection />
      <FeatureSection
        title="free. fun. effective."
        description="Learning with Duolingo is fun, and research shows that it works! With quick, bite-sized lessons, you'll earn points and unlock new levels while gaining real-world communication skills."
        illustration="feature-1"
      />
      <FeatureSection
        title="backed by science"
        description="We use a combination of research-backed teaching methods and delightful content to create courses that effectively teach reading, writing, listening, and speaking skills!"
        illustration="feature-2"
        :reverse="true"
      />
      <FeatureSection
        title="stay motivated"
        description="We make it easy to form a habit of language learning with game-like features, fun challenges, and reminders from our friendly mascot, Duo the owl."
        illustration="feature-3"
      />
      <FeatureSection
        title="personalized learning"
        description="Combining the best of AI and language science, lessons are tailored to help you learn at just the right level and pace."
        illustration="feature-4"
      />
      <MobileAppSection />
      <SuperDuolingoSection />
      <ProductSection
        title="duolingo english test"
        description="Our convenient, fast, and affordable English test integrates the latest assessment science and AI — empowering anyone to accurately test their English where and when they're at their best."
        cta-text="Certify your English"
        cta-url="https://englishtest.duolingo.com/en"
        illustration="product-1"
      />
      <ProductSection
        title="duolingo for schools"
        description="Teachers, we're here to help you! Our free tools support your students as they learn languages through the Duolingo app, both in and out of the classroom."
        cta-text="Get your class started"
        cta-url="https://schools.duolingo.com"
        illustration="product-2"
        :reverse="true"
      />
      <ProductSection
        title="duolingo abc"
        description="From language to literacy! With fun phonics lessons and delightful stories, Duolingo ABC helps kids ages 3–8 learn to read and write — 100% free."
        cta-text="Learn more about ABC"
        cta-url="/abc"
        illustration="product-3"
      />
      <ProductSection
        title="duolingo math"
        description="Our free, bite-sized approach — but for math! Fun lessons help students get ahead in their math classes, while adults can brain train to boost their mental math skills."
        cta-text="Get better at Math"
        cta-url="https://blog.duolingo.com/duolingo-launches-math-app"
        illustration="product-4"
        :reverse="true"
      />
      <FinalCtaSection />
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import FeatureSection from '../components/FeatureSection.vue';
import FinalCtaSection from '../components/FinalCtaSection.vue';
import HeroSection from '../components/HeroSection.vue';
import MobileAppSection from '../components/MobileAppSection.vue';
import ProductSection from '../components/ProductSection.vue';
import SuperDuolingoSection from '../components/SuperDuolingoSection.vue';
import TheFooter from '../components/TheFooter.vue';
import TheHeader from '../components/TheHeader.vue';
</script>

<style lang="scss">
@import '../assets/scss/main.scss';
</style>

<style lang="scss" scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1;
}
</style>
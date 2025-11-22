<template>
  <div class="app">
    <TheHeader />
    <main class="main">
      <HeroSection />
      <FeatureSection
        title="free. fun. effective."
        description="Learning with Duolingo is fun, and research shows that it works! With quick, bite-sized lessons, you'll earn points and unlock new levels while gaining real-world communication skills."
        illustration="https://d35aaqx5ub95lt.cloudfront.net/images/splash/lottie/23ab11cb1e1a9aff54facdf57833373d.svg"
      />
      <FeatureSection
        title="backed by science"
        description="We use a combination of research-backed teaching methods and delightful content to create courses that effectively teach reading, writing, listening, and speaking skills!"
        illustration="https://d35aaqx5ub95lt.cloudfront.net/images/splash/lottie/08ec8d0260c55c054e1b97bcbc96ea0f.svg"
        :reverse="true"
      />
      <FeatureSection
        title="stay motivated"
        description="We make it easy to form a habit of language learning with game-like features, fun challenges, and reminders from our friendly mascot, Duo the owl."
        illustration="https://d35aaqx5ub95lt.cloudfront.net/images/splash/lottie/833a22b2834050d139f266a29899bb00.svg"
      />
      <FeatureSection
        title="personalized learning"
        description="Combining the best of AI and language science, lessons are tailored to help you learn at just the right level and pace."
        illustration="https://d35aaqx5ub95lt.cloudfront.net/images/splash/lottie/9d3c2c99dd19996319a372f79b2ed3c1.svg"
      />
      <MobileAppSection />
      <SuperDuolingoSection />
      <ProductSection
        title="duolingo english test"
        description="Our convenient, fast, and affordable English test integrates the latest assessment science and AI — empowering anyone to accurately test their English where and when they're at their best."
        cta-text="Certify your English"
        cta-url="https://englishtest.duolingo.com/en"
        illustration="https://d35aaqx5ub95lt.cloudfront.net/images/splash/lottie/41a326f8a1a43ee68ef5ea35988fd87b.svg"
      />
      <ProductSection
        title="duolingo for schools"
        description="Teachers, we're here to help you! Our free tools support your students as they learn languages through the Duolingo app, both in and out of the classroom."
        cta-text="Get your class started"
        cta-url="https://schools.duolingo.com"
        illustration="https://d35aaqx5ub95lt.cloudfront.net/images/splash/lottie/9f63957bf97d10730813cbb715a0baa0.svg"
        :reverse="true"
      />
      <ProductSection
        title="duolingo abc"
        description="From language to literacy! With fun phonics lessons and delightful stories, Duolingo ABC helps kids ages 3–8 learn to read and write — 100% free."
        cta-text="Learn more about ABC"
        cta-url="/abc"
        illustration="https://d35aaqx5ub95lt.cloudfront.net/images/splash/lottie/268877aef1bcca8a53f24b746483346c.svg"
      />
      <ProductSection
        title="duolingo math"
        description="Our free, bite-sized approach — but for math! Fun lessons help students get ahead in their math classes, while adults can brain train to boost their mental math skills."
        cta-text="Get better at Math"
        cta-url="https://blog.duolingo.com/duolingo-launches-math-app"
        illustration="https://d35aaqx5ub95lt.cloudfront.net/images/splash/lottie/1dacb3e2a288440001755c6a30e5ec60.svg"
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
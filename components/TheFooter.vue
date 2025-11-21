<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__columns">
        <div class="footer__column">
          <h3 class="footer__column-title">About us</h3>
          <ul class="footer__links">
            <li><a href="/courses" class="footer__link">Courses</a></li>
            <li><a href="/info" class="footer__link">Mission</a></li>
            <li><a href="/approach" class="footer__link">Approach</a></li>
            <li><a href="/efficacy" class="footer__link">Efficacy</a></li>
            <li><a href="https://duolingo.com/handbook" class="footer__link">Duolingo Handbook</a></li>
            <li><a href="https://research.duolingo.com" class="footer__link">Research</a></li>
            <li><a href="https://careers.duolingo.com" class="footer__link">Careers</a></li>
            <li><a href="https://design.duolingo.com" class="footer__link">Brand guidelines</a></li>
            <li><a href="https://store.duolingo.com" class="footer__link">Store</a></li>
            <li><a href="https://press.duolingo.com" class="footer__link">Press</a></li>
            <li><a href="https://investors.duolingo.com" class="footer__link">Investors</a></li>
            <li><a href="/contact" class="footer__link">Contact us</a></li>
          </ul>
        </div>
        <div class="footer__column">
          <h3 class="footer__column-title">Help and support</h3>
          <ul class="footer__links">
            <li><a href="/help" class="footer__link">Duolingo FAQs</a></li>
            <li><a href="https://duolingoschools.zendesk.com" class="footer__link">Schools FAQs</a></li>
            <li><a href="https://englishtest.duolingo.com/faq" class="footer__link">Duolingo English Test FAQs</a></li>
            <li><a href="https://status.duolingo.com" class="footer__link">Status</a></li>
          </ul>
        </div>
        <div class="footer__column">
          <h3 class="footer__column-title">Products</h3>
          <ul class="footer__links">
            <li><a href="/" class="footer__link">Duolingo</a></li>
            <li><a href="https://schools.duolingo.com" class="footer__link">Duolingo for Schools</a></li>
            <li><a href="https://englishtest.duolingo.com" class="footer__link">Duolingo English Test</a></li>
            <li><a href="https://blog.duolingo.com/duolingo-launches-math-app" class="footer__link">Duolingo Math</a></li>
            <li><a href="https://podcast.duolingo.com" class="footer__link">Podcast</a></li>
            <li><a href="/business" class="footer__link">Duolingo for Business</a></li>
            <li><a href="/super" class="footer__link">Super Duolingo</a></li>
            <li><a href="/gift" class="footer__link">Gift Super Duolingo</a></li>
            <li><a href="https://blog.duolingo.com/duolingo-max" class="footer__link">Duolingo Max</a></li>
          </ul>
        </div>
        <div class="footer__column">
          <h3 class="footer__column-title">Privacy and terms</h3>
          <ul class="footer__links">
            <li><a href="/guidelines" class="footer__link">Community guidelines</a></li>
            <li><a href="/terms" class="footer__link">Terms</a></li>
            <li><a href="/privacy" class="footer__link">Privacy</a></li>
            <li><a href="/dnsspi" class="footer__link">Do Not Sell or Share My Personal Information</a></li>
          </ul>
        </div>
        <div class="footer__column">
          <h3 class="footer__column-title">Apps</h3>
          <ul class="footer__links">
            <li><a href="//play.google.com/store/apps/details?id=com.duolingo" class="footer__link">Duolingo for Android</a></li>
            <li><a href="//itunes.apple.com/app/duolingo-learn-spanish-french/id570060128" class="footer__link">Duolingo for iOS</a></li>
          </ul>
          <h3 class="footer__column-title">Social</h3>
          <ul class="footer__links">
            <li><a href="https://blog.duolingo.com" class="footer__link">Blog</a></li>
            <li><a href="https://www.instagram.com/duolingo" class="footer__link">Instagram</a></li>
            <li><a href="https://www.tiktok.com/@duolingo" class="footer__link">TikTok</a></li>
            <li><a href="https://twitter.com/duolingo" class="footer__link">Twitter</a></li>
            <li><a href="https://www.youtube.com/user/duolingo" class="footer__link">YouTube</a></li>
          </ul>
        </div>
      </div>
      <div class="footer__divider"></div>
      <div class="footer__bottom">
        <span class="footer__site-language-label">Site language:</span>
        <ul class="footer__language-list">
          <li v-for="lang in siteLanguages" :key="lang.code" class="footer__language-item">
            <a :href="lang.url" class="footer__language-link">{{ lang.name }}</a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const siteLanguages = [
  { code: 'ar', name: 'العربية', url: '//ar.duolingo.com' },
  { code: 'en', name: 'English', url: '//en.duolingo.com' },
  { code: 'es', name: 'Español', url: '//es.duolingo.com' },
  { code: 'fr', name: 'Français', url: '//fr.duolingo.com' },
  { code: 'de', name: 'Deutsch', url: '//de.duolingo.com' },
  { code: 'it', name: 'Italiano', url: '//it.duolingo.com' },
  { code: 'ja', name: '日本語', url: '//ja.duolingo.com' },
  { code: 'ko', name: '한국어', url: '//ko.duolingo.com' },
  { code: 'pt', name: 'Português', url: '//pt.duolingo.com' },
  { code: 'zh', name: '中文', url: '//zs.duolingo.com' },
]
</script>

<style lang="scss" scoped>
.footer {
  padding: 4rem 2rem 2rem;
  background-color: #f5f5f5;
  border-top: 1px solid #e0e0e0;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
  }

  &__columns {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
  }

  &__column {
    &-title {
      font-size: 0.875rem;
      font-weight: 700;
      color: #1a1a1a;
      margin: 0 0 1rem 0;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  }

  &__links {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__link {
    display: block;
    padding: 0.5rem 0;
    color: #666;
    text-decoration: none;
    font-size: 0.875rem;
    transition: color 0.2s;

    &:hover {
      color: #58cc02;
    }
  }

  &__divider {
    height: 1px;
    background-color: #e0e0e0;
    margin: 2rem 0;
  }

  &__bottom {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;
  }

  &__site-language-label {
    font-size: 0.875rem;
    color: #666;
    font-weight: 500;
  }

  &__language-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__language-item {
    margin: 0;
  }

  &__language-link {
    color: #58cc02;
    text-decoration: none;
    font-size: 0.875rem;
    transition: text-decoration 0.2s;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>

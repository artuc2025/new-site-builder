<template>
  <div class="language-flags">
    <ul class="language-flags__list">
      <li
        v-for="lang in languages"
        :key="lang.code"
        class="language-flags__item"
      >
        <a :href="lang.url" class="language-flags__link">
          <img :src="lang.flag" :alt="lang.name" class="language-flags__flag" />
          <span class="language-flags__name">{{ lang.name }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const languages = [
  { code: 'en', name: 'English', flag: '/flags/en.svg', url: '/course/en/en/Learn-English' },
  { code: 'es', name: 'Spanish', flag: '/flags/es.svg', url: '/course/es/en/Learn-Spanish' },
  { code: 'fr', name: 'French', flag: '/flags/fr.svg', url: '/course/fr/en/Learn-French' },
  { code: 'de', name: 'German', flag: '/flags/de.svg', url: '/course/de/en/Learn-German' },
  { code: 'it', name: 'Italian', flag: '/flags/it.svg', url: '/course/it/en/Learn-Italian' },
  { code: 'pt', name: 'Portuguese', flag: '/flags/pt.svg', url: '/course/pt/en/Learn-Portuguese' },
  { code: 'nl', name: 'Dutch', flag: '/flags/nl.svg', url: '/course/nl-NL/en/Learn-Dutch' },
  { code: 'ja', name: 'Japanese', flag: '/flags/ja.svg', url: '/course/ja/en/Learn-Japanese' },
  { code: 'ar', name: 'Arabic', flag: '/flags/ar.svg', url: '/course/ar/en/Learn-Arabic' },
  { code: 'zh', name: 'Chinese', flag: '/flags/zh.svg', url: '/course/zh/en/Learn-Chinese' },
  { code: 'ko', name: 'Korean', flag: '/flags/ko.svg', url: '/course/ko/en/Learn-Korean' },
]
</script>

<style lang="scss" scoped>
.language-flags {
  &__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__item {
    margin: 0;
  }

  &__link {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    color: #333;
    transition: transform 0.2s;

    &:hover {
      transform: translateY(-4px);
    }
  }

  &__flag {
    width: 2.5rem;
    height: 2rem;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &__name {
    font-size: 0.75rem;
    font-weight: 500;
    text-align: center;
  }
}
</style>




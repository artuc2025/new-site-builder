<template>
  <nav class="language-selector">
    <button class="language-selector__toggle" @click="toggleDropdown">
      <img src="/globe-icon.svg" alt="Language" class="language-selector__icon" />
    </button>
    <ul v-if="isOpen" class="language-selector__dropdown">
      <li
        v-for="lang in languages"
        :key="lang.code"
        class="language-selector__item"
      >
        <a :href="lang.url" class="language-selector__link">
          <img :src="lang.flag" :alt="lang.name" class="language-selector__flag" />
          <span class="language-selector__name">{{ lang.name }}</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)

const languages = [
  { code: 'en', name: 'English', flag: '/flags/en.svg', url: '/course/en/en/Learn-English' },
  { code: 'es', name: 'Spanish', flag: '/flags/es.svg', url: '/course/es/en/Learn-Spanish' },
  { code: 'fr', name: 'French', flag: '/flags/fr.svg', url: '/course/fr/en/Learn-French' },
  { code: 'de', name: 'German', flag: '/flags/de.svg', url: '/course/de/en/Learn-German' },
  { code: 'it', name: 'Italian', flag: '/flags/it.svg', url: '/course/it/en/Learn-Italian' },
  { code: 'pt', name: 'Portuguese', flag: '/flags/pt.svg', url: '/course/pt/en/Learn-Portuguese' },
  { code: 'ja', name: 'Japanese', flag: '/flags/ja.svg', url: '/course/ja/en/Learn-Japanese' },
  { code: 'zh', name: 'Chinese', flag: '/flags/zh.svg', url: '/course/zh/en/Learn-Chinese' },
]

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}
</script>

<style lang="scss" scoped>
.language-selector {
  position: relative;

  &__toggle {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    align-items: center;
  }

  &__icon {
    width: 1.5rem;
    height: 1.5rem;
  }

  &__dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    list-style: none;
    padding: 0.5rem 0;
    margin: 0;
    max-height: 400px;
    overflow-y: auto;
    z-index: 1000;
    min-width: 200px;
  }

  &__item {
    margin: 0;
  }

  &__link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    text-decoration: none;
    color: #333;
    transition: background-color 0.2s;

    &:hover {
      background-color: #f5f5f5;
    }
  }

  &__flag {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 2px;
  }

  &__name {
    font-size: 0.9rem;
  }
}
</style>


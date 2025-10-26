<script setup lang="ts">
import type { HeroProps } from '../../types/src/block-types'

export interface Props {
  id: string
  props: HeroProps
  style?: Record<string, any>
}

defineProps<Props>()
</script>

<template>
  <section
    :class="[
      'py-16 px-4 flex flex-col items-center text-center',
      style?.background?.color && `bg-${style.background.color}`
    ]"
    :style="style"
  >
    <h1 v-if="props.title.variant === 'h1'" class="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
      {{ props.title.text }}
    </h1>
    <h2 v-else-if="props.title.variant === 'h2'" class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
      {{ props.title.text }}
    </h2>
    <h3 v-else class="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
      {{ props.title.text }}
    </h3>
    
    <p v-if="props.subtitle.text" class="text-lg md:text-xl mb-8 max-w-2xl">
      {{ props.subtitle.text }}
    </p>
    
    <a
      v-if="props.cta"
      :href="props.cta.href"
      class="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
    >
      {{ props.cta.label }}
    </a>
    
    <img
      v-if="props.image?.assetId"
      :src="props.image.assetId"
      alt="Hero"
      class="mt-8 max-w-4xl w-full"
    />
  </section>
</template>


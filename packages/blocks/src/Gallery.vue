<script setup lang="ts">
import { computed } from 'vue'
import type { GalleryProps } from '../../types/src/block-types'

export interface Props {
  id: string
  props: GalleryProps
  style?: Record<string, any>
}

const props = defineProps<Props>()

const gridTemplateColumns = computed(() => {
  return `repeat(${props.props.columns}, 1fr)`
})
</script>

<template>
  <div
    :style="{
      display: 'grid',
      gridTemplateColumns,
      gap: `${props.props.gap}px`,
      ...style
    }"
  >
    <div
      v-for="(image, index) in props.props.images"
      :key="index"
      class="overflow-hidden rounded-lg"
    >
      <img
        :src="image.assetId"
        :alt="image.alt || `Image ${index + 1}`"
        class="w-full h-full object-cover"
      />
    </div>
  </div>
</template>

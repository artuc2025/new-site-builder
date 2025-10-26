<script setup lang="ts">
import type { ImageProps } from '../../types/src/block-types'

export interface Props {
  id: string
  props: ImageProps
  style?: Record<string, any>
}

defineProps<Props>()
</script>

<template>
  <img
    :src="props.assetId"
    :alt="props.alt"
    :class="[
      'w-full',
      {
        'object-contain': props.objectFit === 'contain',
        'object-cover': props.objectFit === 'cover',
        'object-fill': props.objectFit === 'fill',
        'object-none': props.objectFit === 'none',
        'object-scale-down': props.objectFit === 'scale-down'
      }
    ]"
    :style="style"
  />
</template>


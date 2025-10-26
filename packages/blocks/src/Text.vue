<script setup lang="ts">
import { computed } from 'vue'
import type { TextProps } from '../../types/src/block-types'

export interface Props {
  id: string
  props: TextProps
  style?: Record<string, any>
}

const props = defineProps<Props>()

const Tag = computed(() => {
  const variant = props.props.variant || 'p'
  return variant
})
</script>

<template>
  <component
    :is="Tag"
    :style="style"
    :class="[
      'mb-4',
      {
        'text-4xl font-bold mb-4': props.props.variant === 'h1',
        'text-3xl font-bold mb-4': props.props.variant === 'h2',
        'text-2xl font-semibold mb-3': props.props.variant === 'h3',
        'text-base text-gray-700': props.props.variant === 'p',
        'text-left': props.props.align === 'left',
        'text-center': props.props.align === 'center',
        'text-right': props.props.align === 'right',
        'text-justify': props.props.align === 'justify'
      }
    ]"
    v-html="props.props.content"
  />
</template>

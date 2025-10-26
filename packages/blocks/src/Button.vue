<script setup lang="ts">
import { computed } from 'vue'
import type { ButtonProps } from '../../types/src/block-types'

export interface Props {
  id: string
  props: ButtonProps
  style?: Record<string, any>
}

const props = defineProps<Props>()

const buttonClasses = computed(() => {
  return [
    'inline-block rounded-lg font-medium transition-colors',
    {
      'px-4 py-2 text-sm': props.props.size === 'sm',
      'px-6 py-3 text-base': props.props.size === 'md',
      'px-8 py-4 text-lg': props.props.size === 'lg',
      'bg-blue-600 text-white hover:bg-blue-700': props.props.variant === 'primary',
      'bg-gray-200 text-gray-900 hover:bg-gray-300': props.props.variant === 'secondary',
      'border-2 border-gray-300 text-gray-700 hover:border-gray-400': props.props.variant === 'outline'
    }
  ]
})
</script>

<template>
  <a
    :href="props.props.href"
    :style="style"
    :class="buttonClasses"
  >
    {{ props.props.label }}
  </a>
</template>

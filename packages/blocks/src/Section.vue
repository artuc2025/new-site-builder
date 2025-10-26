<script setup lang="ts">
import { computed } from 'vue'

export interface Props {
  id: string
  props: {
    grid?: {
      cols: number
      gap: number
    }
  }
  style?: Record<string, any>
}

const props = defineProps<Props>()

defineSlots<{
  default(): any
}>()

const gridColumns = computed(() => {
  const cols = props.props.grid?.cols || 3
  return `repeat(${cols}, 1fr)`
})

const gap = computed(() => {
  return props.props.grid?.gap || 16
})
</script>

<template>
  <section
    :class="['section']"
    :style="{
      display: 'grid',
      gridTemplateColumns: gridColumns,
      gap: `${gap}px`,
      ...style
    }"
  >
    <slot />
  </section>
</template>


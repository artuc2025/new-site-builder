<script setup lang="ts">
export interface Props {
  variant?: 'default' | 'outlined'
}

withDefaults(defineProps<Props>(), {
  variant: 'default'
})

defineSlots<{
  default(): any
  header?(): any
  footer?(): any
}>()
</script>

<template>
  <div
    :class="[
      'rounded-lg',
      variant === 'default' && 'bg-white shadow-md',
      variant === 'outlined' && 'border border-gray-200'
    ]"
  >
    <div v-if="$slots.header" class="px-6 py-4 border-b border-gray-200">
      <slot name="header" />
    </div>
    <div class="px-6 py-4">
      <slot />
    </div>
    <div v-if="$slots.footer" class="px-6 py-4 border-t border-gray-200">
      <slot name="footer" />
    </div>
  </div>
</template>


<script setup lang="ts">
export interface Props {
  open: boolean
  title?: string
}

defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()

defineSlots<{
  default(): any
  footer?(): any
}>()
</script>

<template>
  <teleport to="body">
    <transition name="modal">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
        @click="emit('close')"
      >
        <div
          class="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-hidden"
          @click.stop
        >
          <div v-if="title || $slots.header" class="px-6 py-4 border-b border-gray-200">
            <slot name="header">
              <h3 v-if="title" class="text-lg font-semibold text-gray-900">{{ title }}</h3>
            </slot>
          </div>
          <div class="px-6 py-4 overflow-y-auto max-h-[calc(90vh-120px)]">
            <slot />
          </div>
          <div v-if="$slots.footer" class="px-6 py-4 border-t border-gray-200">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>


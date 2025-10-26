<script setup lang="ts">
import type { PageTree } from '@site-builder/types'
import { useEditorStore } from '~/stores/editor'
import { Hero, Text, Image, Button, Gallery, Section } from '@site-builder/blocks'
import { h } from 'vue'

export interface Props {
  tree: PageTree
}

const props = defineProps<Props>()
const editor = useEditorStore()

const componentMap = {
  Hero,
  Text,
  Image,
  Button,
  Gallery,
  Section
}

function renderBlock(block: any) {
  const Component = componentMap[block.type as keyof typeof componentMap] as any
  
  if (!Component) {
    return h('div', { class: 'p-4 border border-red-300' }, `Unknown block: ${block.type}`)
  }

  return h(Component as any, {
    id: block.id,
    props: block.props,
    style: block.style
  } as any)
}
</script>

<template>
  <div class="relative" style="min-height: 600px;">
    <div
      v-for="block in tree.body"
      :key="block.id"
      class="absolute"
      :style="{
        left: block.frame?.x + 'px',
        top: block.frame?.y + 'px',
        width: block.frame?.width + 'px',
        height: block.frame?.height + 'px',
        zIndex: String(block.zIndex ?? 0)
      }"
    >
      <div
        class="w-full h-full"
        :class="{
          'ring-2 ring-blue-500': editor.selectedBlockIds.includes(block.id),
          'ring-1 ring-gray-300': !editor.selectedBlockIds.includes(block.id) && editor.hoveredBlockId === block.id
        }"
        @mouseenter="() => editor.setHovered(block.id)"
        @mouseleave="() => editor.setHovered(null)"
        @click.stop="(e) => editor.selectBlock(block.id, e.shiftKey)"
      >
        <component :is="() => renderBlock(block)" />
      </div>
    </div>
  </div>
</template>


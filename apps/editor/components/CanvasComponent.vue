<script setup lang="ts">
import type { PageTree } from '@site-builder/types'
import { Hero, Text, Image, Button, Gallery, Section } from '@site-builder/blocks'
import { h } from 'vue'

export interface Props {
  tree: PageTree
}

const props = defineProps<Props>()

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
      <component :is="() => renderBlock(block)" />
    </div>
  </div>
</template>


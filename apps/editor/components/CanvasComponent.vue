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
  const Component = componentMap[block.type as keyof typeof componentMap]
  
  if (!Component) {
    return h('div', { class: 'p-4 border border-red-300' }, `Unknown block: ${block.type}`)
  }

  return h(Component, {
    id: block.id,
    props: block.props,
    style: block.style
  })
}
</script>

<template>
  <div>
    <component
      v-for="block in tree.body"
      :key="block.id"
      :is="() => renderBlock(block)"
    />
  </div>
</template>


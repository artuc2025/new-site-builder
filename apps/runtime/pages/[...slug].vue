<script setup lang="ts">
import type { PageTree } from '@site-builder/types'
import { Hero, Text, Image, Button, Gallery } from '@site-builder/blocks'
import { h } from 'vue'

// In production, fetch page tree from API based on slug
const pageTree: PageTree = {
  version: 1,
  meta: {
    breakpoints: ['lg', 'md', 'sm']
  },
  body: [
    {
      id: 'hero_1',
      type: 'Hero',
      props: {
        title: {
          text: 'Welcome to Site Builder',
          variant: 'h1'
        },
        subtitle: {
          text: 'Build amazing websites with our no-code platform'
        },
        cta: {
          label: 'Get Started',
          href: '/editor'
        }
      }
    }
  ]
}

const componentMap = {
  Hero,
  Text,
  Image,
  Button,
  Gallery
}

function renderBlock(block: any) {
  const Component = componentMap[block.type as keyof typeof componentMap]
  
  if (!Component) {
    return h('div', { class: 'p-4' }, `Unknown block: ${block.type}`)
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
      v-for="block in pageTree.body"
      :key="block.id"
      :is="() => renderBlock(block)"
    />
  </div>
</template>


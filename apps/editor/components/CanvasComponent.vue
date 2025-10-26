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

function onPointerDown(e: PointerEvent) {
  const root = (e.currentTarget as HTMLElement)
  const rect = root.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const hit = (editor as any).getTopmostAtPoint(x, y)
  if (hit && hit.id) {
    editor.selectBlock(hit.id, e.shiftKey)
    try {
      root.setPointerCapture(e.pointerId)
    } catch {}
    editor.setInteractionMode('drag')
    ;(editor as any)._drag = {
      pointerId: e.pointerId,
      start: { x, y },
      initialFrames: editor.selectedBlockIds.map((id: string) => {
        const b = editor.tree.body.find((bb: any) => bb.id === id)
        return { id, frame: b?.frame ? { ...b.frame } : null }
      })
    }
  } else {
    editor.clearSelection()
  }
}

function onPointerMove(e: PointerEvent) {
  if (editor.interactionMode === 'drag') {
    const root = (e.currentTarget as HTMLElement)
    const rect = root.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const drag = (editor as any)._drag
    if (!drag) return
    let dx = x - drag.start.x
    let dy = y - drag.start.y
    // Snap deltas to 8px grid
    const grid = 8
    dx = Math.round(dx / grid) * grid
    dy = Math.round(dy / grid) * grid
    // Apply absolute positions based on initial frames to avoid compounding
    let updates = drag.initialFrames
      .filter((f: any) => f.frame)
      .map((f: any) => ({ id: f.id, x: f.frame.x + dx, y: f.frame.y + dy }))
    // Clamp to canvas bounds (0..rect width/height minus block size is not known; clamp origin to >=0)
    updates = updates.map((u: any) => ({ ...u, x: Math.max(0, u.x), y: Math.max(0, u.y) }))
    editor.setFramesAbsolute(updates)
  }
}
function onPointerUp(e: PointerEvent) {
  const root = (e.currentTarget as HTMLElement)
  try {
    root.releasePointerCapture(e.pointerId)
  } catch {}
  const wasDragging = editor.interactionMode === 'drag'
  ;(editor as any)._drag = undefined
  editor.setInteractionMode('idle')
  if (wasDragging) {
    editor.addToHistory()
  }
}
</script>

<template>
  <div class="relative" style="min-height: 600px;" @pointerdown="onPointerDown" @pointermove="onPointerMove" @pointerup="onPointerUp" @pointercancel="onPointerUp">
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


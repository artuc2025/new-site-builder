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
  console.log('[canvas] pointerdown', { x, y, hitId: hit?.id, shiftKey: e.shiftKey })
  if (hit && hit.id) {
    editor.selectBlock(hit.id, e.shiftKey)
    console.log('[canvas] select', editor.selectedBlockIds)
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
    console.log('[canvas] drag:start', (editor as any)._drag)
  } else {
    editor.clearSelection()
    console.log('[canvas] clearSelection')
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
    const dx = x - drag.start.x
    const dy = y - drag.start.y
    // Apply absolute positions based on initial frames to avoid compounding
    const updates = drag.initialFrames
      .filter((f: any) => f.frame)
      .map((f: any) => ({ id: f.id, x: f.frame.x + dx, y: f.frame.y + dy }))
    editor.setFramesAbsolute(updates)
  }
}
function onPointerUp(e: PointerEvent) {
  console.log('[canvas] pointerup', { mode: editor.interactionMode, pointerId: e.pointerId })
  const root = (e.currentTarget as HTMLElement)
  try {
    root.releasePointerCapture(e.pointerId)
  } catch {}
  const wasDragging = editor.interactionMode === 'drag'
  ;(editor as any)._drag = undefined
  editor.setInteractionMode('idle')
  if (wasDragging) {
    editor.addToHistory()
    console.log('[canvas] drag:commit')
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


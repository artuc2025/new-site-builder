<script setup lang="ts">
import type { PageTree } from '@site-builder/types'
import { useEditorStore } from '~/stores/editor'
import { Hero, Text, Image, Button, Gallery, Section } from '@site-builder/blocks'
import { h, ref } from 'vue'

export interface Props {
  tree: PageTree
}

const props = defineProps<Props>()
const editor = useEditorStore()

const marqueeRect = ref<{ x: number; y: number; width: number; height: number; visible: boolean }>({
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  visible: false
})

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

function selectWithRules(id: string, shiftKey: boolean) {
  const isSelected = editor.selectedBlockIds.includes(id)
  if (shiftKey) {
    editor.selectBlock(id, true)
    editor.selectedId = id
    return
  }
  if (!isSelected) {
    editor.selectBlock(id, false)
    return
  }
  // already selected and no shift: keep current multi-selection, just focus
  editor.selectedId = id
}

function onPointerDown(e: PointerEvent) {
  const root = (e.currentTarget as HTMLElement)
  const rect = root.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const hit = (editor as any).getTopmostAtPoint(x, y)
  if (hit && hit.id) {
    selectWithRules(hit.id, e.shiftKey)
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
    try {
      root.setPointerCapture(e.pointerId)
    } catch {}
    editor.clearSelection()
    editor.setInteractionMode('marquee')
    ;(editor as any)._marquee = {
      pointerId: e.pointerId,
      start: { x, y }
    }
    marqueeRect.value = { x, y, width: 0, height: 0, visible: true }
    
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
  } else if (editor.interactionMode === 'marquee') {
    const root = (e.currentTarget as HTMLElement)
    const rect = root.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const mq = (editor as any)._marquee
    if (!mq) return
    const left = Math.min(mq.start.x, x)
    const top = Math.min(mq.start.y, y)
    const width = Math.abs(x - mq.start.x)
    const height = Math.abs(y - mq.start.y)
    marqueeRect.value = { x: left, y: top, width, height, visible: true }
    
  }
}
function onPointerUp(e: PointerEvent) {
  const root = (e.currentTarget as HTMLElement)
  try {
    root.releasePointerCapture(e.pointerId)
  } catch {}
  const wasDragging = editor.interactionMode === 'drag'
  const wasMarquee = editor.interactionMode === 'marquee'
  ;(editor as any)._drag = undefined
  ;(editor as any)._marquee = undefined
  editor.setInteractionMode('idle')
  if (wasDragging) {
    editor.addToHistory()
  } else if (wasMarquee) {
    const r = marqueeRect.value
    if (r.visible && r.width > 0 && r.height > 0) {
      const blocks = (editor as any).getBlocksInRect(r.x, r.y, r.width, r.height) as any[]
      const ids = blocks.map(b => b.id)
      editor.selectedBlockIds = ids
      editor.selectedId = ids.length ? ids[0] : null
      
    }
    marqueeRect.value = { x: 0, y: 0, width: 0, height: 0, visible: false }
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
        @click.stop="(e) => selectWithRules(block.id, e.shiftKey)"
      >
        <component :is="() => renderBlock(block)" />
      </div>
    </div>
    <div
      v-if="marqueeRect.visible"
      class="absolute pointer-events-none border-2 border-blue-400/60 bg-blue-400/10"
      :style="{
        left: marqueeRect.x + 'px',
        top: marqueeRect.y + 'px',
        width: marqueeRect.width + 'px',
        height: marqueeRect.height + 'px',
        zIndex: '9999'
      }"
    />
  </div>
</template>


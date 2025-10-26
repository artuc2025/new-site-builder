<script setup lang="ts">
import type { PageTree } from '@site-builder/types'
import { useEditorStore } from '~/stores/editor'
import { Hero, Text, Image, Button, Gallery, Section } from '@site-builder/blocks'
import { h, ref } from 'vue'
import { snapToGrid, clampToCanvas } from '~/composables/geometry'

export interface Props {
  tree: PageTree
}

const props = defineProps<Props>()
const editor = useEditorStore()
const canvasRoot = ref<HTMLElement | null>(null)

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

function onResizeHandleDown(dir: string, block: any, e: PointerEvent) {
  e.stopPropagation()
  const root = canvasRoot.value
  if (!root) return
  root.focus()
  try {
    root.setPointerCapture(e.pointerId)
  } catch {}
  const rect = root.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  editor.setInteractionMode('resize')
  ;(editor as any)._resize = {
    pointerId: e.pointerId,
    dir,
    blockId: block.id,
    start: { x, y },
    baseFrame: block.frame ? { ...block.frame } : null
  }
}

function handleStyle(dir: string) {
  const size = 8
  const base: Record<string, string> = {
    width: size + 'px',
    height: size + 'px',
    position: 'absolute'
  }
  switch (dir) {
    case 'n':
      return { ...base, left: '50%', top: '-4px', transform: 'translateX(-50%)', cursor: 'ns-resize' }
    case 's':
      return { ...base, left: '50%', bottom: '-4px', transform: 'translateX(-50%)', cursor: 'ns-resize' }
    case 'e':
      return { ...base, top: '50%', right: '-4px', transform: 'translateY(-50%)', cursor: 'ew-resize' }
    case 'w':
      return { ...base, top: '50%', left: '-4px', transform: 'translateY(-50%)', cursor: 'ew-resize' }
    case 'ne':
      return { ...base, right: '-4px', top: '-4px', cursor: 'nesw-resize' }
    case 'nw':
      return { ...base, left: '-4px', top: '-4px', cursor: 'nwse-resize' }
    case 'se':
      return { ...base, right: '-4px', bottom: '-4px', cursor: 'nwse-resize' }
    case 'sw':
      return { ...base, left: '-4px', bottom: '-4px', cursor: 'nesw-resize' }
  }
  return base
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
  // focus canvas for keyboard handling
  root.focus()
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
    dx = snapToGrid(dx, grid)
    dy = snapToGrid(dy, grid)
    // Apply absolute positions based on initial frames to avoid compounding
    const updates = drag.initialFrames
      .filter((f: any) => f.frame)
      .map((f: any) => {
        const nx = f.frame.x + dx
        const ny = f.frame.y + dy
        const maxX = Math.max(0, rect.width - f.frame.width)
        const maxY = Math.max(0, rect.height - f.frame.height)
        return {
          id: f.id,
          x: clampToCanvas(nx, 0, maxX),
          y: clampToCanvas(ny, 0, maxY)
        }
      })
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
    
  } else if (editor.interactionMode === 'resize') {
    const root = (e.currentTarget as HTMLElement)
    const rect = root.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const rz = (editor as any)._resize
    if (!rz || !rz.baseFrame) return
    const grid = 8
    const dx = snapToGrid(x - rz.start.x, grid)
    const dy = snapToGrid(y - rz.start.y, grid)
    let { x: bx, y: by, width: bw, height: bh } = rz.baseFrame
    // adjust based on handle direction
    if (rz.dir.includes('e')) {
      bw = Math.max(32, bw + dx)
    }
    if (rz.dir.includes('s')) {
      bh = Math.max(32, bh + dy)
    }
    if (rz.dir.includes('w')) {
      const newW = Math.max(32, bw - dx)
      const deltaW = newW - bw
      bx = Math.max(0, bx - deltaW)
      bw = newW
    }
    if (rz.dir.includes('n')) {
      const newH = Math.max(32, bh - dy)
      const deltaH = newH - bh
      by = Math.max(0, by - deltaH)
      bh = newH
    }
    // clamp to canvas bounds on right/bottom
    const maxX = Math.max(0, rect.width - bw)
    const maxY = Math.max(0, rect.height - bh)
    bx = clampToCanvas(bx, 0, maxX)
    by = clampToCanvas(by, 0, maxY)
    // apply immutably via store
    editor.setFrameRect(rz.blockId, { x: bx, y: by, width: bw, height: bh })
  }
}
function onPointerUp(e: PointerEvent) {
  const root = (e.currentTarget as HTMLElement)
  try {
    root.releasePointerCapture(e.pointerId)
  } catch {}
  const wasDragging = editor.interactionMode === 'drag'
  const wasMarquee = editor.interactionMode === 'marquee'
  const wasResize = editor.interactionMode === 'resize'
  ;(editor as any)._drag = undefined
  ;(editor as any)._marquee = undefined
  ;(editor as any)._resize = undefined
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
  } else if (wasResize) {
    editor.addToHistory()
  }
}

function onKeyDown(e: KeyboardEvent) {
  const arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
  if (e.key === 'Escape') {
    editor.clearSelection()
    return
  }
  if (e.key === 'Delete' || e.key === 'Backspace') {
    if (editor.selectedBlockIds.length) {
      e.preventDefault()
      editor.deleteSelected()
    }
    return
  }
  if (!arrowKeys.includes(e.key)) return
  if (!editor.selectedBlockIds.length) return
  e.preventDefault()

  const step = e.shiftKey ? 10 : 1
  let dx = 0
  let dy = 0
  if (e.key === 'ArrowLeft') dx = -step
  if (e.key === 'ArrowRight') dx = step
  if (e.key === 'ArrowUp') dy = -step
  if (e.key === 'ArrowDown') dy = step

  // Compute absolute updates with clamping to canvas bounds
  const rect = canvasRoot.value?.getBoundingClientRect()
  const updates = editor.selectedBlockIds.map((id: string) => {
    const b = (editor.tree.body as any[]).find(bb => bb.id === id)
    const bx = (b?.frame?.x ?? 0) + dx
    const by = (b?.frame?.y ?? 0) + dy
    if (rect && b?.frame) {
      const maxX = Math.max(0, rect.width - b.frame.width)
      const maxY = Math.max(0, rect.height - b.frame.height)
      return { id, x: clampToCanvas(bx, 0, maxX), y: clampToCanvas(by, 0, maxY) }
    }
    return { id, x: clampToCanvas(bx, 0, Number.MAX_SAFE_INTEGER), y: clampToCanvas(by, 0, Number.MAX_SAFE_INTEGER) }
  })
  editor.setFramesAbsolute(updates)

  if (!(editor as any)._nudgeActive) {
    (editor as any)._nudgeActive = true
  }
}

function onKeyUp(e: KeyboardEvent) {
  const arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
  if (!arrowKeys.includes(e.key)) return
  if ((editor as any)._nudgeActive) {
    editor.addToHistory()
    ;(editor as any)._nudgeActive = false
  }
}
</script>

<template>
  <div ref="canvasRoot" class="relative" style="min-height: 600px;" tabindex="0" @keydown="onKeyDown" @keyup="onKeyUp" @pointerdown="onPointerDown" @pointermove="onPointerMove" @pointerup="onPointerUp" @pointercancel="onPointerUp">
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
        @click.stop.prevent="(e) => selectWithRules(block.id, e.shiftKey)"
      >
        <div class="pointer-events-none select-none">
          <component :is="() => renderBlock(block)" />
        </div>
        <template v-if="editor.selectedBlockIds.length === 1 && editor.selectedBlockIds[0] === block.id">
          <!-- resize handles -->
          <div class="absolute inset-0 pointer-events-none">
            <div
              v-for="dir in ['n','s','e','w','ne','nw','se','sw']"
              :key="dir"
              class="pointer-events-auto bg-white border border-blue-500 rounded-sm"
              :style="handleStyle(dir)"
              @pointerdown.stop="(e: PointerEvent) => onResizeHandleDown(dir as string, block, e)"
            />
          </div>
        </template>
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


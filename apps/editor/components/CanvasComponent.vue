<script setup lang="ts">
import type { PageTree } from '@site-builder/types'
import { useEditorStore } from '~/stores/editor'
import { Hero, Text, Image, Button, Gallery, Section } from '@site-builder/blocks'
import { h, ref, computed } from 'vue'
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

const showGrid = ref(false)
const interacting = computed(() => editor.interactionMode !== 'idle')

function setGlobalUserSelect(disabled: boolean) {
  try {
    const el = document.documentElement as HTMLElement
    if (disabled) {
      el.style.userSelect = 'none'
      ;(window.getSelection && window.getSelection())?.removeAllRanges?.()
    } else {
      el.style.userSelect = ''
    }
  } catch {}
}

const guideXs = ref<number[]>([])
const guideYs = ref<number[]>([])

// rAF throttling state for pointermove
let rafPending = false
let lastClientX = 0
let lastClientY = 0

// Ephemeral drag preview positions (absolute positions per block id)
const dragPreview = ref<Record<string, { x: number; y: number }>>({})

// Ephemeral resize preview rects (absolute rects per block id)
const resizePreview = ref<Record<string, { x: number; y: number; width: number; height: number }>>({})

function getPreviewTransform(block: any): string | undefined {
  if (editor.interactionMode !== 'drag') return undefined
  const prev = dragPreview.value[block.id]
  if (!prev || !block?.frame) return undefined
  const dx = (prev.x ?? block.frame.x) - block.frame.x
  const dy = (prev.y ?? block.frame.y) - block.frame.y
  if (dx === 0 && dy === 0) return undefined
  return `translate(${dx}px, ${dy}px)`
}

function getBlockStyle(block: any) {
  const base: Record<string, string> = {
    left: (block.frame?.x ?? 0) + 'px',
    top: (block.frame?.y ?? 0) + 'px',
    width: (block.frame?.width ?? 0) + 'px',
    height: (block.frame?.height ?? 0) + 'px',
    zIndex: String(block.zIndex ?? 0)
  }
  const rprev = resizePreview.value[block.id]
  if (rprev && block?.frame) {
    const dx = rprev.x - block.frame.x
    const dy = rprev.y - block.frame.y
    base.width = rprev.width + 'px'
    base.height = rprev.height + 'px'
    if (dx !== 0 || dy !== 0) {
      base.transform = `translate(${dx}px, ${dy}px)`
    }
    return base
  }
  const dprev = dragPreview.value[block.id]
  if (dprev && block?.frame) {
    const dx = dprev.x - block.frame.x
    const dy = dprev.y - block.frame.y
    if (dx !== 0 || dy !== 0) {
      base.transform = `translate(${dx}px, ${dy}px)`
    }
  }
  return base
}

function handlesVisible(block: any): boolean {
  if (editor.selectedBlockIds.length !== 1 || editor.selectedBlockIds[0] !== block.id) return false
  if (editor.hoveredBlockId === block.id) return true
  const rz = (editor as any)._resize
  if (editor.interactionMode === 'resize' && rz && rz.blockId === block.id) return true
  return false
}

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
  setGlobalUserSelect(true)
}

function handleStyle(dir: string) {
  const size = 6
  const base: Record<string, string> = {
    width: size + 'px',
    height: size + 'px',
    position: 'absolute'
  }
  const half = -(size / 2) + 'px'
  switch (dir) {
    case 'n':
      return { ...base, left: '50%', top: half, transform: 'translateX(-50%)', cursor: 'ns-resize' }
    case 's':
      return { ...base, left: '50%', bottom: half, transform: 'translateX(-50%)', cursor: 'ns-resize' }
    case 'e':
      return { ...base, top: '50%', right: half, transform: 'translateY(-50%)', cursor: 'ew-resize' }
    case 'w':
      return { ...base, top: '50%', left: half, transform: 'translateY(-50%)', cursor: 'ew-resize' }
    case 'ne':
      return { ...base, right: half, top: half, cursor: 'nesw-resize' }
    case 'nw':
      return { ...base, left: half, top: half, cursor: 'nwse-resize' }
    case 'se':
      return { ...base, right: half, bottom: half, cursor: 'nwse-resize' }
    case 'sw':
      return { ...base, left: half, bottom: half, cursor: 'nesw-resize' }
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
  if (editor.previewMode) return
  const root = (e.currentTarget as HTMLElement)
  // focus canvas for keyboard handling
  root.focus()
  const rect = root.getBoundingClientRect()
  const scale = (editor as any).canvasScale || 1
  const x = (e.clientX - rect.left) / scale
  const y = (e.clientY - rect.top) / scale
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
    setGlobalUserSelect(true)
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
    setGlobalUserSelect(true)
  }
}

function onPointerMove(e: PointerEvent) {
  if (editor.previewMode) return
  lastClientX = e.clientX
  lastClientY = e.clientY
  if (rafPending) return
  rafPending = true
  requestAnimationFrame(() => {
    rafPending = false
    const root = canvasRoot.value as HTMLElement | null
    if (!root) return
    const rect = root.getBoundingClientRect()
    const scale = (editor as any).canvasScale || 1
    const x = (lastClientX - rect.left) / scale
    const y = (lastClientY - rect.top) / scale

    if (editor.interactionMode === 'drag') {
      const drag = (editor as any)._drag
      if (!drag) return
      let dx = x - drag.start.x
      let dy = y - drag.start.y
      // Snap deltas to 8px grid (if enabled)
      if (editor.snapEnabled) {
        const grid = 8
        dx = snapToGrid(dx, grid)
        dy = snapToGrid(dy, grid)
      }
      // Apply absolute positions based on initial frames to avoid compounding
      const worldW = rect.width / scale
      const worldH = rect.height / scale
      let updates = drag.initialFrames
        .filter((f: any) => f.frame)
        .map((f: any) => {
          const nx = f.frame.x + dx
          const ny = f.frame.y + dy
          const maxX = Math.max(0, worldW - f.frame.width)
          const maxY = Math.max(0, worldH - f.frame.height)
          return {
            id: f.id,
            x: clampToCanvas(nx, 0, maxX),
            y: clampToCanvas(ny, 0, maxY)
          }
        })

      // Compute simple non-magnetic alignment guides (within threshold) against other blocks
      const tol = Math.max(0, editor.snapThreshold || 0)
      const selectedIds = new Set(editor.selectedBlockIds)
      const movingRects = drag.initialFrames
        .filter((f: any) => f.frame)
        .map((f: any) => {
          const u = updates.find((uu: any) => uu.id === f.id)
          const rx = (u?.x ?? f.frame.x)
          const ry = (u?.y ?? f.frame.y)
          return { x: rx, y: ry, width: f.frame.width, height: f.frame.height }
        })
      const selMinX = Math.min(...movingRects.map((r: any) => r.x))
      const selMinY = Math.min(...movingRects.map((r: any) => r.y))
      const selMaxX = Math.max(...movingRects.map((r: any) => r.x + r.width))
      const selMaxY = Math.max(...movingRects.map((r: any) => r.y + r.height))
      const selCX = (selMinX + selMaxX) / 2
      const selCY = (selMinY + selMaxY) / 2

      const others = (editor.tree.body as any[]).filter(b => !selectedIds.has((b as any).id) && (b as any).frame)
      const vx: number[] = []
      const hy: number[] = []
      for (const ob of others) {
        const f = (ob as any).frame
        const oL = f.x
        const oR = f.x + f.width
        const oC = f.x + f.width / 2
        const oT = f.y
        const oB = f.y + f.height
        const oM = f.y + f.height / 2
        // vertical guides (match x)
        if (Math.abs(selMinX - oL) <= tol) vx.push(oL)
        if (Math.abs(selMinX - oR) <= tol) vx.push(oR)
        if (Math.abs(selMaxX - oL) <= tol) vx.push(oL)
        if (Math.abs(selMaxX - oR) <= tol) vx.push(oR)
        if (Math.abs(selCX - oC) <= tol) vx.push(oC)
        // horizontal guides (match y)
        if (Math.abs(selMinY - oT) <= tol) hy.push(oT)
        if (Math.abs(selMinY - oB) <= tol) hy.push(oB)
        if (Math.abs(selMaxY - oT) <= tol) hy.push(oT)
        if (Math.abs(selMaxY - oB) <= tol) hy.push(oB)
        if (Math.abs(selCY - oM) <= tol) hy.push(oM)
      }
      // de-duplicate; show guides only when guides are enabled and snapping is on
      if (editor.snapEnabled && editor.guidesEnabled) {
        guideXs.value = Array.from(new Set(vx.map(v => Math.round(v))))
        guideYs.value = Array.from(new Set(hy.map(v => Math.round(v))))
      } else {
        guideXs.value = []
        guideYs.value = []
      }

      // Magnetic snapping to closest guide (within threshold)
      const threshold = Math.max(0, editor.snapThreshold || 0)
      let snapDx = 0
      let snapDy = 0
      if (others.length && editor.snapEnabled) {
        // compute best X snap (match left/right/center to other's left/right/center)
        let bestXDist = Number.POSITIVE_INFINITY
        let bestXDelta = 0
        for (const ob of others as any[]) {
          const f = (ob as any).frame
          const candidates: Array<{target:number, current:number}> = [
            { target: f.x, current: selMinX },
            { target: f.x + f.width, current: selMinX },
            { target: f.x, current: selMaxX },
            { target: f.x + f.width, current: selMaxX },
            { target: f.x + f.width / 2, current: selCX }
          ]
          for (const c of candidates) {
            const delta = c.target - c.current
            const dist = Math.abs(delta)
            if (dist <= threshold && dist < bestXDist) {
              bestXDist = dist
              bestXDelta = delta
            }
          }
        }
        if (bestXDist !== Number.POSITIVE_INFINITY) snapDx = bestXDelta

        // compute best Y snap (match top/bottom/middle)
        let bestYDist = Number.POSITIVE_INFINITY
        let bestYDelta = 0
        for (const ob of others as any[]) {
          const f = (ob as any).frame
          const candidates: Array<{target:number, current:number}> = [
            { target: f.y, current: selMinY },
            { target: f.y + f.height, current: selMinY },
            { target: f.y, current: selMaxY },
            { target: f.y + f.height, current: selMaxY },
            { target: f.y + f.height / 2, current: selCY }
          ]
          for (const c of candidates) {
            const delta = c.target - c.current
            const dist = Math.abs(delta)
            if (dist <= threshold && dist < bestYDist) {
              bestYDist = dist
              bestYDelta = delta
            }
          }
        }
        if (bestYDist !== Number.POSITIVE_INFINITY) snapDy = bestYDelta
      }

      if (editor.snapEnabled && (snapDx !== 0 || snapDy !== 0)) {
        // apply snap deltas and re-clamp per block
        updates = updates.map((u: any) => {
          const base = (drag.initialFrames as any[]).find(ff => ff.id === u.id)
          const width = base?.frame?.width ?? 0
          const height = base?.frame?.height ?? 0
          const maxX = Math.max(0, worldW - width)
          const maxY = Math.max(0, worldH - height)
          return {
            id: u.id,
            x: clampToCanvas(u.x + snapDx, 0, maxX),
            y: clampToCanvas(u.y + snapDy, 0, maxY)
          }
        })
      }
      // Update ephemeral preview positions instead of mutating the store
      const nextPreview: Record<string, { x: number; y: number }> = {}
      for (const u of updates as any[]) {
        nextPreview[u.id] = { x: u.x, y: u.y }
      }
      dragPreview.value = nextPreview
    } else if (editor.interactionMode === 'marquee') {
      const mq = (editor as any)._marquee
      if (!mq) return
      const left = Math.min(mq.start.x, x)
      const top = Math.min(mq.start.y, y)
      const width = Math.abs(x - mq.start.x)
      const height = Math.abs(y - mq.start.y)
      marqueeRect.value = { x: left, y: top, width, height, visible: true }
    } else if (editor.interactionMode === 'resize') {
      const rz = (editor as any)._resize
      if (!rz || !rz.baseFrame) return
      const grid = 8
      const dxRaw = x - rz.start.x
      const dyRaw = y - rz.start.y
      const dx = editor.snapEnabled ? snapToGrid(dxRaw, grid) : dxRaw
      const dy = editor.snapEnabled ? snapToGrid(dyRaw, grid) : dyRaw
      let { x: bx, y: by, width: bw, height: bh } = rz.baseFrame
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
    const maxX = Math.max(0, (rect.width / scale) - bw)
    const maxY = Math.max(0, (rect.height / scale) - bh)
      bx = clampToCanvas(bx, 0, maxX)
      by = clampToCanvas(by, 0, maxY)
      resizePreview.value = {
        ...resizePreview.value,
        [rz.blockId]: { x: bx, y: by, width: bw, height: bh }
      }
    }
  })
}
function onPointerUp(e: PointerEvent) {
  if (editor.previewMode) return
  const root = (e.currentTarget as HTMLElement)
  try {
    root.releasePointerCapture(e.pointerId)
  } catch {}
  setGlobalUserSelect(false)
  const wasDragging = editor.interactionMode === 'drag'
  const wasMarquee = editor.interactionMode === 'marquee'
  const wasResize = editor.interactionMode === 'resize'
  ;(editor as any)._drag = undefined
  ;(editor as any)._marquee = undefined
  ;(editor as any)._resize = undefined
  editor.setInteractionMode('idle')
  guideXs.value = []
  guideYs.value = []
  if (wasDragging) {
    // Commit the ephemeral preview to the store as a single history step
    const updates = Object.entries(dragPreview.value).map(([id, pos]) => ({ id, x: pos.x, y: pos.y }))
    if (updates.length) {
      editor.setFramesAbsolute(updates as any)
    }
    dragPreview.value = {}
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
    const entries = Object.entries(resizePreview.value)
    if (entries.length) {
      const [id, rect] = entries[0]
      editor.setFrameRect(id, rect as any)
    }
    resizePreview.value = {}
    editor.addToHistory()
  }
}

function onKeyDown(e: KeyboardEvent) {
  if (editor.previewMode) return
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
  const scale = (editor as any).canvasScale || 1
  const updates = editor.selectedBlockIds.map((id: string) => {
    const b = (editor.tree.body as any[]).find(bb => bb.id === id)
    const bx = (b?.frame?.x ?? 0) + dx
    const by = (b?.frame?.y ?? 0) + dy
    if (rect && b?.frame) {
      const maxX = Math.max(0, (rect.width / scale) - b.frame.width)
      const maxY = Math.max(0, (rect.height / scale) - b.frame.height)
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
  if (editor.previewMode) return
  const arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
  if (!arrowKeys.includes(e.key)) return
  if ((editor as any)._nudgeActive) {
    editor.addToHistory()
    ;(editor as any)._nudgeActive = false
  }
}
</script>

<template>
  <div ref="canvasRoot" class="relative" style="min-height: 600px; touch-action: none;" tabindex="0" @keydown="onKeyDown" @keyup="onKeyUp" @pointerdown="onPointerDown" @pointermove="onPointerMove" @pointerup="onPointerUp" @pointercancel="onPointerUp">
    <!-- Grid overlay (non-interactive) -->
    <div
      v-if="showGrid"
      class="absolute inset-0 pointer-events-none"
      :style="{
        backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)',
        backgroundSize: '8px 8px'
      }"
    />

    <!-- Toolbar -->
    <div class="absolute top-2 right-2 z-[10000]">
      <button
        class="px-2 py-1 text-xs bg-white/80 border border-gray-300 rounded shadow-sm hover:bg-white"
        @pointerdown.stop
        @click.stop="showGrid = !showGrid"
      >
        {{ showGrid ? 'Hide grid' : 'Show grid' }}
      </button>
      <button
        class="ml-2 px-2 py-1 text-xs bg-white/80 border border-gray-300 rounded shadow-sm hover:bg-white"
        @pointerdown.stop
        @click.stop="editor.toggleSnap()"
        :class="editor.snapEnabled ? 'border-emerald-400 text-emerald-700 bg-emerald-50' : ''"
      >
        {{ editor.snapEnabled ? 'Snap: On' : 'Snap: Off' }}
      </button>
      <button
        class="ml-2 px-2 py-1 text-xs bg-white/80 border border-gray-300 rounded shadow-sm hover:bg-white"
        @pointerdown.stop
        @click.stop="editor.toggleGuides()"
        :class="editor.guidesEnabled ? 'border-indigo-400 text-indigo-700 bg-indigo-50' : ''"
      >
        {{ editor.guidesEnabled ? 'Guides: On' : 'Guides: Off' }}
      </button>
      <label class="ml-2 inline-flex items-center gap-1 text-xs bg-white/80 border border-gray-300 rounded px-2 py-1 shadow-sm">
        <span>Threshold</span>
        <input
          type="number"
          min="0"
          max="32"
          step="1"
          :value="editor.snapThreshold"
          class="w-14 px-1 py-0.5 border rounded text-xs"
          @pointerdown.stop
          @click.stop
          @change="(e: any) => editor.setSnapThreshold(parseInt(e.target.value || '0', 10))"
        />
        <span>px</span>
      </label>
      <label class="ml-2 inline-flex items-center gap-1 text-xs bg-white/80 border border-gray-300 rounded px-2 py-1 shadow-sm">
        <span>Zoom</span>
        <button class="px-2 py-0.5 border rounded text-xs" @pointerdown.stop @click.stop="editor.zoomOut(0.25)">-</button>
        <span class="px-1 w-10 text-center">{{ Math.round(editor.canvasScale * 100) }}%</span>
        <button class="px-2 py-0.5 border rounded text-xs" @pointerdown.stop @click.stop="editor.zoomIn(0.25)">+</button>
        <button class="ml-1 px-2 py-0.5 border rounded text-xs" @pointerdown.stop @click.stop="editor.zoomReset()">100%</button>
      </label>
    </div>
    <div class="origin-top-left" :style="{ transform: 'scale(' + editor.canvasScale + ')', transformOrigin: 'top left' }">
      <div
        v-for="block in tree.body"
        :key="block.id"
        class="absolute"
        :style="getBlockStyle(block)"
      >
      <div
        class="w-full h-full transition-shadow"
        :class="{
          'ring-1 ring-blue-500/80 ring-offset-2 ring-offset-white shadow-[0_0_0_1px_rgba(59,130,246,0.6)]': !editor.previewMode && editor.selectedBlockIds.includes(block.id),
          'ring-1 ring-blue-400/60': !editor.previewMode && !editor.selectedBlockIds.includes(block.id) && editor.hoveredBlockId === block.id
        }"
        @mouseenter="() => { if (!editor.previewMode) editor.setHovered(block.id) }"
        @mouseleave="() => { if (!editor.previewMode) editor.setHovered(null) }"
        @click.stop.prevent="(e) => { if (!editor.previewMode) selectWithRules(block.id, e.shiftKey) }"
      >
        <div :class="editor.previewMode ? '' : 'pointer-events-none select-none'">
          <component :is="() => renderBlock(block)" />
        </div>
        <template v-if="editor.selectedBlockIds.length === 1 && editor.selectedBlockIds[0] === block.id">
          <!-- resize handles (hover-only with fade) -->
          <div class="absolute inset-0 pointer-events-none">
            <transition-group name="handles" tag="div">
              <div
                v-for="dir in handlesVisible(block) ? ['n','s','e','w','ne','nw','se','sw'] : []"
                :key="dir"
                class="pointer-events-auto bg-white/95 border border-blue-500 rounded-sm shadow-sm transition-transform duration-100 hover:scale-125 hover:border-blue-600"
                :style="handleStyle(dir)"
                @pointerdown.stop="(e: PointerEvent) => onResizeHandleDown(dir as string, block, e)"
              />
            </transition-group>
          </div>
        </template>
      </div>
    </div>
    <!-- Alignment guides -->
    <template v-for="gx in guideXs" :key="'gx-'+gx">
      <div class="absolute pointer-events-none bg-rose-500/80" :style="{ left: (gx * editor.canvasScale) + 'px', top: '0', width: '1px', height: '100%', zIndex: '9998' }" />
    </template>
    <template v-for="gy in guideYs" :key="'gy-'+gy">
      <div class="absolute pointer-events-none bg-rose-500/80" :style="{ top: (gy * editor.canvasScale) + 'px', left: '0', height: '1px', width: '100%', zIndex: '9998' }" />
    </template>
    <div
      v-if="marqueeRect.visible"
      class="absolute pointer-events-none border-2 border-dashed border-blue-500/70 bg-blue-500/10 rounded-sm"
      :style="{
        left: marqueeRect.x + 'px',
        top: marqueeRect.y + 'px',
        width: marqueeRect.width + 'px',
        height: marqueeRect.height + 'px',
        zIndex: '9999'
      }"
    />
  </div>
  </div>
</template>

<style scoped>
.handles-enter-active, .handles-leave-active {
  transition: opacity 120ms ease, transform 120ms ease;
}
.handles-enter-from, .handles-leave-to {
  opacity: 0;
}
</style>


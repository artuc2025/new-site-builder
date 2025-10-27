import { defineStore } from 'pinia'
import { produce, setAutoFreeze } from 'immer'
import type { PageTree, PageTreeBlock, Frame } from '@site-builder/types'
import { getBlockConfig } from '@site-builder/blocks'

// Disable Immer auto-freeze to allow direct mutations during interactions
setAutoFreeze(false)

export const useEditorStore = defineStore('editor', {
  state: () => ({
    tree: {
      version: 1,
      meta: {
        breakpoints: ['lg', 'md', 'sm'] as ('lg' | 'md' | 'sm')[]
      },
      body: []
    } as PageTree,
    selectedId: null as string | null,
    selectedBlockIds: [] as string[],
    hoveredBlockId: null as string | null,
    interactionMode: 'idle' as 'idle' | 'drag' | 'resize' | 'marquee',
    history: [] as PageTree[],
    historyIndex: -1 as number,
    breakpoint: 'lg' as 'lg' | 'md' | 'sm',
    idToIndex: {} as Record<string, number>,
    previewMode: false as boolean,
    snapEnabled: true as boolean,
    snapThreshold: 5 as number,
    guidesEnabled: true as boolean,
    canvasScale: 1 as number
  }),

  actions: {
    setCanvasScale(scale: number) {
      const min = 0.25
      const max = 3
      const next = Math.min(max, Math.max(min, Number(scale) || 1))
      ;(this as any).canvasScale = next
    },
    zoomIn(step = 0.1) {
      this.setCanvasScale(((this as any).canvasScale || 1) + step)
    },
    zoomOut(step = 0.1) {
      this.setCanvasScale(((this as any).canvasScale || 1) - step)
    },
    zoomReset() {
      this.setCanvasScale(1)
    },
    setSnapEnabled(enabled: boolean) {
      this.snapEnabled = enabled
    },
    toggleSnap() {
      this.snapEnabled = !this.snapEnabled
    },
    setGuidesEnabled(enabled: boolean) {
      ;(this as any).guidesEnabled = !!enabled
    },
    toggleGuides() {
      ;(this as any).guidesEnabled = !(this as any).guidesEnabled
    },
    setSnapThreshold(px: number) {
      const v = Math.max(0, Math.min(32, Math.round(px)))
      this.snapThreshold = v
    },
    setPreviewMode(enabled: boolean) {
      this.interactionMode = 'idle'
      this.selectedId = null
      this.selectedBlockIds = []
      this.previewMode = enabled
    },
    togglePreviewMode() {
      const next = !this.previewMode
      this.setPreviewMode(next)
    },
    rebuildIdIndexMap() {
      const map: Record<string, number> = {}
      ;(this.tree.body as any[]).forEach((b: any, i: number) => {
        if (b && typeof (b as any).id === 'string') map[(b as any).id] = i
      })
      this.idToIndex = map
    },
    initHistory() {
      // Initialize history with current state
      if (this.history.length === 0) {
        this.history.push(JSON.parse(JSON.stringify(this.tree)))
        this.historyIndex = 0
      }
    },

    deleteSelected() {
      if (!this.selectedBlockIds.length) return
      const ids = new Set(this.selectedBlockIds)
      this.tree = produce(this.tree, (draft => {
        const remaining = (draft.body as any[]).filter(b => !ids.has((b as any).id)) as any[]
        // reindex zIndex to maintain simple stacking order
        remaining.forEach((b, i) => { (b as any).zIndex = i })
        ;(draft as any).body = remaining as any
      }))
      this.rebuildIdIndexMap()
      this.clearSelection()
      this.addToHistory()
    },

    addToHistory() {
      // Save current state to history
      this.history = this.history.slice(0, this.historyIndex + 1)
      this.history.push(JSON.parse(JSON.stringify(this.tree)))
      this.historyIndex++
    },

    addBlock(type: string) {
      const config = getBlockConfig(type)
      console.log('Adding block:', config)
      if (!config) return

      const nextZ = this.tree.body.length
        ? Math.max(...(this.tree.body as any[]).map(b => (b as any).zIndex ?? 0)) + 1
        : 0
      const defaultFrame: Frame = (config as any).defaultFrame || { x: 40, y: 40, width: 320, height: 180 }

      const block: PageTreeBlock = {
        id: `${type.toLowerCase()}_${Date.now()}`,
        type: config.type,
        props: { ...config.defaultProps },
        style: config.defaultStyle,
        frame: { ...defaultFrame },
        zIndex: nextZ
      }

      this.tree = produce(this.tree, (draft) => {
        draft.body.push(block)
      })
      // update id→index map
      this.idToIndex[block.id] = (this.tree.body as any[]).length - 1
      // Auto-select newly added block and bring to front via zIndex
      this.selectBlock(block.id, false)
      this.addToHistory()
    },

    selectBlock(id: string, append = false) {
      this.selectedId = id
      if (append) {
        if (!this.selectedBlockIds.includes(id)) this.selectedBlockIds.push(id)
      } else {
        this.selectedBlockIds = [id]
      }
    },

    clearSelection() {
      this.selectedId = null
      this.selectedBlockIds = []
    },

    setHovered(id: string | null) {
      this.hoveredBlockId = id
    },

    setInteractionMode(mode: 'idle' | 'drag' | 'resize' | 'marquee') {
      this.interactionMode = mode
    },

    updateBlockProps(id: string, props: Record<string, any>) {
      const idx = this.idToIndex[id]
      this.tree = produce(this.tree, (draft => {
        const block = Number.isInteger(idx) ? (draft.body as any[])[idx as any] : draft.body.find((b) => b.id === id)
        if (block) {
          block.props = { ...block.props, ...props }
        }
      }))
      this.addToHistory()
    },

    undo() {
      if (this.historyIndex > 0) {
        this.historyIndex--
        this.tree = JSON.parse(JSON.stringify(this.history[this.historyIndex]))
        this.rebuildIdIndexMap()
      }
    },

    redo() {
      if (this.historyIndex < this.history.length - 1) {
        this.historyIndex++
        this.tree = JSON.parse(JSON.stringify(this.history[this.historyIndex]))
        this.rebuildIdIndexMap()
      }
    },

    setBreakpoint(breakpoint: 'lg' | 'md' | 'sm') {
      this.breakpoint = breakpoint
    },

    applyFrameDeltas(deltas: Array<{ id: string, dx: number, dy: number }>) {
      // Apply deltas to frames without touching history
      this.tree = produce(this.tree, (draft => {
        for (const { id, dx, dy } of deltas) {
          const idx = this.idToIndex[id]
          const b = Number.isInteger(idx) ? (draft.body as any[])[idx as any] : (draft.body as any[]).find(bb => bb.id === id)
          if (b && b.frame) {
            b.frame.x += dx
            b.frame.y += dy
          }
        }
      }))
    },

    setFramesAbsolute(updates: Array<{ id: string, x: number, y: number }>) {
      // Directly mutate for performance and to avoid Immer/Vue proxy issues
      for (const { id, x, y } of updates) {
        const idx = this.idToIndex[id]
        const b = Number.isInteger(idx) ? (this.tree.body as any[])[idx as any] : (this.tree.body as any[]).find(bb => bb.id === id)
        if (b && b.frame) {
          b.frame.x = x
          b.frame.y = y
        }
      }
    },

    setFrameRect(id: string, rect: { x?: number; y?: number; width?: number; height?: number }) {
      // Direct mutation to avoid Immer/Vue proxy conflicts during high-frequency updates
      const idx = this.idToIndex[id]
      const b = Number.isInteger(idx) ? (this.tree.body as any[])[idx as any] : (this.tree.body as any[]).find(bb => bb.id === id)
      if (b && b.frame) {
        if (typeof rect.x === 'number') b.frame.x = rect.x
        if (typeof rect.y === 'number') b.frame.y = rect.y
        if (typeof rect.width === 'number') b.frame.width = rect.width
        if (typeof rect.height === 'number') b.frame.height = rect.height
      }
    }
  },

  getters: {
    canUndo: (state) => state.historyIndex > 0,
    canRedo: (state) => state.historyIndex < state.history.length - 1,
    getBlockById: (state) => (id: string) => {
      const idx = (state as any).idToIndex?.[id]
      if (Number.isInteger(idx)) return (state.tree.body as any[])[idx as any] || null
      return (state.tree.body as any[]).find(b => (b as any).id === id) || null
    },
    getTopmostAtPoint: (state) => (x: number, y: number) => {
      const hits = state.tree.body.filter((b: any) => {
        const f = (b as any).frame
        if (!f) return false
        return x >= f.x && x <= f.x + f.width && y >= f.y && y <= f.y + f.height
      }) as any[]
      return hits.sort((a, b) => (a.zIndex ?? 0) - (b.zIndex ?? 0)).pop() || null
    },
    getBlocksInRect: (state) => (rx: number, ry: number, rw: number, rh: number) => {
      const r2x = rx + rw
      const r2y = ry + rh
      return state.tree.body.filter((b: any) => {
        const f = (b as any).frame
        if (!f) return false
        const b2x = f.x + f.width
        const b2y = f.y + f.height
        const intersects = !(b2x < rx || f.x > r2x || b2y < ry || f.y > r2y)
        return intersects
      }) as any[]
    }
  }
})


import { defineStore } from 'pinia'
import { produce } from 'immer'
import type { PageTree, PageTreeBlock, Frame } from '@site-builder/types'
import { getBlockConfig } from '@site-builder/blocks'

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
    history: [] as PageTree[],
    historyIndex: -1 as number,
    breakpoint: 'lg' as 'lg' | 'md' | 'sm'
  }),

  actions: {
    initHistory() {
      // Initialize history with current state
      if (this.history.length === 0) {
        this.history.push(JSON.parse(JSON.stringify(this.tree)))
        this.historyIndex = 0
      }
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

      this.addToHistory()
    },

    selectBlock(id: string) {
      this.selectedId = id
    },

    updateBlockProps(id: string, props: Record<string, any>) {
      this.tree = produce(this.tree, (draft => {
        const block = draft.body.find((b) => b.id === id)
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
      }
    },

    redo() {
      if (this.historyIndex < this.history.length - 1) {
        this.historyIndex++
        this.tree = JSON.parse(JSON.stringify(this.history[this.historyIndex]))
      }
    },

    setBreakpoint(breakpoint: 'lg' | 'md' | 'sm') {
      this.breakpoint = breakpoint
    }
  },

  getters: {
    canUndo: (state) => state.historyIndex > 0,
    canRedo: (state) => state.historyIndex < state.history.length - 1
  }
})


<template>
  <div class="h-screen flex flex-col">
    <!-- Top Toolbar -->
    <div class="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
      <div class="flex items-center gap-4">
        <h2 class="text-lg font-semibold">Page Editor</h2>
        <div class="flex gap-2">
          <select v-model="editor.breakpoint" class="px-3 py-1 border border-gray-300 rounded">
            <option value="lg">Desktop</option>
            <option value="md">Tablet</option>
            <option value="sm">Mobile</option>
          </select>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button
          @click="undo"
          :disabled="!canUndo"
          class="px-4 py-2 border rounded hover:bg-gray-50 disabled:opacity-50"
        >
          Undo
        </button>
        <button
          @click="redo"
          :disabled="!canRedo"
          class="px-4 py-2 border rounded hover:bg-gray-50 disabled:opacity-50"
        >
          Redo
        </button>
        <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Publish
        </button>
      </div>
    </div>

    <div class="flex flex-1 overflow-hidden">
      <!-- Sidebar -->
      <aside class="w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto">
        <h3 class="font-semibold mb-4">Components</h3>
        <div class="space-y-2">
          <button
            v-for="block in availableBlocks"
            :key="block.type"
            @click="addBlock(block.type)"
            class="w-full px-4 py-2 text-left border rounded hover:bg-gray-50 flex items-center gap-2"
          >
            <span class="text-xl">{{ block.icon }}</span>
            <span>{{ block.name }}</span>
          </button>
        </div>
      </aside>

      <!-- Canvas -->
      <main class="flex-1 bg-gray-50 overflow-auto editor-canvas">
        <div class="max-w-6xl mx-auto p-8 min-h-full bg-white">
          <CanvasComponent v-if="editor.tree" :tree="editor.tree" />
        </div>
      </main>

      <!-- Inspector Panel -->
      <aside class="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
        <h3 class="font-semibold mb-4">Properties</h3>
        <div v-if="editor.selectedId" class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Element ID</label>
            <input
              :value="editor.selectedId"
              disabled
              class="w-full px-3 py-2 border rounded bg-gray-50 text-gray-500"
            />
          </div>
        </div>
        <p v-else class="text-gray-500 text-sm">Select an element to edit properties</p>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useEditorStore } from '~/stores/editor'
import { getAllBlockConfigs } from '@site-builder/blocks'

const editor = useEditorStore()
const availableBlocks = getAllBlockConfigs()

// Initialize history on mount
onMounted(() => {
  editor.initHistory()
})

const canUndo = computed(() => editor.canUndo)
const canRedo = computed(() => editor.canRedo)

function undo() {
  editor.undo()
}

function redo() {
  editor.redo()
}

function addBlock(type: string) {
  editor.addBlock(type)
}
</script>


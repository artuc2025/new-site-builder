<template>
  <div class="min-h-screen bg-gray-100">
    <div class="max-w-4xl mx-auto py-16 px-4">
      <div class="text-center mb-12">
        <h1 class="text-5xl font-bold mb-4">🧱 Site Builder</h1>
        <p class="text-xl text-gray-600 mb-8">
          Visual no-code website builder in the style of Tilda/Webflow
        </p>
        <button
          @click="navigateToEditor"
          class="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Open Editor
        </button>
      </div>
      
      <div class="grid md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-lg shadow">
          <div class="text-3xl mb-2">🎯</div>
          <h3 class="text-lg font-semibold mb-2">Drag & Drop</h3>
          <p class="text-gray-600">Build pages with visual drag-and-drop interface</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow">
          <div class="text-3xl mb-2">⚡</div>
          <h3 class="text-lg font-semibold mb-2">Fast & Modern</h3>
          <p class="text-gray-600">Built with Nuxt 3 and Vue 3 for optimal performance</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow">
          <div class="text-3xl mb-2">🎨</div>
          <h3 class="text-lg font-semibold mb-2">Customizable</h3>
          <p class="text-gray-600">Full control over design with responsive breakpoints</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
function navigateToEditor() {
  if (typeof window !== 'undefined') {
    window.location.href = '/editor'
  }
}
</script>


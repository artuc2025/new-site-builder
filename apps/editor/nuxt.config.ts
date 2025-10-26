import { resolve } from 'path'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss'
  ],
  css: ['~/assets/css/main.css'],
  alias: {
    '@site-builder/types': resolve(__dirname, '../../packages/types/src'),
    '@site-builder/blocks': resolve(__dirname, '../../packages/blocks/src'),
    '@site-builder/ui': resolve(__dirname, '../../packages/ui/src'),
    '@site-builder/schemas': resolve(__dirname, '../../packages/schemas/src')
  }
})


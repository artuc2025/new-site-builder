import { resolve } from 'path'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  alias: {
    '@site-builder/types': resolve(__dirname, '../../packages/types/src'),
    '@site-builder/blocks': resolve(__dirname, '../../packages/blocks/src')
  }
})


/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueExamples from './src/vite-plugin-vue-examples'

export default defineConfig({
  plugins: [vue(), vueExamples()],
  build: {
    lib: {
      entry: 'src/vite-plugin-vue-examples.ts',
      fileName: 'vite-plugin-vue-examples',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vite'],
    },
  },
})

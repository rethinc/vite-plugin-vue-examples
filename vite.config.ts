import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import vueExamples from './src/vite-plugin-vue-examples'

export default defineConfig({
  plugins: [
    vue(),
    vueExamples({ globalStylesheets: ['/example/global.scss'] }),
    dts({ include: ['src/vite-plugin-vue-examples.ts'] }),
  ],
  build: {
    lib: {
      entry: 'src/vite-plugin-vue-examples.ts',
      fileName: 'vite-plugin-vue-examples',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vite', 'path', 'fs/promises'],
    },
  },
})

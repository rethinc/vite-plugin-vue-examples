import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import vueExamples from 'vite-plugin-vue-examples'

export default defineConfig({
  plugins: [
    vue(),
    vueExamples({
      globalStylesheetPaths: ['/src/global.scss'],
    }),
  ],
})

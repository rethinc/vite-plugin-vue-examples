import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import vueExamples from 'vite-plugin-vue-examples'
import { App } from 'vue'

export default defineConfig({
  plugins: [
    vue(),
    vueExamples({
      globalStylesheetPaths: ['/src/global.scss'],
      pluginHook: (app: App<Element>) => {
        console.log(app)
      },
    }),
  ],
})

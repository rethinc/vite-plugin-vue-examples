import vue from '@vitejs/plugin-vue'
import copy from 'rollup-plugin-copy'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    dts({ include: ['src/vite-plugin-vue-examples.ts'] }),
    copy({
      verbose: true,
      hook: 'writeBundle',
      targets: [
        {
          src: 'src/examples-app/index.html',
          dest: 'dist/examples-app/',
        },
        {
          src: '../LICENSE',
          dest: 'dist/',
        },
      ],
    }),
  ],
  build: {
    cssCodeSplit: true,
    lib: {
      entry: {
        'vite-plugin-vue-examples': 'src/vite-plugin-vue-examples.ts',
        'examples-app-main': 'src/examples-app/main.ts',
      },
      fileName: (format, entryName) => {
        console.log('fileName', format, entryName)
        if (entryName !== 'examples-app-main') {
          return `${entryName}.js`
        }
        return `examples-app/main.js`
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'vite',
        'path',
        'fs/promises',
        'url',
        'virtual:vue-examples-route-records',
      ],
      output: {
        assetFileNames: 'examples-app/styles.[ext]',
      },
    },
  },
})

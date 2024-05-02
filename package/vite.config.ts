import vue from "@vitejs/plugin-vue";
import copy from "rollup-plugin-copy";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    vue(),
    dts({ include: ["src/vite-plugin-vue-examples.ts"] }),
    copy({
      verbose: true,
      hook: "writeBundle",
      targets: [
        {
          src: "src/examples-app",
          dest: "dist/",
        },
      ],
    }),
  ],
  build: {
    lib: {
      entry: "src/vite-plugin-vue-examples.ts",
      fileName: "vite-plugin-vue-examples",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["vite", "path", "fs/promises", "url"],
    },
  },
});

declare module 'virtual:vue-examples-route-records' {
  import { RouteRecordRaw } from 'vue-router'

  export const routeRecords: RouteRecordRaw[]
}

declare module 'virtual:plugin-hook' {
  import { App } from 'vue'

  export const pluginHook: (app: App<Element>) => void
}

import * as path from 'path'
import { PluginOption } from 'vite'
import { mapExamplesToRoutes } from './map-examples-to-routes'
import { generateRouteRecordsJavascript } from './generate-route-records-javascript'

export interface VueExamplesPluginConfiguration {
  examplesRootPath: string
  exampleFileNameSuffix: string
}

export default (
  customConfiguration: Partial<VueExamplesPluginConfiguration> = {}
): PluginOption => {
  const { exampleFileNameSuffix = '.example.vue', examplesRootPath = './src' } =
    customConfiguration
  const configuration: VueExamplesPluginConfiguration = {
    examplesRootPath,
    exampleFileNameSuffix,
  }

  const routeRecordsId = 'virtual:vue-examples-route-records'
  const resolvedRouteRecordsId = '\0' + routeRecordsId

  return {
    name: 'vue-examples',
    configResolved(viteConfig) {
      configuration.examplesRootPath = path.resolve(
        viteConfig.root,
        configuration.examplesRootPath
      )
    },
    resolveId(id) {
      if (id === routeRecordsId) {
        return resolvedRouteRecordsId
      }
    },
    async load(id) {
      if (id === resolvedRouteRecordsId) {
        const routes = await mapExamplesToRoutes(
          configuration.examplesRootPath,
          configuration.exampleFileNameSuffix
        )
        return generateRouteRecordsJavascript(routes)
      }
    },
  }
}

import * as fsp from 'fs/promises'
import * as path from 'path'
import * as url from 'url'
import { PluginOption, send } from 'vite'

import { examplesAppMainFileTransformer } from './examples-app-main-file-transformer'
import { generateRouteRecordsJavascript } from './generate-route-records-javascript'
import { mapExamplesToRoutes } from './map-examples-to-routes'

export interface VueExamplesPluginConfiguration {
  examplesRootPath: string
  exampleFileNameSuffix: string
  examplesAppPath: string
  globalStylesheetPaths?: string[]
  pluginHook: string
}

const MODULE_PLUGIN_HOOK_ID = 'virtual:plugin-hook'
const RESOLVED_MODULE_PLUGIN_HOOK_ID = '\0' + MODULE_PLUGIN_HOOK_ID

export default (
  customConfiguration: Partial<VueExamplesPluginConfiguration> = {},
): PluginOption => {
  const {
    exampleFileNameSuffix = '.example.vue',
    examplesRootPath = '',
    examplesAppPath = 'vue-examples',
    globalStylesheetPaths = undefined,
    pluginHook = 'export const pluginHook = () => {}',
  } = customConfiguration
  const configuration: VueExamplesPluginConfiguration = {
    examplesRootPath,
    exampleFileNameSuffix,
    examplesAppPath: path.resolve('/', examplesAppPath) + '/',
    globalStylesheetPaths,
    pluginHook,
  }
  const routeRecordsId = 'virtual:vue-examples-route-records'
  const resolvedRouteRecordsId = '\0' + routeRecordsId
  const scriptDir = path.dirname(url.fileURLToPath(import.meta.url))
  const examplesAppDir = path.resolve(scriptDir, 'examples-app/')

  const mainFileTransformer = examplesAppMainFileTransformer(examplesAppDir)
  return {
    name: 'vue-examples',
    configResolved(viteConfig) {
      configuration.examplesRootPath = path.resolve(
        viteConfig.root,
        configuration.examplesRootPath,
      )
    },
    configureServer: (server) => {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === configuration.examplesAppPath) {
          const htmlFilePath = path.join(examplesAppDir, 'index.html')
          const htmlUrl = path.join(req.url, 'index.html')
          const originalHtml = await fsp.readFile(htmlFilePath, 'utf-8')
          const html = await server.transformIndexHtml(htmlUrl, originalHtml)
          send(req, res, html, 'html', {})
          return
        }
        next()
      })
      server.watcher.add(configuration.examplesRootPath)
      server.watcher.on('all', async (event, changedFilePath) => {
        if (
          ['add', 'unlink'].includes(event) &&
          changedFilePath.startsWith(configuration.examplesRootPath) &&
          changedFilePath.endsWith(configuration.exampleFileNameSuffix)
        ) {
          const module = server.moduleGraph.getModuleById(
            resolvedRouteRecordsId,
          )
          if (module) {
            server.moduleGraph.invalidateModule(module)
            server.hot.send({ type: 'full-reload' })
          }
        }
      })
    },

    async resolveId(id) {
      if (id == MODULE_PLUGIN_HOOK_ID) {
        return RESOLVED_MODULE_PLUGIN_HOOK_ID
      }
      if (id === routeRecordsId) {
        return resolvedRouteRecordsId
      }
      if (id.startsWith(configuration.examplesAppPath)) {
        const relativeFilePath = id.replace(configuration.examplesAppPath, '')
        const absoluteFilePath = path.join(examplesAppDir, relativeFilePath)
        const resolvedPath = await this.resolve(absoluteFilePath)
        return resolvedPath?.id ?? id
      }
    },
    async load(id) {
      if (id == RESOLVED_MODULE_PLUGIN_HOOK_ID) {
        return configuration.pluginHook
      }
      if (id === resolvedRouteRecordsId) {
        const routes = await mapExamplesToRoutes(
          configuration.examplesRootPath,
          configuration.exampleFileNameSuffix,
        )
        return generateRouteRecordsJavascript(routes)
      }
    },
    transform(src, id) {
      if (!configuration.globalStylesheetPaths) {
        return
      }
      if (mainFileTransformer.matchesId(id)) {
        return mainFileTransformer.addStyleSheet(
          src,
          configuration.globalStylesheetPaths,
        )
      }
    },
  }
}

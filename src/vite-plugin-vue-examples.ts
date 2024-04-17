import * as path from 'path'
import * as fsp from 'fs/promises'
import * as url from 'url'
import { PluginOption, send } from 'vite'
import { addStylesheetsToMainFile } from './add-stylesheets-to-main-file'
import { mapExamplesToRoutes } from './map-examples-to-routes'
import { generateRouteRecordsJavascript } from './generate-route-records-javascript'

export interface VueExamplesPluginConfiguration {
  examplesRootPath: string
  exampleFileNameSuffix: string
  examplesAppPath: string
  globalStylesheetPaths?: string[]
}

export default (
  customConfiguration: Partial<VueExamplesPluginConfiguration> = {}
): PluginOption => {
  const {
    exampleFileNameSuffix = '.example.vue',
    examplesRootPath = '',
    examplesAppPath = 'vue-examples',
    globalStylesheetPaths = undefined,
  } = customConfiguration
  const configuration: VueExamplesPluginConfiguration = {
    examplesRootPath,
    exampleFileNameSuffix,
    examplesAppPath: path.resolve('/', examplesAppPath) + '/',
    globalStylesheetPaths,
  }

  const routeRecordsId = 'virtual:vue-examples-route-records'
  const resolvedRouteRecordsId = '\0' + routeRecordsId
  const scriptFolder = path.dirname(url.fileURLToPath(import.meta.url))
  const examplesAppFolder = path.resolve(scriptFolder, 'examples-app/')

  return {
    name: 'vue-examples',
    configResolved(viteConfig) {
      configuration.examplesRootPath = path.resolve(
        viteConfig.root,
        configuration.examplesRootPath
      )
    },
    configureServer: (server) => {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === configuration.examplesAppPath) {
          const htmlFilePath = path.join(examplesAppFolder, 'index.html')
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
            resolvedRouteRecordsId
          )
          if (module) {
            server.moduleGraph.invalidateModule(module)
            server.hot.send({ type: 'full-reload' })
          }
        }
      })
    },

    async resolveId(id) {
      if (id === routeRecordsId) {
        return resolvedRouteRecordsId
      }
      if (id.startsWith(configuration.examplesAppPath)) {
        const relativeFilePath = id.replace(configuration.examplesAppPath, '')
        const absoluteFilePath = path.join(examplesAppFolder, relativeFilePath)
        const resolvedPath = await this.resolve(absoluteFilePath)
        return resolvedPath?.id ?? id
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
    transform(src, id) {
      if (!configuration.globalStylesheetPaths) {
        return
      }
      if (id == `${examplesAppFolder}/main.ts`) {
        return {
          code: addStylesheetsToMainFile(
            src,
            configuration.globalStylesheetPaths
          ),
        }
      }
    },
  }
}

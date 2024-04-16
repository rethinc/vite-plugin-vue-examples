import * as fsp from 'fs/promises'
import * as fs from 'fs'
import * as path from 'path'
import * as os from 'os'
import { beforeEach, describe, expect, it } from 'vitest'
import {
  mapExamplesToRoutes,
  ExampleRoute,
  GroupRoute,
  isGroupRoute,
  Route,
  isExampleRoute,
} from './map-examples-to-routes'

describe('mapExamplesToRoutes', () => {
  const rootFolder = path.resolve(os.tmpdir(), 'vue-examples-tests/')
  const vueExamplesSuffix = '.example.vue'

  beforeEach(async () => {
    if (fs.existsSync(rootFolder)) {
      await fsp.rm(rootFolder, { recursive: true, force: true })
    }
    await fsp.mkdir(rootFolder, { recursive: true })
  })

  it('should map examples files to example route', async () => {
    const exampleFile = 'Dummy.example.vue'
    await fsp.writeFile(path.resolve(rootFolder, exampleFile), '')

    const routes = await mapExamplesToRoutes(rootFolder, vueExamplesSuffix)

    const exampleRoute = routes[0] as ExampleRoute
    expect(exampleRoute).toStrictEqual({
      name: 'Dummy',
      importPath: path.resolve(rootFolder, exampleFile),
    })
  })

  it('should map folders with examples to group route', async () => {
    const exampleFolder = 'folder/'
    const exampleFile = 'Dummy.example.vue'
    await fsp.mkdir(path.resolve(rootFolder, exampleFolder), {
      recursive: true,
    })
    await fsp.writeFile(
      path.resolve(rootFolder, exampleFolder, exampleFile),
      ''
    )

    const routes = await mapExamplesToRoutes(rootFolder, vueExamplesSuffix)

    const groupRoute = routes[0] as GroupRoute
    expect(groupRoute.name).toBe('folder')
    expect(groupRoute.routes.length).toBe(1)
  })

  it('should not map folders without examples', async () => {
    const exampleFolder = 'folder/'
    await fsp.mkdir(path.resolve(rootFolder, exampleFolder), {
      recursive: true,
    })

    const routes = await mapExamplesToRoutes(rootFolder, vueExamplesSuffix)

    expect(routes.length).toBe(0)
  })
  describe('isGroupRoute and isExampleRoute', () => {
    it('should detect type GroupRoute', () => {
      const route: Route = { name: '', routes: [] }

      expect(isGroupRoute(route)).true
      expect(isExampleRoute(route)).false
    })

    it('should detect type ExampleRoute', () => {
      const route: Route = { name: '', importPath: '' }

      expect(isExampleRoute(route)).true
      expect(isGroupRoute(route)).false
    })
  })
})

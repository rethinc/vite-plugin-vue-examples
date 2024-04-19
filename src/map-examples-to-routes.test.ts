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
  const rootDir = path.resolve(os.tmpdir(), 'vue-examples-tests/')
  const vueExamplesSuffix = '.example.vue'

  beforeEach(async () => {
    if (fs.existsSync(rootDir)) {
      await fsp.rm(rootDir, { recursive: true, force: true })
    }
    await fsp.mkdir(rootDir, { recursive: true })
  })

  it('should map examples files to example route', async () => {
    const exampleFile = 'Dummy.example.vue'
    await fsp.writeFile(path.resolve(rootDir, exampleFile), '')

    const routes = await mapExamplesToRoutes(rootDir, vueExamplesSuffix)

    const exampleRoute = routes[0] as ExampleRoute
    expect(exampleRoute).toStrictEqual({
      name: 'Dummy',
      importPath: path.resolve(rootDir, exampleFile),
    })
  })

  it('should map directories with examples to group route', async () => {
    const exampleDir = 'dir/'
    const exampleFile = 'Dummy.example.vue'
    await fsp.mkdir(path.resolve(rootDir, exampleDir), {
      recursive: true,
    })
    await fsp.writeFile(path.resolve(rootDir, exampleDir, exampleFile), '')

    const routes = await mapExamplesToRoutes(rootDir, vueExamplesSuffix)

    const groupRoute = routes[0] as GroupRoute
    expect(groupRoute.name).toBe('dir')
    expect(groupRoute.routes.length).toBe(1)
  })

  it('should not map directories without examples', async () => {
    const exampleDir = 'dir/'
    await fsp.mkdir(path.resolve(rootDir, exampleDir), {
      recursive: true,
    })

    const routes = await mapExamplesToRoutes(rootDir, vueExamplesSuffix)

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

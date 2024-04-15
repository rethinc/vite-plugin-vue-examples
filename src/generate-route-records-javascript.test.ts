import { describe, it, expect } from 'vitest'
import { ExampleRoute } from './map-examples-to-routes'
import { generateRouteRecordsJavascript } from './generate-route-records-javascript'

describe('generateRouteRecordsJavascript', () => {
  it('should add import statement for ExampleRoute', () => {
    const exampleRoute: ExampleRoute = {
      name: 'Name',
      path: 'path',
      importPath: './import-path/Dummy.example.vue',
    }

    const javascript = generateRouteRecordsJavascript([exampleRoute])

    const expectedImport = `import Name from './import-path/Dummy.example.vue'`

    expect(javascript).toContain(expectedImport)
  })

  it('should add vue route record for ExampleRoute', () => {
    const exampleRoute: ExampleRoute = {
      name: 'Name',
      path: 'path',
      importPath: 'import-path/Dummy.example.vue',
    }

    const javascript = generateRouteRecordsJavascript([exampleRoute])

    const expectedRecord = `{path: 'path', component: Name}`
    expect(javascript).toContain(expectedRecord)
  })
})

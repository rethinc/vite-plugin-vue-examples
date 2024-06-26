import { describe, expect, it } from 'vitest'

import { generateRouteRecordsJavascript } from './generate-route-records-javascript'
import { ExampleRoute, GroupRoute } from './map-examples-to-routes'

describe('generateRouteRecordsJavascript', () => {
  it('should add import statement for ExampleRoute', () => {
    const exampleRoute: ExampleRoute = {
      name: 'Dummy',
      importPath: './import-path/Dummy.example.vue',
    }

    const javascript = generateRouteRecordsJavascript([exampleRoute])

    const expectedImport = `import Dummy from './import-path/Dummy.example.vue'`

    expect(javascript).toContain(expectedImport)
  })

  it('should add route record for ExampleRoute', () => {
    const exampleRoute: ExampleRoute = {
      name: 'ExampleName',
      importPath: 'import-path/Dummy.example.vue',
    }

    const javascript = generateRouteRecordsJavascript([exampleRoute])

    const expectedRecord = `{path: 'ExampleName', component: ExampleName},`
    expect(javascript).toContain(expectedRecord)
  })

  it('should add route record for ExampleGroupRoute', () => {
    const exampleRoute: ExampleRoute = {
      name: 'ExampleName',
      importPath: 'import-path/Dummy.example.vue',
    }
    const groupRoute: GroupRoute = {
      name: 'GroupName',
      routes: [exampleRoute],
    }

    const javascript = generateRouteRecordsJavascript([groupRoute])

    const expectedRecord = `{path: 'GroupName', children: [{path: 'ExampleName', component: ExampleName},]},`
    expect(javascript).toContain(expectedRecord)
  })
})

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

    const expectedImport = `import Dummy1 from './import-path/Dummy.example.vue'`

    expect(javascript).toContain(expectedImport)
  })

  it('should add route record for ExampleRoute', () => {
    const exampleRoute: ExampleRoute = {
      name: 'ExampleName',
      importPath: 'import-path/Dummy.example.vue',
    }

    const javascript = generateRouteRecordsJavascript([exampleRoute])

    const expectedRecord = `{path: 'ExampleName', component: ExampleName1},`
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

    const expectedRecord = `{path: 'GroupName', children: [{path: 'ExampleName', component: ExampleName1},]},`
    expect(javascript).toContain(expectedRecord)
  })

  it('should iterate over recursion', () => {
    const exampleRoute: ExampleRoute = {
      name: 'ExampleName',
      importPath: 'import-path/Dummy.example.vue',
    }
    const groupRoute: GroupRoute = {
      name: 'GroupName',
      routes: [exampleRoute],
    }
    const rootRoute: GroupRoute = {
      name: 'Root',
      routes: [groupRoute, exampleRoute],
    }

    const javascript = generateRouteRecordsJavascript([rootRoute])

    const expectedRecord = `{path: 'Root', children: [{path: 'GroupName', children: [{path: 'ExampleName', component: ExampleName1},]},{path: 'ExampleName', component: ExampleName2},]},`
    expect(javascript).toContain(expectedRecord)
  })
})

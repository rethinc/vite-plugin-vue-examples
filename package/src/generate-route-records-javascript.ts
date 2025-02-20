import { isExampleRoute, isGroupRoute, Route } from './map-examples-to-routes'

interface JavascriptData {
  imports: string
  records: string
}

const collectRouteRecordsForRoutes = (
  routes: Route[],
  javascriptData: JavascriptData,
  index: number = 1,
): number => {
  for (const route of routes) {
    const path = route.name
    if (isExampleRoute(route)) {
      const componentName = `${route.name}${index++}`
      javascriptData.imports += `import ${componentName} from '${route.importPath}'\n`
      javascriptData.records += `{path: '${path}', component: ${componentName}},`
    }
    if (isGroupRoute(route)) {
      javascriptData.records += `{path: '${path}', children: [`
      index = collectRouteRecordsForRoutes(route.routes, javascriptData, index)
      javascriptData.records += ']},'
    }
  }
  return index
}

export const generateRouteRecordsJavascript = (routes: Route[]) => {
  const javascriptData: JavascriptData = { imports: '', records: '' }
  collectRouteRecordsForRoutes(routes, javascriptData)
  return `
${javascriptData.imports}  
export const routeRecords = [${javascriptData.records}]
`
}

import { isExampleRoute, isGroupRoute, Route } from './map-examples-to-routes'

interface JavascriptData {
  imports: string
  records: string
}

const collectRouteRecordsForRoutes = (
  routes: Route[],
  javascriptData: JavascriptData
) => {
  for (const route of routes) {
    if (isExampleRoute(route)) {
      javascriptData.imports += `import ${route.name} from '${route.importPath}'\n`
      javascriptData.records += `{path: '${route.name}', component: ${route.name}},`
    }
    if (isGroupRoute(route)) {
      javascriptData.records += `{path: '${route.path}', children: [`
      collectRouteRecordsForRoutes(route.routes, javascriptData)
      javascriptData.records += ']},'
    }
  }
}

export const generateRouteRecordsJavascript = (routes: Route[]) => {
  const javascriptData: JavascriptData = { imports: '', records: '' }
  collectRouteRecordsForRoutes(routes, javascriptData)
  return `
${javascriptData.imports}  
export const routeRecords = [${javascriptData.records}]
`
}

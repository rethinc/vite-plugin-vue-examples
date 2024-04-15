import { isExampleRoute, Route } from './map-examples-to-routes'

export const generateRouteRecordsJavascript = (routes: Route[]) => {
  let records = ''
  let imports = ''
  for (const route of routes) {
    if (isExampleRoute(route)) {
      imports += `import ${route.name} from '${route.importPath}'\n`
      records += `{path: '${route.path}', component: ${route.name}}`
    }
  }

  return `
${imports}  
export const routeRecords = [${records}]
`
}

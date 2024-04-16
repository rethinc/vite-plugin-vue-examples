import { RouteRecordRaw } from 'vue-router'

export const firstExamplePath = (routeRecords: RouteRecordRaw[]): string => {
  const exampleRoute = routeRecords.find(
    (routeRecord) => !!routeRecord.component
  )
  if (exampleRoute !== undefined) {
    return exampleRoute.path
  }
  for (const route of routeRecords) {
    if (route.children !== undefined) {
      const examplePath = firstExamplePath(route.children)
      if (examplePath !== '') {
        return route.path + '/' + examplePath
      }
    }
  }

  return ''
}

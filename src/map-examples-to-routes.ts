import * as path from 'path'
import * as fsp from 'fs/promises'

export type Route = GroupRoute | ExampleRoute

export interface GroupRoute {
  path: string
  routes: Route[]
}

export interface ExampleRoute {
  path: string
  importPath: string
}

export const isGroupRoute = (route: Route): route is GroupRoute => {
  return (route as GroupRoute).routes !== undefined
}

export const isExampleRoute = (route: Route): route is ExampleRoute => {
  return (route as ExampleRoute).importPath !== undefined
}

export const mapExamplesToRoutes = async (
  examplesRootPath: string,
  examplesFileSuffix: string
): Promise<Route[]> => {
  return mapExamplesToRoutesRecursively(examplesRootPath, examplesFileSuffix)
}

const routeExample = (
  filePath: string,
  fileName: string,
  examplesFileSuffix: string
): ExampleRoute => {
  const path = fileName.replace(examplesFileSuffix, '').toLowerCase()
  return {
    path,
    importPath: filePath,
  }
}

const routeGroup = async (
  folderPath: string,
  folderName: string,
  examplesFileSuffix: string
): Promise<GroupRoute | null> => {
  const subRoutes = await mapExamplesToRoutesRecursively(
    folderPath,
    examplesFileSuffix
  )
  if (subRoutes.length === 0) {
    return null
  }
  return {
    path: folderName,
    routes: subRoutes,
  }
}

const mapExamplesToRoutesRecursively = async (
  examplesDirectory: string,
  examplesFileSuffix: string
): Promise<Route[]> => {
  const contents = await fsp.readdir(examplesDirectory)
  const routes: Route[] = []
  for (const fileOrFolderName of contents) {
    const fileOrFolderPath = path.join(examplesDirectory, fileOrFolderName)
    const lstat = await fsp.lstat(fileOrFolderPath)
    if (lstat.isFile() && fileOrFolderName.endsWith(examplesFileSuffix)) {
      const route = routeExample(
        fileOrFolderPath,
        fileOrFolderName,
        examplesFileSuffix
      )
      routes.push(route)
    }
    if (lstat.isDirectory()) {
      const route = await routeGroup(
        fileOrFolderPath,
        fileOrFolderName,
        examplesFileSuffix
      )
      if (route) {
        routes.push(route)
      }
    }
  }
  return routes
}

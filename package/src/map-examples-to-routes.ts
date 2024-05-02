import * as fsp from "fs/promises";
import * as path from "path";

export type Route = GroupRoute | ExampleRoute;

export interface GroupRoute {
  name: string;
  routes: Route[];
}

export interface ExampleRoute {
  name: string;
  importPath: string;
}

export const isGroupRoute = (route: Route): route is GroupRoute => {
  return (route as GroupRoute).routes !== undefined;
};

export const isExampleRoute = (route: Route): route is ExampleRoute => {
  return (route as ExampleRoute).importPath !== undefined;
};

export const mapExamplesToRoutes = async (
  examplesRootPath: string,
  examplesFileSuffix: string,
): Promise<Route[]> => {
  return mapExamplesToRoutesRecursively(examplesRootPath, examplesFileSuffix);
};

const routeExample = (
  filePath: string,
  fileName: string,
  examplesFileSuffix: string,
): ExampleRoute => {
  const name = fileName.replace(examplesFileSuffix, "");
  return {
    name,
    importPath: filePath,
  };
};

const routeGroup = async (
  dirPath: string,
  dirName: string,
  examplesFileSuffix: string,
): Promise<GroupRoute | null> => {
  const subRoutes = await mapExamplesToRoutesRecursively(
    dirPath,
    examplesFileSuffix,
  );
  if (subRoutes.length === 0) {
    return null;
  }
  return {
    name: dirName,
    routes: subRoutes,
  };
};

const mapExamplesToRoutesRecursively = async (
  examplesDirectory: string,
  examplesFileSuffix: string,
): Promise<Route[]> => {
  const contents = await fsp.readdir(examplesDirectory);
  const routes: Route[] = [];
  for (const fileOrDirName of contents) {
    const fileOrDirPath = path.join(examplesDirectory, fileOrDirName);
    const lstat = await fsp.lstat(fileOrDirPath);
    if (lstat.isFile() && fileOrDirName.endsWith(examplesFileSuffix)) {
      const route = routeExample(
        fileOrDirPath,
        fileOrDirName,
        examplesFileSuffix,
      );
      routes.push(route);
    }
    if (lstat.isDirectory()) {
      const route = await routeGroup(
        fileOrDirPath,
        fileOrDirName,
        examplesFileSuffix,
      );
      if (route) {
        routes.push(route);
      }
    }
  }
  return routes;
};

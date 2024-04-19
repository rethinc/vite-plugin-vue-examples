export const examplesAppMainFileTransformer = (examplesAppDir: string) => {
  const matchesId = (id: string) => {
    return id.startsWith(`${examplesAppDir}/main.ts`)
  }

  const addStyleSheet = (
    mainSource: string,
    stylesheetPaths: string[]
  ): string => {
    let stylesheetImports = ''
    for (const stylesheetPath of stylesheetPaths) {
      stylesheetImports += `import '${stylesheetPath}'\n`
    }
    return `${stylesheetImports}` + mainSource
  }

  return {
    matchesId,
    addStyleSheet,
  }
}

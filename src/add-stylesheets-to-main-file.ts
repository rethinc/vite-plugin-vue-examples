export const addStylesheetsToMainFile = (
  mainSource: string,
  stylesheetPaths: string[]
) => {
  let stylesheetImports = ''
  for (const stylesheetPath of stylesheetPaths) {
    stylesheetImports += `import '${stylesheetPath}'\n`
  }
  return `${stylesheetImports}` + mainSource
}

import { describe, expect, it } from 'vitest'

import { examplesAppMainFileTransformer } from './examples-app-main-file-transformer'

describe('examplesAppMainFileTransformer', () => {
  describe('matchesId', () => {
    it('should match id', () => {
      const examplesAppDir = '/examplesApp'
      const transformer = examplesAppMainFileTransformer(examplesAppDir)

      const matches = transformer.matchesId(`${examplesAppDir}/main.js`)

      expect(matches).toBe(true)
    })
    it('should match id when query string is added', () => {
      const examplesAppDir = '/examplesApp'
      const transformer = examplesAppMainFileTransformer(examplesAppDir)

      const matches = transformer.matchesId(`${examplesAppDir}/main.js?id=123`)

      expect(matches).toBe(true)
    })
    it('should not match id for other file', () => {
      const examplesAppDir = '/examplesApp'
      const transformer = examplesAppMainFileTransformer(examplesAppDir)

      const matches = transformer.matchesId(`${examplesAppDir}/App.vue`)

      expect(matches).toBe(false)
    })
  })

  describe('addStyleSheet', () => {
    it('should add style sheets on top', () => {
      const transformer = examplesAppMainFileTransformer('any')
      const stylesheetPaths = ['global.scss', '@dir/global.scss']

      const transformedMainSource = transformer.addStyleSheet(
        'code',
        stylesheetPaths,
      )

      expect(transformedMainSource).toBe(
        `import 'global.scss'\nimport '@dir/global.scss'\ncode`,
      )
    })
  })
})

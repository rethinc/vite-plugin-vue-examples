import { describe, expect, it } from 'vitest'
import { RouteRecordRaw } from 'vue-router'
import { Component } from 'vue'
import { firstExamplePath } from './first-example-path'

const dummyComponent: Component = {}

describe('firstExamplePath', () => {
  it('should return path of example route', () => {
    const routeRecords: RouteRecordRaw[] = [
      {
        path: 'group',
        children: [{ path: 'NestedExample', component: dummyComponent }],
      },
      { path: 'Example', component: dummyComponent },
    ]

    const path = firstExamplePath(routeRecords)

    expect(path).toStrictEqual('Example')
  })

  it('should return complete path to example in group when no example is found in root level', () => {
    const routeRecords: RouteRecordRaw[] = [
      {
        path: 'group',
        children: [{ path: 'NestedExample', component: dummyComponent }],
      },
    ]

    const path = firstExamplePath(routeRecords)

    expect(path).toStrictEqual('group/NestedExample')
  })

  it('should return empty path when no examples found', () => {
    const routeRecords: RouteRecordRaw[] = [{ path: 'group', children: [] }]

    const path = firstExamplePath(routeRecords)

    expect(path).toStrictEqual('')
  })
  it('should fail', () => {
    expect(true).toBe(false)
  })
})

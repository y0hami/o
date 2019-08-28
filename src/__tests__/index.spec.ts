import * as o from '../index'

describe('index', (): void => {
  test('should have 27 functions (+ default)', (): void => {
    expect(Object.keys(o)).toHaveLength(29)
  })

  test('all key values should be functions', (): void => {
    const funcs = Object.assign({}, o)
    delete funcs.default

    expect(Object.values(funcs)
      .every((v): boolean => typeof v === 'function')).toBe(true)
  })
})

import { slice, deepSlice } from '../packages/slice/src'

describe('slice', () => {
  test('should slice correctly', () => {
    const object = { a: 1, b: 2, c: 3, d: 4 }

    expect(Object.keys(slice(object, 0, 2))).toEqual(['a', 'b'])
    expect(Object.keys(deepSlice(object, 0, 2))).toEqual(['a', 'b'])

    expect(Object.keys(slice(object, 2, 3))).toEqual(['c'])
    expect(Object.keys(deepSlice(object, 2, 3))).toEqual(['c'])
  })

  test('default params should work', () => {
    const object = { a: 1, b: 2, c: 3, d: 4 }

    expect(Object.keys(slice(object, 1))).toEqual(['b', 'c', 'd'])
    expect(Object.keys(deepSlice(object, 1))).toEqual(['b', 'c', 'd'])
  })

  test('deep objects should be handled correctly', () => {
    const object = { a: { b: { c: { d: 1, e: 2 } } } }

    expect(slice(object, 0, 1).a?.b.c.e).toBe(2)
    expect(deepSlice(object, 0, 1).a?.b.c.e).toBeUndefined()
  })

  test('object keys should not be affected', () => {
    const object = { 'a.a.a.a': { b: { 'c.c': { d: 1, e: 2 } } } }

    expect(slice(object, 0, 1)['a.a.a.a']?.b['c.c'].e).toBe(2)
    expect(deepSlice(object, 0, 1)['a.a.a.a']?.b['c.c'].e).toBeUndefined()
  })

  test('should throw TypeError for invalid arguments', (): void => {
    const invalidObj = 'testing' as any

    expect((): any => slice(invalidObj, 0, 1))
      .toThrow(new TypeError('Expected Object, got string \'testing\''))
    expect((): any => slice({}, invalidObj, 1))
      .toThrow(new TypeError('Expected Number, got string \'testing\''))
    expect((): any => slice({}, 0, invalidObj))
      .toThrow(new TypeError('Expected Number, got string \'testing\''))

    expect((): any => deepSlice(invalidObj, 0, 1))
      .toThrow(new TypeError('Expected Object, got string \'testing\''))
    expect((): any => deepSlice({}, invalidObj, 1))
      .toThrow(new TypeError('Expected Number, got string \'testing\''))
    expect((): any => deepSlice({}, 0, invalidObj))
      .toThrow(new TypeError('Expected Number, got string \'testing\''))
  })
})

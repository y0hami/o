import { equal, deepEqual } from '../packages/equal/src'

describe('equal', () => {
  const a = { a: 1, b: 2, c: 3 }
  const b = { a: 1, b: { c: 2 } }
  const c = { a: 1, b: { c: 2, d: 3 } }

  test('should return true when the 2 objects are equal', () => {
    expect(equal(a, a)).toBe(true)
    expect(equal(b, c)).toBe(true)
    expect(deepEqual(a, a)).toBe(true)
    expect(deepEqual(b, b)).toBe(true)
    expect(deepEqual(c, c)).toBe(true)
  })

  test('should return false when the 2 objects are NOT equal', () => {
    expect(equal(a, b)).toBe(false)
    expect(equal(a, c)).toBe(false)
    expect(deepEqual(a, b)).toBe(false)
    expect(deepEqual(b, c)).toBe(false)
  })

  test('should compare values correctly', () => {
    const a = { a: 'stringA', b: 1, c: true, d: { e: 1 }, f: () => 1, g: [1, 2] }
    const b = { a: 'stringB', b: 2, c: false, d: { e: 2 }, f: () => 2, g: [3, 4] }

    expect(equal(a, b)).toBe(false)
    expect(deepEqual(a, b)).toBe(false)

    const func = (): number => 3
    const c = { a: 'string', b: 3, c: true, d: { e: 3 }, f: func, g: [5, 6] }
    const d = { a: 'string', b: 3, c: true, d: { e: 3 }, f: func, g: [7, 8] }

    expect(equal(c, d)).toBe(true)
    expect(deepEqual(c, d)).toBe(true)

    const e = { a: 'string', b: 3, c: true, d: { e: 3 }, f: () => 1, g: [5, 6], h: () => 1 }
    const f = { a: 1, b: 'string', c: 'string', d: 'string', f: 'string', g: 'string', h: () => 2 }

    expect(equal(e, f)).toBe(false)
    expect(deepEqual(e, f)).toBe(false)
  })

  test('should throw TypeError for invalid arguments', (): void => {
    const invalidObj = 'testing' as any

    expect((): boolean => equal())
      .toThrow(new TypeError('Expected Object[], got array \'[]\''))
    expect((): boolean => deepEqual())
      .toThrow(new TypeError('Expected Object[], got array \'[]\''))

    expect((): boolean => equal(invalidObj, {}))
      .toThrow(new TypeError('Expected Object, got string \'testing\''))
    expect((): boolean => equal({}, invalidObj))
      .toThrow(new TypeError('Expected Object, got string \'testing\''))

    expect((): boolean => deepEqual(invalidObj, {}))
      .toThrow(new TypeError('Expected Object, got string \'testing\''))
    expect((): boolean => deepEqual({}, invalidObj))
      .toThrow(new TypeError('Expected Object, got string \'testing\''))
  })
})

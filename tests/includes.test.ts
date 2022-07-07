import { includes, deepIncludes } from '../packages/includes/src'

describe('includes', () => {
  const a = { a: 1, b: 2, c: { d: 3 } }

  test('should return true when the object contains the value', () => {
    expect(includes(a, 1)).toBe(true)
    expect(includes(a, 2)).toBe(true)

    expect(deepIncludes(a, 1)).toBe(true)
    expect(deepIncludes(a, 2)).toBe(true)
  })

  test('should return false when the object does NOT contain the value', () => {
    expect(includes(a, 4)).toBe(false)
    expect(deepIncludes(a, 4)).toBe(false)
  })

  test('deep objects should be handled correctly', () => {
    expect(includes(a, 3)).toBe(false)
    expect(deepIncludes(a, 3)).toBe(true)
  })

  test('should throw error if invalid argument passed', async () => {
    expect(() => includes('test' as any, 1))
      .toThrow(new TypeError('Expected Object, got string \'test\''))
    expect(() => deepIncludes('test' as any, 1))
      .toThrow(new TypeError('Expected Object, got string \'test\''))
  })
})

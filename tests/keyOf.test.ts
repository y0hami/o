import { keyOf, deepKeyOf } from '../packages/keyof/src'

describe('keyOf', () => {
  test('should return the key if the value is found', () => {
    const a = { a: 1, b: 2, c: 2, d: { e: 3 } }

    expect(keyOf(a, 1)).toBe('a')
    expect(keyOf(a, 2)).toBe('b')
    expect(deepKeyOf(a, 1)).toBe('a')
    expect(deepKeyOf(a, 2)).toBe('b')
  })

  test('should return undefined when the value is not found', () => {
    const a = { a: 1, b: 2 }

    expect(keyOf(a, 3)).toBeUndefined()
    expect(deepKeyOf(a, 3)).toBeUndefined()
  })

  test('deep objects should be handled correctly', () => {
    const a = { a: 1, b: { c: { d: 2 } } }

    expect(keyOf(a, 2)).toBeUndefined()
    expect(deepKeyOf(a, 2)).toBe('b.c.d')
  })

  test('should throw error if invalid argument passed', async () => {
    expect(() => keyOf('test' as any, 1))
      .toThrow(new TypeError('Expected Object, got string \'test\''))
    expect(() => deepKeyOf('test' as any, 1))
      .toThrow(new TypeError('Expected Object, got string \'test\''))
  })
})

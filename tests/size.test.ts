import { size, deepSize } from '../packages/size/src'

describe('size', () => {
  test('should count all keys', () => {
    const object = { a: 1, b: 2, c: 3 }

    expect(size(object)).toBe(3)
    expect(deepSize(object)).toBe(3)
  })

  test('should handle deep objects correctly', () => {
    const object = { a: { b: { c: 1, d: 2 } } }

    expect(size(object)).toBe(1)
    expect(deepSize(object)).toBe(2)
  })

  test('should throw TypeError for invalid arguments', (): void => {
    const invalidObj = 'testing' as any

    expect((): number => size(invalidObj))
      .toThrow(new TypeError('Expected Object, got string \'testing\''))

    expect((): number => deepSize(invalidObj))
      .toThrow(new TypeError('Expected Object, got string \'testing\''))
  })
})

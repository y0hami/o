import deepKeys from '../packages/deepkeys/src'

describe('deepKeys', () => {
  test('should return all keys including deep objects', () => {
    const a = { a: 1, b: { c: 2 } }

    expect(deepKeys(a)).toHaveLength(2)
  })

  test('should return deep object keys as dot notation', () => {
    const a = { a: 1, b: { c: 2 } }

    expect(deepKeys(a)[1]).toBe('b.c')
  })

  test('should throw error if invalid argument passed', () => {
    expect(() => deepKeys('test' as any))
      .toThrow(new TypeError('Expected Object, got string \'test\''))
  })
})

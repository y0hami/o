import deepValues from '../packages/deepvalues/src'

describe('deepValues', () => {
  test('should return all values including deep objects', () => {
    const a = { a: 1, b: { c: 2 } }

    expect(deepValues(a)).toHaveLength(2)
    expect(deepValues(a)[1]).toBe(2)
  })

  test('should throw error if invalid argument passed', () => {
    expect(() => deepValues('test' as any))
      .toThrow(new TypeError('Expected Object, got string \'test\''))
  })
})

import clean from '../packages/clean/src'

describe('clean', () => {
  test('should remove all undefined and null value keys', () => {
    const obj = { a: 1, b: 'test', c: undefined, d: null }

    expect(Object.keys(clean(obj))).toEqual(['a', 'b'])
  })

  test('should remove all undefined and null value keys for child keys', () => {
    const obj = { a: 1, b: { c: undefined, d: null, e: 'test' } }
    const cleaned = clean(obj)

    expect(Object.keys(cleaned)).toEqual(['a', 'b'])
    expect(Object.keys(cleaned.b)).toEqual(['e'])
  })

  test('should throw error if invalid argument passed', () => {
    expect(() => clean('test' as any))
      .toThrow(new TypeError('Expected Object, got string \'test\''))
  })
})

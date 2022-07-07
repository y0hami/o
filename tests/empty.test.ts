import empty from '../packages/empty/src'

describe('empty', () => {
  test('should return true if object is empty', () => {
    expect(empty({})).toBeTruthy()
  })

  test('should return false if object is not empty', () => {
    expect(empty({ a: 1, b: 2 })).toBeFalsy()
  })

  test('should throw error if invalid argument passed', () => {
    expect(() => empty('test' as any))
      .toThrow(new TypeError('Expected Object, got string \'test\''))
  })
})

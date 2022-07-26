import hasKeys from '../packages/haskeys/src'

describe('hasKeys', () => {
  test('should return true if all keys exist', () => {
    const a = { a: 1, b: { c: 2 } }
    const keys = ['a', 'b', 'b.c']

    expect(hasKeys(a, keys)).toBe(true)
  })

  test('should return false if one or more keys doesn\'t exist', () => {
    const a = { a: 1, b: { c: 2 } }
    const keys = ['a', 'c']

    expect(hasKeys(a, keys)).toBe(false)
  })

  test('should return false if the object is empty', () => {
    expect(hasKeys({}, ['a', 'b'])).toBe(false)
  })

  test('should throw error if invalid argument passed', () => {
    expect(() => hasKeys('test' as any, []))
      .toThrow(new TypeError('Expected Object, got string \'test\''))
    expect(() => hasKeys({}, 'test' as any))
      .toThrow(new TypeError('Expected String[], got string \'test\''))
    expect(() => hasKeys({}, []))
      .toThrow(new TypeError('Expected String[], got array \'[]\''))
    expect(() => hasKeys({}, ['test', 1] as any[]))
      .toThrow(new TypeError('Expected String[], got array \'["test",1]\''))
    expect(() => hasKeys({}, ['test', '']))
      .toThrow(new TypeError('Expected String[], got array \'["test",""]\''))
  })
})

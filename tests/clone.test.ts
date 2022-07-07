import clone from '../packages/clone/src'

describe('clone', () => {
  test('should create new object and not a reference', () => {
    const obj = { a: 1, b: 2, c: { d: 3 } }
    const cloned = clone(obj)

    obj.a = 2
    obj.c.d = 4
    expect(obj.a).toBe(2)
    expect(cloned.a).toBe(1)
    expect(obj.c.d).toBe(4)
    expect(cloned.c.d).toBe(3)
  })

  test('should return empty object when provided is empty', () => {
    expect(clone({})).toEqual({})
  })

  test('should throw error if invalid argument passed', () => {
    expect(() => clone('test' as any))
      .toThrow(new TypeError('Expected Object, got string \'test\''))
  })
})

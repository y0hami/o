import get from '../packages/get/src'

describe('get', () => {
  test('should return correct value at dot notation path', () => {
    const a = { a: 1, b: 2, c: 3 }

    expect(get(a, 'a')).toBe(1)
    expect(get(a, 'b')).toBe(2)
    expect(get(a, 'c')).toBe(3)

    const b = { a: { b: { c: 1 } } }
    expect(get(b, 'a.b.c')).toBe(1)

    expect(get(b, 'b.c')).toBeUndefined()
  })

  test('should throw error if invalid argument passed', async () => {
    expect(() => get({}, 1 as any))
      .toThrow(new TypeError('Expected String, got number \'1\''))
    expect(() => get('test' as any, 't.e.s.t'))
      .toThrow(new TypeError('Expected Object, got string \'test\''))
  })
})

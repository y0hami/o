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

  test('should handle array indexes', () => {
    const a = { a: [1, 2, 3] }

    expect(get(a, 'a[0]')).toBe(1)
    expect(get(a, 'a[1]')).toBe(2)
    expect(get(a, 'a[2]')).toBe(3)

    const b = { a: [[0, 1], [2, 3]] }
    expect(get(b, 'a[0][0]')).toBe(0)
    expect(get(b, 'a[0][1]')).toBe(1)
    expect(get(b, 'a[1][0]')).toBe(2)
    expect(get(b, 'a[1][1]')).toBe(3)
  })

  test('should invalid paths correctly', () => {
    const a = { a: { b: 1 }, c: { d: [], f: {} } }

    expect(get(a, 'a.c')).toBe(undefined)
    expect(get(a, 'c.e[0]')).toBe(undefined)
    expect(get(a, 'c.f[0]')).toBe(undefined)
  })

  test('should return undefined or default value if object is empty', () => {
    expect(get({}, 'a.b.c')).toBe(undefined)
    expect(get({}, 'a.b.c', 1)).toBe(1)
  })

  test('should throw error if invalid argument passed', async () => {
    expect(() => get({}, 1 as any))
      .toThrow(new TypeError('Expected String, got number \'1\''))
    expect(() => get('test' as any, 't.e.s.t'))
      .toThrow(new TypeError('Expected Object, got string \'test\''))
    expect(() => get({}, ''))
      .toThrow(new TypeError('Expected non empty String, got string \'\''))
  })
})

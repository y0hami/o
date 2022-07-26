import has from '../packages/has/src'

describe('has', () => {
  test('should return true when key path exists', () => {
    const a = { a: 1, b: 2, c: 3 }

    expect(has(a, 'a')).toBe(true)
    expect(has(a, 'b')).toBe(true)
    expect(has(a, 'c')).toBe(true)

    const b = { a: { b: { c: 1 } } }
    expect(has(b, 'a.b.c')).toBe(true)
  })

  test('should return false when key path does NOT exist', () => {
    const a = { a: 1 }

    expect(has(a, 'b')).toBe(false)
    expect(has({}, 'a')).toBe(false)
  })

  test('should return true even if the value of the key is undefined', () => {
    const a = { a: 1, b: undefined }

    expect(has(a, 'b')).toBe(true)
  })

  test('should handle array indexes', () => {
    const a = { a: [1, 2, 3] }
    const b = {
      b: [
        {
          c: 1
        }
      ],
      d: {}
    }

    expect(has(a, 'a[0]')).toBe(true)
    expect(has(a, 'a[1]')).toBe(true)
    expect(has(a, 'a[2]')).toBe(true)
    expect(has(a, 'a[3]')).toBe(false)
    expect(has(b, 'b[0].c')).toBe(true)
    expect(has(b, 'b[0].d')).toBe(false)
    expect(has(b, 'c[0]')).toBe(false)
    expect(has(b, 'd[0]')).toBe(false)
  })

  test('should throw error if invalid argument passed', async () => {
    expect(() => has({}, 1 as any))
      .toThrow(new TypeError('Expected String, got number \'1\''))
    expect(() => has('test' as any, 't.e.s.t'))
      .toThrow(new TypeError('Expected Object, got string \'test\''))
    expect(() => has({}, ''))
      .toThrow(new TypeError('Expected non empty String, got string \'\''))
  })
})

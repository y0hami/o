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
  })

  test('should throw error if invalid argument passed', async () => {
    expect(() => has({}, 1 as any))
      .toThrow(new TypeError('Expected String, got number \'1\''))
    expect(() => has('test' as any, 't.e.s.t'))
      .toThrow(new TypeError('Expected Object, got string \'test\''))
  })
})

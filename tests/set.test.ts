import set from '../packages/set/src'

describe('set', () => {
  test('should set new values', () => {
    const a: any = { a: 1 }

    expect(set(a, 'b', 2).b).toBe(2)
  })

  test('should override existing values', () => {
    const a: any = { a: 1 }

    expect(set(a, 'a', 2).a).toBe(2)
  })

  test('should set values in deep objects', () => {
    const a: any = { a: 1 }

    expect(set(a, 'b.c', 2).b.c).toBe(2)
  })

  test('should handle escaped characters', () => {
    const a: any = { a: 1 }

    expect(set(a, 'b\\.c', 2)['b.c']).toBe(2)
  })

  test('should create relevant object or array for path', () => {
    const a: any = { e: {}, f: [] }

    expect(set(a, 'a.b.c', 2).a.b.c).toBe(2)
    expect(set(a, 'a.d[0]', 2).a.d[0]).toBe(2)
    expect(set(a, 'e.f', 2).e.f).toBe(2)
    expect(set(a, 'f[1]', 2).f[1]).toBe(2)
  })

  test('should throw error if invalid argument passed', async () => {
    expect(() => set('test' as any, 't.e.s.t', 1))
      .toThrow(new TypeError('Expected Object, got string \'test\''))
    expect(() => set({}, 1 as any, 1))
      .toThrow(new TypeError('Expected String, got number \'1\''))
    expect(() => set({}, '', 1))
      .toThrow(new TypeError('Expected non empty String, got string \'\''))
  })
})

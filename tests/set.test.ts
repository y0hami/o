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

  test('should throw error if invalid argument passed', async () => {
    expect(() => set('test' as any, 't.e.s.t', 1))
      .toThrow(new TypeError('Expected Object, got string \'test\''))
    expect(() => set({}, 1 as any, 1))
      .toThrow(new TypeError('Expected String, got number \'1\''))
  })
})

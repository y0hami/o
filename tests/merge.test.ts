import merge from '../packages/merge/src'

describe('merge', () => {
  test('should merge 2 objects', () => {
    const a = { a: 1 }
    const b = { b: 2 }

    const merged = merge(a, b)
    expect(merged.a).toBe(1)
    expect(merged.b).toBe(2)
  })

  test('should deep object values', () => {
    const a = { a: { b: 1 } }
    const b = { a: { c: 2 } }

    const merged = merge(a, b)

    expect(merged.a.b).toBe(1)
    expect(merged.a.c).toBe(2)
  })

  test('source should override target keys if they exist', () => {
    const a = { a: 1, b: 2 }
    const b = { a: 2 }

    const merged = merge(a, b)
    expect(merged.a).toBe(2)
    expect(merged.b).toBe(2)
  })

  test('should throw error if invalid argument passed', () => {
    expect(() => merge('test' as any, {}))
      .toThrow(new TypeError('Expected Object, got string \'test\''))
    expect(() => merge({}, 'test' as any))
      .toThrow(new TypeError('Expected Object, got string \'test\''))
  })
})

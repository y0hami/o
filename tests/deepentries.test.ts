import deepEntries from '../packages/deepentries/src'

describe('deepEntries', () => {
  test('should return array of entries for deep object', () => {
    const a = { a: 1, b: { c: 2 } }

    const entries = deepEntries(a)

    expect(entries).toHaveLength(2)

    expect(entries[0][0]).toBe('a')
    expect(entries[0][1]).toBe(1)

    expect(entries[1][0]).toBe('b.c')
    expect(entries[1][1]).toBe(2)
  })

  test('should throw error if invalid argument passed', () => {
    expect(() => deepEntries('test' as any))
      .toThrow(new TypeError('Expected Object, got string \'test\''))
  })
})

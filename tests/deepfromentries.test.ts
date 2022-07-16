import deepFromEntries, { Entry } from '../packages/deepfromentries/src'

describe('deepFromEntries', () => {
  test('should return array of entries for deep object', () => {
    const entries: Entry[] = [
      ['a', 1],
      ['b.c', 2],
      ['b.d', 3],
      ['e.f.g', 4]
    ]

    const object = deepFromEntries(entries)

    expect(object.a).toBe(1)
    expect(object.b.c).toBe(2)
    expect(object.b.d).toBe(3)
    expect(object.e.f.g).toBe(4)
  })

  test('should throw error if invalid argument passed', () => {
    expect(() => deepFromEntries('test' as any))
      .toThrow(new TypeError('Expected Entry[], got string \'test\''))
    expect(() => deepFromEntries([]))
      .toThrow(new TypeError('Expected Entry[], got array \'[]\''))
  })
})

import shallowMerge from '../packages/shallowMerge/src'

describe('shallowMerge', (): void => {
  test('should return a new object not a reference', (): void => {
    const obj = {
      a: 1,
      b: 2
    }

    const result = shallowMerge(obj, {})
    result.a = 2

    expect(obj.a).toBe(1)
  })

  test('should return an object with the properties of the sources merged on top', (): void => {
    const target = {
      a: 1,
      b: 2
    }
    const sourceA = {
      a: 2
    }
    const sourceB = {
      a: 2
    }

    const resultA = shallowMerge(target, sourceA)
    const resultB = shallowMerge(target, sourceB)

    expect(resultA.a).toBe(2)
    expect(resultB.a).toBe(2)
    expect(resultB.b).toBe(2)
  })

  test('should only merge shallow keys', (): void => {
    const target = {
      a: 1,
      b: {
        c: 2
      }
    }
    const sourceA = {
      a: 2
    }
    const sourceB = {
      a: 2,
      b: {
        d: 4
      }
    }

    const resultA = shallowMerge(target, sourceA)
    const resultB = shallowMerge(target, sourceB)
    const resultC = shallowMerge(resultB, sourceB)

    expect(resultA.a).toBe(2)
    expect(resultA.b.c).toBe(2)
    expect(resultB.a).toBe(2)
    expect((resultB.b as any).c).toBeUndefined()
    expect(resultC.b.d).toBe(4)
  })

  test('should add new keys to result object', (): void => {
    const target = {
      a: 1
    }
    const sourceA = {
      b: 2
    }
    const sourceB = {
      c: 3
    }

    const resultA = shallowMerge(target, sourceA)
    const resultB = shallowMerge(target, sourceB)

    expect(resultA.a).toBe(1)
    expect(resultA.b).toBe(2)
    expect(resultB.c).toBe(3)
  })

  test('should throw TypeError for invalid params', () => {
    expect(() => shallowMerge('test' as any, 'test' as any))
      .toThrow(new TypeError('Expected Object, got string \'test\''))

    expect(() => shallowMerge({}, 'test' as any))
      .toThrow(new TypeError('Expected Object, got string \'test\''))
  })
})

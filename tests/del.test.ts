import del from '../packages/del/src'

describe('del', (): void => {
  test('should delete the specified path from an object', (): void => {
    const obj = {
      a: 1,
      b: 2
    }

    const newObj = del(obj, 'a')

    expect(Object.keys(newObj)).toHaveLength(1)
    expect(Object.keys(newObj)).toEqual(['b'])
  })

  test('should use dot notation for deletion path', (): void => {
    const obj = {
      a: 1,
      b: {
        c: 2
      }
    }

    const newObj = del(obj, 'b.c')

    expect(Object.keys(newObj)).toHaveLength(2)
    expect(Object.keys(newObj)).toEqual(['a', 'b'])
    expect(Object.keys(newObj.b as any)).toHaveLength(0)
  })

  test('should return new object not a reference', (): void => {
    const obj = {
      a: 1,
      b: 2
    }

    const newObj = del(obj, 'a')

    newObj.b = 1

    expect(obj.b).toBe(2)
  })

  test('should fail if the path is invalid', (): void => {
    const obj = {
      a: [1, 2],
      b: {
        c: 3
      },
      c: 2
    }

    expect(del(obj, 'a.b[0]').a).toStrictEqual(obj.a)
    expect(del(obj, 'b[0].c')).toStrictEqual(obj)
  })

  test('should throw error for invalid arguments', () => {
    expect(() => del(1 as any, 'test.path'))
      .toThrow(new TypeError('Expected Object, got number \'1\''))
    expect(() => del({}, 1 as any))
      .toThrow(new TypeError('Expected String, got number \'1\''))
  })
})

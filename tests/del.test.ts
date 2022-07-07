import del from '../packages/del/src'

describe('del', (): void => {
  test('should delete the specified path from an object', (): void => {
    const obj = {
      a: 1,
      b: 2
    }

    const newObj = del(obj, 'a')

    expect(Object.keys(newObj)).toHaveLength(1)
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

  test('should throw error for invalid arguments', () => {
    expect(() => del(1 as any, 'test.path'))
      .toThrow(new TypeError('Expected Object, got number \'1\''))
    expect(() => del({}, 1 as any))
      .toThrow(new TypeError('Expected String, got number \'1\''))
  })
})

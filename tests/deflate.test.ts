import deflate from '../packages/deflate/src'

describe('deflate', () => {
  test('should convert child objects to dot notation keys into the parent object', () => {
    const obj: any = {
      a: 1,
      b: {
        c: 2
      }
    }
    const obj2: any = {
      a: 1,
      b: {
        c: 2,
        d: {
          e: {
            f: 3
          }
        }
      }
    }

    expect(deflate(obj)).toEqual({
      a: 1,
      'b.c': 2
    })

    expect(deflate(obj2)).toEqual({
      a: 1,
      'b.c': 2,
      'b.d.e.f': 3
    })
  })

  test('should remove empty objects', () => {
    const obj: any = {
      a: 1,
      b: {
        c: 2,
        d: {}
      },
      e: {}
    }

    expect(deflate(obj)).toEqual({
      a: 1,
      'b.c': 2
    })
  })

  test('should skip the process if the specified object is empty', () => {
    expect(deflate({})).toEqual({})
  })

  test('should throw error if invalid argument passed', () => {
    expect(() => deflate('test' as any))
      .toThrow(new TypeError('Expected Object, got string \'test\''))
  })
})

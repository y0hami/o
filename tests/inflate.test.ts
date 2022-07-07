import inflate from '../packages/inflate/src'

describe('inflate', () => {
  test('should convert dot notation keys into the multi level objects', () => {
    const obj: any = { a: 1, 'b.c': 2 }
    const obj2: any = { a: 1, 'b.c': 2, 'b.d.e': 3 }

    expect(inflate(obj)).toEqual({
      a: 1,
      b: {
        c: 2
      }
    })

    expect(inflate(obj2)).toEqual({
      a: 1,
      b: {
        c: 2,
        d: {
          e: 3
        }
      }
    })
  })

  test('should skip the process if the specified object is empty', () => {
    expect(inflate({})).toEqual({})
  })

  test('should throw error if invalid argument passed', () => {
    expect(() => inflate('test' as any))
      .toThrow(new TypeError('Expected Object, got string \'test\''))
  })
})

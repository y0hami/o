import * as dot from '../packages/dot/src'

describe('dot', () => {
  test('should convert dot notation to array of keys', () => {
    expect(dot.from('a.b.c')).toEqual(['a', 'b', 'c'])
    expect(dot.from('a.b.c\\.d')).toEqual(['a', 'b', 'c.d'])

    dot.get({}, '')
    dot.set({}, '', '')
    dot.del({}, '')
  })

  test('should convert array of keys to dot notation', () => {
    expect(dot.to(['a', 'b', 'c'])).toEqual('a.b.c')
    expect(dot.to(['a', 'b', 'c.d'])).toEqual('a.b.c\\.d')
  })

  test('should throw error for invalid arguments', () => {
    expect(() => dot.from(1 as any))
      .toThrow(new TypeError('Expected String, got number \'1\''))
    expect(() => dot.to(1 as any))
      .toThrow(new TypeError('Expected String[], got number \'1\''))
    expect(() => dot.to(['test', 1 as any]))
      .toThrow(new TypeError('Expected String[], got array \'["test",1]\''))
  })
})

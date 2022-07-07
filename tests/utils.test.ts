import { isAsync, ArgumentTypeError, sequentialPromises } from '../packages/utils/src'

describe('utils', () => {
  describe('ArgumentTypeError', () => {
    test('should return correct message format', () => {
      expect(() => { throw new ArgumentTypeError('String', { a: 1 }) })
        .toThrow('Expected String, got object \'{"a":1}\'')

      expect(() => { throw new ArgumentTypeError('String', [1, 2]) })
        .toThrow('Expected String, got array \'[1,2]\'')

      expect(() => { throw new ArgumentTypeError('String', () => {}) })
        .toThrow('Expected String, got function \'(Function)\'')

      expect(() => { throw new ArgumentTypeError('String', async () => {}) })
        .toThrow('Expected String, got async function \'(AsyncFunction)\'')

      expect(() => { throw new ArgumentTypeError('String', 1) })
        .toThrow('Expected String, got number \'1\'')

      expect(() => { throw new ArgumentTypeError('String', 'test') })
        .toThrow('Expected String, got string \'test\'')

      expect(() => { throw new ArgumentTypeError('String', true) })
        .toThrow('Expected String, got boolean \'true\'')
    })
  })

  describe('isAsync', () => {
    test('should return true for async functions', () => {
      expect(isAsync(() => {})).toBe(false)
      expect(isAsync(async () => {})).toBe(true)
    })
  })

  describe('sequentialPromises', () => {
    test('should run functions sequentially', async () => {
      const wait = async (ms: number): Promise<void> => await new Promise((resolve) => {
        setTimeout(resolve, ms)
      })

      const array: number[] = []
      await sequentialPromises([
        async () => {
          await wait(200)
          array.push(1)
        },
        async () => {
          await wait(400)
          array.push(2)
        },
        async () => {
          await wait(200)
          array.push(3)
        }
      ])

      expect(array[0]).toBe(1)
      expect(array[1]).toBe(2)
      expect(array[2]).toBe(3)
    })
  })

  // test('should throw error if invalid argument passed', async () => {
  //   expect(() => set('test' as any, 't.e.s.t', 1))
  //     .toThrow(new TypeError('Expected Object, got string \'test\''))
  // })
})

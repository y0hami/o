import { some, someAsync, deepSome, deepSomeAsync, SomeCallback, AsyncSomeCallback } from '../packages/some/src'

describe('some', () => {
  test('should return true when all callback executions result in true', async () => {
    const a = { a: 1, b: 2, c: 3 }
    const cb: SomeCallback = (_, value): boolean => typeof value === 'number'
    const acb: AsyncSomeCallback = async (_, value): Promise<boolean> => typeof value === 'number'

    expect(some(a, cb)).toBe(true)
    expect(await someAsync(a, acb)).toBe(true)
    expect(deepSome(a, cb)).toBe(true)
    expect(await deepSomeAsync(a, acb)).toBe(true)
  })

  test('should return true when some callback executions result in true', async () => {
    const a = { a: 1, b: 'string', c: 3 }
    const cb: SomeCallback = (_, value): boolean => typeof value === 'number'
    const acb: AsyncSomeCallback = async (_, value): Promise<boolean> => typeof value === 'number'

    expect(some(a, cb)).toBe(true)
    expect(await someAsync(a, acb)).toBe(true)
    expect(deepSome(a, cb)).toBe(true)
    expect(await deepSomeAsync(a, acb)).toBe(true)
  })

  test('should return false when all callback executions result in false', async () => {
    const a = { a: 'string', b: 'string', c: 'string' }
    const cb: SomeCallback = (_, value): boolean => typeof value === 'number'
    const acb: AsyncSomeCallback = async (_, value): Promise<boolean> => typeof value === 'number'

    expect(some(a, cb)).toBe(false)
    expect(await someAsync(a, acb)).toBe(false)
    expect(deepSome(a, cb)).toBe(false)
    expect(await deepSomeAsync(a, acb)).toBe(false)
  })

  test('should throw error if invalid argument passed', async () => {
    const badObject = 'test' as any
    const badCallback = 'test' as any
    const goodCallback = (): boolean => true
    const goodAsyncCallback = async (): Promise<boolean> => true
    const noneAsyncCallback = (): void => {}

    expect(() => some(badObject, goodCallback))
      .toThrow(new TypeError('Expected Object, got string \'test\''))
    expect(() => some({}, badCallback))
      .toThrow(new TypeError('Expected Function, got string \'test\''))
    expect(() => some({}, goodAsyncCallback as any))
      .toThrow(new TypeError('Expected Function, got async function \'(AsyncFunction)\''))

    await expect(someAsync(badObject, goodAsyncCallback))
      .rejects
      .toThrow(new TypeError('Expected Object, got string \'test\''))
    await expect(someAsync({}, badCallback))
      .rejects
      .toThrow(new TypeError('Expected AsyncFunction, got string \'test\''))
    await expect(someAsync({}, noneAsyncCallback as any))
      .rejects
      .toThrow(new TypeError('Expected AsyncFunction, got function \'(Function)\''))

    expect(() => deepSome(badObject, goodCallback))
      .toThrow(new TypeError('Expected Object, got string \'test\''))
    expect(() => deepSome({}, badCallback))
      .toThrow(new TypeError('Expected Function, got string \'test\''))
    expect(() => deepSome({}, goodAsyncCallback as any))
      .toThrow(new TypeError('Expected Function, got async function \'(AsyncFunction)\''))

    await expect(deepSomeAsync(badObject, goodAsyncCallback))
      .rejects
      .toThrow(new TypeError('Expected Object, got string \'test\''))
    await expect(deepSomeAsync({}, badCallback))
      .rejects
      .toThrow(new TypeError('Expected AsyncFunction, got string \'test\''))
    await expect(deepSomeAsync({}, noneAsyncCallback as any))
      .rejects
      .toThrow(new TypeError('Expected AsyncFunction, got function \'(Function)\''))
  })
})

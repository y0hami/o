import { every, everyAsync, deepEvery, deepEveryAsync, EveryCallback, AsyncEveryCallback } from '../packages/every/src'

describe('every', () => {
  test('should return true when all callback executions result in true', async () => {
    const a = { a: 1, b: 2, c: 3 }
    const cb: EveryCallback = (_, value): boolean => typeof value === 'number'
    const acb: AsyncEveryCallback = async (_, value): Promise<boolean> => typeof value === 'number'

    expect(every(a, cb)).toBe(true)
    expect(await everyAsync(a, acb)).toBe(true)
    expect(deepEvery(a, cb)).toBe(true)
    expect(await deepEveryAsync(a, acb)).toBe(true)
  })

  test('should return false when all callback executions result in false', async () => {
    const a = { a: 1, b: 'string', c: 3 }
    const cb: EveryCallback = (_, value): boolean => typeof value === 'number'
    const acb: AsyncEveryCallback = async (_, value): Promise<boolean> => typeof value === 'number'

    expect(every(a, cb)).toBe(false)
    expect(await everyAsync(a, acb)).toBe(false)
    expect(deepEvery(a, cb)).toBe(false)
    expect(await deepEveryAsync(a, acb)).toBe(false)
  })

  test('should throw error if invalid argument passed', async () => {
    const badObject = 'test' as any
    const badCallback = 'test' as any
    const goodCallback = (): boolean => true
    const goodAsyncCallback = async (): Promise<boolean> => true
    const noneAsyncCallback = (): void => {}

    expect(() => every(badObject, goodCallback))
      .toThrow(new TypeError('Expected Object, got string \'test\''))
    expect(() => every({}, badCallback))
      .toThrow(new TypeError('Expected Function, got string \'test\''))
    expect(() => every({}, goodAsyncCallback as any))
      .toThrow(new TypeError('Expected Function, got async function \'(AsyncFunction)\''))

    await expect(everyAsync(badObject, goodAsyncCallback))
      .rejects
      .toThrow(new TypeError('Expected Object, got string \'test\''))
    await expect(everyAsync({}, badCallback))
      .rejects
      .toThrow(new TypeError('Expected AsyncFunction, got string \'test\''))
    await expect(everyAsync({}, noneAsyncCallback as any))
      .rejects
      .toThrow(new TypeError('Expected AsyncFunction, got function \'(Function)\''))

    expect(() => deepEvery(badObject, goodCallback))
      .toThrow(new TypeError('Expected Object, got string \'test\''))
    expect(() => deepEvery({}, badCallback))
      .toThrow(new TypeError('Expected Function, got string \'test\''))
    expect(() => deepEvery({}, goodAsyncCallback as any))
      .toThrow(new TypeError('Expected Function, got async function \'(AsyncFunction)\''))

    await expect(deepEveryAsync(badObject, goodAsyncCallback))
      .rejects
      .toThrow(new TypeError('Expected Object, got string \'test\''))
    await expect(deepEveryAsync({}, badCallback))
      .rejects
      .toThrow(new TypeError('Expected AsyncFunction, got string \'test\''))
    await expect(deepEveryAsync({}, noneAsyncCallback as any))
      .rejects
      .toThrow(new TypeError('Expected AsyncFunction, got function \'(Function)\''))
  })
})

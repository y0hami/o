import { each, eachAsync, deepEach, deepEachAsync } from '../packages/each/src'

describe('each', () => {
  test('should loop over all keys', async () => {
    const shallow = { a: 1, b: 2, c: 3 }
    const deep = { a: 1, b: { c: 2 } }

    const callback = jest.fn(() => {})
    const asyncCallback = async (): Promise<void> => callback()

    each(shallow, callback)
    expect(callback.mock.calls.length).toBe(3)
    callback.mockReset()

    await eachAsync(shallow, asyncCallback)
    await expect(eachAsync(shallow, async () => {}))
      .resolves
    expect(callback.mock.calls.length).toBe(3)
    callback.mockReset()

    deepEach(deep, callback)
    expect(callback.mock.calls.length).toBe(2)
    callback.mockReset()

    await deepEachAsync(deep, asyncCallback)
    await expect(deepEachAsync(deep, async () => {}))
      .resolves
    expect(callback.mock.calls.length).toBe(2)
  })

  test('deep keys should be in dot notation', async () => {
    const object = { a: { b: { c: 1 } } }

    let keys: string[] = []
    deepEach(object, (key) => {
      keys.push(key)
    })

    expect(keys).toHaveLength(1)
    expect(keys[0]).toBe('a.b.c')

    keys = []
    await deepEachAsync(object, async (key) => {
      keys.push(key)
    })

    expect(keys).toHaveLength(1)
    expect(keys[0]).toBe('a.b.c')
  })

  test('should throw error if invalid argument passed', async () => {
    const badObject = 'test' as any
    const badCallback = 'test' as any
    const goodCallback = (): void => {}
    const goodAsyncCallback = async (): Promise<void> => {}
    const noneAsyncCallback = (): void => {}

    expect(() => each(badObject, goodCallback))
      .toThrow(new TypeError('Expected Object, got string \'test\''))
    expect(() => each({}, badCallback))
      .toThrow(new TypeError('Expected Function, got string \'test\''))
    expect(() => each({}, goodAsyncCallback as any))
      .toThrow(new TypeError('Expected Function, got async function \'(AsyncFunction)\''))

    await expect(eachAsync(badObject, goodAsyncCallback))
      .rejects
      .toThrow(new TypeError('Expected Object, got string \'test\''))
    await expect(eachAsync({}, badCallback))
      .rejects
      .toThrow(new TypeError('Expected AsyncFunction, got string \'test\''))
    await expect(eachAsync({}, noneAsyncCallback as any))
      .rejects
      .toThrow(new TypeError('Expected AsyncFunction, got function \'(Function)\''))

    expect(() => deepEach(badObject, goodCallback))
      .toThrow(new TypeError('Expected Object, got string \'test\''))
    expect(() => deepEach({}, badCallback))
      .toThrow(new TypeError('Expected Function, got string \'test\''))
    expect(() => deepEach({}, goodAsyncCallback as any))
      .toThrow(new TypeError('Expected Function, got async function \'(AsyncFunction)\''))

    await expect(deepEachAsync(badObject, goodAsyncCallback))
      .rejects
      .toThrow(new TypeError('Expected Object, got string \'test\''))
    await expect(deepEachAsync({}, badCallback))
      .rejects
      .toThrow(new TypeError('Expected AsyncFunction, got string \'test\''))
    await expect(deepEachAsync({}, noneAsyncCallback as any))
      .rejects
      .toThrow(new TypeError('Expected AsyncFunction, got function \'(Function)\''))
  })
})

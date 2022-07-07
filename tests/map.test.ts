import { map, mapAsync, deepMap, deepMapAsync, MapCallback, AsyncMapCallback } from '../packages/map/src'

describe('map', () => {
  test('should loop over all keys', async () => {
    const a = { a: 1, b: 2, c: { d: 3, e: 4 } }

    const callback = jest.fn((_, value) => value)
    const asyncCallback: AsyncMapCallback<any> = async (_, value) => callback(_, value)

    map(a, callback)
    expect(callback.mock.calls).toHaveLength(3)
    callback.mockReset()

    await mapAsync(a, asyncCallback)
    expect(callback.mock.calls).toHaveLength(3)
    callback.mockReset()

    deepMap(a, callback)
    expect(callback.mock.calls).toHaveLength(4)
    callback.mockReset()

    await deepMapAsync(a, asyncCallback)
    expect(callback.mock.calls).toHaveLength(4)
    callback.mockReset()
  })

  const func: MapCallback<number> = (_, value) => value
  const asyncFunc: AsyncMapCallback<number> = async (key, value, index) => func(key, value, index)
  const sum = (values: number[]): number =>
    values.reduce((prev, current) =>
      prev + current, 0)

  test('should return array of callback results', async () => {
    const a = { a: 1, b: 2, c: 3 }

    expect(sum(map(a, func))).toBe(6)
    expect(sum(await mapAsync(a, asyncFunc))).toBe(6)
    expect(sum(deepMap(a, func))).toBe(6)
    expect(sum(await deepMapAsync(a, asyncFunc))).toBe(6)
  })

  test('deep functions should handle deep objects', async () => {
    const a = { a: { b: { c: 1, d: 2 } } }

    expect(sum(deepMap(a, func))).toBe(3)
    expect(sum(await deepMapAsync(a, asyncFunc))).toBe(3)
  })

  test('should throw error if invalid argument passed', async () => {
    const badObject = 'test' as any
    const badCallback = 'test' as any
    const goodCallback = (): boolean => true
    const goodAsyncCallback = async (): Promise<boolean> => true
    const noneAsyncCallback = (): void => {}

    expect(() => map(badObject, goodCallback))
      .toThrow(new TypeError('Expected Object, got string \'test\''))
    expect(() => map({}, badCallback))
      .toThrow(new TypeError('Expected Function, got string \'test\''))
    expect(() => map({}, goodAsyncCallback as any))
      .toThrow(new TypeError('Expected Function, got async function \'(AsyncFunction)\''))

    await expect(mapAsync(badObject, goodAsyncCallback))
      .rejects
      .toThrow(new TypeError('Expected Object, got string \'test\''))
    await expect(mapAsync({}, badCallback))
      .rejects
      .toThrow(new TypeError('Expected AsyncFunction, got string \'test\''))
    await expect(mapAsync({}, noneAsyncCallback as any))
      .rejects
      .toThrow(new TypeError('Expected AsyncFunction, got function \'(Function)\''))

    expect(() => deepMap(badObject, goodCallback))
      .toThrow(new TypeError('Expected Object, got string \'test\''))
    expect(() => deepMap({}, badCallback))
      .toThrow(new TypeError('Expected Function, got string \'test\''))
    expect(() => deepMap({}, goodAsyncCallback as any))
      .toThrow(new TypeError('Expected Function, got async function \'(AsyncFunction)\''))

    await expect(deepMapAsync(badObject, goodAsyncCallback))
      .rejects
      .toThrow(new TypeError('Expected Object, got string \'test\''))
    await expect(deepMapAsync({}, badCallback))
      .rejects
      .toThrow(new TypeError('Expected AsyncFunction, got string \'test\''))
    await expect(deepMapAsync({}, noneAsyncCallback as any))
      .rejects
      .toThrow(new TypeError('Expected AsyncFunction, got function \'(Function)\''))
  })
})

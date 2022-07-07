import { filter, filterAsync, deepFilter, deepFilterAsync, FilterCallback, AsyncFilterCallback } from '../packages/filter/src'

describe('filter', () => {
  const filterFunc: FilterCallback = (_, value): boolean => typeof value === 'number'
  const asyncFilterFunc: AsyncFilterCallback = async (_, value): Promise<boolean> => typeof value === 'number'

  test('should remove when callback evaluates to false', async () => {
    const a = { a: 1, b: 2, c: 'string' }

    expect(Object.keys(filter(a, filterFunc))).toHaveLength(2)
    expect(Object.keys(deepFilter(a, filterFunc))).toHaveLength(2)
    expect(Object.keys(await filterAsync(a, asyncFilterFunc))).toHaveLength(2)
    expect(Object.keys(await deepFilterAsync(a, asyncFilterFunc))).toHaveLength(2)
  })

  test('deep functions should handle deep objects correctly', async () => {
    const a = { a: { b: { c: 1, d: 'string' } } }

    const deepResult = deepFilter(a, filterFunc)
    expect(deepResult.a?.b.c).toBe(1)
    expect(deepResult.a?.b.d).toBeUndefined()

    const asyncResult = await deepFilterAsync(a, asyncFilterFunc)
    expect(asyncResult.a?.b.c).toBe(1)
    expect(asyncResult.a?.b.d).toBeUndefined()
  })

  test('should throw error if invalid argument passed', async () => {
    const badObject = 'test' as any
    const badCallback = 'test' as any
    const goodCallback = (): boolean => true
    const goodAsyncCallback = async (): Promise<boolean> => true
    const noneAsyncCallback = (): void => {}

    expect(() => filter(badObject, goodCallback))
      .toThrow(new TypeError('Expected Object, got string \'test\''))
    expect(() => filter({}, badCallback))
      .toThrow(new TypeError('Expected Function, got string \'test\''))
    expect(() => filter({}, goodAsyncCallback as any))
      .toThrow(new TypeError('Expected Function, got async function \'(AsyncFunction)\''))

    await expect(filterAsync(badObject, goodAsyncCallback))
      .rejects
      .toThrow(new TypeError('Expected Object, got string \'test\''))
    await expect(filterAsync({}, badCallback))
      .rejects
      .toThrow(new TypeError('Expected AsyncFunction, got string \'test\''))
    await expect(filterAsync({}, noneAsyncCallback as any))
      .rejects
      .toThrow(new TypeError('Expected AsyncFunction, got function \'(Function)\''))

    expect(() => deepFilter(badObject, goodCallback))
      .toThrow(new TypeError('Expected Object, got string \'test\''))
    expect(() => deepFilter({}, badCallback))
      .toThrow(new TypeError('Expected Function, got string \'test\''))
    expect(() => deepFilter({}, goodAsyncCallback as any))
      .toThrow(new TypeError('Expected Function, got async function \'(AsyncFunction)\''))

    await expect(deepFilterAsync(badObject, goodAsyncCallback))
      .rejects
      .toThrow(new TypeError('Expected Object, got string \'test\''))
    await expect(deepFilterAsync({}, badCallback))
      .rejects
      .toThrow(new TypeError('Expected AsyncFunction, got string \'test\''))
    await expect(deepFilterAsync({}, noneAsyncCallback as any))
      .rejects
      .toThrow(new TypeError('Expected AsyncFunction, got function \'(Function)\''))
  })
})

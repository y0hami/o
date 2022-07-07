import { find, findAsync, deepFind, deepFindAsync, FindCallback, AsyncFindCallback } from '../packages/find/src'

describe('find', () => {
  test('should return first result which satisfies the callback', async () => {
    const a = { a: 2, b: 1, c: 1 }
    const findFunc: FindCallback = (_, value) => value === 1
    const asyncFindFunc: AsyncFindCallback = async (_, value) => value === 1

    const findResult = find(a, findFunc)
    expect(findResult.found).toBe(true)
    expect(findResult.key).toBe('b')
    expect(findResult.value).toBe(1)
    expect(findResult.index).toBe(1)

    const deepfindResult = deepFind(a, findFunc)
    expect(deepfindResult.found).toBe(true)
    expect(deepfindResult.key).toBe('b')
    expect(deepfindResult.value).toBe(1)
    expect(deepfindResult.index).toBe(1)

    const asyncfindResult = await findAsync(a, asyncFindFunc)
    expect(asyncfindResult.found).toBe(true)
    expect(asyncfindResult.key).toBe('b')
    expect(asyncfindResult.value).toBe(1)
    expect(asyncfindResult.index).toBe(1)

    const asyncdeepfindResult = await deepFindAsync(a, asyncFindFunc)
    expect(asyncdeepfindResult.found).toBe(true)
    expect(asyncdeepfindResult.key).toBe('b')
    expect(asyncdeepfindResult.value).toBe(1)
    expect(asyncdeepfindResult.index).toBe(1)
  })

  test('should return found = false when callback is never satisfied', async () => {
    const a = { a: 2, b: 2 }
    const findFunc: FindCallback = (_, value) => value === 1
    const asyncFindFunc: AsyncFindCallback = async (_, value) => value === 1

    const findResult = find(a, findFunc)
    expect(findResult.found).toBe(false)
    expect(findResult.key).toBeUndefined()
    expect(findResult.value).toBeUndefined()
    expect(findResult.index).toBeUndefined()

    const deepfindResult = deepFind(a, findFunc)
    expect(deepfindResult.found).toBe(false)
    expect(deepfindResult.key).toBeUndefined()
    expect(deepfindResult.value).toBeUndefined()
    expect(deepfindResult.index).toBeUndefined()

    const asyncfindResult = await findAsync(a, asyncFindFunc)
    expect(asyncfindResult.found).toBe(false)
    expect(asyncfindResult.key).toBeUndefined()
    expect(asyncfindResult.value).toBeUndefined()
    expect(asyncfindResult.index).toBeUndefined()

    const asyncdeepfindResult = await deepFindAsync(a, asyncFindFunc)
    expect(asyncdeepfindResult.found).toBe(false)
    expect(asyncdeepfindResult.key).toBeUndefined()
    expect(asyncdeepfindResult.value).toBeUndefined()
    expect(asyncdeepfindResult.index).toBeUndefined()
  })

  test('should handle deep objects correctly', async () => {
    const a = { a: { b: { c: 2, d: 1 } } }
    const findFunc: FindCallback = (_, value) => value === 1
    const asyncFindFunc: AsyncFindCallback = async (_, value) => value === 1

    const deepfindResult = deepFind(a, findFunc)
    expect(deepfindResult.found).toBe(true)
    expect(deepfindResult.key).toBe('a.b.d')
    expect(deepfindResult.value).toBe(1)
    expect(deepfindResult.index).toBe(1)

    const asyncdeepfindResult = await deepFindAsync(a, asyncFindFunc)
    expect(asyncdeepfindResult.found).toBe(true)
    expect(asyncdeepfindResult.key).toBe('a.b.d')
    expect(asyncdeepfindResult.value).toBe(1)
    expect(asyncdeepfindResult.index).toBe(1)
  })

  test('should throw error if invalid argument passed', async () => {
    const badObject = 'test' as any
    const badCallback = 'test' as any
    const goodCallback = (): boolean => true
    const goodAsyncCallback = async (): Promise<boolean> => true
    const noneAsyncCallback = (): void => {}

    expect(() => find(badObject, goodCallback))
      .toThrow(new TypeError('Expected Object, got string \'test\''))
    expect(() => find({}, badCallback))
      .toThrow(new TypeError('Expected Function, got string \'test\''))
    expect(() => find({}, goodAsyncCallback as any))
      .toThrow(new TypeError('Expected Function, got async function \'(AsyncFunction)\''))

    await expect(findAsync(badObject, goodAsyncCallback))
      .rejects
      .toThrow(new TypeError('Expected Object, got string \'test\''))
    await expect(findAsync({}, badCallback))
      .rejects
      .toThrow(new TypeError('Expected AsyncFunction, got string \'test\''))
    await expect(findAsync({}, noneAsyncCallback as any))
      .rejects
      .toThrow(new TypeError('Expected AsyncFunction, got function \'(Function)\''))

    expect(() => deepFind(badObject, goodCallback))
      .toThrow(new TypeError('Expected Object, got string \'test\''))
    expect(() => deepFind({}, badCallback))
      .toThrow(new TypeError('Expected Function, got string \'test\''))
    expect(() => deepFind({}, goodAsyncCallback as any))
      .toThrow(new TypeError('Expected Function, got async function \'(AsyncFunction)\''))

    await expect(deepFindAsync(badObject, goodAsyncCallback))
      .rejects
      .toThrow(new TypeError('Expected Object, got string \'test\''))
    await expect(deepFindAsync({}, badCallback))
      .rejects
      .toThrow(new TypeError('Expected AsyncFunction, got string \'test\''))
    await expect(deepFindAsync({}, noneAsyncCallback as any))
      .rejects
      .toThrow(new TypeError('Expected AsyncFunction, got function \'(Function)\''))
  })
})

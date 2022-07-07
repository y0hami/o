export type AsyncFunction <T extends any> = () => Promise<T>
export type AsyncFunctionArray <T extends any> = Array<AsyncFunction<T>>

export const sequentialPromises = async <T extends any> (functions: Array<AsyncFunction<T>>): Promise<T[]> => await new Promise((resolve, reject) => {
  const next = functions.shift()
  if (next === undefined) return resolve([])

  let currentResult: T

  Promise.resolve(next())
    .then(result => { currentResult = result })
    .then(async () => await sequentialPromises(functions))
    .then(results => [currentResult, ...results])
    .then(results => resolve(results))
    .catch(reject)
})

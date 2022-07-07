import { GenericObject, ArgumentTypeError, isAsync } from 'o.utils'
import is from 'o.is'
import { deepEachAsync } from 'o.each'
import { AsyncFindCallback, FindResult } from './types'

/**
 * Return the first key/value which satisfies the callback evaluation.
 *
 * This is all keys (includng deep), for shallow use o.findAsync.
 *
 * For synchronous callbacks use o.deepFind.
 *
 * @see {@link Array.find}
 * @see {@link o.findAsync}
 * @see {@link o.deepFind}
 *
 * @param object - The object to loop over
 * @param callback - The function to execute on all keys
 *
 * @throws ArgumentTypeError
 *
 * @since 3.0.0
 * @version 3.0.0
 */
export async function deepFindAsync <T extends GenericObject, Result extends any> (object: T, callback: AsyncFindCallback): Promise<FindResult<Result>> {
  // Check all arguments are the correct type
  if (!is(object)) throw new ArgumentTypeError('Object', object)
  if (typeof callback !== 'function') throw new ArgumentTypeError('AsyncFunction', callback)
  if (!isAsync(callback)) throw new ArgumentTypeError('AsyncFunction', callback)

  let result: FindResult<Result> = { key: undefined, value: undefined, index: undefined, found: false }
  let found = false

  return await new Promise((resolve, reject) => {
    deepEachAsync(object, async (key, value, index) => {
      if (!found && await callback(key, value, index) as any === true) {
        result = { key, value, index, found: true }
        found = true
      }
    })
      .then(() => resolve(result))
      .catch(reject)
  })
}

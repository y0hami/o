import { GenericObject, ArgumentTypeError, isAsync } from 'o.utils'
import is from 'o.is'
import { eachAsync } from 'o.each'
import { AsyncFindCallback, FindResult } from './types'

/**
 * Return the first key/value which satisfies the callback evaluation.
 *
 * This is shallow keys only, for all keys includng deep use o.deepFindAsync.
 *
 * For synchronous callbacks use o.find.
 *
 * @see {@link Array.find}
 * @see {@link o.deepFindAsync}
 * @see {@link o.find}
 *
 * @param object - The object to loop over
 * @param callback - The function to execute on all keys
 *
 * @throws ArgumentTypeError
 *
 * @since 3.0.0
 * @version 3.0.0
 */
export async function findAsync <T extends GenericObject, Result extends any> (object: T, callback: AsyncFindCallback): Promise<FindResult<Result>> {
  // Check all arguments are the correct type
  if (!is(object)) throw new ArgumentTypeError('Object', object)
  if (typeof callback !== 'function') throw new ArgumentTypeError('AsyncFunction', callback)
  if (!isAsync(callback)) throw new ArgumentTypeError('AsyncFunction', callback)

  let result: FindResult<Result> = { key: undefined, value: undefined, index: undefined, found: false }
  let found = false

  return await new Promise((resolve, reject) => {
    eachAsync(object, async (key, value, index) => {
      if (!found && await callback(key, value, index) as any === true) {
        result = { key, value, index, found: true }
        found = true
      }
    })
      .then(() => resolve(result))
      .catch(reject)
  })
}

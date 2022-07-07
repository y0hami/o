import { GenericObject, ArgumentTypeError, isAsync } from 'o.utils'
import is from 'o.is'
import clone from 'o.clone'
import { eachAsync } from 'o.each'
import del from 'o.del'
import { AsyncFilterCallback } from './types'

/**
 * Filter the object keys/values depending on the callback evaluation.
 *
 * This is shallow keys only, for all keys includng deep use o.deepFilterAsync.
 *
 * For synchronous callbacks use o.filterAsync.
 *
 * @see {@link Array.filter}
 * @see {@link o.deepFilterAsync}
 * @see {@link o.filterAsync}
 *
 * @param object - The object to loop over
 * @param callback - The function to execute on all keys
 *
 * @throws ArgumentTypeError
 *
 * @since 3.0.0
 * @version 3.0.0
 */
export async function filterAsync <T extends GenericObject, Result extends Partial<T>> (object: T, callback: AsyncFilterCallback): Promise<Result> {
  // Check all arguments are the correct type
  if (!is(object)) throw new ArgumentTypeError('Object', object)
  if (typeof callback !== 'function') throw new ArgumentTypeError('AsyncFunction', callback)
  if (!isAsync(callback)) throw new ArgumentTypeError('AsyncFunction', callback)

  // Clone the object and make it the reference as the result
  let result = clone(object)

  return await new Promise((resolve, reject) => {
    // Loop over the object
    eachAsync(result, async (key, value, index) => {
      // If the callback results to false on a key
      if (!(await callback(key, value, index))) {
        // Delete that key/value from the object
        result = del(result, key)
      }
    }).then(() => resolve(result))
      .catch(reject)
  })
}

import { GenericObject, ArgumentTypeError, isAsync } from 'o.utils'
import is from 'o.is'
import clone from 'o.clone'
import { deepEachAsync } from 'o.each'
import del from 'o.del'
import { AsyncFilterCallback } from './types'

/**
 * Filter the object keys/values (including deep) depending on the callback evaluation.
 *
 * For shallow keys only use o.filterAsync.
 *
 * For synchronous callbacks use o.deepFilterAsync.
 *
 * @see {@link Array.filter}
 * @see {@link o.filterAsync}
 * @see {@link o.deepFilterAsync}
 *
 * @param object - The object to loop over
 * @param callback - The function to execute on all keys
 *
 * @throws ArgumentTypeError
 *
 * @since 3.0.0
 * @version 3.0.0
 */
export async function deepFilterAsync <T extends GenericObject, Result extends Partial<T>> (object: T, callback: AsyncFilterCallback): Promise<Result> {
  // Check all arguments are the correct type
  if (!is(object)) throw new ArgumentTypeError('Object', object)
  if (typeof callback !== 'function') throw new ArgumentTypeError('AsyncFunction', callback)
  if (!isAsync(callback)) throw new ArgumentTypeError('AsyncFunction', callback)

  // Clone the object and make it the reference as the result
  let result = clone(object)

  return await new Promise((resolve, reject) => {
    // Loop over the object
    deepEachAsync(result, async (key, value, index) => {
      // If the callback results to false on a key
      if (!(await callback(key, value, index))) {
        // Delete that key/value from the object
        result = del(result, key)
      }
    }).then(() => resolve(result))
      .catch(reject)
  })
}

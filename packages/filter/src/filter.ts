import { GenericObject, ArgumentTypeError, isAsync } from '../../utils/src'
import is from '../../is/src'
import clone from '../../clone/src'
import each from '../../each/src'
import del from '../../del/src'
import { FilterCallback } from './types'

/**
 * Filter the object keys/values depending on the callback evaluation
 *
 * This is shallow keys only, for all keys includng deep use o.deepFilter.
 *
 * For asynchronous callbacks use o.filterAsync.
 *
 * @see {@link Array.filter}
 * @see {@link o.deepFilter}
 * @see {@link o.filterAsync}
 *
 * @param object - The object to loop over
 * @param callback - The function to execute on all keys
 *
 * @throws ArgumentTypeError
 *
 * @since 1.0.0
 * @version 3.0.0
 */
export function filter <T extends GenericObject, Result extends Partial<T>> (object: T, callback: FilterCallback): Result {
  // Check all arguments are the correct type
  if (!is(object)) throw new ArgumentTypeError('Object', object)
  if (typeof callback !== 'function') throw new ArgumentTypeError('Function', callback)
  if (isAsync(callback)) throw new ArgumentTypeError('Function', callback)

  // Clone the object and make it the reference as the result
  let result = clone(object)

  // Loop over the object
  each(result, (key, value, index) => {
    // If the callback results to false on a key
    if (!callback(key, value, index)) {
      // Delete that key/value from the object
      result = del(result, key)
    }
  })

  // Return the result
  return result
}

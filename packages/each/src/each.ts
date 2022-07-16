import { GenericObject, ArgumentTypeError, isAsync } from '../../utils/src'
import is from '../../is/src'
import { EachCallback } from './types'

/**
 * Foreach over all shallow object keys like Array.forEach.
 *
 * This is shallow keys only, for all keys includng deep use o.deepEach.
 *
 * For asynchronous callbacks use o.eachAsync.
 *
 * @see {@link Array.forEach}
 * @see {@link o.deepEach}
 * @see {@link o.eachAsync}
 *
 * @param object - The object to loop over
 * @param callback - The function to execute on all keys
 *
 * @throws ArgumentTypeError
 *
 * @since 1.0.0
 * @version 3.0.0
 */
export function each <T extends GenericObject> (object: T, callback: EachCallback): void {
  // Check all arguments are the correct type
  if (!is(object)) throw new ArgumentTypeError('Object', object)
  if (typeof callback !== 'function') throw new ArgumentTypeError('Function', callback)
  if (isAsync(callback)) throw new ArgumentTypeError('Function', callback)

  // Loop over the object keys and call the callback with params
  Object.keys(object)
    .forEach((key, index) => {
      callback(key, object[key], index)
    })
}

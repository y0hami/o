import { GenericObject, ArgumentTypeError, isAsync } from '../../utils/src'
import is from '../../is/src'
import { SomeCallback } from './types'

/**
 * Check if some values in the object evaluates to true like Array.some.
 *
 * This is shallow keys only, for all keys includng deep use o.deepSome.
 *
 * For asynchronous callbacks use o.someAsync.
 *
 * @see {@link Array.some}
 * @see {@link o.deepSome}
 * @see {@link o.someAsync}
 *
 * @param object - The object to loop over
 * @param callback - The function to execute on all keys
 *
 * @throws ArgumentTypeError
 *
 * @since 1.0.0
 * @version 3.0.0
 */
export function some <T extends GenericObject> (object: T, callback: SomeCallback): boolean {
  // Check all arguments are the correct type
  if (!is(object)) throw new ArgumentTypeError('Object', object)
  if (typeof callback !== 'function') throw new ArgumentTypeError('Function', callback)
  if (isAsync(callback)) throw new ArgumentTypeError('Function', callback)

  // Loop over all the object keys and run the callback with the params.
  // We map these results to an array and then we can simply use Array.some
  // to check if some values are true and return the result
  return Object.keys(object)
    .map((key, index) =>
      callback(key, object[key], index))
    .some((cbResult: any) => cbResult === true)
}

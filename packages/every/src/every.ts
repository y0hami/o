import { GenericObject, ArgumentTypeError, isAsync } from 'o.utils'
import is from 'o.is'
import { EveryCallback } from './types'

/**
 * Check if every value in the object evaluates to true like Array.every.
 *
 * This is shallow keys only, for all keys includng deep use o.deepEvery.
 *
 * For asynchronous callbacks use o.everyAsync.
 *
 * @see {@link Array.every}
 * @see {@link o.deepEvery}
 * @see {@link o.everyAsync}
 *
 * @param object - The object to loop over
 * @param callback - The function to execute on all keys
 *
 * @throws ArgumentTypeError
 *
 * @since 1.0.0
 * @version 3.0.0
 */
export function every <T extends GenericObject> (object: T, callback: EveryCallback): boolean {
  // Check all arguments are the correct type
  if (!is(object)) throw new ArgumentTypeError('Object', object)
  if (typeof callback !== 'function') throw new ArgumentTypeError('Function', callback)
  if (isAsync(callback)) throw new ArgumentTypeError('Function', callback)

  // Loop over all the object keys and run the callback with the params.
  // We map these results to an array and then we can simply to Array.every
  // To check all the values are true and return the result
  return Object.keys(object)
    .map((key, index) =>
      callback(key, object[key], index))
    // We force the predicate param as an any type here so we can
    // force a true check
    .every((cbResult: any) => cbResult === true)
}

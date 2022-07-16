import { GenericObject, ArgumentTypeError, isAsync } from '../../utils/src'
import is from '../../is/src'
import { MapCallback } from './types'

/**
 * Loop over an object and return an array of values of the callback returns.
 *
 * This is shallow keys only, for all keys includng deep use o.deepMap.
 *
 * For asynchronous callbacks use o.mapAsync.
 *
 * @see {@link Array.map}
 * @see {@link o.deepMap}
 * @see {@link o.mapAsync}
 *
 * @param object - The object to loop over
 * @param callback - The function used to compute the return value
 *
 * @throws ArgumentTypeError
 *
 * @since 1.0.0
 * @version 3.0.0
 */
export function map <T extends GenericObject, Return extends any> (object: T, callback: MapCallback<Return>): Return[] {
  // Check all arguments are the correct type
  if (!is(object)) throw new ArgumentTypeError('Object', object)
  if (typeof callback !== 'function') throw new ArgumentTypeError('Function', callback)
  if (isAsync(callback)) throw new ArgumentTypeError('Function', callback)

  return Object.keys(object)
    .map((key, index) =>
      callback(key, object[key], index))
}

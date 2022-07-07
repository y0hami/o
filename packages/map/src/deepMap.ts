import { GenericObject, ArgumentTypeError, isAsync } from 'o.utils'
import is from 'o.is'
import deflate from 'o.deflate'
import { MapCallback } from './types'

/**
 * Loop over an object and return an array of values of the callback returns.
 *
 * This is deep keys, for shallow keys only use o.map.
 *
 * For asynchronous callbacks use o.deepMapAsync.
 *
 * @see {@link Array.map}
 * @see {@link o.map}
 * @see {@link o.deepMapAsync}
 *
 * @param object - The object to loop over
 * @param callback - The function used to compute the return value
 *
 * @throws ArgumentTypeError
 *
 * @since 1.0.0
 * @version 3.0.0
 */
export function deepMap <T extends GenericObject, Return extends any> (object: T, callback: MapCallback<Return>): Return[] {
  // Check all arguments are the correct type
  if (!is(object)) throw new ArgumentTypeError('Object', object)
  if (typeof callback !== 'function') throw new ArgumentTypeError('Function', callback)
  if (isAsync(callback)) throw new ArgumentTypeError('Function', callback)

  const deflated = deflate(object)

  return Object.keys(deflated)
    .map((key, index) =>
      callback(key, deflated[key], index))
}

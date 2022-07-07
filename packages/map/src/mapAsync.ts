import { GenericObject, ArgumentTypeError, isAsync, sequentialPromises } from 'o.utils'
import is from 'o.is'
import { AsyncMapCallback } from './types'

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
export async function mapAsync <T extends GenericObject, Return extends any> (object: T, callback: AsyncMapCallback<Return>): Promise<Return[]> {
  // Check all arguments are the correct type
  if (!is(object)) throw new ArgumentTypeError('Object', object)
  if (typeof callback !== 'function') throw new ArgumentTypeError('AsyncFunction', callback)
  if (!isAsync(callback)) throw new ArgumentTypeError('AsyncFunction', callback)

  return await new Promise((resolve, reject) => {
    sequentialPromises(Object.keys(object)
      .map((key, index) => async () =>
        await callback(key, object[key], index)))
      .then(resolve)
      .catch(reject)
  })
}

import { GenericObject, ArgumentTypeError, sequentialPromises, isAsync } from 'o.utils'
import is from 'o.is'
import deflate from 'o.deflate'
import { AsyncEveryCallback } from './types'

/**
 * Check if every value in the object (including deep objects) evaluates to true like Array.every.
 *
 * This is shallow keys only, for all keys includng deep use o.deepEveryAsync.
 *
 * For synchronous callbacks use o.every.
 *
 * @see {@link Array.every}
 * @see {@link o.deepEveryAsync}
 * @see {@link o.every}
 *
 * @param object - The object to loop over
 * @param callback - The function to execute on all keys
 *
 * @throws ArgumentTypeError
 *
 * @since 3.0.0
 * @version 3.0.0
 */
export async function deepEveryAsync <T extends GenericObject> (object: T, callback: AsyncEveryCallback): Promise<boolean> {
  // Check all arguments are the correct type
  if (!is(object)) throw new ArgumentTypeError('Object', object)
  if (typeof callback !== 'function') throw new ArgumentTypeError('AsyncFunction', callback)
  if (!isAsync(callback)) throw new ArgumentTypeError('AsyncFunction', callback)

  const deflated = deflate(object)

  // Return a promise which will be used to run all the callbacks
  return await new Promise((resolve, reject) => {
    // Run all the callbacks synchronously in order
    sequentialPromises(Object.keys(deflated)
      .map((key, index) => async () =>
        await callback(key, deflated[key], index)))
      .then(results =>
        // Check all the callback results are equal to true
        // We force the result as an any type so we can
        // explicitly check if its true
        resolve(results.every((rv: any) => rv === true)))
      .catch(reject)
  })
}

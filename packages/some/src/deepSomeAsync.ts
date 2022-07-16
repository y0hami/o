import { GenericObject, ArgumentTypeError, sequentialPromises, isAsync } from '../../utils/src'
import is from '../../is/src'
import deflate from '../../deflate/src'
import { AsyncSomeCallback } from './types'

/**
 * Check if some values in the object (including deep objects) evaluates to true like Array.some.
 *
 * For shallow use o.someAsync.
 *
 * For synchronous callbacks use o.deepSome.
 *
 * @see {@link Array.some}
 * @see {@link o.deepSomeAsync}
 * @see {@link o.some}
 *
 * @param object - The object to loop over
 * @param callback - The function to execute on all keys
 *
 * @throws ArgumentTypeError
 *
 * @since 3.0.0
 * @version 3.0.0
 */
export async function deepSomeAsync <T extends GenericObject> (object: T, callback: AsyncSomeCallback): Promise<boolean> {
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
        // Check if some callback results are equal to true
        // We force the result as an any type so we can
        // explicitly check if its true
        resolve(results.some((rv: any) => rv === true)))
      .catch(reject)
  })
}

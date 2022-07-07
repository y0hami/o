import { GenericObject, ArgumentTypeError, sequentialPromises, isAsync } from 'o.utils'
import is from 'o.is'
import { AsyncSomeCallback } from './types'

/**
 * Check if some values in the object evaluates to true like Array.some.
 *
 * This is shallow keys only, for all keys includng deep use o.deepSomeAsync.
 *
 * For synchronous callbacks use o.some.
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
export async function someAsync <T extends GenericObject> (object: T, callback: AsyncSomeCallback): Promise<boolean> {
  // Check all arguments are the correct type
  if (!is(object)) throw new ArgumentTypeError('Object', object)
  if (typeof callback !== 'function') throw new ArgumentTypeError('AsyncFunction', callback)
  if (!isAsync(callback)) throw new ArgumentTypeError('AsyncFunction', callback)

  return await new Promise((resolve, reject) => {
    sequentialPromises(Object.keys(object)
      .map((key, index) =>
        async () => await callback(key, object[key], index)))
      // Run the async callbacks synchronously
      .then(cbResults =>
        // We can simply run Array.some on the result of all the async callbacks
        resolve(cbResults.some((r: any) => r === true)))
      .catch(reject)
  })
}

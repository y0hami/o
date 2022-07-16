import { GenericObject, ArgumentTypeError, sequentialPromises, isAsync } from '../../utils/src'
import is from '../../is/src'
import { AsyncEveryCallback } from './types'

/**
 * Check if every value in the object evaluates to true like Array.every.
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
export async function everyAsync <T extends GenericObject> (object: T, callback: AsyncEveryCallback): Promise<boolean> {
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
        // We can simply run Array.every on the result of all the async callbacks
        resolve(cbResults.every((r: any) => r === true)))
      .catch(reject)
  })
}

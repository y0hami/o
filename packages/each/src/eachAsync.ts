import { GenericObject, ArgumentTypeError, sequentialPromises, isAsync } from 'o.utils'
import is from 'o.is'
import { AsyncEachCallback } from './types'

/**
 * Foreach over all shallow object keys like Array.forEach with an async callback.
 * Callbacks will run sequentially in the order of the object keys.
 *
 * This is shallow keys only, for all keys includng deep use o.deepEachAsync.
 *
 * For synchronous callbacks use o.each.
 *
 * @see {@link Array.forEach}
 * @see {@link o.deepEachAsync}
 * @see {@link o.each}
 *
 * @param object - The object to loop over
 * @param callback - The function to execute on all keys
 *
 * @throws ArgumentTypeError
 *
 * @since 3.0.0
 * @version 3.0.0
 */
export async function eachAsync <T extends GenericObject> (object: T, callback: AsyncEachCallback): Promise<void> {
  // Check all arguments are the correct type
  if (!is(object)) throw new ArgumentTypeError('Object', object)
  if (typeof callback !== 'function') throw new ArgumentTypeError('AsyncFunction', callback)
  if (!isAsync(callback)) throw new ArgumentTypeError('AsyncFunction', callback)

  return await new Promise((resolve, reject) => {
    sequentialPromises(Object.keys(object)
      .map((key, index) =>
        async () => await callback(key, object[key], index)))
      .then(() => resolve())
      .catch(reject)
  })
}

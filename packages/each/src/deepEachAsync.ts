import { GenericObject, ArgumentTypeError, sequentialPromises, isAsync } from 'o.utils'
import is from 'o.is'
import deflate from 'o.deflate'
import { AsyncEachCallback } from './types'

/**
 * Foreach over all (including deep) object keys like Array.forEach with an async callback.
 * Callbacks will run sequentially in the order of the object keys.
 *
 * For shallow use o.eachAsync.
 *
 * For synchronous callbacks use o.deepEach.
 *
 * @see {@link Array.forEach}
 * @see {@link o.eachAsync}
 * @see {@link o.deepEach}
 *
 * @param object - The object to loop over
 * @param callback - The function to execute on all keys
 *
 * @throws ArgumentTypeError
 *
 * @since 3.0.0
 * @version 3.0.0
 */
export async function deepEachAsync <T extends GenericObject> (object: T, callback: AsyncEachCallback): Promise<void> {
  // Check all arguments are the correct type
  if (!is(object)) throw new ArgumentTypeError('Object', object)
  if (typeof callback !== 'function') throw new ArgumentTypeError('AsyncFunction', callback)
  if (!isAsync(callback)) throw new ArgumentTypeError('AsyncFunction', callback)

  const deflated = deflate(object)

  // Return a promise which will be used to run all the callbacks
  return await new Promise((resolve, reject) => {
    // Run all the callbacks synchronously in order
    // and resolve once they're all ran
    sequentialPromises(Object.keys(deflated)
      .map((key, index) => async () =>
        await callback(key, deflated[key], index)))
      .then(() => resolve())
      .catch(reject)
  })
}

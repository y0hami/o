import { GenericObject, ArgumentTypeError, isAsync } from '../../utils/src'
import is from '../../is/src'
import deflate from '../../deflate/src'
import { EachCallback } from './types'
import { each } from './each'

/**
 * Foreach over all (including deep) object keys like Array.forEach.
 *
 * For shallow use o.each.
 *
 * For asynchronous callbacks use o.deepEachAsync.
 *
 * @see {@link Array.forEach}
 * @see {@link o.each}
 * @see {@link o.deepEachAsync}
 *
 * @param object - The object to loop over
 * @param callback - The function to execute on all keys
 *
 * @throws ArgumentTypeError
 *
 * @since 3.0.0
 * @version 3.0.0
 */
export function deepEach <T extends GenericObject> (object: T, callback: EachCallback): void {
  // Check all arguments are the correct type
  if (!is(object)) throw new ArgumentTypeError('Object', object)
  if (typeof callback !== 'function') throw new ArgumentTypeError('Function', callback)
  if (isAsync(callback)) throw new ArgumentTypeError('Function', callback)

  each(deflate(object), callback)
}

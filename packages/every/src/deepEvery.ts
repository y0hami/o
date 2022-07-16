import { GenericObject, ArgumentTypeError, isAsync } from '../../utils/src'
import is from '../../is/src'
import deflate from '../../deflate/src'
import { EveryCallback } from './types'
import { every } from './every'

/**
 * Check if every value in the object evaluates to true like Array.every.
 *
 * For shallow use o.every.
 *
 * For asynchronous callbacks use o.deepEveryAsync.
 *
 * @see {@link Array.every}
 * @see {@link o.every}
 * @see {@link o.deepEveryAsync}
 *
 * @param object - The object to loop over
 * @param callback - The function to execute on all keys
 *
 * @throws ArgumentTypeError
 *
 * @since 3.0.0
 * @version 3.0.0
 */
export function deepEvery <T extends GenericObject> (object: T, callback: EveryCallback): boolean {
  // Check all arguments are the correct type
  if (!is(object)) throw new ArgumentTypeError('Object', object)
  if (typeof callback !== 'function') throw new ArgumentTypeError('Function', callback)
  if (isAsync(callback)) throw new ArgumentTypeError('Function', callback)

  return every(deflate(object), callback)
}

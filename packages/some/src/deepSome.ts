import { GenericObject, ArgumentTypeError, isAsync } from '../../utils/src'
import is from '../../is/src'
import deflate from '../../deflate/src'
import { SomeCallback } from './types'
import { some } from './some'

/**
 * Check if some values in the object evaluates to true like Array.some.
 *
 * For shallow use o.some.
 *
 * For asynchronous callbacks use o.deepSomeAsync.
 *
 * @see {@link Array.some}
 * @see {@link o.some}
 * @see {@link o.deepSomeAsync}
 *
 * @param object - The object to loop over
 * @param callback - The function to execute on all keys
 *
 * @throws ArgumentTypeError
 *
 * @since 3.0.0
 * @version 3.0.0
 */
export function deepSome <T extends GenericObject> (object: T, callback: SomeCallback): boolean {
  // Check all arguments are the correct type
  if (!is(object)) throw new ArgumentTypeError('Object', object)
  if (typeof callback !== 'function') throw new ArgumentTypeError('Function', callback)
  if (isAsync(callback)) throw new ArgumentTypeError('Function', callback)

  return some(deflate(object), callback)
}

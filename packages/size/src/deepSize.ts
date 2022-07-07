import { GenericObject, ArgumentTypeError } from 'o.utils'
import is from 'o.is'
import deflate from 'o.deflate'

/**
 * Get the size of an object.
 *
 * This is deep keys, for shallow keys only use o.size.
 *
 * @see {@link o.size}
 *
 * @param object - The object to get the size from
 * @returns Returns The size of the object
 *
 * @throws ArgumentTypeError
 *
 * @since 1.0.0
 * @version 3.0.0
 */
export function deepSize (object: GenericObject): number {
  // Check if all arguments provided are objects
  if (!is(object)) throw new ArgumentTypeError('Object', object)

  return Object.keys(deflate(object)).length
}

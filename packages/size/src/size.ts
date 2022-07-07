import { GenericObject, ArgumentTypeError } from 'o.utils'
import is from 'o.is'

/**
 * Get the size of an object.
 *
 * This is shallow keys only, for all keys includng deep use o.deepSize.
 *
 * @see {@link o.deepSize}
 *
 * @param object - The object to get the size from
 * @returns Returns The size of the object
 *
 * @throws ArgumentTypeError
 *
 * @since 1.0.0
 * @version 3.0.0
 */
export function size (object: GenericObject): number {
  // Check if all arguments provided are objects
  if (!is(object)) throw new ArgumentTypeError('Object', object)

  return Object.keys(object).length
}

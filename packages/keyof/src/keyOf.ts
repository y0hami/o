import { GenericObject, ArgumentTypeError } from '../../utils/src'
import is from '../../is/src'
import find from '../../find/src'

/**
 * Get the key to the specified value.
 *
 * Only shallow keys, use o.deepKeyOf for a deep lookup.
 *
 * @see {@link o.deepKeyOf}
 *
 * @param object - The object to check
 * @param value - The value to check for
 * @returns Returns the key to the value if found else undefined
 *
 * @throws ArgumentTypeError
 *
 * @since 1.0.0
 * @version 3.0.0
 */
export function keyOf <T extends GenericObject> (object: T, value: any): string | undefined {
  // Check all arguments are the correct type
  if (!is(object)) throw new ArgumentTypeError('Object', object)

  return find(object, (key, objValue) => objValue === value).key
}

import { GenericObject, ArgumentTypeError } from '../../utils/src'
import is from '../../is/src'

/**
 * Check if the specified object is empty.
 *
 * @param object - The object to check
 * @returns Returns true if the object is empty and false if not
 *
 * @throws ArgumentTypeError
 *
 * @since 1.0.0
 * @version 3.0.0
 */
export default function empty (object: GenericObject): boolean {
  if (!is(object)) throw new ArgumentTypeError('Object', object)

  // If object has keys return false
  // If object does not have keys return true
  return Object.keys(object).length === 0
}

import { ArgumentTypeError, GenericObject, ObjectKey } from '../../utils/src'
import is from '../../is/src'
import deflate from '../../deflate/src'

/**
 * Get an array of the object keys (including deep).
 *
 * @throws ArgumentTypeError
 *
 * @param object - Object to get the keys from
 * @returns Array of the object keys
 *
 * @since 1.0.0
 * @version 3.0.0
 */
export default function deepKeys <T extends GenericObject> (object: T): ObjectKey[] {
  // Check if the argument is an object
  if (!is(object)) throw new ArgumentTypeError('Object', object)

  // Deflate the object so we can simply run Object.keys
  // and get all the object keys as dot notation
  const deflated = deflate(object)

  // Return the keys of the deflated object
  return Object.keys(deflated)
}

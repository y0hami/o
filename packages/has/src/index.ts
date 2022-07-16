import { ArgumentTypeError, GenericObject } from '../../utils/src'
import is from '../../is/src'
import { has as hasProp } from '../../dot/src'

/**
 * Check if an object has the specified path.
 *
 * @param object - The object to check
 * @param path - The path to the key you want to check. Can use dot notation
 * @returns Whether the path exists
 *
 * @throws ArgumentTypeError
 *
 * @since 1.0.0
 * @version 3.0.0
 */

export default function has <T extends GenericObject> (object: T, path: string): boolean {
  // Check if arguments are correct types
  if (!is(object)) throw new ArgumentTypeError('Object', object)
  if (typeof path !== 'string') throw new ArgumentTypeError('String', path)

  return hasProp(object, path)
}

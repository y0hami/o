import { ArgumentTypeError, GenericObject } from '../../utils/src'
import is from '../../is/src'
import { del as delProp } from '../../dot/src'
import clone from '../../clone/src'

/**
 * Delete the value at the specified path from the object.
 * Path is dot notation
 *
 * @see {@link o.dot}
 *
 * @param object - The object to delete from
 * @param path - The path to the key you want to delete. Can use dot notation
 * @returns The object with the property of path removed
 *
 * @throws ArgumentTypeError
 *
 * @since 1.0.0
 * @version 3.0.0
 */

export default function del <T extends GenericObject, Result extends Partial<T>> (object: T, path: string): Result {
  // Check if arguments are correct types
  if (!is(object)) throw new ArgumentTypeError('Object', object)
  if (typeof path !== 'string') throw new ArgumentTypeError('String', path)

  const cloned = clone(object)
  delProp(cloned, path)
  return cloned
}

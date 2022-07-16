import { ArgumentTypeError, GenericObject } from '../../utils/src'
import is from '../../is/src'
import { set as setProp } from '../../dot/src'
import clone from '../../clone/src'

/**
 * Set the value at the path in the specified object
 *
 * @param object - The object to set in
 * @param path - The path to the key you want to set. Can use dot notation
 * @param value - The value to set
 * @returns The object with the new value set
 *
 * @throws ArgumentTypeError
 *
 * @since 1.0.0
 * @version 3.0.0
 */

export default function set <T extends GenericObject, Result extends T> (object: T, path: string, value: any): Result {
  // Check if arguments are correct types
  if (!is(object)) throw new ArgumentTypeError('Object', object)
  if (typeof path !== 'string') throw new ArgumentTypeError('String', path)

  const cloned = clone(object)
  setProp(cloned, path, value)
  return cloned
}

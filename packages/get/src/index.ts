import { ArgumentTypeError, GenericObject } from 'o.utils'
import is from 'o.is'
import { get as getProp } from 'o.dot'

/**
 * Get the value from the path in the specified object
 *
 * @param object - The object to get from
 * @param path - The path to the key you want to get. Can use dot notation
 * @param defaultValue - The default value to return when no key exists
 * @returns The value at the key or default value if provided else undefined
 *
 * @throws ArgumentTypeError
 *
 * @since 1.0.0
 * @version 3.0.0
 */

export default function get <T extends GenericObject, Result extends any> (object: T, path: string, defaultValue: any = undefined): Result {
  // Check if arguments are correct types
  if (!is(object)) throw new ArgumentTypeError('Object', object)
  if (typeof path !== 'string') throw new ArgumentTypeError('String', path)

  return getProp(object, path, defaultValue)
}

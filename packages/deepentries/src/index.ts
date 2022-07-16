import { ArgumentTypeError, GenericObject, ObjectKey } from '../../utils/src'
import is from '../../is/src'
import deflate from '../../deflate/src'

export type Entry = [ObjectKey, any]

/**
 * Get an array of entries like Object.entries but includes deep objects.
 *
 * @throws ArgumentTypeError
 *
 * @param object - Object to get entries from
 * @returns Array of entries
 *
 * @since 3.0.0
 * @version 3.0.0
 */
export default function deepEntries <T extends GenericObject> (object: T): Entry[] {
  // Check if the argument is an object
  if (!is(object)) throw new ArgumentTypeError('Object', object)

  return Object.entries(deflate(object))
}

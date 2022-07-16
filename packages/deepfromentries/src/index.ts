import { ArgumentTypeError, GenericObject } from '../../utils/src'
import inflate from '../../inflate/src'
import { Entry } from '../../deepentries/src'

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
export default function deepFromEntries <Result extends GenericObject> (entries: Entry[]): Result {
  // Check if the argument is an object
  if (!Array.isArray(entries)) throw new ArgumentTypeError('Entry[]', entries)
  if (entries.length === 0) throw new ArgumentTypeError('Entry[]', entries)

  return inflate(Object.fromEntries(entries))
}

export type {
  Entry
}

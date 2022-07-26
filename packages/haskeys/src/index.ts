import { ArgumentTypeError, GenericObject } from '../../utils/src'
import is from '../../is/src'
import empty from '../../empty/src'
import has from '../../has/src'

/**
 * Check if an object has all the specified keys.
 * If the path exists but the value is undefined it
 * will still return true.
 *
 * Keys can be dot notation
 *
 * @param object - The object to check
 * @param keys - The keys you want to check. Can use dot notation
 * @returns Whether all the keys exists
 *
 * @throws ArgumentTypeError
 *
 * @since 3.0.0
 * @version 3.0.0
 */

export default function hasKeys <T extends GenericObject> (object: T, keys: string[]): boolean {
  // Check if arguments are correct types
  if (!is(object)) throw new ArgumentTypeError('Object', object)
  if (!Array.isArray(keys)) throw new ArgumentTypeError('String[]', keys)
  if (keys.length === 0) throw new ArgumentTypeError('String[]', keys)
  if (!keys.every(key => typeof key === 'string')) throw new ArgumentTypeError('String[]', keys)
  if (!keys.every(key => key !== '')) throw new ArgumentTypeError('String[]', keys)

  if (empty(object)) return false

  return keys.every(key => has(object, key))
}

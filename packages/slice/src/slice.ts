import { GenericObject, ArgumentTypeError } from '../../utils/src'
import is from '../../is/src'
import set from '../../set/src'

/**
 * Slice an object like Array.slice.
 *
 * Only shallow keys, use o.deepSlice for a deep slice.
 *
 * @see {@link Array.slice}
 * @see {@link o.deepSlice}
 *
 * @param object - The object to slice
 * @param start - The start index
 * @param end - The end index
 * @returns Returns the sliced object
 *
 * @throws ArgumentTypeError
 *
 * @since 1.0.0
 * @version 3.0.0
 */
export function slice <T extends GenericObject, Result extends Partial<T>> (object: T, start: number, end: number = Object.keys(object).length): Result {
  // Check all arguments are the correct type
  if (!is(object)) throw new ArgumentTypeError('Object', object)
  if (typeof start !== 'number') throw new ArgumentTypeError('Number', start)
  if (typeof end !== 'number') throw new ArgumentTypeError('Number', end)

  const keys = Object.keys(object).slice(start, end)
  let result: any = {}

  keys.forEach(key => {
    result = set(result, key.replace(/\./g, '\\.'), object[key])
  })

  return result
}

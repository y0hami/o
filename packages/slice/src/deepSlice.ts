import { GenericObject, ArgumentTypeError } from 'o.utils'
import is from 'o.is'
import deflate from 'o.deflate'
import set from 'o.set'
import get from 'o.get'

/**
 * Slice an object like Array.slice.
 *
 * Slices deep objects, use o.slice for a shallow slice.
 *
 * @see {@link Array.slice}
 * @see {@link o.slice}
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
export function deepSlice <T extends GenericObject, Result extends Partial<T>> (object: T, start: number, end: number = Object.keys(deflate(object)).length): Result {
  // Check all arguments are the correct type
  if (!is(object)) throw new ArgumentTypeError('Object', object)
  if (typeof start !== 'number') throw new ArgumentTypeError('Number', start)
  if (typeof end !== 'number') throw new ArgumentTypeError('Number', end)

  const keys = Object.keys(deflate(object)).slice(start, end)
  let result: any = {}

  keys.forEach(key => {
    result = set(result, key, get(object, key))
  })

  return result
}

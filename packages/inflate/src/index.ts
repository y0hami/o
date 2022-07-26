import { GenericObject, ArgumentTypeError } from '../../utils/src'
import is from '../../is/src'
import set from '../../set/src'

/**
 * Inflate the specified object into a deep object.
 * This is the reverse of the o.deflate method.
 *
 * @see {@link o.deflate}
 *
 * @param object - The object to inflate
 * @returns The inflated object
 *
 * @throws ArgumentTypeError
 *
 * @since 1.0.0
 * @version 3.0.0
 */
export default function inflate <T extends GenericObject, InflatedResult extends GenericObject> (object: T): InflatedResult {
  if (!is(object)) throw new ArgumentTypeError('Object', object)

  // If the object is empty just return a new empty object
  if (Object.keys(object).length === 0) return {} as any as InflatedResult

  // Create a result object
  let result: any = {}

  // Loop over the object
  Object.keys(object).forEach(dotNotation => {
    result = set(result, dotNotation, object[dotNotation])
  })

  // Return the resulting inflated object
  return result
}

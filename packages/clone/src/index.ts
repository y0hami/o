import { GenericObject, ArgumentTypeError } from '../../utils/src'
import is from '../../is/src'

/**
 * Clone the specified object.
 *
 * Modifying the properties of a cloned object won't
 * affect the original and vice versa.
 *
 * @param object - Object to clone
 * @returns The cloned object
 *
 * @throws ArgumentTypeError
 *
 * @since 1.0.0
 * @version 3.0.0
 */
export default function clone <T extends GenericObject> (object: T): T {
  if (!is(object)) throw new ArgumentTypeError('Object', object)

  // If provided object is empty just return a new empty object
  if (Object.keys(object).length === 0) return {} as any as T

  // Clone the object
  const result: any = Object.assign({}, object)

  // Loop over keys and clone all objects
  Object.keys(result).forEach(key => {
    const value = result[key]
    if (is(value)) {
      result[key] = clone(value)
    }
  })

  // Return the result
  return result
}

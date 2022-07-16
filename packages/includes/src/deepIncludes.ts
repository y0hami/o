import { GenericObject, ArgumentTypeError } from '../../utils/src'
import is from '../../is/src'
import { deepEach } from '../../each/src'

/**
 * Check if an object contains a value.
 *
 * Checks deep objects, use o.includes for a shallow check.
 *
 * @see {@link o.includes}
 *
 * @param object - The object to check
 * @param value - The value to check for
 * @returns Returns true if the object contains the value
 *
 * @throws ArgumentTypeError
 *
 * @since 1.0.0
 * @version 3.0.0
 */
export function deepIncludes <T extends GenericObject> (object: T, value: any): boolean {
  // Check all arguments are the correct type
  if (!is(object)) throw new ArgumentTypeError('Object', object)

  let result = false

  deepEach(object, (key, objValue) => {
    if (!result) {
      if (objValue === value) result = true
    }
  })

  return result
}

import { GenericObject, ArgumentTypeError } from 'o.utils'
import is from 'o.is'
import each from 'o.each'

/**
 * Check if an object contains a value.
 *
 * Only shallow keys, use o.deepIncludes for a deep check.
 *
 * @see {@link o.deepIncludes}
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
export function includes <T extends GenericObject> (object: T, value: any): boolean {
  // Check all arguments are the correct type
  if (!is(object)) throw new ArgumentTypeError('Object', object)

  let result = false

  each(object, (key, objValue) => {
    if (!result) {
      if (objValue === value) result = true
    }
  })

  return result
}

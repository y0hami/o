import { ArgumentTypeError, GenericObject } from '../../utils/src'
import is from '../../is/src'

/**
 * Get an array of the object values.
 *
 * @throws ArgumentTypeError
 *
 * @param object - Object to get values from
 * @returns Array of values in the specified object
 *
 * @since 3.0.0
 * @version 3.0.0
 */
export default function deepValues <T extends GenericObject> (object: T): any[] {
  // Check if the argument is an object
  if (!is(object)) throw new ArgumentTypeError('Object', object)

  const result: any[] = []
  Object.values(object).forEach((value) => {
    // Loop through all the values and check if the value is an object
    if (is(value)) result.push(...deepValues(value)) // If it is an object run values recursively
    else result.push(value) // If it is not an object just push the value to the array
  })

  // Return the final array of values
  return result
}

import { GenericObject, ArgumentTypeError } from 'o.utils'
import is from 'o.is'
import * as dot from 'o.dot'

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
  const result: any = {}

  // Loop over the object
  Object.keys(object).forEach(dotNotation => {
    // Convert the keys of the object from dot notation to an array of keys to iterate
    const paths = dot.from(dotNotation)

    // Create reference to the "current object" we're applying the changes to
    let resRef = result

    // Loop over all the paths from the dot notation key
    paths.forEach((key, index) => {
      // If an object doesn't exist for the key, create one
      if (!is(resRef[key])) {
        resRef[key] = {}
      }

      // If this is the last path set the value
      if (index === paths.length - 1) {
        resRef[key] = object[dotNotation]
      }

      // Set the reference to the current object
      resRef = resRef[key]
    })
  })

  // Return the resulting inflated object
  return result
}

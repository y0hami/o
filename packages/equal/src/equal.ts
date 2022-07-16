import { GenericObject, ArgumentTypeError } from '../../utils/src'
import is from '../../is/src'

/**
 * Check if all provided objects are equal.
 * Only 1 layer deep, use o.equalDeep for a deep comparison.
 *
 * @see {@link o.deepEqual}
 *
 * @param objects - The objects to check
 * @returns Returns true if all objects are equal and false if one or more don't equal
 *
 * @throws ArgumentTypeError
 *
 * @since 1.0.0
 * @version 3.0.0
 */
export function equal (...objects: GenericObject[]): boolean {
  // Check if all arguments provided are objects
  if (objects.length < 2) throw new ArgumentTypeError('Object[]', objects)
  objects.forEach(obj => {
    if (!is(obj)) throw new ArgumentTypeError('Object', obj)
  })

  const comparison = objects.shift() as GenericObject
  const comparisonsKeys = Object.keys(comparison)

  return objects.every(object => {
    // Get the keys of the current check object
    const keys = Object.keys(object)

    // If the check object doesn't have the same amount of keys
    // as the comparison object then it of course is not equal
    if (keys.length !== comparisonsKeys.length) return false

    // Check if the check object and comparison object contain
    // the same keys. If not then it is again not equal
    if (!keys.every(key => comparisonsKeys.includes(key))) return false

    // Create a value comparison function
    const compareValue = (a: any, b: any): boolean => {
      // If one of the values is an object, check if both are objects
      if (is(a) || is(b)) return is(a) && is(b)

      // If one of the values is an array, check if both are arrays
      if (Array.isArray(a) || Array.isArray(b)) return Array.isArray(a) && Array.isArray(b)

      // If one of the values is a function check if both are functions
      // and whether both functions are the same
      if (typeof a === 'function' || typeof b === 'function') {
        if (typeof a === 'function' && typeof b === 'function') return a === b && String(a) === String(b)
      }

      // Any other value type do a generic comparison
      return a === b
    }

    // Check if all values match between both the check object and comparison object
    return keys.every(key => compareValue(
      comparison[key],
      object[key]
    ))
  })
}

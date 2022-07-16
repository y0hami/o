import { GenericObject, ArgumentTypeError } from '../../utils/src'
import is from '../../is/src'
import deflate from '../../deflate/src'
import clone from '../../clone/src'
import { equal } from './equal'

/**
 * Check if all provided objects deeply equal each other.
 * For shallow comparison use o.equal
 *
 * @see {@link o.equal}
 *
 * @param objects - Objects to compare
 * @returns True if all objects are equal and false if one or more are not equal
 *
 * @throws ArgumentTypeError
 *
 * @since 1.0.0
 * @version 3.0.0
 */
export function deepEqual (...objects: GenericObject[]): boolean {
  // Check if all arguments provided are objects
  if (objects.length < 2) throw new ArgumentTypeError('Object[]', objects)
  objects.forEach(obj => {
    if (!is(obj)) throw new ArgumentTypeError('Object', obj)
  })

  // Deflate all objects so we don't have to loop into nested objects etc.
  // This way we can reuse the o.equal function
  const deflatedObjects = objects.map(obj => deflate(clone(obj)))
  const comparison = deflatedObjects.shift() as GenericObject

  return deflatedObjects.every(object => equal(comparison, object))
}

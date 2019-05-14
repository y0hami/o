// o
import { valid } from './util';

/**
 * Get the size of the specified object.
 *
 * @example
 * ```
 * const a = { a: 1, b: 2 };
 *
 * size(a); // => 2
 * ```
 *
 * @throws Error
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function size(obj: OObject): number {
  // check if the arg specified is an object
  if (!valid(obj)) throw new Error('The argument `obj` is not an object');

  // get the object keys and return the length
  return Object.keys(obj).length;
}

export default size;

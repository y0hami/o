// o
import { valid } from './util';
import empty from './empty';

/**
 * Clone the specified object.
 * Modifying the properties of a cloned object won't affect the original.
 *
 * @example
 * ```
 * const a = { a: 1 };
 *
 * const b = clone(a);
 * b.a = 2;
 *
 * console.log(a.a, b.a); // => 1  2
 * ```
 *
 * @throws Error
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function clone(obj: OObject): OObject {
  // check if the arg specified is an object
  if (!valid(obj)) throw new Error('The argument `obj` is not an object');

  // if the object is empty just return a new object
  if (empty(obj)) return {};

  // create a new empty object
  const result: OObject = {};

  // for each key in the object
  Object.keys(obj).forEach((key: string) => {
    // add the value from the original object to the same
    // key in the new object
    result[key] = obj[key];
  });

  // return the new object
  return result;
}

export default clone;

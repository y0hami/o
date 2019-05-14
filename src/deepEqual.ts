// o
import { valid } from './util';
import is from './is';
import equal from './equal';
import deflate from './deflate';

/**
 * Check whether all objects deeply equal each other
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 2 } };
 * const b = { a: 1, b: { c: 2 } };
 * const c = { a: 1 };
 * const d = { a: 2 };
 * const e = { a: 1, b: { c: 2 } };
 * const f = { a: 1, b: { c: 3 } };
 *
 * console.log(equal(a, b)); // => true
 * console.log(equal(c, d)); // => false
 * console.log(equal(e, f)); // => false
 * ```
 *
 * @throws Error
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function deepEqual(obj: OObject, ...compareWith: OObject[]): boolean {
  // check if the arg specified is an object
  if (!valid(obj)) throw new Error('The argument `obj` is not an object');

  // check if all the compare values are objects
  if (!compareWith.every(object => is(object))) {
    throw new Error('The arguments `compareWith` are not objects');
  }

  // check if every object is equal to each other when deflated
  // if all objects are deflated we can simply use the equal function
  // to check if they equal at 1 layer
  return compareWith.every(
    object => equal(deflate(obj), deflate(object)),
  );
}

export default deepEqual;

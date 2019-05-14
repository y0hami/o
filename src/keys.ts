// o
import { valid } from './util';
import clone from './clone';
import deflate from './deflate';

/**
 * Get the keys of the specified object (different to Object.keys
 * because Object.keys can't follow deep objects)
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 2, d: { e: 3 } } };
 *
 * keys(a); // => [ 'a', 'b' ]
 * keys(a, true); // => [ 'a', 'b.c', 'b.d.e' ]
 * ```
 *
 * @throws Error
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function keys(obj: OObject, follow: boolean = false): string[] {
  // check if the args specified are the correct type
  if (!valid(obj)) throw new Error('The argument `obj` is not an object');
  if (typeof follow !== 'boolean') throw new Error('The argument `follow` is not a boolean');

  // clone the object so we can deflate it if we need to
  let cloned = clone(obj);

  // if follow is true
  if (follow) {
    // set the cloned object as the object but deflated
    cloned = deflate(cloned);
  }

  // use the native Object.keys function so its fast and return the result
  return Object.keys(cloned);
}

export default keys;

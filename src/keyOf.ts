// o
import { valid } from './util';
import find from './find';

/**
 * Get the key to the specified value in dot notation
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 2 } };
 *
 * keyOf(a, 2); // => undefined
 * keyOf(a, 2, true); // => 'b.c'
 * ```
 *
 * @throws Error
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function keyOf(obj: OObject, value: any, follow: boolean = false): string | undefined {
  // check if the args specified are the correct type
  if (!valid(obj)) throw new Error('The argument `obj` is not an object');
  if (typeof follow !== 'boolean') throw new Error('The argument `follow` is not a boolean');

  // this is just an alias of find so we simply just pass the params
  // to the find function and return its result
  return find(obj, (key, objValue) => objValue === value, follow);
}

export default keyOf;

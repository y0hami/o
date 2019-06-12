// o
import { valid, defaults } from './util';
import find from './find';

// default options
export const DefaultOptions: KeyOfOptions = {
  follow: false,
};

/**
 * Get the key to the specified value in dot notation
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 2 } };
 *
 * keyOf(a, 2); // => undefined
 * keyOf(a, 2, {
 *   follow: true,
 * }); // => 'b.c'
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function keyOf(
  obj: OObject,
  value: any,
  options: KeyOfOptions = DefaultOptions,
): string | undefined {
  // extract options
  const {
    follow,
  } = (defaults(DefaultOptions, options) as KeyOfOptions);

  // check if the args specified are the correct type
  if (!valid(obj)) throw new TypeError(`Expected Object, got ${typeof obj} ${obj}`);
  if (typeof follow !== 'boolean') throw new TypeError(`Expected Boolean, got ${typeof follow} ${follow}`);

  // this is just an alias of find so we simply just pass the params
  // to the find function and return its result
  return find(obj, (key, objValue) => objValue === value, {
    follow,
  });
}

export default keyOf;

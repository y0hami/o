// o
import { valid } from './util';
import empty from './empty';
import clone from './clone';
import deflate from './deflate';
import del from './del';

/**
 * Remove `null` and `undefined` values from the specified object
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: null }, d: undefined };
 *
 * console.log(clean(a)); // => { a: 1, b: {} }
 * ```
 *
 * @throws Error
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function clean(obj: OObject, follow: boolean = false): OObject {
  // check if the object specified is an object
  if (!valid(obj)) throw new Error('The argument `obj` is not an object');

  // check if follow is a boolean
  if (typeof follow !== 'boolean') throw new Error('The argument `follow` is not a boolean');

  // if the object is empty just return a new object
  if (empty(obj)) return {};

  // create the result object with a clone of the original
  // so we can manipulate it
  let result = clone(obj);

  // deflate the object keys if follow is true
  // then we only need to loop over 1 layer of keys
  const keysObject = follow
    ? deflate(obj)
    : obj;

  // for each key
  Object.keys(keysObject).forEach(key => {
    // get the key value
    const value = keysObject[key];

    // if the value is `undefined` or `null`
    if (value === undefined || value === null) {
      // delete the value from the result object
      result = del(result, key);
    }
  });

  // return the result object
  return result;
}

export default clean;

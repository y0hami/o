// o
import { valid } from './util';
import clone from './clone';
import each from './each';
import del from './del';

export interface OFilterCallback {
  (key: string, value: any, index: number): boolean;
}

/**
 * Filter the object keys/values depending on the callback evaluation
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 2 } };
 *
 * filter(a, (key, value) => {
 *   return value === 1;
 * }); // => { a: 1 }
 *
 * filter(a, (key, value) => {
 *   return value === 2;
 * }, true); // => { b: { c: 2 } }
 * ```
 *
 * @throws Error
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function filter(obj: OObject, cb: OFilterCallback, follow: boolean = false): OObject {
  // check if the args specified are the correct type
  if (!valid(obj)) throw new Error('The argument `obj` is not an object');
  if (typeof cb !== 'function') throw new Error('The argument `cb` is not a function');
  if (typeof follow !== 'boolean') throw new Error('The argument `follow` is not a boolean');

  // create a clone of the original object for the result so we can
  // manipulate it
  let result = clone(obj);

  // for each over the object using the each function which makes it easier
  // for us to loop since we can just pass our own callback to evaluate the
  // the return value and we can pass follow directly to each and it will
  // handle the deep looping for us
  each(obj, (key, value, index) => {
    // if the callback evaluates to false
    if (!cb(key, value, index)) {
      // remove the value at that key from the result
      result = del(result, key);
    }
  }, follow);

  // return the result
  return result;
}

export default filter;

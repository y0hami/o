// o
import { valid } from './util';
import each from './each';

export interface OFindCallback {
  (key: string, value: any, index: number): boolean;
}

/**
 * Find the key matching the callback evaluation
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 2 } };
 *
 * find(a, (key, value) => {
 *   return value === 2;
 * }); // => undefined
 *
 * find(a, (key, value) => {
 *   return value === 2;
 * }, true); // => 'b.c'
 * ```
 *
 * @throws Error
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function find(obj: OObject, cb: OFindCallback, follow: boolean = false): string | undefined {
  // check if the args specified are the correct type
  if (!valid(obj)) throw new Error('The argument `obj` is not an object');
  if (typeof cb !== 'function') throw new Error('The argument `cb` is not a function');
  if (typeof follow !== 'boolean') throw new Error('The argument `follow` is not a boolean');

  // create a variable to track whether the key is found
  let found = false;

  // create the result variable which will default to undefined
  let result: string | undefined;

  // for each over the object using the each function which makes it easier
  // for us to loop since we can just pass our own callback to evaluate the
  // the return value and we can pass follow directly to each and it will
  // handle the deep looping for us
  each(obj, (key, value, index) => {
    // if the key is already found skip because find should
    // return the first found key
    if (!found) {
      // check if the callback evaluates to true
      if (cb(key, value, index)) {
        // if it does evaluate true set found as true
        found = true;

        // and set the result as the current key
        result = key;
      }
    }
  }, follow);

  // if the key was not found set the result as undefined
  if (!found) result = undefined;

  // return the result
  return result;
}

export default find;

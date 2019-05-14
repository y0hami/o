// o
import { valid } from './util';
import keys from './keys';
import set from './set';
import get from './get';

/**
 * Get a portion of the specified object
 *
 * @example
 * ```
 * const a = { a: 1, b: 2, c: 3, d: 4 };
 *
 * slice(a, 0, 1); // => { a: 1 }
 * slice(a, 1, 3); // => { b: 2, c: 3 }
 * ```
 *
 * @throws Error
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function slice(
  obj: OObject,
  start: number,
  end: number = Object.keys(obj).length,
  follow: boolean = false,
): OObject {
  // check if the args specified are the correct type
  if (!valid(obj)) throw new Error('The argument `obj` is not an object');
  if (typeof start !== 'number') throw new Error('The argument `start` is not a number');
  if (typeof end !== 'number') throw new Error('The argument `end` is not a number');

  // create an empty object for the result
  let result: OObject = {};

  // get the keys of the object and pass follow so the keys function
  // can handle the deep looping for us
  const objKeys = keys(obj, follow);

  // run the native slice function on the keys so its fast
  objKeys.slice(start, end)
    .forEach(key => {
      // for each of the keys after sliced

      // get the value from the original object
      const value = get(obj, key);

      // set the value on the result object to the current key
      result = set(result, key, value);
    });

  // return the result
  return result;
}

export default slice;

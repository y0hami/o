// o
import is from './is';
import empty from './empty';
import deflate from './deflate';
import del from './del';
import clone from './clone';

/**
 * Remove `null` and `undefined` values from the specified object
 *
 * @example
 * const a = { a: 1, b: undefined, c: null };
 * clean(a); // => { a: 1 }
 *
 * @since 1.0.0
 * @version 1.0.0
 *
 * @param {object} object The object to clean
 * @param {boolean} [follow=false] Whether to follow objects
 *
 * @returns {object} The clean object
 */
function clean(object, follow = false) {
  // check if object is an object
  if (is(object) && !empty(object)) {
    // clone the object to use as the result and
    // so it is immutable
    let result = clone(object);

    // if follow is true flatten the object keys so
    // its easy to get the path to delete and so
    // it's easy to check if values are null/undefined
    // if follow is false it will just be the base
    // object therefore it will only check the base keys
    const keysObject = follow
      ? deflate(object)
      : object;

    // loop over the keys of the object
    Object.keys(keysObject).forEach((key) => {
      // get the value of the current key
      const value = keysObject[key];

      // if the value is undefined or null
      if (value === undefined || value === null) {
        // delete the key/value from the object
        result = del(result, key);
      }
    });

    // return the result
    return result;
  }

  // if the object isn't an object or is empty return
  // an empty object this will keep the return immutable
  return {};
}

export default clean;

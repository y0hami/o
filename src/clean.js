
// o
import is from './is';
import empty from './empty';
import flattenKeys from './flattenKeys';
import del from './del';
import clone from './clone';

/**
 * Remove `null` and `undefined` values from the specified object
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

    // if follow is true flatten the keys of the
    // object so its easy to get the path to delete
    // and so its easy to check if values are null/undefined
    // if follow is false it will just be the base
    // object therefore it will only check the base keys
    const keysObject = follow
      ? flattenKeys(object)
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

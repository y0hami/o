// o
import is from './is';
import empty from './empty';
import set from './set';

/**
 * Inflate an object (reverse deflate)
 *
 * @param {object} object The object to inflate
 *
 * @returns {object} The inflated object
 */
function inflate(object) {
  // check if the object is an object and isn't empty
  if (is(object) && !empty(object)) {
    // create a new object for the result
    let result = {};

    // for each key in the object
    Object.keys(object).forEach((path) => {
      // get value from the object
      const value = object[path];

      // set the value on the result according to
      // the dot notation path (if the key is a dot
      // notation path)
      result = set(result, path, value);
    });

    // returned the result
    return result;
  }

  // if the object isn't an object or is empty return
  // an empty object this will keep the return immutable
  return {};
}

export default inflate;

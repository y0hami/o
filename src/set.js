// o
import is from './is';
import clone from './clone';
import getPathParts from './pathParts';

/**
 * Set the specified path with the specified value
 *
 * @example
 * const a = { a: 1, b: 2 };
 * set(a, 'c', 3); // => { a: 1, b: 2, c: 3 }
 *
 * @since 1.0.0
 * @version 1.0.0
 *
 * @param {object} object The object to set the value on
 * @param {string} path The path to set the value as
 * @param {*} value The value to set
 *
 * @return {object} The object with the new set value
 */
function set(object, path, value) {
  // check if the object is an object
  if (is(object)) {
    // clone the object
    let cloned = clone(object);

    // set a new value for the cloned object so we
    // can manipulate it
    const result = cloned;

    // get the path parts
    const pathParts = getPathParts(path);

    // loop over all the path parts
    for (let index = 0; index < pathParts.length; index += 1) {
      // get the current key
      const key = pathParts[index];

      // check if the value is an object
      if (!is(cloned[key])) {
        // if it isn't an object set it to an empty object
        cloned[key] = {};
      }

      // check if the current path is the last key
      if (index === pathParts.length - 1) {
        // if it is the last key set it as the value
        cloned[key] = value;
      }

      // set the modified values to the object
      cloned = cloned[key];
    }

    // returned the result
    return result;
  }

  // if the object isn't an object return an empty
  // object this will keep the return immutable
  return {};
}

export default set;

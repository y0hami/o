// o
import is from './is';
import empty from './empty';
import clone from './clone';
import getPathParts from './pathParts';

/**
 * Delete the specified path from the object
 *
 * @example
 * const a = { a: 1, b: 2 };
 * del(a, 'b'); // => { a: 1 }
 *
 * @since 1.0.0
 * @version 1.0.0
 *
 * @param {object} object The object to delete from
 * @param {string} path The path to delete
 *
 * @returns {object} The result object
 */
function del(object, path) {
  // check if the object is an object and isn't empty
  if (is(object) && !empty(object)) {
    // clone the object
    let cloned = clone(object);

    // set the new value for the cloned object so we
    // can manipulate it
    const result = cloned;

    // get the path parts
    const pathParts = getPathParts(path);

    // loop over all the path parts
    for (let index = 0; index < pathParts.length; index += 1) {
      // get the current key
      const key = pathParts[index];

      // check if the current path is the last key
      if (index === pathParts.length - 1) {
        // if it is the last key delete the value from the object
        delete cloned[key];
      }

      // set the modified values to the object
      cloned = cloned[key];
    }

    // return the result
    return result;
  }

  // if the object isn't an object or is empty return
  // an empty object this will keep the return immutable
  return {};
}

export default del;

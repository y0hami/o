// o
import is from './is';
import empty from './empty';
import has from './has';
import getPathParts from './pathParts';

/**
 * Get the value from the specified path
 *
 * @example
 * const a = { a: 1, b: 2, c: 3 };
 * get(a, 'b'); // => 2
 *
 * @since 1.0.0
 * @version 1.0.0
 *
 * @param {object} object The object the get from
 * @param {string} path The path to get
 * @param {*} [defaultValue=undefined] The default value to return if the path doesn't exist
 *
 * @returns {*} The value from the path or the default value
 */
function get(object, path, defaultValue = undefined) {
  // check if the object is an object and is not empty
  // and it has the path specified
  if (is(object) && !empty(object) && has(object, path)) {
    // set the currentValue to the object so its easier to
    // iterate over the objects
    let currentValue = object;

    // for each path parts from the parsed path
    getPathParts(path).forEach((key) => {
      currentValue = currentValue[key];
    });

    // if it isn't undefined return the value
    return currentValue;
  }

  // if the object isn't an object or it is empty or
  // it doesn't have the specified path return the
  // default value
  return defaultValue;
}

export default get;

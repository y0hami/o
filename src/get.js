// o
import is from './is';
import empty from './empty';
import has from './has';
import { getPathParts } from './internals';

/**
 * Get the value from the specified path
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
      // if the current value is an object and it isn't empty
      if (is(currentValue) && !empty(currentValue)) {
        // set the currentValue as the value from the key
        currentValue = currentValue[key];
      }
    });

    // if the currentValue is undefined after getting the new
    // value from the paths return the default value
    if (currentValue === undefined) {
      return defaultValue;
    }

    // if it isn't undefined return the value
    return currentValue;
  }

  // if the object isn't an object or it is empty or
  // it doesn't have the specified path return the
  // default value
  return defaultValue;
}

export default get;

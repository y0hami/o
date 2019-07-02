// o
import is from './is';
import empty from './empty';
import getPathParts from './pathParts';

/**
 * Check if an object has the specified paths
 *
 * @example
 * const a = { a: 1, b: 2, c: 3 };
 * has(a, 'a'); // => true
 * has(a, 'd'); // => false
 *
 * @since 1.0.0
 * @version 1.0.0
 *
 * @param {object} object The object to check
 * @param {...string} paths The paths to check for
 *
 * @returns {boolean} Whether the object contains the specified path
 */
function has(object, ...paths) {
  // check if object is an object
  if (is(object) && !empty(object)) {
    // set the result to true by default
    let hasPaths = true;

    // for each path specified
    paths.forEach((path) => {
      // get the parsed path parts
      const parts = getPathParts(path);

      // set the current value so its easier to iterate over
      let currentValue = object;

      // for each part in the path
      parts.forEach((key) => {
        if (is(currentValue) && !empty(currentValue)) {
          currentValue = currentValue[key];
        } else {
          currentValue = undefined;
        }
      });

      // check if the currentValue is undefined meaning that the path
      // doesn't exist
      if (currentValue === undefined) {
        // if the currentValue is undefined set hasPaths to false
        // this will lead to the function returning false because
        // the object specified doesn't have all the paths specified
        hasPaths = false;
      }
    });

    // return whether or not all the paths exist in the specified object
    return hasPaths;
  }

  // return false because the object specified isn't an object
  return false;
}

export default has;
// o
import is from './is';
import empty from './empty';
import { getPathParts } from './internals';

/**
 * Check if an object has the specified paths
 *
 * @param {object} object The object to check
 * @param {...string} paths The paths to check for
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
        // check if the currentValue is an object
        if (is(currentValue) && !empty(currentValue)) {
          // if it is set the currentValue to the corresponding key from
          // that object
          currentValue = currentValue[key];
        }
        // if the currentValue isn't an object then the value will stay
        // as the last currentValue this should leave the last value as
        // any value which is fetch from the object path. If the value
        // fetched turns out to be undefined we can then tell the path
        // doesn't exist in the next step
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

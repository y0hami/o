// o
import is from './is';
import empty from './empty';

/**
 * Clone the specified object
 *
 * @param {object} object The object to clone
 * @returns {object} The cloned object
 */
function clone(object) {
  // check if the object is an object and isn't empty
  if (is(object) && !empty(object)) {
    // create a new object for the result
    const result = {};

    // for each key in the specified object add it
    // to the new result with the value from the
    // original object
    Object.keys(object).forEach((key) => {
      result[key] = object[key];
    });

    // return the result object
    return result;
  }

  // if the object isn't an object or is empty return
  // an empty object
  return {};
}

export default clone;

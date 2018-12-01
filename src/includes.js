// o
import is from './is';
import empty from './empty';
import each from './each';

/**
 * Check if the object includes the specified object
 *
 * @param {object} object The object to check
 * @param {*} value The value to check for
 * @param {boolean} follow Whether to follow objects
 *
 * @returns {boolean} Whether the object contains the specified value
 */
function includes(object, value, follow = false) {
  // if the object is an object and is not empty
  if (is(object) && !empty(object)) {
    // create an result variable as false
    let result = false;

    // for each key/value in the object
    // follow is passed into each therefore the
    // each function works out whether to follow
    // the objects
    each(object, (key, objValue) => {
      // if the result isn't already true
      if (!result) {
        // follow is false or follow is true but the
        // object value isn't an object
        if (!follow || (follow && !is(value))) {
          // check if the object value is equal to
          // the specified value
          if (objValue === value) {
            // if they are the same set the result
            // to true
            result = true;
          }
        }
      }
    }, follow);

    // return the result
    return result;
  }

  // if the object isn't an object or is empty return
  // false because the object can't be checked
  return false;
}

export default includes;

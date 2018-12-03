// o
import is from './is';
import empty from './empty';
import each from './each';

/**
 * Get the key of the specified value in dot notation
 *
 * @example
 * const a = { a: 1, b: 2, c: 3 };
 * keyOf(a, 2); // => 'b'
 *
 * @since 1.0.0
 * @version 1.0.0
 *
 * @param {object} object The object to search
 * @param {*} value The value to look for
 * @param {boolean} [follow=false] Whether to follow objects
 *
 * @returns {string} The key when found else undefined
 */
function keyOf(object, value, follow = false) {
  // if the object is an object and is not empty
  if (is(object) && !empty(object)) {
    // create a found boolean so we can skip
    // over keys once we have found the correct
    // key
    let found = false;
    // create an result variable as false
    let result = '';

    // for each key/value in the object
    // follow is passed into each therefore the
    // each function works out whether to follow
    // the objects
    each(object, (key, objValue) => {
      // if the result isn't already found
      if (!found) {
        // follow is false or follow is true but the
        // object value isn't an object
        if (!follow || (follow && !is(value))) {
          // check if the object value is equal to
          // the specified value
          if (objValue === value) {
            // set found to true since the key was found
            found = true;

            // if the values are the same set the result
            // to the key
            result = key;
          }
        }
      }
    }, follow);

    // return the result if it was found else return
    // undefined
    return found
      ? result
      : undefined;
  }

  // if the object isn't an object or is empty return
  // false because the object can't be checked
  return undefined;
}

export default keyOf;

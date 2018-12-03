// o
import is from './is';
import size from './size';

/**
 * Check if an object is empty (has no keys)
 *
 * @example
 * const a = { a: 1 };
 * const b = {};
 * empty(a); // => false
 * empty(b); // => true
 *
 * @since 1.0.0
 * @version 1.0.0
 *
 * @param {object} object The object to check
 *
 * @returns {boolean} Whether it is empty
 */
function empty(object) {
  // check if the object specified is an object
  if (is(object)) {
    // if it is get the size of the object and return true if it
    // is larger then 0 meaning it isn't empty
    return !(size(object) > 0);
  }

  // return false if the object isn't an object
  return false;
}

export default empty;

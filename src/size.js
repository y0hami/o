// o
import is from './is';

/**
 * Get the size of the specified object
 *
 * @param {object} object The object to get the size of
 *
 * @returns {number} The size of the object (-1 when provided value isn't an object)
 */
function size(object) {
  // check if the object is an object
  if (is(object)) {
    // get the object keys and return the length
    return Object.keys(object).length;
  }

  // if the object isn't an object return -1 so that it is still
  // a number but it is distinguishable that it isn't an object
  // since objects can't have minus key lengths
  return -1;
}

export default size;

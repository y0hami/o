// o
import is from './is';
import empty from './empty';
import deflate from './deflate';

/**
 * Get an array of values from the specified object
 *
 * @example
 * const a = { a: 1, b: 2, c: 3 };
 * values(a); // => [1, 2, 3]
 *
 * @since 1.0.0
 * @version 1.0.0
 *
 * @param {object} object The object to get the values from
 * @param {boolean} [follow=false] Whether to follow objects
 *
 * @returns {array} An array of all the values from the object
 */
function values(object, follow) {
  // check if object is an object
  if (is(object) && !empty(object)) {
    // create an empty array for the result
    const result = [];

    // if follow is true flatten the object keys so
    // its easy to get the path to get the value
    // if follow is false it will just be the base
    // object therefore it will only need to base keys
    const keysObject = follow
      ? deflate(object)
      : object;

    // loop over the keys of the object
    Object.keys(keysObject).forEach((key) => {
      // get the current key value
      const value = keysObject[key];

      // add it to the result array
      result.push(value);
    });

    // return the result
    return result;
  }

  // if the object isn't an object or is empty return
  // an empty array because it won't contain any values
  return [];
}

export default values;

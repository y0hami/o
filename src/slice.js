// o
import is from './is';
import empty from './empty';
import keys from './keys';

/**
 * Get a portion of the specified object
 *
 * @example
 * const a = { a: 1, b: 2, c: 3 };
 * slice(a, 0, 1); // => { a: 1 }
 *
 * @since 1.0.0
 * @version 1.0.0
 *
 * @param {object} object The object to slice
 * @param {number} start The start index
 * @param {number} [end] The end index (defaults to object keys length)
 *
 * @returns {object} The sliced object
 */
function slice(object, start, end = Object.keys(object).length) {
  // if the object is an object and is not empty
  if (is(object) && !empty(object)) {
    // get the keys from the object
    const objKeys = keys(object);

    // create an empty object for the result
    const result = {};

    // slice the object keys to the specified start and end
    // and for each key returned
    objKeys.slice(start, end).forEach((key) => {
      // set the result object key to the value
      result[key] = object[key];
    });

    // return the result
    return result;
  }

  // if the object isn't an object or is empty return an
  // empty object because slicing won't return anything anyway
  return {};
}

export default slice;
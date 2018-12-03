// o
import is from './is';
import empty from './empty';
import each from './each';
import set from './set';

/**
 * Loop over an object and return a new object with the values
 * computed from the specified iterator
 *
 * @example
 * const a = { a: 1, b: 2, c: 3 };
 * map(a, (key, value) => value * 2); // => { a: 2, b: 4, c: 6 }
 *
 * @since 1.0.0
 * @version 1.0.0
 *
 * @param {object} object The object to map
 * @param {function(key: string, value: *)} iterator The function used to compute the value
 * @param {boolean} [follow=false] Whether or not to follow objects
 *
 * @returns {object} The result object with the computed values
 */
function map(object, iterator, follow = false) {
  // if the object is an object and is not empty
  if (is(object) && !empty(object) && typeof iterator === 'function') {
    // create an empty object for the result
    let result = {};

    // for each key/value in the object
    // follow is passed into each therefore the
    // each function works out whether to follow
    // the objects
    each(object, (key, value) => {
      // set the result to the object with the key/value computed
      // from the specified iterator
      result = set(result, key, iterator(key, value));
    }, follow);

    // return the result
    return result;
  }

  // if the object isn't an object or is empty return an
  // empty object because the iterator can't be ran to
  // compute the values
  return {};
}

export default map;

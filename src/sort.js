// o
import is from './is';
import empty from './empty';
import keys from './keys';
import get from './get';
import set from './set';
import each from './each';

/**
 * Sort an object via the iterator evaluation
 *
 * @example
 * const a = { a: 4, b: 7, c: 3 };
 * sort(a, (a, b) => {
 *  if (a.value < b.value) return -1;
 *  if (a.value > b.value) return 1;
 *  return 0;
 * }); // => { c: 3, a: 4, b: 7 }
 *
 * @since 1.0.0
 * @version 1.0.0
 *
 * @param {object} object The object to sort
 * @param {function(a: object, b: object)} iterator The function to evaluate
 * @param {boolean} [follow=false] Whether to follow objects
 *
 * @returns {object} The sorted object
 */
function sort(object, iterator, follow = false) {
  // check if the object is an object and isn't empty
  if (is(object) && !empty(object) && typeof iterator === 'function') {
    // create empty object for result
    let result = {};

    // for each over the object keys and values
    // follow is passed into each therefore the
    // each function works out whether to follow
    // the objects
    each(object, (key, value) => {
      // run the iterator function on the key and
      // value and if it evaluates to true set
      // the result object
      if (iterator(key, value) === true) {
        // set the key/value on the result object
        result = set(result, key, value);
      }
    }, follow);

    // return the result
    return result;
  }

  // if the object isn't an object or is empty return
  // an empty object this will keep the return immutable
  return {};
}

export default sort;

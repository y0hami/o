// o
import is from './is';
import empty from './empty';
import keys from './keys';
import get from './get';
import set from './set';

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
    // get all the keys and pass following so keys
    // can work out whether to follow
    const objKeys = keys(object, follow);

    // create an empty array so we can add all the sort objects
    const sortingValues = [];

    // for each key
    objKeys.forEach((key) => {
      // get the value of the key
      const value = get(object, key);

      // if following and the value is an object skip it
      if (follow && is(value)) {
        return;
      }

      // add the key and value as an object to the
      // sorting values array
      sortingValues.push({
        key,
        value,
      });
    });

    // sort the sorting values array using the
    // specified iterator
    const sorted = sortingValues.sort(iterator);

    // create an empty object for the result
    let result = {};

    // go through all the sorted values and
    // build the object from them in the sorted
    // order
    sorted.forEach((sortObj) => {
      // get the key and value
      const {
        key,
        value,
      } = sortObj;

      // set the key/value on the result object
      result = set(result, key, value);
    });

    // return the result
    return result;
  }

  // if the object isn't an object or is empty return
  // an empty object this will keep the return immutable
  return {};
}

export default sort;

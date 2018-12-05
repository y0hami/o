// o
import is from './is';
import empty from './empty';
import each from './each';

/**
 * Find the key matching the iterator evaluation
 *
 * @example
 * const a = { a: 1, b: 2, c: 3 };
 * find(a, (key, value) => value === 3); // => 'c'
 *
 * @since 1.0.0
 * @version 1.0.0
 *
 * @param {object} object The object to search
 * @param {function(key: string, value: *)} iterator The function to evaluate
 * @param {boolean} [follow=false] Whether to follow objects
 *
 * @returns {string} The key which evaluates to the iterator
 */
function find(object, iterator, follow) {
  // if the object is an object and is not empty
  if (is(object) && !empty(object) && typeof iterator === 'function') {
    // create an result variable as undefined
    let found = false;
    let result = '';

    // for each key/value in the object
    // follow is passed into each therefore the
    // each function works out whether to follow
    // the objects
    each(object, (key, value) => {
      // if the value hasn't already been found
      if (!found) {
        // check if the iterator is false if it
        // is false then delete that key from the object
        if (iterator(key, value) === true) {
          found = true;
          result = key;
        }
      }
    }, follow);

    // return the result unless the value wasn't found
    // then return undefined
    return found
      ? result
      : undefined;
  }

  // if the object isn't an object or is empty return
  // undefined because the iterator can't be ran to
  // make a check
  return undefined;
}

export default find;

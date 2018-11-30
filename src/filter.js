// o
import is from './is';
import empty from './empty';
import each from './each';
import clone from './clone';
import del from './del';

/**
 * Filter the object keys/values depending on the iterator evaluation
 *
 * @param {object} object The object to filter
 * @param {function(key: string, value: *)} iterator The function to evaluate
 * @param {boolean} follow Whether to follow objects
 *
 * @returns {object} The filtered object
 */
function filter(object, iterator, follow = false) {
  // if the object is an object and is not empty
  if (is(object) && !empty(object)) {
    // create a clone of the object to manipulate
    let result = clone(object);

    // for each key/value in the object
    // follow is passed into each therefore the
    // each function works out whether to follow
    // the objects
    each(object, (key, value) => {
      // if its not following objects or its
      // following but the value isn't an object
      // this will skip any value which is an object
      // when following allow us to run the iterator
      // on the key/values within the objects which
      // generates the filter effect throughout the
      // whole object
      if (!follow || (follow && !is(value))) {
        // check if the iterator is false if it
        // is false then delete that key from the object
        if (iterator(key, value) === false) {
          // delete the key/value
          result = del(result, key);
        }
      }
    }, follow);

    // return the result
    return result;
  }

  // if the object isn't an object or is empty return an
  // empty object because the iterator can't be ran to
  // make a check
  return {};
}

export default filter;

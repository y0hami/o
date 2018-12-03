// o
import is from './is';
import empty from './empty';
import each from './each';

/**
 * Check every element in an object evaluate to the iterator
 *
 * @param {object} object The object to check
 * @param {function(key: string, value: *)} iterator The function to evaluate
 * @param {boolean} follow Whether to follow objects
 *
 * @returns {boolean} Whether all objects evaluate to the iterator
 */
function every(object, iterator, follow = false) {
  // if the object is an object and is not empty
  if (is(object) && !empty(object) && typeof iterator === 'function') {
    // set the result to true so we can change it
    // to false if the iterator fails
    let result = true;

    // for each over the object keys and values
    // follow is passed into each therefore the
    // each function works out whether to follow
    // the objects
    each(object, (key, value) => {
      // run the iterator function on the key and
      // value and if it evaluates to false set
      // the result to false
      if (iterator(key, value) === false) {
        // set the result to false
        result = false;
      }
    }, follow);

    // return the result
    return result;
  }

  // if the object isn't an object or is empty return false
  // because the iterator can't be ran to make a check
  return false;
}

export default every;

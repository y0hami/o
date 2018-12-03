// o
import is from './is';
import empty from './empty';
import each from './each';

/**
 * Check that some element in an object evaluate to the iterator
 *
 * @param {object} object The object to check
 * @param {function(key: string, value: *)} iterator The function to evaluate
 * @param {boolean} follow Whether to follow objects
 *
 * @returns {boolean} Whether some object values evaluate to the iterator
 */
function some(object, iterator, follow = false) {
  // if the object is an object and is not empty
  if (is(object) && !empty(object) && typeof iterator === 'function') {
    // set the result to false so we can change it
    // to true if one of the iterations is true
    let result = false;

    // for each over the object keys and values
    // follow is passed into each therefore the
    // each function works out whether to follow
    // the objects
    each(object, (key, value) => {
      // run the iterator function on the key and
      // value and if it evaluates to true set
      // the result to true
      if (iterator(key, value) === true) {
        // set the result to true
        result = true;
      }
    }, follow);

    // return the result
    return result;
  }

  // if the object isn't an object or is empty return false
  // because the iterator can't be ran to make a check
  return false;
}

export default some;

// o
import is from './is';
import empty from './empty';
import deflate from './deflate';

/**
 * Foreach over the object
 *
 * @param {object} object The object to iterate over
 * @param {function(key: string, value: *)} iterator The iterator function
 * @param {boolean} [follow=false] Whether to follow objects
 */
function each(object, iterator, follow = false) {
  // check if the object is an object and isn't empty
  // if it is it would be pointless running the forEach
  if (is(object) && !empty(object)) {
    // if follow is true flatten the object keys so
    // its easy to get the path and values if follow
    // is false it will just be the base object
    // therefore it will only use the base keys
    const flattenedObject = follow
      ? deflate(object)
      : object;

    // loop over the keys of the object
    Object.keys(flattenedObject).forEach((key) => {
      // get the value of the current key
      const value = flattenedObject[key];

      // check if the iterator is a function
      if (typeof iterator === 'function') {
        // if it is run the iterator with the
        // key and value
        iterator(key, value);
      }
    });
  }
}

export default each;

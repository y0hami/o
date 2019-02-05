// o
import is from './is';
import equal from './equal';
import deflate from './deflate';

/**
 * Check whether all the objects deeply equal each other
 *
 * @example
 * const a = { a: { b: 1 } };
 * const b = { a: { b: 1 } };
 * deepEqual(a, b); // => true
 *
 * const a = { a: { b: 1 } };
 * const b = { a: { b: 2 } };
 * deepEqual(a, b); // => false
 *
 * @since 1.1.2
 * @version 1.1.2
 *
 * @param {object} object The object to compare with
 * @param {...object} compareWith The objects to compare with the original
 *
 * @returns {boolean} Whether all the objects deeply equal each other
 */
function deepEqual(object, ...compareWith) {
  // check if object is an object
  if (is(object)) {
    // deflate the original object (easier then looping through the inner objects)
    const ogObject = deflate(object);

    // use reduce to compare all the objects with the original object
    return compareWith.reduce((isEqual, currentObject) => {
      // if isEqual already is false just skip
      if (!isEqual) return false;

      // deflate the current object (easier then looping through the inner objects)
      return equal(ogObject, deflate(currentObject));
    }, true);
  }

  // if the object isn't an object return false
  return false;
}

export default deepEqual;

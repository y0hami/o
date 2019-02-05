// o
import is from './is';

/**
 * Check whether all the objects are equal (only 1 layer deep, use equalDeep for full comparison)
 *
 * @example
 * const a = { a: 1 };
 * const b = { a: 1 };
 * equal(a, b); // => true
 *
 * const a = { a: 1 };
 * const b = { a: 2 };
 * equal(a, b); // => false
 *
 * @since 1.1.2
 * @version 1.1.2
 *
 * @param {object} object The object to compare with
 * @param {...object} compareWith The objects to compare with the original
 *
 * @returns {boolean} Whether all the objects are equal
 */
function equal(object, ...compareWith) {
  // check if object is an object
  if (is(object)) {
    // get an array of the object keys
    const objectKeys = Object.keys(object);

    // use reduce to compare all the objects with the original object
    return compareWith.reduce((isEqual, currentObject) => {
      // if isEqual already is false just skip
      if (!isEqual) return false;

      // if the current object to compare isn't an object return false because it
      // won't ever equal the original object
      if (!is(currentObject)) return false;

      // get an array of keys for the current object
      const currentKeys = Object.keys(currentObject);

      // check if the current object has the same amount of keys as the original and
      // if it doesn't return false because that means it won't ever equal the original
      if (currentKeys.length !== objectKeys.length) return false;

      // check if the current object has the same keys as the original
      if (!objectKeys.every(key => currentKeys.includes(key))) return false;

      // create a new function to check if values are the same (used later)
      const valueIsEqual = (value, compareValue) => {
        // check if any of the values are objects
        if (is(value) || is(compareValue)) {
          // if both are objects return true since this isn't a deepEqual else
          // false because they are different values
          return is(value) && is(compareValue);
        }

        // check if any of the values are arrays
        if (Array.isArray(value) || Array.isArray(compareValue)) {
          // if both are arrays return true and false because they are different values
          return Array.isArray(value) && Array.isArray(compareValue);
        }

        // check if any of the values are functions
        if (typeof value === 'function' || typeof compareValue === 'function') {
          // check if both are functions
          if (typeof value === 'function' && typeof compareValue === 'function') {
            // if both are functions check if both functions are the same
            return value.toString() === compareValue.toString();
          }
          // if only one of them is a function return false since they are different
          return false;
        }

        // if the types aren't special do a generic check
        return value === compareValue;
      };

      // return true if every value in the object is equal to the current
      return objectKeys.every(
        key => valueIsEqual(object[key], currentObject[key]),
      );
    }, true);
  }

  // if the object isn't an object return false
  return false;
}

export default equal;

// o
import is from './is';
import empty from './empty';

/**
 * Deflate the object (convert an object into a single depth
 * object with the keys in dot notation)
 *
 * @example
 * const a = { a: 1, b: { c: 2 } };
 * deflate(a); // => { a: 1, 'b.c': 2 }
 *
 * @since 1.0.0
 * @version 1.0.0
 *
 * @param {object} object The object to deflate
 *
 * @returns {object} The result object
 */
function deflate(object) {
  // check if the object is an object and isn't empty
  if (is(object) && !empty(object)) {
    // create a new object for the result
    const result = {};

    // create a function to loop over the keys
    // and build the results
    const keyValue = (obj, currentPath) => {
      // loop over the keys of the current object
      Object.keys(obj).forEach((key) => {
        // build an array of the new path with the
        // current path and the new key
        const newPath = [...currentPath, key];

        // get the value of the current key
        const value = obj[key];

        // if the value is an array and isn't empty
        if (is(value) && !empty(value)) {
          // run this function again and get all the keys
          keyValue(value, newPath);
        } else {
          // if it isn't an object or is empty set the
          // result as the key in dot notation with the value
          result[newPath.join('.')] = value;
        }
      });
    };

    // run the function to get the keys for the base object
    // this also starts the recursiveness
    keyValue(object, []);

    // return the result
    return result;
  }

  // if the object isn't an object or is empty return
  // an empty object this will keep the return immutable
  return {};
}

export default deflate;

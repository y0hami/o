// o
import is from './is';
import empty from './empty';

/**
 * Get the keys of the specified object
 *
 * @param {object} object The object to get the keys from
 * @param {boolean} follow Whether to follow objects
 *
 * @returns {string[]} An array of object keys
 */
function keys(object, follow = false) {
  // check if the object is an object and it's not empty
  if (is(object) && !empty(object)) {
    // create an empty array for the result
    let result = [];

    // if follow is enabled
    if (follow) {
      // create a new function which gets the keys and
      // adds them with dot notation to the results array
      const followKeys = (obj, currentPath) => {
        // get all the keys for the inner object
        Object.keys(obj).forEach((key) => {
          // parse the dot notation path
          const followPath = `${currentPath}.${key}`;
          // if the result is an object run the function again
          // for that object
          if (is(obj[key]) && !empty(obj[key])) {
            // the value is an object so run the function again
            // for that object but with the new path
            followKeys(obj[key], followPath);
          }
          // add the new parsed path to the result object
          result.push(followPath);
        });
      };

      // for each key in the specified object
      Object.keys(object).forEach((key) => {
        // add the key to the results array
        result.push(key);
        // if the value of the key is an object add all them keys
        // to the results array
        if (is(object[key]) && !empty(object[key])) {
          // the value is an object so add all them keys also
          // to the results array
          followKeys(object[key], key);
        }
      });
    } else {
      // if follow isn't enabled just add all the base object keys
      // to the results array
      result = Object.keys(object);
    }

    // return the results array
    return result;
  }

  // if the object isn't an object or its empty return an empty array
  return [];
}

export default keys;

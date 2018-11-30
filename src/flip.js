// o
import is from './is';
import empty from './empty';
import each from './each';

/**
 * Flip an objects keys for values and values for keys
 *
 * @param {object} object The object to flip
 * @param {boolean} [follow=false] Whether to follow objects
 * @param {boolean} [useToString=false] Whether to use toString on incompatible values
 */
function flip(object, follow = false, useToString = false) {
  // if the object is an object and is not empty
  if (is(object) && !empty(object)) {
    // create an empty object for the result
    const result = {};

    // for each key/value in the object
    each(object, (key, value) => {
      // if the value is a string it can be used as
      // the new key
      if (typeof value === 'string') {
        // set the new key/value to the result
        result[value] = key;
      } else if (typeof value !== 'string' && useToString) {
        // if the value isn't a string but useToString is true
        // toString the value
        result[String(value).toString()] = key;
      }
    }, follow);

    // return the result object
    return result;
  }

  // if the object isn't an object or is empty return
  // an empty object
  return {};
}

export default flip;

/**
 * Check if the specified value is an object
 *
 * @example
 * const a = { a: 1, b: 2, c: 3 };
 * const b = 'string';
 * is(a); // => true
 * is(b); // => false
 *
 * @since 1.0.0
 * @version 1.0.0
 *
 * @param {*} value The value to check
 *
 * @returns {boolean} Whether it is an object
 */
function is(value) {
  // check if the value is an instance of Object
  return value instanceof Object
    // check if the value constructor is Object
    && value.constructor === Object;
  // if both match the value is truly an object
}

export default is;

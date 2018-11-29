/**
 * Check if the specified value is an object
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

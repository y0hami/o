/**
 * Check if the specified values are objects.
 * All values must be objects to assert true.
 *
 * @example
 * ```
 * const a = { a: 1 };
 * const b = { b: 2 };
 * const c = 'I am a string';
 *
 * is(a); // => true
 * is(a, b); // => true
 * is(a, b, c); // => false
 * ```
 *
 * @throws Error
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function is() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  // check if the value is an instance of Object
  return args.every(function (obj) {
    return obj instanceof Object // check if the value constructor is Object
    && obj.constructor === Object;
  });
}

// o
/**
 * Parse the specified dot notation into an iterable string array.
 */

function fromDotNotation(path) {
  var pathParts = path.split('.');
  var parts = [];
  var index = 0;

  while (index < pathParts.length) {
    var parsedPart = pathParts[index];

    while (parsedPart[parsedPart.length - 1] === '\\' && pathParts[index + 1] !== undefined && pathParts[index + 1] !== null) {
      parsedPart = "".concat(parsedPart.slice(0, -1), ".");
      index += 1;
      parsedPart += pathParts[index];
    }

    index += 1;
    parts.push(parsedPart);
  }

  return parts;
}
/**
 * Build array of strings into dot notation path
 */


function toDotNotation(paths) {
  return paths.map(function (part) {
    return part.replace('.', '\\.');
  }).join('.');
}
/**
 * Export dot notation functions under single export
 */


var dotNotation = {
  from: fromDotNotation,
  to: toDotNotation
};
/**
 * Check if all args specified are objects
 */

function valid() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args.every(function (obj) {
    return is(obj);
  });
}

// o
/**
 * Get the size of the specified object.
 *
 * @example
 * ```
 * const a = { a: 1, b: 2 };
 *
 * size(a); // => 2
 * ```
 *
 * @throws Error
 *
 * @since 1.0.0
 * @version 2.0.0
 */

function size(obj) {
  // check if the arg specified is an object
  if (!valid(obj)) throw new Error('The argument `obj` is not an object'); // get the object keys and return the length

  return Object.keys(obj).length;
}

// o
/**
 * Check if the specified object is empty.
 *
 * @example
 * ```
 * const a = { a: 1, b: 2 };
 * const b = {};
 *
 * empty(a); // => false
 * empty(b); // => true
 * ```
 *
 * @throws Error
 *
 * @since 1.0.0
 * @version 2.0.0
 */

function empty(obj) {
  // check if the arg specified is an object
  if (!valid(obj)) throw new Error('The argument `obj` is not an object'); // check if the object has at least 1 key

  return !(Object.keys(obj).length > 0);
}

// o
/**
 * Clone the specified object.
 * Modifying the properties of a cloned object won't affect the original.
 *
 * @example
 * ```
 * const a = { a: 1 };
 *
 * const b = clone(a);
 * b.a = 2;
 *
 * console.log(a.a, b.a); // => 1  2
 * ```
 *
 * @throws Error
 *
 * @since 1.0.0
 * @version 2.0.0
 */

function clone(obj) {
  // check if the arg specified is an object
  if (!valid(obj)) throw new Error('The argument `obj` is not an object'); // if the object is empty just return a new object

  if (empty(obj)) return {}; // create a new empty object

  var result = {}; // for each key in the object

  Object.keys(obj).forEach(function (key) {
    // add the value from the original object to the same
    // key in the new object
    result[key] = obj[key];
  }); // return the new object

  return result;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

/**
 * Deflate the specified object into a one deep object
 * (keys will be dot notation)
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 2 } };
 *
 * const b = deflate(a);
 *
 * console.log(b); // => { a: 1, 'b.c': 2 }
 * ```
 *
 * @throws Error
 *
 * @since 1.0.0
 * @version 2.0.0
 */

function deflate(obj) {
  // check if the arg specified is an object
  if (!valid(obj)) throw new Error('The argument `obj` is not an object'); // if the object is empty just return an empty object

  if (empty(obj)) return {}; // create a new object for the result

  var result = {}; // create a recursive function to build the result

  var deflateObj = function deflateObj(object, currentPath) {
    Object.keys(object).forEach(function (key) {
      // build an array of the current path and the current key
      var newPath = [].concat(_toConsumableArray(currentPath), [key]); // get the value of the key path for the current object

      var value = object[key]; // if the value is an object and isn't empty

      if (is(value) && !empty(value)) {
        // rerun this function but with the value as the object
        // and the current path as the new path
        deflateObj(value, newPath);
      } else {
        // if the value isn't an object or is an empty object
        // set the path on the result as the dot notation one deep
        // path
        result[dotNotation.to(newPath)] = value;
      }
    });
  }; // run the first iteration of the recursive functions


  deflateObj(obj, []); // return the result

  return result;
}

// o
/**
 * Set the value to the path on the specified object
 *
 * @example
 * ```
 * const a = { a: 1 };
 *
 * set(a, 'b.c', 2);
 *
 * console.log(a); // => { a: 1, b: { c: 2 } }
 * ```
 *
 * @throws Error
 *
 * @since 1.0.0
 * @version 2.0.0
 */

function set(obj, path, value) {
  // check if the arg specified is an object
  if (!valid(obj)) throw new Error('The argument `obj` is not an object');
  if (typeof path !== 'string') throw new Error('The argument `path` is not a string');
  var cloned = clone(obj);
  var result = cloned;
  var pathParts = dotNotation.from(path);
  pathParts.forEach(function (part, index) {
    if (!is(cloned[part])) {
      cloned[part] = {};
    }

    if (index === pathParts.length - 1) {
      cloned[part] = value;
    }

    cloned = cloned[part];
  });
  return result;
}

// o
/**
 * Inflate the specified object into a multi level object
 * (reverse of deflate)
 *
 * @example
 * ```
 * const a = { a: 1, 'b.c': 2 };
 *
 * const b = inflate(a);
 *
 * console.log(b); // => { a: 1, b: { c: 2 } }
 * ```
 *
 * @throws Error
 *
 * @since 1.0.0
 * @version 2.0.0
 */

function inflate(obj) {
  // check if the arg specified is an object
  if (!valid(obj)) throw new Error('The argument `obj` is not an object'); // if the object is empty just return an empty object

  if (empty(obj)) return {}; // create a new object for the result

  var result = {}; // for each "path" in the object

  Object.keys(obj).forEach(function (keyPath) {
    // set the value on the result object to the dot notation path
    result = set(result, keyPath, obj[keyPath]);
  }); // return the result

  return result;
}

// o
/**
 * Check if an object has the specified path (using dot notation)
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 2 } };
 *
 * console.log(has(a, 'b.c'); // => true
 * console.log(has(a, 'b.d'); // => false
 * ```
 *
 * @throws Error
 *
 * @since 1.0.0
 * @version 2.0.0
 */

function has(obj) {
  // check if the arg specified is an object
  if (!valid(obj)) throw new Error('The argument `obj` is not an object');

  for (var _len = arguments.length, paths = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    paths[_key - 1] = arguments[_key];
  }

  if (!paths.every(function (path) {
    return typeof path === 'string';
  })) {
    throw new Error('The argument `paths` is not a string');
  } // if the object is empty just return false because it doesn't have anything


  if (empty(obj)) return false; // set the result boolean to true by default

  var hasPaths = true; // for each path specified

  paths.forEach(function (path) {
    // check if hasPaths is true, if it isn't just skip because at least one
    // has failed
    if (hasPaths) {
      // set the current value as the object by default
      var currentValue = obj; // for each part in the dot notation path

      dotNotation.from(path).forEach(function (key) {
        // if the value at the current path part in the current value
        // is an object and isn't empty set the current value as that object
        if (is(currentValue) && !empty(currentValue)) {
          currentValue = currentValue[key];
        } else {
          // if it isn't an object or is empty just set the current value as
          // undefined
          currentValue = undefined;
        }
      }); // if the resulting value is undefined

      if (currentValue === undefined) {
        // set has paths to false because at least 1 path has failed
        hasPaths = false;
      }
    }
  }); // return the resulting boolean

  return hasPaths;
}

// o
/**
 * Get the value from the path in the specified object
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 2 } };
 *
 * const val = get(a, 'b.c');
 *
 * console.log(val); // => 2
 * ```
 *
 * @throws Error
 *
 * @since 1.0.0
 * @version 2.0.0
 */

function get(obj, path) {
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  // check if the arg specified is an object
  if (!valid(obj)) throw new Error('The argument `obj` is not an object');
  if (typeof path !== 'string') throw new Error('The argument `path` is not a string'); // if the object is empty or it doesn't have the path return the default value

  if (empty(obj) || !has(obj, path)) return defaultValue; // set the current value to the object so its easier to iterate over the objects

  var currentValue = obj; // for each path part set the current value as the next value in the path

  dotNotation.from(path).forEach(function (key) {
    currentValue = currentValue[key];
  }); // return the value at the path

  return currentValue;
}

// o
/**
 * Check whether all the objects are equal
 * (only 1 layer deep, use equalDeep for a deep comparison)
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 2 } };
 * const b = { a: 1, b: { c: 2 } };
 * const c = { a: 1 };
 * const d = { a: 2 };
 * const e = { a: 1, b: { c: 2 } };
 * const f = { a: 1, b: { c: 3 } };
 *
 * console.log(equal(a, b)); // => true
 * console.log(equal(c, d)); // => false
 * console.log(equal(e, f)); // => true
 * ```
 *
 * @throws Error
 *
 * @since 1.0.0
 * @version 2.0.0
 */

function equal(obj) {
  // check if the arg specified is an object
  if (!valid(obj)) throw new Error('The argument `obj` is not an object'); // check if all the compare values are objects

  for (var _len = arguments.length, compareWith = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    compareWith[_key - 1] = arguments[_key];
  }

  if (!compareWith.every(function (object) {
    return is(object);
  })) {
    throw new Error('The arguments `compareWith` are not objects');
  } // get the keys of the specified object


  var keys = Object.keys(obj); // loop over all the specified compare values and if every compared value
  // returns true then return true for equal

  return compareWith.every(function (currentObject) {
    // get the keys for the current object
    var currentKeys = Object.keys(currentObject); // if the current object isn't an object return false

    if (!is(currentObject)) return false; // if the current object and the original don't have the same amount of keys
    // then return false because on is missing or it has extras

    if (currentKeys.length !== keys.length) return false; // if the current object doesn't contain the keys the original object
    // has then return true because the keys don't match

    if (!keys.every(function (key) {
      return currentKeys.includes(key);
    })) return false; // create a function to check if the 2 values equal

    var valueIsEqual = function valueIsEqual(value, compareValue) {
      // if one of values is an object
      if (is(value) || is(compareValue)) {
        // return true if both values are objects since this is
        // only 1 layer deep
        return is(value) && is(compareValue);
      } // if one of the values is an array


      if (Array.isArray(value) || Array.isArray(compareValue)) {
        // return true if both values are an array since this isn't
        // comparing array values
        return Array.isArray(value) && Array.isArray(compareValue);
      } // if one of the values is a function


      if (typeof value === 'function' || typeof compareValue === 'function') {
        // both values are a function
        if (typeof value === 'function' && typeof compareValue === 'function') {
          // return true if both functions are the same
          return value.toString() === compareValue.toString();
        } // return false if the functions do not match or if only
        // one of the values is a function


        return false;
      } // anything else just compare as normal and return true if both
      // values match


      return value === compareValue;
    }; // if all values are equal to the original object return true


    return keys.every(function (key) {
      return valueIsEqual(obj[key], currentObject[key]);
    });
  });
}

// o
/**
 * Check whether all objects deeply equal each other
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 2 } };
 * const b = { a: 1, b: { c: 2 } };
 * const c = { a: 1 };
 * const d = { a: 2 };
 * const e = { a: 1, b: { c: 2 } };
 * const f = { a: 1, b: { c: 3 } };
 *
 * console.log(equal(a, b)); // => true
 * console.log(equal(c, d)); // => false
 * console.log(equal(e, f)); // => false
 * ```
 *
 * @throws Error
 *
 * @since 1.0.0
 * @version 2.0.0
 */

function deepEqual(obj) {
  // check if the arg specified is an object
  if (!valid(obj)) throw new Error('The argument `obj` is not an object'); // check if all the compare values are objects

  for (var _len = arguments.length, compareWith = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    compareWith[_key - 1] = arguments[_key];
  }

  if (!compareWith.every(function (object) {
    return is(object);
  })) {
    throw new Error('The arguments `compareWith` are not objects');
  } // check if every object is equal to each other when deflated
  // if all objects are deflated we can simply use the equal function
  // to check if they equal at 1 layer


  return compareWith.every(function (object) {
    return equal(deflate(obj), deflate(object));
  });
}

// o
/**
 * Delete the specified path from the object
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 2 } };
 *
 * const b = del(a, 'b.c');
 *
 * console.log(b); // => { a: 1, b: {} }
 * ```
 *
 * @throws Error
 *
 * @since 1.0.0
 * @version 2.0.0
 */

function del(obj, path) {
  // check if the arg specified is an object
  if (!valid(obj)) throw new Error('The argument `obj` is not an object');
  if (typeof path !== 'string') throw new Error('The argument `path` is not a string'); // clone the original object so we can manipulate it

  var cloned = clone(obj); // create the result object as a ref to the cloned object

  var result = cloned; // get the dot notation path parts

  var pathParts = dotNotation.from(path); // for each path part

  pathParts.forEach(function (part, index) {
    // if the part is the last one
    if (index === pathParts.length - 1) {
      // delete the value in the object
      delete cloned[part];
    } // set the cloned value as the next part


    cloned = cloned[part];
  }); // return the result

  return result;
}

// o
/**
 * Remove `null` and `undefined` values from the specified object
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: null }, d: undefined };
 *
 * console.log(clean(a)); // => { a: 1, b: {} }
 * ```
 *
 * @throws Error
 *
 * @since 1.0.0
 * @version 2.0.0
 */

function clean(obj) {
  var follow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // check if the object specified is an object
  if (!valid(obj)) throw new Error('The argument `obj` is not an object'); // check if follow is a boolean

  if (typeof follow !== 'boolean') throw new Error('The argument `follow` is not a boolean'); // if the object is empty just return a new object

  if (empty(obj)) return {}; // create the result object with a clone of the original
  // so we can manipulate it

  var result = clone(obj); // deflate the object keys if follow is true
  // then we only need to loop over 1 layer of keys

  var keysObject = follow ? deflate(obj) : obj; // for each key

  Object.keys(keysObject).forEach(function (key) {
    // get the key value
    var value = keysObject[key]; // if the value is `undefined` or `null`

    if (value === undefined || value === null) {
      // delete the value from the result object
      result = del(result, key);
    }
  }); // return the result object

  return result;
}

// o

/**
 * Foreach over an objects keys
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 2 } };
 *
 * each(a, (key, value) => {
 *   console.log(key, value);
 *   // => a  1
 *   // => b  { c: 2 }
 * });
 *
 * each(a, (key, value) => {
 *   console.log(key, value);
 *   // => a  1
 *   // => b.c  2
 * }, true);
 * ```
 *
 * @throws Error
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function each(obj, cb) {
  var follow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  // check if the args specified are the correct type
  if (!valid(obj)) throw new Error('The argument `obj` is not an object');
  if (typeof cb !== 'function') throw new Error('The argument `cb` is not a function');
  if (typeof follow !== 'boolean') throw new Error('The argument `follow` is not a boolean'); // if the object is empty just return false because it doesn't have anything

  if (empty(obj)) return; // if follow is true deflate the object so we can simply
  // iterate over 1 layer of keys

  var iterableObject = follow ? deflate(obj) : obj; // for each key run the callback function

  Object.keys(iterableObject).forEach(function (key, index) {
    return cb(key, iterableObject[key], index);
  });
}

// o

/**
 * Check if every item in the object evaluates to true
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 1 } };
 *
 * every(a, (key, value) => {
 *   return value === 1;
 * }); // => false
 *
 * every(a, (key, value) => {
 *   return value === 1;
 * }, true); // => true
 * ```
 *
 * @throws Error
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function every(obj, cb) {
  var follow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  // check if the args specified are the correct type
  if (!valid(obj)) throw new Error('The argument `obj` is not an object');
  if (typeof cb !== 'function') throw new Error('The argument `cb` is not a function');
  if (typeof follow !== 'boolean') throw new Error('The argument `follow` is not a boolean'); // set result to true so we can change it to false if
  // the callback fails to evaluate to true

  var result = true; // for each over the object using the each function which makes it easier
  // for us to loop since we can just pass our own callback to evaluate the
  // the return value and we can pass follow directly to each and it will
  // handle the deep looping for us

  each(obj, function (key, value, index) {
    // if the callback evaluates to false
    if (!cb(key, value, index)) {
      // set the result as false
      result = false;
    }
  }, follow); // return the result

  return result;
}

// o

/**
 * Check if some items in the object evaluates to true
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 1 } };
 *
 * some(a, (key, value) => {
 *   return value === 1;
 * }); // => true
 *
 * some(a, (key, value) => {
 *   return value === 1;
 * }, true); // => true
 *
 * some(a, (key, value) => {
 *   return value === 2;
 * }, true); // => false
 * ```
 *
 * @throws Error
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function some(obj, cb) {
  var follow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  // check if the args specified are the correct type
  if (!valid(obj)) throw new Error('The argument `obj` is not an object');
  if (typeof cb !== 'function') throw new Error('The argument `cb` is not a function');
  if (typeof follow !== 'boolean') throw new Error('The argument `follow` is not a boolean'); // set result to false so we can change it to true if
  // any of the callbacks evaluate to true

  var result = false; // for each over the object using the each function which makes it easier
  // for us to loop since we can just pass our own callback to evaluate the
  // the return value and we can pass follow directly to each and it will
  // handle the deep looping for us

  each(obj, function (key, value, index) {
    // if the callback evaluates to true
    if (cb(key, value, index)) {
      // set the result as true
      result = true;
    }
  }, follow); // return the result

  return result;
}

// o

/**
 * Filter the object keys/values depending on the callback evaluation
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 2 } };
 *
 * filter(a, (key, value) => {
 *   return value === 1;
 * }); // => { a: 1 }
 *
 * filter(a, (key, value) => {
 *   return value === 2;
 * }, true); // => { b: { c: 2 } }
 * ```
 *
 * @throws Error
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function filter(obj, cb) {
  var follow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  // check if the args specified are the correct type
  if (!valid(obj)) throw new Error('The argument `obj` is not an object');
  if (typeof cb !== 'function') throw new Error('The argument `cb` is not a function');
  if (typeof follow !== 'boolean') throw new Error('The argument `follow` is not a boolean'); // create a clone of the original object for the result so we can
  // manipulate it

  var result = clone(obj); // for each over the object using the each function which makes it easier
  // for us to loop since we can just pass our own callback to evaluate the
  // the return value and we can pass follow directly to each and it will
  // handle the deep looping for us

  each(obj, function (key, value, index) {
    // if the callback evaluates to false
    if (!cb(key, value, index)) {
      // remove the value at that key from the result
      result = del(result, key);
    }
  }, follow); // return the result

  return result;
}

// o

/**
 * Find the key matching the callback evaluation
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 2 } };
 *
 * find(a, (key, value) => {
 *   return value === 2;
 * }); // => undefined
 *
 * find(a, (key, value) => {
 *   return value === 2;
 * }, true); // => 'b.c'
 * ```
 *
 * @throws Error
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function find(obj, cb) {
  var follow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  // check if the args specified are the correct type
  if (!valid(obj)) throw new Error('The argument `obj` is not an object');
  if (typeof cb !== 'function') throw new Error('The argument `cb` is not a function');
  if (typeof follow !== 'boolean') throw new Error('The argument `follow` is not a boolean'); // create a variable to track whether the key is found

  var found = false; // create the result variable which will default to undefined

  var result; // for each over the object using the each function which makes it easier
  // for us to loop since we can just pass our own callback to evaluate the
  // the return value and we can pass follow directly to each and it will
  // handle the deep looping for us

  each(obj, function (key, value, index) {
    // if the key is already found skip because find should
    // return the first found key
    if (!found) {
      // check if the callback evaluates to true
      if (cb(key, value, index)) {
        // if it does evaluate true set found as true
        found = true; // and set the result as the current key

        result = key;
      }
    }
  }, follow); // if the key was not found set the result as undefined

  if (!found) result = undefined; // return the result

  return result;
}

// o
/**
 * Flip an objects keys fro values and values for keys
 *
 * @example
 * ```
 * const a = { a: 1, b: 2, c: 3 };
 * const b = { a: 1, b: { c: 2 } };
 * const c = { a: 1, b: { c: 2 } };
 *
 * flip(a); // => { '1': 'a', '2': 'b', '3': 'c' }
 * flip(b, true); // => { '1': 'a', '2': 'b.c' }
 * flip(b, false, true); // => { '1': 'a', '{"c":2}': 'b' }
 * ```
 *
 * @throws Error
 *
 * @since 1.0.0
 * @version 2.0.0
 */

function flip(obj) {
  var follow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var useToString = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  // check if the args specified are the correct type
  if (!valid(obj)) throw new Error('The argument `obj` is not an object');
  if (typeof follow !== 'boolean') throw new Error('The argument `follow` is not a boolean');
  if (typeof useToString !== 'boolean') throw new Error('The argument `useToString` is not a boolean'); // create an empty object for the result

  var result = {}; // for each over the object using the each function which makes it easier
  // for us to loop since we can just pass our own callback to evaluate the
  // the return value and we can pass follow directly to each and it will
  // handle the deep looping for us

  each(obj, function (key, value) {
    // if the value is a string or number and can be used
    // as the key
    if (typeof value === 'string' || typeof value === 'number') {
      // add the value/key to the result object
      result[value] = key;
    } else if (typeof value !== 'string' && useToString) {
      // if the value is not a string but useToString is true
      // if the value is an object or array
      if (is(value) || Array.isArray(value)) {
        // cover it to json and use the json as the key
        result[JSON.stringify(value)] = key;
      } else {
        // if it is anything else convert it to a string
        result[String(value).toString()] = key;
      }
    }
  }, follow); // return the result

  return result;
}

// o
/**
 * Check if an object includes the specified value
 *
 * @example
 * ```
 * const a = { a: 1, b: 2, c: 3 };
 * const b = { a: 1, b: { c: 2 } };
 *
 * includes(a, 1); // => true
 * includes(b, 2); // => false
 * includes(b, 2, true); // => true
 * ```
 *
 * @throws Error
 *
 * @since 1.0.0
 * @version 2.0.0
 */

function includes(obj, value) {
  var follow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  // check if the args specified are the correct type
  if (!valid(obj)) throw new Error('The argument `obj` is not an object');
  if (typeof follow !== 'boolean') throw new Error('The argument `follow` is not a boolean'); // create the result variable which is defaulted to false

  var result = false; // for each over the object using the each function which makes it easier
  // for us to loop since we can just pass our own callback to evaluate the
  // the return value and we can pass follow directly to each and it will
  // handle the deep looping for us

  each(obj, function (key, objValue) {
    // if the result is still false
    if (!result) {
      // if the two values equal set the result as true
      if (objValue === value) result = true;
    }
  }, follow); // return the result

  return result;
}

// o
/**
 * Get the key to the specified value in dot notation
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 2 } };
 *
 * keyOf(a, 2); // => undefined
 * keyOf(a, 2, true); // => 'b.c'
 * ```
 *
 * @throws Error
 *
 * @since 1.0.0
 * @version 2.0.0
 */

function keyOf(obj, value) {
  var follow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  // check if the args specified are the correct type
  if (!valid(obj)) throw new Error('The argument `obj` is not an object');
  if (typeof follow !== 'boolean') throw new Error('The argument `follow` is not a boolean'); // this is just an alias of find so we simply just pass the params
  // to the find function and return its result

  return find(obj, function (key, objValue) {
    return objValue === value;
  }, follow);
}

// o
/**
 * Get the keys of the specified object (different to Object.keys
 * because Object.keys can't follow deep objects)
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 2, d: { e: 3 } } };
 *
 * keys(a); // => [ 'a', 'b' ]
 * keys(a, true); // => [ 'a', 'b.c', 'b.d.e' ]
 * ```
 *
 * @throws Error
 *
 * @since 1.0.0
 * @version 2.0.0
 */

function keys(obj) {
  var follow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // check if the args specified are the correct type
  if (!valid(obj)) throw new Error('The argument `obj` is not an object');
  if (typeof follow !== 'boolean') throw new Error('The argument `follow` is not a boolean'); // clone the object so we can deflate it if we need to

  var cloned = clone(obj); // if follow is true

  if (follow) {
    // set the cloned object as the object but deflated
    cloned = deflate(cloned);
  } // use the native Object.keys function so its fast and return the result


  return Object.keys(cloned);
}

// o

/**
 * Loop over the object and return a new object with the values
 * computed using the callback
 *
 * @example
 * ```
 * const a = { a: 1, b: 2, c: 3 };
 * const b = { a: 1, b: { c: 2 } };
 *
 * map(a, (key, value) => {
 *   return value * 2;
 * }); // => { a: 2, b: 4, c: 6 }
 *
 * map(b, (key, value) => {
 *   return value * 2;
 * }); // => { a: 2, b: NaN }
 *
 * map(b, (key, value) => {
 *   return value * 2;
 * }, true); // => { a: 2, b: { c: 4 } }
 * ```
 *
 * @throws Error
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function map(obj, cb) {
  var follow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  // check if the args specified are the correct type
  if (!valid(obj)) throw new Error('The argument `obj` is not an object');
  if (typeof cb !== 'function') throw new Error('The argument `cb` is not a function');
  if (typeof follow !== 'boolean') throw new Error('The argument `follow` is not a boolean'); // create a result object so we can add the new values to it

  var result = {}; // for each over the object using the each function which makes it easier
  // for us to loop since we can just pass our own callback to evaluate the
  // the return value and we can pass follow directly to each and it will
  // handle the deep looping for us

  each(obj, function (key, value, index) {
    // set the result as the result object with the new key appended
    // with the value of the evaluated callback
    result = set(result, key, cb(key, value, index));
  }, follow); // return the result

  return result;
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var circleAssign = createCommonjsModule(function (module, exports) {
(function (global, factory) {
  module.exports = factory();
}(commonjsGlobal, (function () {
  /**
   * Check if a value is an object
   *
   * @param {*} o The value to check
   *
   * @returns {boolean} Whether or not it is an object
   */
  function isObj(o) {
    return o instanceof Object && o.constructor === Object;
  }
  /**
   * Merge the specified source object into the target object
   *
   * @param {Object} target The base target object
   * @param {Object} source The object to merge into the target
   *
   * @returns {Object} The merged object
   */


  function mergeObject(target, source) {
    // create a variable to hold the target object
    // so it can be changed if its not an object
    var targetObject = target;
    var sourceObject = source;

    if (!isObj(target)) {
      targetObject = {};
    }

    if (!isObj(source)) {
      sourceObject = {};
    } // get the object keys for the target and source objects


    var targetKeys = Object.keys(targetObject);
    var sourceKeys = Object.keys(sourceObject); // create a empty object for the result

    var result = {}; // go through all the target keys

    targetKeys.forEach(function (key) {
      // check if the source object contains the key
      if (sourceKeys.indexOf(key) !== -1) {
        // check if the target value is null if it is
        // set the result as the source value, this
        // should be fine because if the source value
        // is null it isn't overriding the target value
        // and if it isn't null it is overriding
        // as expected
        if (targetObject[key] === null) {
          result[key] = sourceObject[key];
        } else if (isObj(targetObject[key])) {
          // check if the source value is an object if
          // it is then we need to merge both objects and
          // set the result value to the merged object
          if (isObj(sourceObject[key])) {
            result[key] = mergeObject(targetObject[key], sourceObject[key]);
          } else {
            // if the source value isn't an object we can
            // simply override the value
            result[key] = sourceObject[key];
          }
        } else {
          // if the target value isn't an object we can
          // simply override the value
          result[key] = sourceObject[key];
        }
      } else {
        // if the source doesn't contain the key set the result
        // as the original from the target
        result[key] = targetObject[key];
      }
    }); // go through all the source keys

    sourceKeys.forEach(function (key) {
      // if the target doesn't contain the key
      // then the value is new and should be added
      // to the result object
      if (targetKeys.indexOf(key) === -1) {
        result[key] = sourceObject[key];
      }
    });
    return result;
  }

  // internals
  /**
   * Merge specified objects into one object with the most right
   * object having the most priority
   *
   * @param {Object} target The base object
   * @param {...Object} sources The object(s) to merge
   *
   * @returns {Object} The merged object(s) result
   */

  function merge(target) {
    var targetObject = target;

    if (!isObj(target)) {
      targetObject = {};
    } // for all the sources provided merge them with
    // the target object


    for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      sources[_key - 1] = arguments[_key];
    }

    sources.forEach(function (s) {
      // before merging check the source is an object
      if (isObj(s)) {
        targetObject = mergeObject(targetObject, s);
      }
    });
    return targetObject;
  }

  return merge;

})));
});

// npm
/**
 * Merge all sources into the target object with the most right
 * source having the highest priority
 *
 * Uses circle-assign
 * @see https://www.npmjs.com/package/circle-assign
 *
 * @example
 * ```
 * const a = { a: 1 };
 * const b = { b: 2 };
 * const c = { b: 5 };
 *
 * merge(a, b); // => { a: 1, b: 2 }
 * merge(a, b, c); // => { a: 1, b: 5 }
 * ```
 *
 * @throws Error
 *
 * @since 1.0.0
 * @version 2.0.0
 */

function merge(target) {
  // check if the arg specified is an object
  if (!valid(target)) throw new Error('The argument `target` is not an object'); // check if all the compare values are objects

  for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    sources[_key - 1] = arguments[_key];
  }

  if (!sources.every(function (object) {
    return is(object);
  })) {
    throw new Error('The arguments `sources` are not objects');
  }

  return circleAssign.apply(void 0, [target].concat(sources));
}

// o
/**
 * Get a portion of the specified object
 *
 * @example
 * ```
 * const a = { a: 1, b: 2, c: 3, d: 4 };
 *
 * slice(a, 0, 1); // => { a: 1 }
 * slice(a, 1, 3); // => { b: 2, c: 3 }
 * ```
 *
 * @throws Error
 *
 * @since 1.0.0
 * @version 2.0.0
 */

function slice(obj, start) {
  var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Object.keys(obj).length;
  var follow = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  // check if the args specified are the correct type
  if (!valid(obj)) throw new Error('The argument `obj` is not an object');
  if (typeof start !== 'number') throw new Error('The argument `start` is not a number');
  if (typeof end !== 'number') throw new Error('The argument `end` is not a number'); // create an empty object for the result

  var result = {}; // get the keys of the object and pass follow so the keys function
  // can handle the deep looping for us

  var objKeys = keys(obj, follow); // run the native slice function on the keys so its fast

  objKeys.slice(start, end).forEach(function (key) {
    // for each of the keys after sliced
    // get the value from the original object
    var value = get(obj, key); // set the value on the result object to the current key

    result = set(result, key, value);
  }); // return the result

  return result;
}

// o

/**
 * Sort an object via the callback evaluation
 *
 * @example
 * ```
 * const a = { a: 3, b: 7, c: 5, d: 9 };
 * const b = { a: 3, b: 7, c: 5, d: { e: 1 }, f: 9 };
 *
 * sort(a, (a, b) => {
 *  if (a.value < b.value) return -1;
 *  if (a.value > b.value) return 1;
 *  return 0;
 * }); // => { a: 3, c: 5, b: 7, d: 9 }
 *
 * sort(b, (a, b) => {
 *  if (a.value < b.value) return -1;
 *  if (a.value > b.value) return 1;
 *  return 0;
 * }, true); // => { d: { e: 1 }, a: 3, c: 5, b: 7, f: 9 }
 * ```
 *
 * @throws Error
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function sort(obj, cb) {
  var follow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  // check if the args specified are the correct type
  if (!valid(obj)) throw new Error('The argument `obj` is not an object');
  if (typeof cb !== 'function') throw new Error('The argument `cb` is not a function');
  if (typeof follow !== 'boolean') throw new Error('The argument `follow` is not a boolean'); // create a new object so we can add the key/values on in the
  // correct order

  var result = {}; // get the keys from the object and pass follow to the keys function
  // then we don't need to handle deep objects

  var sortedKeys = keys(obj, follow).sort(function (firstKey, secondKey) {
    // get the value from the object for the corresponding key
    var firstValue = get(obj, firstKey);
    var secondValue = get(obj, secondKey); // create the element objects

    var firstEl = {
      key: firstKey,
      value: firstValue
    };
    var secondEl = {
      key: secondKey,
      value: secondValue
    }; // return the result from the callback using the elements

    return cb(firstEl, secondEl);
  }); // for each through the sorted keys

  sortedKeys.forEach(function (key) {
    // set the the value on the result object to the corresponding key
    result = set(result, key, get(obj, key));
  }); // return the result

  return result;
}

// o
/**
 * Get an array of the object values
 *
 * @example
 * ```
 * const a = { a: 1, b: 2, c: 3, d: 4, e: 5 };
 * const b = { a: 1, b: { c: 2, d: 3 } };
 *
 * values(a); // => [ 1, 2, 3, 4, 5 ]
 * values(b); // => [ 1, 2, 3 ]
 * ```
 *
 * @throws Error
 *
 * @since 1.0.0
 * @version 2.0.0
 */

function values(obj) {
  var follow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // check if the args specified are the correct type
  if (!valid(obj)) throw new Error('The argument `obj` is not an object'); // get the object keys and pass follow so it handles the deep object
  // for us and then map the keys array and return the corresponding value
  // for the current key

  return keys(obj, follow).map(function (key) {
    return get(obj, key);
  });
}

// functions

export { clean, clone, deepEqual, deflate, del, each, empty, equal, every, filter, find, flip, get, has, includes, inflate, is, keyOf, keys, map, merge, set, size, slice, some, sort, values };

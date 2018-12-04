(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.o = {})));
}(this, (function (exports) { 'use strict';

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
    return value instanceof Object // check if the value constructor is Object
    && value.constructor === Object; // if both match the value is truly an object
  }

  // o
  /**
   * Get the size of the specified object
   *
   * @example
   * const a = { a: 1, b: 2, c: 3 };
   * size(a); // => 3
   *
   * @since 1.0.0
   * @version 1.0.0
   *
   * @param {object} object The object to get the size of
   *
   * @returns {number} The size of the object (-1 when provided value isn't an object)
   */

  function size(object) {
    // check if the object is an object
    if (is(object)) {
      // get the object keys and return the length
      return Object.keys(object).length;
    } // if the object isn't an object return -1 so that it is still
    // a number but it is distinguishable that it isn't an object
    // since objects can't have minus key lengths


    return -1;
  }

  // o
  /**
   * Check if an object is empty (has no keys)
   *
   * @example
   * const a = { a: 1 };
   * const b = {};
   * empty(a); // => false
   * empty(b); // => true
   *
   * @since 1.0.0
   * @version 1.0.0
   *
   * @param {object} object The object to check
   *
   * @returns {boolean} Whether it is empty
   */

  function empty(object) {
    // check if the object specified is an object
    if (is(object)) {
      // if it is get the size of the object and return true if it
      // is larger then 0 meaning it isn't empty
      return !(size(object) > 0);
    } // return false if the object isn't an object


    return false;
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
      var result = {}; // create a function to loop over the keys
      // and build the results

      var keyValue = function keyValue(obj, currentPath) {
        // loop over the keys of the current object
        Object.keys(obj).forEach(function (key) {
          // build an array of the new path with the
          // current path and the new key
          var newPath = _toConsumableArray(currentPath).concat([key]); // get the value of the current key


          var value = obj[key]; // if the value is an array and isn't empty

          if (is(value) && !empty(value)) {
            // run this function again and get all the keys
            keyValue(value, newPath);
          } else {
            // if it isn't an object or is empty set the
            // result as the key in dot notation with the value
            result[newPath.join('.')] = value;
          }
        });
      }; // run the function to get the keys for the base object
      // this also starts the recursiveness


      keyValue(object, []); // return the result

      return result;
    } // if the object isn't an object or is empty return
    // an empty object this will keep the return immutable


    return {};
  }

  // o
  /**
   * Clone the specified object
   *
   * @example
   * const a = { a: 1 };
   * const b = clone(a); // => { a: 1 }
   * b.a = 2;
   * console.log(a); // => { a: 1 }
   * console.log(b); // => { a: 2 }
   *
   * @since 1.0.0
   * @version 1.0.0
   *
   * @param {object} object The object to clone
   *
   * @returns {object} The cloned object
   */

  function clone(object) {
    // check if the object is an object and isn't empty
    if (is(object) && !empty(object)) {
      // create a new object for the result
      var result = {}; // for each key in the specified object add it
      // to the new result with the value from the
      // original object

      Object.keys(object).forEach(function (key) {
        result[key] = object[key];
      }); // return the result object

      return result;
    } // if the object isn't an object or is empty return
    // an empty object this will keep the return immutable


    return {};
  }

  /**
   * Parse the path into an array of parts (object keys)
   *
   * @param {string} path The path to parse
   *
   * @returns {string[]} An array of parts
   */
  function getPathParts(path) {
    // split the path specified into an array on `.`
    var pathParts = path.split('.'); // create an empty array which will be the result

    var parts = []; // create an index variable so we can skip indexes if
    // need be when parsing the paths

    var index = 0; // while the index is smaller then the parts array length

    while (index < pathParts.length) {
      // get the part from the parts array
      var parsedPart = pathParts[index]; // while (if) the part starts with `\` remove it and
      // append `.` and then next part from the array to it
      // this should result in `test\\.test` being parsed
      // into `test.test`. This is done so users can escape
      // dots from the dot notation

      while (parsedPart[parsedPart.length - 1] === '\\' && pathParts[index + 1] !== undefined && pathParts[index + 1] !== null) {
        // remove `\` and append the `.`
        parsedPart = "".concat(parsedPart.slice(0, -1), "."); // increase the index so next iteration it will skip
        // the next path which is about to be added to this path

        index += 1; // add the next path to the current one because they are
        // apart of the same object key

        parsedPart += pathParts[index];
      } // increase the index so we can continue to the next path
      // in the array


      index += 1; // append the parsed path to the results array

      parts.push(parsedPart);
    } // return all the parsed paths


    return parts;
  }

  // o
  /**
   * Delete the specified path from the object
   *
   * @example
   * const a = { a: 1, b: 2 };
   * del(a, 'b'); // => { a: 1 }
   *
   * @since 1.0.0
   * @version 1.0.0
   *
   * @param {object} object The object to delete from
   * @param {string} path The path to delete
   *
   * @returns {object} The result object
   */

  function del(object, path) {
    // check if the object is an object and isn't empty
    if (is(object) && !empty(object)) {
      // clone the object
      var cloned = clone(object); // set the new value for the cloned object so we
      // can manipulate it

      var result = cloned; // get the path parts

      var pathParts = getPathParts(path); // loop over all the path parts

      for (var index = 0; index < pathParts.length; index += 1) {
        // get the current key
        var key = pathParts[index]; // check if the current path is the last key

        if (index === pathParts.length - 1) {
          // if it is the last key delete the value from the object
          delete cloned[key];
        } // set the modified values to the object


        cloned = cloned[key];
      } // return the result


      return result;
    } // if the object isn't an object or is empty return
    // an empty object this will keep the return immutable


    return {};
  }

  // o
  /**
   * Remove `null` and `undefined` values from the specified object
   *
   * @example
   * const a = { a: 1, b: undefined, c: null };
   * clean(a); // => { a: 1 }
   *
   * @since 1.0.0
   * @version 1.0.0
   *
   * @param {object} object The object to clean
   * @param {boolean} [follow=false] Whether to follow objects
   *
   * @returns {object} The clean object
   */

  function clean(object) {
    var follow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    // check if object is an object
    if (is(object) && !empty(object)) {
      // clone the object to use as the result and
      // so it is immutable
      var result = clone(object); // if follow is true flatten the object keys so
      // its easy to get the path to delete and so
      // it's easy to check if values are null/undefined
      // if follow is false it will just be the base
      // object therefore it will only check the base keys

      var keysObject = follow ? deflate(object) : object; // loop over the keys of the object

      Object.keys(keysObject).forEach(function (key) {
        // get the value of the current key
        var value = keysObject[key]; // if the value is undefined or null

        if (value === undefined || value === null) {
          // delete the key/value from the object
          result = del(result, key);
        }
      }); // return the result

      return result;
    } // if the object isn't an object or is empty return
    // an empty object this will keep the return immutable


    return {};
  }

  // o
  /**
   * Foreach over the object
   *
   * @example
   * const a = { a: 1, b: 2 };
   * each(a, (key, value) => { console.log(`${key}:`, value) });
   * // => a: 1
   * // => b: 2
   *
   * @since 1.0.0
   * @version 1.0.0
   *
   * @param {object} object The object to iterate over
   * @param {function(key: string, value: *)} iterator The iterator function
   * @param {boolean} [follow=false] Whether to follow objects
   */

  function each(object, iterator) {
    var follow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    // check if the object is an object and isn't empty
    // if it is it would be pointless running the forEach
    if (is(object) && !empty(object) && typeof iterator === 'function') {
      // if follow is true flatten the object keys so
      // its easy to get the path and values if follow
      // is false it will just be the base object
      // therefore it will only use the base keys
      var flattenedObject = follow ? deflate(object) : object; // loop over the keys of the object

      Object.keys(flattenedObject).forEach(function (key) {
        // get the value of the current key
        var value = flattenedObject[key]; // run the iterator with the key and value

        iterator(key, value);
      }); // return true because the iterator was ran

      return true;
    } // return false because the iterator couldn't of been ran


    return false;
  }

  // o
  /**
   * Check every element in an object evaluate to the iterator
   *
   * @example
   * const a = { a: 1, b: 2 };
   * const b = { a: 1, b: 'test' }
   * every(a, (key, value) => typeof value === 'number'); // => true
   * every(b, (key, value) => typeof value === 'number'); // => false
   *
   * @since 1.0.0
   * @version 1.0.0
   *
   * @param {object} object The object to check
   * @param {function(key: string, value: *)} iterator The function to evaluate
   * @param {boolean} follow Whether to follow objects
   *
   * @returns {boolean} Whether all objects evaluate to the iterator
   */

  function every(object, iterator) {
    var follow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    // if the object is an object and is not empty
    if (is(object) && !empty(object) && typeof iterator === 'function') {
      // set the result to true so we can change it
      // to false if the iterator fails
      var result = true; // for each over the object keys and values
      // follow is passed into each therefore the
      // each function works out whether to follow
      // the objects

      each(object, function (key, value) {
        // run the iterator function on the key and
        // value and if it evaluates to false set
        // the result to false
        if (iterator(key, value) === false) {
          // set the result to false
          result = false;
        }
      }, follow); // return the result

      return result;
    } // if the object isn't an object or is empty return false
    // because the iterator can't be ran to make a check


    return false;
  }

  // o
  /**
   * Filter the object keys/values depending on the iterator evaluation
   *
   * @example
   * const a = { a: 1, b: 2, c: 3 };
   * filter(a, (key, value) => value > 2); // => { c: 3 }
   *
   * @since 1.0.0
   * @version 1.0.0
   *
   * @param {object} object The object to filter
   * @param {function(key: string, value: *)} iterator The function to evaluate
   * @param {boolean} follow Whether to follow objects
   *
   * @returns {object} The filtered object
   */

  function filter(object, iterator) {
    var follow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    // if the object is an object and is not empty
    if (is(object) && !empty(object) && typeof iterator === 'function') {
      // create a clone of the object to manipulate
      var result = clone(object); // for each key/value in the object
      // follow is passed into each therefore the
      // each function works out whether to follow
      // the objects

      each(object, function (key, value) {
        // check if the iterator is false if it
        // is false then delete that key from the object
        if (iterator(key, value) === false) {
          // delete the key/value
          result = del(result, key);
        }
      }, follow); // return the result

      return result;
    } // if the object isn't an object or is empty return an
    // empty object because the iterator can't be ran to
    // make a check


    return {};
  }

  // o
  /**
   * Find the key matching the iterator evaluation
   *
   * @example
   * const a = { a: 1, b: 2, c: 3 };
   * find(a, (key, value) => value === 3); // => 'c'
   *
   * @since 1.0.0
   * @version 1.0.0
   *
   * @param {object} object The object to search
   * @param {function(key: string, value: *)} iterator The function to evaluate
   * @param {boolean} [follow=false] Whether to follow objects
   *
   * @returns {string} The key which evaluates to the iterator
   */

  function find(object, iterator, follow) {
    // if the object is an object and is not empty
    if (is(object) && !empty(object) && typeof iterator === 'function') {
      // create an result variable as undefined
      var found = false;
      var result = ''; // for each key/value in the object
      // follow is passed into each therefore the
      // each function works out whether to follow
      // the objects

      each(object, function (key, value) {
        // if the value hasn't already been found
        if (!found) {
          // if its not following objects or its
          // following but the value isn't an object
          // this will skip any value which is an object
          // when following allow us to run the iterator
          // on the key/values within the objects which
          // generates the filter effect throughout the
          // whole object
          if (!follow || follow && !is(value)) {
            // check if the iterator is false if it
            // is false then delete that key from the object
            if (iterator(key, value) === true) {
              found = true;
              result = key;
            }
          }
        }
      }, follow); // return the result unless the value wasn't found
      // then return undefined

      return found ? result : undefined;
    } // if the object isn't an object or is empty return
    // undefined because the iterator can't be ran to
    // make a check


    return undefined;
  }

  // o
  /**
   * Flip an objects keys for values and values for keys
   *
   * @example
   * const a = { a: 1, b: 2, c: 3 };
   * flip(a); // => { 1: 'a', 2: 'b', 3: 'c' }
   *
   * @since 1.0.0
   * @version 1.0.0
   *
   * @param {object} object The object to flip
   * @param {boolean} [follow=false] Whether to follow objects
   * @param {boolean} [useToString=false] Whether to use toString on incompatible values
   *
   * @returns {object} The flipped object
   */

  function flip(object) {
    var follow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var useToString = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    // if the object is an object and is not empty
    if (is(object) && !empty(object)) {
      // create an empty object for the result
      var result = {}; // for each key/value in the object

      each(object, function (key, value) {
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
      }, follow); // return the result object

      return result;
    } // if the object isn't an object or is empty return
    // an empty object


    return {};
  }

  // o
  /**
   * Check if an object has the specified paths
   *
   * @example
   * const a = { a: 1, b: 2, c: 3 };
   * has(a, 'a'); // => true
   * has(a, 'd'); // => false
   *
   * @since 1.0.0
   * @version 1.0.0
   *
   * @param {object} object The object to check
   * @param {...string} paths The paths to check for
   *
   * @returns {boolean} Whether the object contains the specified path
   */

  function has(object) {
    // check if object is an object
    if (is(object) && !empty(object)) {
      // set the result to true by default
      var hasPaths = true; // for each path specified

      for (var _len = arguments.length, paths = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        paths[_key - 1] = arguments[_key];
      }

      paths.forEach(function (path) {
        // get the parsed path parts
        var parts = getPathParts(path); // set the current value so its easier to iterate over

        var currentValue = object; // for each part in the path

        parts.forEach(function (key) {
          // check if the currentValue is an object
          if (is(currentValue) && !empty(currentValue)) {
            // if it is set the currentValue to the corresponding key from
            // that object
            currentValue = currentValue[key];
          } // if the currentValue isn't an object then the value will stay
          // as the last currentValue this should leave the last value as
          // any value which is fetch from the object path. If the value
          // fetched turns out to be undefined we can then tell the path
          // doesn't exist in the next step

        }); // check if the currentValue is undefined meaning that the path
        // doesn't exist

        if (currentValue === undefined) {
          // if the currentValue is undefined set hasPaths to false
          // this will lead to the function returning false because
          // the object specified doesn't have all the paths specified
          hasPaths = false;
        }
      }); // return whether or not all the paths exist in the specified object

      return hasPaths;
    } // return false because the object specified isn't an object


    return false;
  }

  // o
  /**
   * Get the value from the specified path
   *
   * @example
   * const a = { a: 1, b: 2, c: 3 };
   * get(a, 'b'); // => 2
   *
   * @since 1.0.0
   * @version 1.0.0
   *
   * @param {object} object The object the get from
   * @param {string} path The path to get
   * @param {*} [defaultValue=undefined] The default value to return if the path doesn't exist
   *
   * @returns {*} The value from the path or the default value
   */

  function get(object, path) {
    var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

    // check if the object is an object and is not empty
    // and it has the path specified
    if (is(object) && !empty(object) && has(object, path)) {
      // set the currentValue to the object so its easier to
      // iterate over the objects
      var currentValue = object; // for each path parts from the parsed path

      getPathParts(path).forEach(function (key) {
        // if the current value is an object and it isn't empty
        if (is(currentValue) && !empty(currentValue)) {
          // set the currentValue as the value from the key
          currentValue = currentValue[key];
        }
      }); // if the currentValue is undefined after getting the new
      // value from the paths return the default value

      if (currentValue === undefined) {
        return defaultValue;
      } // if it isn't undefined return the value


      return currentValue;
    } // if the object isn't an object or it is empty or
    // it doesn't have the specified path return the
    // default value


    return defaultValue;
  }

  // o
  /**
   * Check if the object includes the specified object
   *
   * @example
   * const a = { a: 1, b: 2, c: 3 };
   * includes(a, 1); // => true
   * includes(a, 5); // => false
   *
   * @since 1.0.0
   * @version 1.0.0
   *
   * @param {object} object The object to check
   * @param {*} value The value to check for
   * @param {boolean} follow Whether to follow objects
   *
   * @returns {boolean} Whether the object contains the specified value
   */

  function includes(object, value) {
    var follow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    // if the object is an object and is not empty
    if (is(object) && !empty(object)) {
      // create an result variable as false
      var result = false; // for each key/value in the object
      // follow is passed into each therefore the
      // each function works out whether to follow
      // the objects

      each(object, function (key, objValue) {
        // if the result isn't already true
        if (!result) {
          // follow is false or follow is true but the
          // object value isn't an object
          if (!follow || follow && !is(value)) {
            // check if the object value is equal to
            // the specified value
            if (objValue === value) {
              // if they are the same set the result
              // to true
              result = true;
            }
          }
        }
      }, follow); // return the result

      return result;
    } // if the object isn't an object or is empty return
    // false because the object can't be checked


    return false;
  }

  // o
  /**
   * Set the specified path with the specified value
   *
   * @example
   * const a = { a: 1, b: 2 };
   * set(a, 'c', 3); // => { a: 1, b: 2, c: 3 }
   *
   * @since 1.0.0
   * @version 1.0.0
   *
   * @param {object} object The object to set the value on
   * @param {string} path The path to set the value as
   * @param {*} value The value to set
   *
   * @return {object} The object with the new set value
   */

  function set$1(object, path, value) {
    // check if the object is an object
    if (is(object)) {
      // clone the object
      var cloned = clone(object); // set a new value for the cloned object so we
      // can manipulate it

      var result = cloned; // get the path parts

      var pathParts = getPathParts(path); // loop over all the path parts

      for (var index = 0; index < pathParts.length; index += 1) {
        // get the current key
        var key = pathParts[index]; // check if the value is an object

        if (!is(cloned[key])) {
          // if it isn't an object set it to an empty object
          cloned[key] = {};
        } // check if the current path is the last key


        if (index === pathParts.length - 1) {
          // if it is the last key set it as the value
          cloned[key] = value;
        } // set the modified values to the object


        cloned = cloned[key];
      } // returned the result


      return result;
    } // if the object isn't an object return an empty
    // object this will keep the return immutable


    return {};
  }

  // o
  /**
   * Inflate an object (reverse deflate)
   *
   * * @example
   * const a = { a: 1, 'b.c': 2 };
   * inflate(a); // => { a: 1, b: { c: 2 } }
   *
   * @since 1.0.0
   * @version 1.0.0
   *
   * @param {object} object The object to inflate
   *
   * @returns {object} The inflated object
   */

  function inflate(object) {
    // check if the object is an object and isn't empty
    if (is(object) && !empty(object)) {
      // create a new object for the result
      var result = {}; // for each key in the object

      Object.keys(object).forEach(function (path) {
        // get value from the object
        var value = object[path]; // set the value on the result according to
        // the dot notation path (if the key is a dot
        // notation path)

        result = set$1(result, path, value);
      }); // returned the result

      return result;
    } // if the object isn't an object or is empty return
    // an empty object this will keep the return immutable


    return {};
  }

  // o
  /**
   * Get the key of the specified value in dot notation
   *
   * @example
   * const a = { a: 1, b: 2, c: 3 };
   * keyOf(a, 2); // => 'b'
   *
   * @since 1.0.0
   * @version 1.0.0
   *
   * @param {object} object The object to search
   * @param {*} value The value to look for
   * @param {boolean} [follow=false] Whether to follow objects
   *
   * @returns {string} The key when found else undefined
   */

  function keyOf(object, value) {
    var follow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    // if the object is an object and is not empty
    if (is(object) && !empty(object)) {
      // create a found boolean so we can skip
      // over keys once we have found the correct
      // key
      var found = false; // create an result variable as false

      var result = ''; // for each key/value in the object
      // follow is passed into each therefore the
      // each function works out whether to follow
      // the objects

      each(object, function (key, objValue) {
        // if the result isn't already found
        if (!found) {
          // follow is false or follow is true but the
          // object value isn't an object
          if (!follow || follow && !is(value)) {
            // check if the object value is equal to
            // the specified value
            if (objValue === value) {
              // set found to true since the key was found
              found = true; // if the values are the same set the result
              // to the key

              result = key;
            }
          }
        }
      }, follow); // return the result if it was found else return
      // undefined

      return found ? result : undefined;
    } // if the object isn't an object or is empty return
    // false because the object can't be checked


    return undefined;
  }

  // o
  /**
   * Get the keys of the specified object
   *
   * @example
   * const a = { a: 1, b: 2, c: 3 };
   * keys(a); // => ['a', 'b', 'c']
   *
   * @since 1.0.0
   * @version 1.0.0
   *
   * @param {object} object The object to get the keys from
   * @param {boolean} follow Whether to follow objects
   *
   * @returns {string[]} An array of object keys
   */

  function keys(object) {
    var follow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    // check if the object is an object and it's not empty
    if (is(object) && !empty(object)) {
      // create an empty array for the result
      var result = []; // if follow is enabled

      if (follow) {
        // create a new function which gets the keys and
        // adds them with dot notation to the results array
        var followKeys = function followKeys(obj, currentPath) {
          // get all the keys for the inner object
          Object.keys(obj).forEach(function (key) {
            // parse the dot notation path
            var followPath = "".concat(currentPath, ".").concat(key); // if the result is an object run the function again
            // for that object

            if (is(obj[key]) && !empty(obj[key])) {
              // the value is an object so run the function again
              // for that object but with the new path
              followKeys(obj[key], followPath);
            } // add the new parsed path to the result object


            result.push(followPath);
          });
        }; // for each key in the specified object


        Object.keys(object).forEach(function (key) {
          // add the key to the results array
          result.push(key); // if the value of the key is an object add all them keys
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
      } // return the results array


      return result;
    } // if the object isn't an object or its empty return an empty array


    return [];
  }

  // o
  /**
   * Loop over an object and return a new object with the values
   * computed from the specified iterator
   *
   * @example
   * const a = { a: 1, b: 2, c: 3 };
   * map(a, (key, value) => value * 2); // => { a: 2, b: 4, c: 6 }
   *
   * @since 1.0.0
   * @version 1.0.0
   *
   * @param {object} object The object to map
   * @param {function(key: string, value: *)} iterator The function used to compute the value
   * @param {boolean} [follow=false] Whether or not to follow objects
   *
   * @returns {object} The result object with the computed values
   */

  function map(object, iterator) {
    var follow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    // if the object is an object and is not empty
    if (is(object) && !empty(object) && typeof iterator === 'function') {
      // create an empty object for the result
      var result = {}; // for each key/value in the object
      // follow is passed into each therefore the
      // each function works out whether to follow
      // the objects

      each(object, function (key, value) {
        // set the result to the object with the key/value computed
        // from the specified iterator
        result = set$1(result, key, iterator(key, value));
      }, follow); // return the result

      return result;
    } // if the object isn't an object or is empty return an
    // empty object because the iterator can't be ran to
    // compute the values


    return {};
  }

  var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var circleAssign = createCommonjsModule(function (module, exports) {
    (function (global, factory) {
      module.exports = factory();
    })(commonjsGlobal, function () {
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
      } // internals

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
    });
  });

  // npm
  /**
   * Merge all sources into the target with the most right source
   * having the most priority
   *
   * Uses circle-assign
   * @see https://www.npmjs.com/package/circle-assign
   *
   * * @example
   * const a = { a: 1 };
   * const b = { b: 2, c: 3 };
   * merge(a, b); // => { a: 1, b: 2, c: 3 }
   *
   * @since 1.0.0
   * @version 1.0.0
   *
   * @param {object} target The target object
   * @param {...object} sources The sources
   *
   * @returns {object} The merged object
   */

  function merge(target) {
    for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      sources[_key - 1] = arguments[_key];
    }

    return circleAssign.apply(null, [target].concat(sources));
  }

  // o
  /**
   * Get a portion of the specified object
   *
   * @example
   * const a = { a: 1, b: 2, c: 3 };
   * slice(a, 0, 1); // => { a: 1 }
   *
   * @since 1.0.0
   * @version 1.0.0
   *
   * @param {object} object The object to slice
   * @param {number} start The start index
   * @param {number} [end] The end index (defaults to object keys length)
   *
   * @returns {object} The sliced object
   */

  function slice(object, start) {
    var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Object.keys(object).length;

    // if the object is an object and is not empty
    if (is(object) && !empty(object)) {
      // get the keys from the object
      var objKeys = keys(object); // create an empty object for the result

      var result = {}; // slice the object keys to the specified start and end
      // and for each key returned

      objKeys.slice(start, end).forEach(function (key) {
        // set the result object key to the value
        result[key] = object[key];
      }); // return the result

      return result;
    } // if the object isn't an object or is empty return an
    // empty object because slicing won't return anything anyway


    return {};
  }

  // o
  /**
   * Check that some element in an object evaluate to the iterator
   *
   * @example
   * const a = { a: 1, b: 2, c: 3 };
   * some(a, (key, value) => value === 2); // => true
   * some(a, (key, value) => value === 5); // => false
   *
   * @since 1.0.0
   * @version 1.0.0
   *
   * @param {object} object The object to check
   * @param {function(key: string, value: *)} iterator The function to evaluate
   * @param {boolean} follow Whether to follow objects
   *
   * @returns {boolean} Whether some object values evaluate to the iterator
   */

  function some(object, iterator) {
    var follow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    // if the object is an object and is not empty
    if (is(object) && !empty(object) && typeof iterator === 'function') {
      // set the result to false so we can change it
      // to true if one of the iterations is true
      var result = false; // for each over the object keys and values
      // follow is passed into each therefore the
      // each function works out whether to follow
      // the objects

      each(object, function (key, value) {
        // run the iterator function on the key and
        // value and if it evaluates to true set
        // the result to true
        if (iterator(key, value) === true) {
          // set the result to true
          result = true;
        }
      }, follow); // return the result

      return result;
    } // if the object isn't an object or is empty return false
    // because the iterator can't be ran to make a check


    return false;
  }

  // o
  /**
   * Sort an object via the iterator evaluation
   *
   * @example
   * const a = { a: 4, b: 7, c: 3 };
   * sort(a, (a, b) => {
   *  if (a.value < b.value) return -1;
   *  if (a.value > b.value) return 1;
   *  return 0;
   * }); // => { c: 3, a: 4, b: 7 }
   *
   * @since 1.0.0
   * @version 1.0.0
   *
   * @param {object} object The object to sort
   * @param {function(a: object, b: object)} iterator The function to evaluate
   * @param {boolean} [follow=false] Whether to follow objects
   *
   * @returns {object} The sorted object
   */

  function sort(object, iterator) {
    var follow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    // check if the object is an object and isn't empty
    if (is(object) && !empty(object) && typeof iterator === 'function') {
      // get all the keys and pass following so keys
      // can work out whether to follow
      var objKeys = keys(object, follow); // create an empty array so we can add all the sort objects

      var sortingValues = []; // for each key

      objKeys.forEach(function (key) {
        // get the value of the key
        var value = get(object, key); // if following and the value is an object skip it

        if (follow && is(value)) {
          return;
        } // add the key and value as an object to the
        // sorting values array


        sortingValues.push({
          key: key,
          value: value
        });
      }); // sort the sorting values array using the
      // specified iterator

      var sorted = sortingValues.sort(iterator); // create an empty object for the result

      var result = {}; // go through all the sorted values and
      // build the object from them in the sorted
      // order

      sorted.forEach(function (sortObj) {
        // get the key and value
        var key = sortObj.key,
            value = sortObj.value; // set the key/value on the result object

        result = set$1(result, key, value);
      }); // return the result

      return result;
    } // if the object isn't an object or is empty return
    // an empty object this will keep the return immutable


    return {};
  }

  // o
  /**
   * Get an array of values from the specified object
   *
   * @example
   * const a = { a: 1, b: 2, c: 3 };
   * values(a); // => [1, 2, 3]
   *
   * @since 1.0.0
   * @version 1.0.0
   *
   * @param {object} object The object to get the values from
   * @param {boolean} [follow=false] Whether to follow objects
   *
   * @returns {array} An array of all the values from the object
   */

  function values(object, follow) {
    // check if object is an object
    if (is(object) && !empty(object)) {
      // create an empty array for the result
      var result = []; // if follow is true flatten the object keys so
      // its easy to get the path to get the value
      // if follow is false it will just be the base
      // object therefore it will only need to base keys

      var keysObject = follow ? deflate(object) : object; // loop over the keys of the object

      Object.keys(keysObject).forEach(function (key) {
        // get the current key value
        var value = keysObject[key]; // add it to the result array

        result.push(value);
      }); // return the result

      return result;
    } // if the object isn't an object or is empty return
    // an empty array because it won't contain any values


    return [];
  }

  // methods

  exports.clean = clean;
  exports.clone = clone;
  exports.deflate = deflate;
  exports.del = del;
  exports.each = each;
  exports.empty = empty;
  exports.every = every;
  exports.filter = filter;
  exports.find = find;
  exports.flip = flip;
  exports.get = get;
  exports.has = has;
  exports.includes = includes;
  exports.inflate = inflate;
  exports.is = is;
  exports.keyOf = keyOf;
  exports.keys = keys;
  exports.map = map;
  exports.merge = merge;
  exports.set = set$1;
  exports.size = size;
  exports.slice = slice;
  exports.some = some;
  exports.sort = sort;
  exports.values = values;

  Object.defineProperty(exports, '__esModule', { value: true });

})));

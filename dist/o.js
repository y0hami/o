/* o - v2.0.0
 *
 * Released under MIT license
 * https://github.com/hammy2899/o
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.o = {}));
}(this, function (exports) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var circleAssign = createCommonjsModule(function (module, exports) {
	(function (global, factory) {
	   module.exports = factory() ;
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

	var is_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
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
	 * @since 1.0.0
	 * @version 2.0.0
	 */
	function is() {
	    var args = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        args[_i] = arguments[_i];
	    }
	    // check if the value is an instance of Object
	    return args.every(function (obj) { return obj instanceof Object
	        // check if the value constructor is Object
	        && obj.constructor === Object; });
	}
	exports.default = is;
	});

	unwrapExports(is_1);

	var util = createCommonjsModule(function (module, exports) {
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	// npm
	var circle_assign_1 = __importDefault(circleAssign);
	// o
	var is_1$1 = __importDefault(is_1);
	/**
	 * Parse the specified dot notation into an iterable string array.
	 */
	function fromDotNotation(path) {
	    var pathParts = path.split('.');
	    var parts = [];
	    var index = 0;
	    while (index < pathParts.length) {
	        var parsedPart = pathParts[index];
	        while (parsedPart[parsedPart.length - 1] === '\\'
	            && pathParts[index + 1] !== undefined
	            && pathParts[index + 1] !== null) {
	            parsedPart = parsedPart.slice(0, -1) + ".";
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
	    return paths
	        .map(function (part) { return part
	        .replace('.', '\\.'); })
	        .join('.');
	}
	/**
	 * Export dot notation functions under single export
	 */
	exports.dotNotation = {
	    from: fromDotNotation,
	    to: toDotNotation,
	};
	/**
	 * Check if all args specified are objects
	 */
	function valid() {
	    var args = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        args[_i] = arguments[_i];
	    }
	    return is_1$1.default.apply(null, args.slice());
	}
	exports.valid = valid;
	/**
	 * Merge the default options with the specified options
	 */
	function defaults(defaultOpts, specifiedOpts) {
	    return circle_assign_1.default(defaultOpts, specifiedOpts);
	}
	exports.defaults = defaults;
	});

	unwrapExports(util);
	var util_1 = util.dotNotation;
	var util_2 = util.valid;
	var util_3 = util.defaults;

	var empty_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
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
	    if (!util.valid(obj))
	        throw new TypeError("Expected Object, got " + typeof obj + " " + obj);
	    // check if the object has at least 1 key
	    return !(Object.keys(obj).length > 0);
	}
	exports.default = empty;
	});

	unwrapExports(empty_1);

	var clone_1 = createCommonjsModule(function (module, exports) {
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	// o

	var is_1$1 = __importDefault(is_1);
	var empty_1$1 = __importDefault(empty_1);
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
	 * @throws TypeError
	 *
	 * @since 1.0.0
	 * @version 2.0.0
	 */
	function clone(obj) {
	    // check if the arg specified is an object
	    if (!util.valid(obj))
	        throw new TypeError("Expected Object, got " + typeof obj + " " + obj);
	    // if the object is empty just return a new object
	    // istanbul ignore next
	    if (empty_1$1.default(obj))
	        return {};
	    // create a new empty object
	    var result = {};
	    // for each key in the object
	    Object.keys(obj).forEach(function (key) {
	        // get the value at the current key
	        var val = obj[key];
	        // if the value is an object
	        if (is_1$1.default(val)) {
	            // set the value on the result object as
	            // the cloned value object
	            result[key] = clone(val);
	        }
	        else {
	            // add the value from the original object to the same
	            // key in the new object
	            result[key] = obj[key];
	        }
	    });
	    // return the new object
	    return result;
	}
	exports.default = clone;
	});

	unwrapExports(clone_1);

	var deflate_1 = createCommonjsModule(function (module, exports) {
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	// o
	var empty_1$1 = __importDefault(empty_1);
	var is_1$1 = __importDefault(is_1);

	/**
	 * Deflate the specified object into a one deep object
	 * (keys will be dot notation)
	 *
	 * @example
	 * ```
	 * const a = { a: 1, b: { c: 2 } };
	 *
	 * deflate(a); // => { a: 1, 'b.c': 2 }
	 * ```
	 *
	 * @throws TypeError
	 *
	 * @since 1.0.0
	 * @version 2.0.0
	 */
	function deflate(obj) {
	    // check if the arg specified is an object
	    if (!util.valid(obj))
	        throw new TypeError("Expected Object, got " + typeof obj + " " + obj);
	    // if the object is empty just return an empty object
	    // istanbul ignore next
	    if (empty_1$1.default(obj))
	        return {};
	    // create a new object for the result
	    var result = {};
	    // create a recursive function to build the result
	    var deflateObj = function (object, currentPath) {
	        Object.keys(object).forEach(function (key) {
	            // build an array of the current path and the current key
	            var newPath = currentPath.concat([key]);
	            // get the value of the key path for the current object
	            var value = object[key];
	            // if the value is an object and isn't empty
	            if (is_1$1.default(value) && !empty_1$1.default(value)) {
	                // rerun this function but with the value as the object
	                // and the current path as the new path
	                deflateObj(value, newPath);
	            }
	            else {
	                // if the value isn't an object or is an empty object
	                // set the path on the result as the dot notation one deep
	                // path
	                result[util.dotNotation.to(newPath)] = value;
	            }
	        });
	    };
	    // run the first iteration of the recursive functions
	    deflateObj(obj, []);
	    // return the result
	    return result;
	}
	exports.default = deflate;
	});

	unwrapExports(deflate_1);

	var del_1 = createCommonjsModule(function (module, exports) {
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	// o

	var clone_1$1 = __importDefault(clone_1);
	/**
	 * Delete the specified path from the object
	 *
	 * @example
	 * ```
	 * const a = { a: 1, b: { c: 2 } };
	 *
	 * del(a, 'b.c'); // => { a: 1, b: {} }
	 * ```
	 *
	 * @throws TypeError
	 *
	 * @since 1.0.0
	 * @version 2.0.0
	 */
	function del(obj, path) {
	    // check if the arg specified is an object
	    if (!util.valid(obj))
	        throw new TypeError("Expected Object, got " + typeof obj + " " + obj);
	    if (typeof path !== 'string')
	        throw new TypeError("Expected String, got " + typeof path + " " + path);
	    // clone the original object so we can manipulate it
	    var cloned = clone_1$1.default(obj);
	    // create the result object as a ref to the cloned object
	    var result = cloned;
	    // get the dot notation path parts
	    var pathParts = util.dotNotation.from(path);
	    // for each path part
	    pathParts.forEach(function (part, index) {
	        // if the part is the last one
	        if (index === pathParts.length - 1) {
	            // delete the value in the object
	            delete cloned[part];
	        }
	        // set the cloned value as the next part
	        cloned = cloned[part];
	    });
	    // return the result
	    return result;
	}
	exports.default = del;
	});

	unwrapExports(del_1);

	var clean_1 = createCommonjsModule(function (module, exports) {
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	// o

	var empty_1$1 = __importDefault(empty_1);
	var clone_1$1 = __importDefault(clone_1);
	var deflate_1$1 = __importDefault(deflate_1);
	var del_1$1 = __importDefault(del_1);
	// default options
	exports.DefaultOptions = {
	    follow: false,
	};
	/**
	 * Remove `null` and `undefined` values from the specified object
	 *
	 * @example
	 * ```
	 * const a = { a: 1, b: null, c: undefined };
	 *
	 * clean(a); // => { a: 1 }
	 * ```
	 *
	 * @throws TypeError
	 *
	 * @since 1.0.0
	 * @version 2.0.0
	 */
	function clean(obj, options) {
	    if (options === void 0) { options = exports.DefaultOptions; }
	    // extract options
	    var follow = util.defaults(exports.DefaultOptions, options).follow;
	    // check if the object specified is an object
	    if (!util.valid(obj))
	        throw new TypeError("Expected Object, got " + typeof obj + " " + obj);
	    // check if follow is a boolean
	    if (typeof follow !== 'boolean')
	        throw new TypeError("Expected Boolean, got " + typeof follow + " " + follow);
	    // if the object is empty just return a new object
	    // istanbul ignore next
	    if (empty_1$1.default(obj))
	        return {};
	    // create the result object with a clone of the original
	    // so we can manipulate it
	    var result = clone_1$1.default(obj);
	    // deflate the object keys if follow is true
	    // then we only need to loop over 1 layer of keys
	    var keysObject = follow
	        ? deflate_1$1.default(obj)
	        : obj;
	    // for each key
	    Object.keys(keysObject).forEach(function (key) {
	        // get the key value
	        var value = keysObject[key];
	        // if the value is `undefined` or `null`
	        if (value === undefined || value === null) {
	            // delete the value from the result object
	            result = del_1$1.default(result, key);
	        }
	    });
	    // return the result object
	    return result;
	}
	exports.default = clean;
	});

	unwrapExports(clean_1);
	var clean_2 = clean_1.DefaultOptions;

	var equal_1 = createCommonjsModule(function (module, exports) {
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	// o

	var is_1$1 = __importDefault(is_1);
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
	 * equal(a, b); // => true
	 * equal(c, d); // => false
	 * equal(e, f); // => true
	 * ```
	 *
	 * @throws TypeError
	 *
	 * @since 1.0.0
	 * @version 2.0.0
	 */
	function equal(obj) {
	    var compareWith = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        compareWith[_i - 1] = arguments[_i];
	    }
	    // check if the arg specified is an object
	    if (!util.valid(obj))
	        throw new TypeError("Expected Object, got " + typeof obj + " " + obj);
	    // check if all the compare values are objects
	    if (!util.valid.apply(null, compareWith.slice())) {
	        throw new TypeError("Expected Object[], got " + typeof compareWith + " " + compareWith);
	    }
	    // get the keys of the specified object
	    var keys = Object.keys(obj);
	    // loop over all the specified compare values and if every compared value
	    // returns true then return true for equal
	    return compareWith.every(function (currentObject) {
	        // get the keys for the current object
	        var currentKeys = Object.keys(currentObject);
	        // if the current object and the original don't have the same amount of keys
	        // then return false because on is missing or it has extras
	        if (currentKeys.length !== keys.length)
	            return false;
	        // if the current object doesn't contain the keys the original object
	        // has then return true because the keys don't match
	        if (!keys.every(function (key) { return currentKeys.includes(key); }))
	            return false;
	        // create a function to check if the 2 values equal
	        var valueIsEqual = function (value, compareValue) {
	            // if one of values is an object
	            if (is_1$1.default(value) || is_1$1.default(compareValue)) {
	                // return true if both values are objects since this is
	                // only 1 layer deep
	                return is_1$1.default(value) && is_1$1.default(compareValue);
	            }
	            // if one of the values is an array
	            if (Array.isArray(value) || Array.isArray(compareValue)) {
	                // return true if both values are an array since this isn't
	                // comparing array values
	                return Array.isArray(value) && Array.isArray(compareValue);
	            }
	            // if one of the values is a function
	            if (typeof value === 'function' || typeof compareValue === 'function') {
	                // both values are a function
	                if (typeof value === 'function' && typeof compareValue === 'function') {
	                    // return true if both functions are the same
	                    return value.toString() === compareValue.toString();
	                }
	                // return false if the functions do not match or if only
	                // one of the values is a function
	                // istanbul ignore next
	                return false;
	            }
	            // anything else just compare as normal and return true if both
	            // values match
	            return value === compareValue;
	        };
	        // if all values are equal to the original object return true
	        return keys.every(function (key) { return valueIsEqual(obj[key], currentObject[key]); });
	    });
	}
	exports.default = equal;
	});

	unwrapExports(equal_1);

	var deepEqual_1 = createCommonjsModule(function (module, exports) {
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	// o

	var equal_1$1 = __importDefault(equal_1);
	var deflate_1$1 = __importDefault(deflate_1);
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
	 * deepEqual(a, b); // => true
	 * deepEqual(c, d); // => false
	 * deepEqual(e, f); // => false
	 * ```
	 *
	 * @throws TypeError
	 *
	 * @since 1.0.0
	 * @version 2.0.0
	 */
	function deepEqual(obj) {
	    var compareWith = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        compareWith[_i - 1] = arguments[_i];
	    }
	    // check if the arg specified is an object
	    if (!util.valid(obj))
	        throw new TypeError("Expected Object, got " + typeof obj + " " + obj);
	    // check if all the compare values are objects
	    if (!util.valid.apply(null, compareWith.slice())) {
	        throw new TypeError("Expected Object[], got " + typeof compareWith + " " + compareWith);
	    }
	    // check if every object is equal to each other when deflated
	    // if all objects are deflated we can simply use the equal function
	    // to check if they equal at 1 layer
	    return compareWith.every(function (object) { return equal_1$1.default(deflate_1$1.default(obj), deflate_1$1.default(object)); });
	}
	exports.default = deepEqual;
	});

	unwrapExports(deepEqual_1);

	var each_1 = createCommonjsModule(function (module, exports) {
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	// o

	var empty_1$1 = __importDefault(empty_1);
	var deflate_1$1 = __importDefault(deflate_1);
	// default options
	exports.DefaultOptions = {
	    follow: false,
	};
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
	 * }, {
	 *   follow: true,
	 * });
	 * ```
	 *
	 * @throws TypeError
	 *
	 * @since 1.0.0
	 * @version 2.0.0
	 */
	function each(obj, cb, options) {
	    if (options === void 0) { options = exports.DefaultOptions; }
	    // extract options
	    var follow = util.defaults(exports.DefaultOptions, options).follow;
	    // check if the args specified are the correct type
	    if (!util.valid(obj))
	        throw new TypeError("Expected Object, got " + typeof obj + " " + obj);
	    if (typeof cb !== 'function')
	        throw new TypeError("Expected Function, got " + typeof cb + " " + cb);
	    if (typeof follow !== 'boolean')
	        throw new TypeError("Expected Boolean, got " + typeof follow + " " + follow);
	    // if the object is empty just return false because it doesn't have anything
	    if (empty_1$1.default(obj))
	        return;
	    // if follow is true deflate the object so we can simply
	    // iterate over 1 layer of keys
	    var iterableObject = follow
	        ? deflate_1$1.default(obj)
	        : obj;
	    // for each key run the callback function
	    Object.keys(iterableObject)
	        .forEach(function (key, index) { return cb(key, iterableObject[key], index); });
	}
	exports.default = each;
	});

	unwrapExports(each_1);
	var each_2 = each_1.DefaultOptions;

	var every_1 = createCommonjsModule(function (module, exports) {
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	// o

	var each_1$1 = __importDefault(each_1);
	// default options
	exports.DefaultOptions = {
	    follow: false,
	};
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
	 * }, {
	 *   follow: true,
	 * }); // => true
	 * ```
	 *
	 * @throws TypeError
	 *
	 * @since 1.0.0
	 * @version 2.0.0
	 */
	function every(obj, cb, options) {
	    if (options === void 0) { options = exports.DefaultOptions; }
	    // extract options
	    var follow = util.defaults(exports.DefaultOptions, options).follow;
	    // check if the args specified are the correct type
	    if (!util.valid(obj))
	        throw new TypeError("Expected Object, got " + typeof obj + " " + obj);
	    if (typeof cb !== 'function')
	        throw new TypeError("Expected Function, got " + typeof cb + " " + cb);
	    if (typeof follow !== 'boolean')
	        throw new TypeError("Expected Boolean, got " + typeof follow + " " + follow);
	    // set result to true so we can change it to false if
	    // the callback fails to evaluate to true
	    var result = true;
	    // for each over the object using the each function which makes it easier
	    // for us to loop since we can just pass our own callback to evaluate the
	    // the return value and we can pass follow directly to each and it will
	    // handle the deep looping for us
	    each_1$1.default(obj, function (key, value, index) {
	        // if the callback evaluates to false
	        if (!cb(key, value, index)) {
	            // set the result as false
	            result = false;
	        }
	    }, {
	        follow: follow,
	    });
	    // return the result
	    return result;
	}
	exports.default = every;
	});

	unwrapExports(every_1);
	var every_2 = every_1.DefaultOptions;

	var filter_1 = createCommonjsModule(function (module, exports) {
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	// o

	var clone_1$1 = __importDefault(clone_1);
	var each_1$1 = __importDefault(each_1);
	var del_1$1 = __importDefault(del_1);
	exports.DefaultOptions = {
	    follow: false,
	};
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
	 * }, {
	 *   follow: true,
	 * }); // => { b: { c: 2 } }
	 * ```
	 *
	 * @throws TypeError
	 *
	 * @since 1.0.0
	 * @version 2.0.0
	 */
	function filter(obj, cb, options) {
	    if (options === void 0) { options = exports.DefaultOptions; }
	    // extract options
	    var follow = util.defaults(exports.DefaultOptions, options).follow;
	    // check if the args specified are the correct type
	    if (!util.valid(obj))
	        throw new TypeError("Expected Object, got " + typeof obj + " " + obj);
	    if (typeof cb !== 'function')
	        throw new TypeError("Expected Function, got " + typeof cb + " " + cb);
	    if (typeof follow !== 'boolean')
	        throw new TypeError("Expected Boolean, got " + typeof follow + " " + follow);
	    // create a clone of the original object for the result so we can
	    // manipulate it
	    var result = clone_1$1.default(obj);
	    // for each over the object using the each function which makes it easier
	    // for us to loop since we can just pass our own callback to evaluate the
	    // the return value and we can pass follow directly to each and it will
	    // handle the deep looping for us
	    each_1$1.default(obj, function (key, value, index) {
	        // if the callback evaluates to false
	        if (!cb(key, value, index)) {
	            // remove the value at that key from the result
	            result = del_1$1.default(result, key);
	        }
	    }, {
	        follow: follow,
	    });
	    // return the result
	    return result;
	}
	exports.default = filter;
	});

	unwrapExports(filter_1);
	var filter_2 = filter_1.DefaultOptions;

	var find_1 = createCommonjsModule(function (module, exports) {
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	// o

	var each_1$1 = __importDefault(each_1);
	// default options
	exports.DefaultOptions = {
	    follow: false,
	};
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
	 * }, {
	 *   follow: true,
	 * }); // => 'b.c'
	 * ```
	 *
	 * @throws TypeError
	 *
	 * @since 1.0.0
	 * @version 2.0.0
	 */
	function find(obj, cb, options) {
	    if (options === void 0) { options = exports.DefaultOptions; }
	    // extract options
	    var follow = util.defaults(exports.DefaultOptions, options).follow;
	    // check if the args specified are the correct type
	    if (!util.valid(obj))
	        throw new TypeError("Expected Object, got " + typeof obj + " " + obj);
	    if (typeof cb !== 'function')
	        throw new TypeError("Expected Function, got " + typeof cb + " " + cb);
	    if (typeof follow !== 'boolean')
	        throw new TypeError("Expected Boolean, got " + typeof follow + " " + follow);
	    // create a variable to track whether the key is found
	    var found = false;
	    // create the result variable which will default to undefined
	    var result;
	    // for each over the object using the each function which makes it easier
	    // for us to loop since we can just pass our own callback to evaluate the
	    // the return value and we can pass follow directly to each and it will
	    // handle the deep looping for us
	    each_1$1.default(obj, function (key, value, index) {
	        // if the key is already found skip because find should
	        // return the first found key
	        if (!found) {
	            // check if the callback evaluates to true
	            if (cb(key, value, index)) {
	                // if it does evaluate true set found as true
	                found = true;
	                // and set the result as the current key
	                result = key;
	            }
	        }
	    }, {
	        follow: follow,
	    });
	    // if the key was not found set the result as undefined
	    if (!found)
	        result = undefined;
	    // return the result
	    return result;
	}
	exports.default = find;
	});

	unwrapExports(find_1);
	var find_2 = find_1.DefaultOptions;

	var flip_1 = createCommonjsModule(function (module, exports) {
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	// o

	var each_1$1 = __importDefault(each_1);
	var is_1$1 = __importDefault(is_1);
	// default options
	exports.DefaultOptions = {
	    follow: false,
	    useToString: false,
	};
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
	 * flip(b, {
	 *   follow: true,
	 * }); // => { '1': 'a', '2': 'b.c' }
	 * flip(b, {
	 *   useToString: true,
	 * }); // => { '1': 'a', '{"c":2}': 'b' }
	 * ```
	 *
	 * @throws TypeError
	 *
	 * @since 1.0.0
	 * @version 2.0.0
	 */
	function flip(obj, options) {
	    if (options === void 0) { options = exports.DefaultOptions; }
	    // extract options
	    var _a = util.defaults(exports.DefaultOptions, options), follow = _a.follow, useToString = _a.useToString;
	    // check if the args specified are the correct type
	    if (!util.valid(obj))
	        throw new TypeError("Expected Object, got " + typeof obj + " " + obj);
	    if (typeof follow !== 'boolean')
	        throw new TypeError("Expected Boolean, got " + typeof follow + " " + follow);
	    if (typeof useToString !== 'boolean')
	        throw new TypeError("Expected Boolean, got " + typeof useToString + " " + useToString);
	    // create an empty object for the result
	    var result = {};
	    // for each over the object using the each function which makes it easier
	    // for us to loop since we can just pass our own callback to evaluate the
	    // the return value and we can pass follow directly to each and it will
	    // handle the deep looping for us
	    each_1$1.default(obj, function (key, value) {
	        // if the value is a string or number and can be used
	        // as the key
	        if (typeof value === 'string' || typeof value === 'number') {
	            // add the value/key to the result object
	            result[value] = key;
	        }
	        else if (typeof value !== 'string' && useToString) {
	            // if the value is not a string but useToString is true
	            // if the value is an object or array
	            if (is_1$1.default(value) || Array.isArray(value)) {
	                // cover it to json and use the json as the key
	                result[JSON.stringify(value)] = key;
	            }
	            else {
	                // if it is anything else convert it to a string
	                result[String(value).toString()] = key;
	            }
	        }
	    }, {
	        follow: follow,
	    });
	    // return the result
	    return result;
	}
	exports.default = flip;
	});

	unwrapExports(flip_1);
	var flip_2 = flip_1.DefaultOptions;

	var has_1 = createCommonjsModule(function (module, exports) {
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	// o

	var empty_1$1 = __importDefault(empty_1);
	var is_1$1 = __importDefault(is_1);
	/**
	 * Check if an object has the specified path (using dot notation)
	 *
	 * @example
	 * ```
	 * const a = { a: 1, b: { c: 2 } };
	 *
	 * has(a, 'b.c'); // => true
	 * has(a, 'b.d'); // => false
	 * ```
	 *
	 * @throws Error
	 *
	 * @since 1.0.0
	 * @version 2.0.0
	 */
	function has(obj) {
	    var paths = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        paths[_i - 1] = arguments[_i];
	    }
	    // check if the arg specified is an object
	    if (!util.valid(obj))
	        throw new TypeError("Expected Object, got " + typeof obj + " " + obj);
	    if (!paths.every(function (path) { return typeof path === 'string'; })) {
	        throw new TypeError("Expected String[], got " + typeof paths + " " + paths);
	    }
	    // if the object is empty just return false because it doesn't have anything
	    if (empty_1$1.default(obj))
	        return false;
	    // set the result boolean to true by default
	    var hasPaths = true;
	    // for each path specified
	    paths.forEach(function (path) {
	        // check if hasPaths is true, if it isn't just skip because at least one
	        // has failed
	        if (hasPaths) {
	            // set the current value as the object by default
	            var currentValue_1 = obj;
	            // for each part in the dot notation path
	            util.dotNotation.from(path).forEach(function (key) {
	                // if the value at the current path part in the current value
	                // is an object and isn't empty set the current value as that object
	                if (is_1$1.default(currentValue_1) && !empty_1$1.default(currentValue_1)) {
	                    currentValue_1 = currentValue_1[key];
	                }
	                else {
	                    // if it isn't an object or is empty just set the current value as
	                    // undefined
	                    currentValue_1 = undefined;
	                }
	            });
	            // if the resulting value is undefined
	            if (currentValue_1 === undefined) {
	                // set has paths to false because at least 1 path has failed
	                hasPaths = false;
	            }
	        }
	    });
	    // return the resulting boolean
	    return hasPaths;
	}
	exports.default = has;
	});

	unwrapExports(has_1);

	var get_1 = createCommonjsModule(function (module, exports) {
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	// o

	var empty_1$1 = __importDefault(empty_1);
	var has_1$1 = __importDefault(has_1);
	/**
	 * Get the value from the path in the specified object
	 *
	 * @example
	 * ```
	 * const a = { a: 1, b: { c: 2 } };
	 *
	 * get(a, 'b.c'); // => 2
	 * ```
	 *
	 * @throws TypeError
	 *
	 * @since 1.0.0
	 * @version 2.0.0
	 */
	function get(obj, path, defaultValue) {
	    if (defaultValue === void 0) { defaultValue = undefined; }
	    // check if the arg specified is an object
	    if (!util.valid(obj))
	        throw new TypeError("Expected Object, got " + typeof obj + " " + obj);
	    if (typeof path !== 'string')
	        throw new TypeError("Expected String, got " + typeof path + " " + path);
	    // if the object is empty or it doesn't have the path return the default value
	    if (empty_1$1.default(obj) || !has_1$1.default(obj, path))
	        return defaultValue;
	    // set the current value to the object so its easier to iterate over the objects
	    var currentValue = obj;
	    // for each path part set the current value as the next value in the path
	    util.dotNotation.from(path).forEach(function (key) {
	        currentValue = currentValue[key];
	    });
	    // return the value at the path
	    return currentValue;
	}
	exports.default = get;
	});

	unwrapExports(get_1);

	var includes_1 = createCommonjsModule(function (module, exports) {
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	// o

	var each_1$1 = __importDefault(each_1);
	// default options
	exports.DefaultOptions = {
	    follow: false,
	};
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
	 * includes(b, 2, {
	 *   follow: true,
	 * }); // => true
	 * ```
	 *
	 * @throws TypeError
	 *
	 * @since 1.0.0
	 * @version 2.0.0
	 */
	function includes(obj, value, options) {
	    if (options === void 0) { options = exports.DefaultOptions; }
	    // extract options
	    var follow = util.defaults(exports.DefaultOptions, options).follow;
	    // check if the args specified are the correct type
	    if (!util.valid(obj))
	        throw new TypeError("Expected Object, got " + typeof obj + " " + obj);
	    if (typeof follow !== 'boolean')
	        throw new TypeError("Expected Boolean, got " + typeof follow + " " + follow);
	    // create the result variable which is defaulted to false
	    var result = false;
	    // for each over the object using the each function which makes it easier
	    // for us to loop since we can just pass our own callback to evaluate the
	    // the return value and we can pass follow directly to each and it will
	    // handle the deep looping for us
	    each_1$1.default(obj, function (key, objValue) {
	        // if the result is still false
	        if (!result) {
	            // if the two values equal set the result as true
	            if (objValue === value)
	                result = true;
	        }
	    }, {
	        follow: follow,
	    });
	    // return the result
	    return result;
	}
	exports.default = includes;
	});

	unwrapExports(includes_1);
	var includes_2 = includes_1.DefaultOptions;

	var set_1 = createCommonjsModule(function (module, exports) {
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	// o

	var clone_1$1 = __importDefault(clone_1);
	var is_1$1 = __importDefault(is_1);
	/**
	 * Set the value to the path on the specified object
	 *
	 * @example
	 * ```
	 * const a = { a: 1 };
	 *
	 * set(a, 'b.c', 2); // => { a: 1, b: { c: 2 } }
	 * ```
	 *
	 * @throws TypeError
	 *
	 * @since 1.0.0
	 * @version 2.0.0
	 */
	function set(obj, path, value) {
	    // check if the arg specified is an object
	    if (!util.valid(obj))
	        throw new TypeError("Expected Object, got " + typeof obj + " " + obj);
	    if (typeof path !== 'string')
	        throw new TypeError("Expected String, got " + typeof path + " " + path);
	    var cloned = clone_1$1.default(obj);
	    var result = cloned;
	    var pathParts = util.dotNotation.from(path);
	    pathParts.forEach(function (part, index) {
	        if (!is_1$1.default(cloned[part])) {
	            cloned[part] = {};
	        }
	        if (index === pathParts.length - 1) {
	            cloned[part] = value;
	        }
	        cloned = cloned[part];
	    });
	    return result;
	}
	exports.default = set;
	});

	unwrapExports(set_1);

	var inflate_1 = createCommonjsModule(function (module, exports) {
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	// o

	var empty_1$1 = __importDefault(empty_1);
	var set_1$1 = __importDefault(set_1);
	/**
	 * Inflate the specified object into a multi level object
	 * (reverse of deflate)
	 *
	 * @example
	 * ```
	 * const a = { a: 1, 'b.c': 2 };
	 *
	 * inflate(a); // => { a: 1, b: { c: 2 } }
	 * ```
	 *
	 * @throws TypeError
	 *
	 * @since 1.0.0
	 * @version 2.0.0
	 */
	function inflate(obj) {
	    // check if the arg specified is an object
	    if (!util.valid(obj))
	        throw new TypeError("Expected Object, got " + typeof obj + " " + obj);
	    // if the object is empty just return an empty object
	    // istanbul ignore next
	    if (empty_1$1.default(obj))
	        return {};
	    // create a new object for the result
	    var result = {};
	    // for each "path" in the object
	    Object.keys(obj).forEach(function (keyPath) {
	        // set the value on the result object to the dot notation path
	        result = set_1$1.default(result, keyPath, obj[keyPath]);
	    });
	    // return the result
	    return result;
	}
	exports.default = inflate;
	});

	unwrapExports(inflate_1);

	var keyOf_1 = createCommonjsModule(function (module, exports) {
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	// o

	var find_1$1 = __importDefault(find_1);
	// default options
	exports.DefaultOptions = {
	    follow: false,
	};
	/**
	 * Get the key to the specified value in dot notation
	 *
	 * @example
	 * ```
	 * const a = { a: 1, b: { c: 2 } };
	 *
	 * keyOf(a, 2); // => undefined
	 * keyOf(a, 2, {
	 *   follow: true,
	 * }); // => 'b.c'
	 * ```
	 *
	 * @throws TypeError
	 *
	 * @since 1.0.0
	 * @version 2.0.0
	 */
	function keyOf(obj, value, options) {
	    if (options === void 0) { options = exports.DefaultOptions; }
	    // extract options
	    var follow = util.defaults(exports.DefaultOptions, options).follow;
	    // check if the args specified are the correct type
	    if (!util.valid(obj))
	        throw new TypeError("Expected Object, got " + typeof obj + " " + obj);
	    if (typeof follow !== 'boolean')
	        throw new TypeError("Expected Boolean, got " + typeof follow + " " + follow);
	    // this is just an alias of find so we simply just pass the params
	    // to the find function and return its result
	    return find_1$1.default(obj, function (key, objValue) { return objValue === value; }, {
	        follow: follow,
	    });
	}
	exports.default = keyOf;
	});

	unwrapExports(keyOf_1);
	var keyOf_2 = keyOf_1.DefaultOptions;

	var keys_1 = createCommonjsModule(function (module, exports) {
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	// o

	var clone_1$1 = __importDefault(clone_1);
	var deflate_1$1 = __importDefault(deflate_1);
	// default options
	exports.DefaultOptions = {
	    follow: false,
	};
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
	 * @throws TypeError
	 *
	 * @since 1.0.0
	 * @version 2.0.0
	 */
	function keys(obj, options) {
	    if (options === void 0) { options = exports.DefaultOptions; }
	    // extract options
	    var follow = util.defaults(exports.DefaultOptions, options).follow;
	    // check if the args specified are the correct type
	    if (!util.valid(obj))
	        throw new TypeError("Expected Object, got " + typeof obj + " " + obj);
	    if (typeof follow !== 'boolean')
	        throw new TypeError("Expected Boolean, got " + typeof follow + " " + follow);
	    // clone the object so we can deflate it if we need to
	    var cloned = clone_1$1.default(obj);
	    // if follow is true
	    if (follow) {
	        // set the cloned object as the object but deflated
	        cloned = deflate_1$1.default(cloned);
	    }
	    // use the native Object.keys function so its fast and return the result
	    return Object.keys(cloned);
	}
	exports.default = keys;
	});

	unwrapExports(keys_1);
	var keys_2 = keys_1.DefaultOptions;

	var map_1 = createCommonjsModule(function (module, exports) {
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	// o

	var each_1$1 = __importDefault(each_1);
	var set_1$1 = __importDefault(set_1);
	// default options
	exports.DefaultOptions = {
	    follow: false,
	};
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
	 * }, {
	 *   follow: true,
	 * }); // => { a: 2, b: { c: 4 } }
	 * ```
	 *
	 * @throws TypeError
	 *
	 * @since 1.0.0
	 * @version 2.0.0
	 */
	function map(obj, cb, options) {
	    if (options === void 0) { options = exports.DefaultOptions; }
	    var follow = util.defaults(exports.DefaultOptions, options).follow;
	    // check if the args specified are the correct type
	    if (!util.valid(obj))
	        throw new TypeError("Expected Object, got " + typeof obj + " " + obj);
	    if (typeof cb !== 'function')
	        throw new TypeError("Expected Function, got " + typeof cb + " " + cb);
	    if (typeof follow !== 'boolean')
	        throw new TypeError("Expected Boolean, got " + typeof follow + " " + follow);
	    // create a result object so we can add the new values to it
	    var result = {};
	    // for each over the object using the each function which makes it easier
	    // for us to loop since we can just pass our own callback to evaluate the
	    // the return value and we can pass follow directly to each and it will
	    // handle the deep looping for us
	    each_1$1.default(obj, function (key, value, index) {
	        // set the result as the result object with the new key appended
	        // with the value of the evaluated callback
	        result = set_1$1.default(result, key, cb(key, value, index));
	    }, {
	        follow: follow,
	    });
	    // return the result
	    return result;
	}
	exports.default = map;
	});

	unwrapExports(map_1);
	var map_2 = map_1.DefaultOptions;

	var merge_1 = createCommonjsModule(function (module, exports) {
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	// npm
	var circle_assign_1 = __importDefault(circleAssign);
	// o

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
	 * @throws TypeError
	 *
	 * @since 1.0.0
	 * @version 2.0.0
	 */
	function merge(target) {
	    var sources = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        sources[_i - 1] = arguments[_i];
	    }
	    // check if the arg specified is an object
	    if (!util.valid(target))
	        throw new TypeError("Expected Object, got " + typeof target + " " + target);
	    // check if all the compare values are objects
	    if (!util.valid.apply(null, sources.slice())) {
	        throw new TypeError("Expected Object[], got " + typeof sources + " " + sources);
	    }
	    return circle_assign_1.default.apply(void 0, [target].concat(sources));
	}
	exports.default = merge;
	});

	unwrapExports(merge_1);

	var size_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
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
	 * @throws TypeError
	 *
	 * @since 1.0.0
	 * @version 2.0.0
	 */
	function size(obj) {
	    // check if the arg specified is an object
	    if (!util.valid(obj))
	        throw new TypeError("Expected Object, got " + typeof obj + " " + obj);
	    // get the object keys and return the length
	    return Object.keys(obj).length;
	}
	exports.default = size;
	});

	unwrapExports(size_1);

	var slice_1 = createCommonjsModule(function (module, exports) {
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	// o

	var keys_1$1 = __importDefault(keys_1);
	var set_1$1 = __importDefault(set_1);
	var get_1$1 = __importDefault(get_1);
	// default options
	exports.DefaultOptions = {
	    follow: false,
	};
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
	 * @throws TypeError
	 *
	 * @since 1.0.0
	 * @version 2.0.0
	 */
	function slice(obj, start, end, options) {
	    if (end === void 0) { end = Object.keys(obj).length; }
	    if (options === void 0) { options = exports.DefaultOptions; }
	    // extract options
	    var follow = util.defaults(exports.DefaultOptions, options).follow;
	    // check if the args specified are the correct type
	    if (!util.valid(obj))
	        throw new TypeError("Expected Object, got " + typeof obj + " " + obj);
	    if (typeof start !== 'number')
	        throw new TypeError("Expected Number, got " + typeof start + " " + start);
	    if (typeof end !== 'number')
	        throw new TypeError("Expected Number, got " + typeof end + " " + end);
	    // create an empty object for the result
	    var result = {};
	    // get the keys of the object and pass follow so the keys function
	    // can handle the deep looping for us
	    var objKeys = keys_1$1.default(obj, {
	        follow: follow,
	    });
	    // run the native slice function on the keys so its fast
	    objKeys.slice(start, end)
	        .forEach(function (key) {
	        // for each of the keys after sliced
	        // get the value from the original object
	        var value = get_1$1.default(obj, key);
	        // set the value on the result object to the current key
	        result = set_1$1.default(result, key, value);
	    });
	    // return the result
	    return result;
	}
	exports.default = slice;
	});

	unwrapExports(slice_1);
	var slice_2 = slice_1.DefaultOptions;

	var some_1 = createCommonjsModule(function (module, exports) {
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	// o

	var each_1$1 = __importDefault(each_1);
	// default options
	exports.DefaultOptions = {
	    follow: false,
	};
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
	 * }, {
	 *   follow: true,
	 * }); // => true
	 *
	 * some(a, (key, value) => {
	 *   return value === 2;
	 * }, {
	 *   follow: true,
	 * }); // => false
	 * ```
	 *
	 * @throws TypeError
	 *
	 * @since 1.0.0
	 * @version 2.0.0
	 */
	function some(obj, cb, options) {
	    if (options === void 0) { options = exports.DefaultOptions; }
	    // extract options
	    var follow = util.defaults(exports.DefaultOptions, options).follow;
	    // check if the args specified are the correct type
	    if (!util.valid(obj))
	        throw new TypeError("Expected Object, got " + typeof obj + " " + obj);
	    if (typeof cb !== 'function')
	        throw new TypeError("Expected Function, got " + typeof cb + " " + cb);
	    if (typeof follow !== 'boolean')
	        throw new TypeError("Expected Boolean, got " + typeof follow + " " + follow);
	    // set result to false so we can change it to true if
	    // any of the callbacks evaluate to true
	    var result = false;
	    // for each over the object using the each function which makes it easier
	    // for us to loop since we can just pass our own callback to evaluate the
	    // the return value and we can pass follow directly to each and it will
	    // handle the deep looping for us
	    each_1$1.default(obj, function (key, value, index) {
	        // if the callback evaluates to true
	        if (cb(key, value, index)) {
	            // set the result as true
	            result = true;
	        }
	    }, {
	        follow: follow,
	    });
	    // return the result
	    return result;
	}
	exports.default = some;
	});

	unwrapExports(some_1);
	var some_2 = some_1.DefaultOptions;

	var sort_1 = createCommonjsModule(function (module, exports) {
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	// o

	var keys_1$1 = __importDefault(keys_1);
	var get_1$1 = __importDefault(get_1);
	var set_1$1 = __importDefault(set_1);
	// default options
	exports.DefaultOptions = {
	    follow: false,
	};
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
	 * }, {
	 *   follow: true,
	 * }); // => { d: { e: 1 }, a: 3, c: 5, b: 7, f: 9 }
	 * ```
	 *
	 * @throws TypeError
	 *
	 * @since 1.0.0
	 * @version 2.0.0
	 */
	function sort(obj, cb, options) {
	    if (options === void 0) { options = exports.DefaultOptions; }
	    // extract options
	    var follow = util.defaults(exports.DefaultOptions, options).follow;
	    // check if the args specified are the correct type
	    if (!util.valid(obj))
	        throw new TypeError("Expected Object, got " + typeof obj + " " + obj);
	    if (typeof cb !== 'function')
	        throw new TypeError("Expected Function, got " + typeof cb + " " + cb);
	    if (typeof follow !== 'boolean')
	        throw new TypeError("Expected Boolean, got " + typeof follow + " " + follow);
	    // create a new object so we can add the key/values on in the
	    // correct order
	    var result = {};
	    // get the keys from the object and pass follow to the keys function
	    // then we don't need to handle deep objects
	    var sortedKeys = keys_1$1.default(obj, {
	        follow: follow,
	    })
	        .sort(function (firstKey, secondKey) {
	        // get the value from the object for the corresponding key
	        var firstValue = get_1$1.default(obj, firstKey);
	        var secondValue = get_1$1.default(obj, secondKey);
	        // create the element objects
	        var firstEl = {
	            key: firstKey,
	            value: firstValue,
	        };
	        var secondEl = {
	            key: secondKey,
	            value: secondValue,
	        };
	        // return the result from the callback using the elements
	        return cb(firstEl, secondEl);
	    });
	    // for each through the sorted keys
	    sortedKeys.forEach(function (key) {
	        // set the the value on the result object to the corresponding key
	        result = set_1$1.default(result, key, get_1$1.default(obj, key));
	    });
	    // return the result
	    return result;
	}
	exports.default = sort;
	});

	unwrapExports(sort_1);
	var sort_2 = sort_1.DefaultOptions;

	var values_1 = createCommonjsModule(function (module, exports) {
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	// o

	var keys_1$1 = __importDefault(keys_1);
	var get_1$1 = __importDefault(get_1);
	// default options
	exports.DefaultOptions = {
	    follow: false,
	};
	/**
	 * Get an array of the object values
	 *
	 * @example
	 * ```
	 * const a = { a: 1, b: 2, c: 3, d: 4, e: 5 };
	 * const b = { a: 1, b: { c: 2, d: 3 } };
	 *
	 * values(a); // => [ 1, 2, 3, 4, 5 ]
	 * values(b, {
	 *   follow: true,
	 * }); // => [ 1, 2, 3 ]
	 * ```
	 *
	 * @throws TypeError
	 *
	 * @since 1.0.0
	 * @version 2.0.0
	 */
	function values(obj, options) {
	    if (options === void 0) { options = exports.DefaultOptions; }
	    // extract options
	    var follow = util.defaults(exports.DefaultOptions, options).follow;
	    // check if the args specified are the correct type
	    if (!util.valid(obj))
	        throw new TypeError("Expected Object, got " + typeof obj + " " + obj);
	    // get the object keys and pass follow so it handles the deep object
	    // for us and then map the keys array and return the corresponding value
	    // for the current key
	    return keys_1$1.default(obj, {
	        follow: follow,
	    })
	        .map(function (key) { return get_1$1.default(obj, key); });
	}
	exports.default = values;
	});

	unwrapExports(values_1);
	var values_2 = values_1.DefaultOptions;

	var build = createCommonjsModule(function (module, exports) {
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	// functions
	var clean_1$1 = __importDefault(clean_1);
	exports.clean = clean_1$1.default;
	var clone_1$1 = __importDefault(clone_1);
	exports.clone = clone_1$1.default;
	var deepEqual_1$1 = __importDefault(deepEqual_1);
	exports.deepEqual = deepEqual_1$1.default;
	var deflate_1$1 = __importDefault(deflate_1);
	exports.deflate = deflate_1$1.default;
	var del_1$1 = __importDefault(del_1);
	exports.del = del_1$1.default;
	var each_1$1 = __importDefault(each_1);
	exports.each = each_1$1.default;
	var empty_1$1 = __importDefault(empty_1);
	exports.empty = empty_1$1.default;
	var every_1$1 = __importDefault(every_1);
	exports.every = every_1$1.default;
	var equal_1$1 = __importDefault(equal_1);
	exports.equal = equal_1$1.default;
	var filter_1$1 = __importDefault(filter_1);
	exports.filter = filter_1$1.default;
	var find_1$1 = __importDefault(find_1);
	exports.find = find_1$1.default;
	var flip_1$1 = __importDefault(flip_1);
	exports.flip = flip_1$1.default;
	var get_1$1 = __importDefault(get_1);
	exports.get = get_1$1.default;
	var has_1$1 = __importDefault(has_1);
	exports.has = has_1$1.default;
	var includes_1$1 = __importDefault(includes_1);
	exports.includes = includes_1$1.default;
	var inflate_1$1 = __importDefault(inflate_1);
	exports.inflate = inflate_1$1.default;
	var is_1$1 = __importDefault(is_1);
	exports.is = is_1$1.default;
	var keyOf_1$1 = __importDefault(keyOf_1);
	exports.keyOf = keyOf_1$1.default;
	var keys_1$1 = __importDefault(keys_1);
	exports.keys = keys_1$1.default;
	var map_1$1 = __importDefault(map_1);
	exports.map = map_1$1.default;
	var merge_1$1 = __importDefault(merge_1);
	exports.merge = merge_1$1.default;
	var set_1$1 = __importDefault(set_1);
	exports.set = set_1$1.default;
	var size_1$1 = __importDefault(size_1);
	exports.size = size_1$1.default;
	var slice_1$1 = __importDefault(slice_1);
	exports.slice = slice_1$1.default;
	var some_1$1 = __importDefault(some_1);
	exports.some = some_1$1.default;
	var sort_1$1 = __importDefault(sort_1);
	exports.sort = sort_1$1.default;
	var values_1$1 = __importDefault(values_1);
	exports.values = values_1$1.default;
	exports.default = {
	    clean: clean_1$1.default,
	    clone: clone_1$1.default,
	    deepEqual: deepEqual_1$1.default,
	    deflate: deflate_1$1.default,
	    del: del_1$1.default,
	    each: each_1$1.default,
	    empty: empty_1$1.default,
	    equal: equal_1$1.default,
	    every: every_1$1.default,
	    filter: filter_1$1.default,
	    find: find_1$1.default,
	    flip: flip_1$1.default,
	    get: get_1$1.default,
	    has: has_1$1.default,
	    includes: includes_1$1.default,
	    inflate: inflate_1$1.default,
	    is: is_1$1.default,
	    keyOf: keyOf_1$1.default,
	    keys: keys_1$1.default,
	    map: map_1$1.default,
	    merge: merge_1$1.default,
	    set: set_1$1.default,
	    size: size_1$1.default,
	    slice: slice_1$1.default,
	    some: some_1$1.default,
	    sort: sort_1$1.default,
	    values: values_1$1.default,
	};
	});

	var index = unwrapExports(build);
	var build_1 = build.clean;
	var build_2 = build.clone;
	var build_3 = build.deepEqual;
	var build_4 = build.deflate;
	var build_5 = build.del;
	var build_6 = build.each;
	var build_7 = build.empty;
	var build_8 = build.every;
	var build_9 = build.equal;
	var build_10 = build.filter;
	var build_11 = build.find;
	var build_12 = build.flip;
	var build_13 = build.get;
	var build_14 = build.has;
	var build_15 = build.includes;
	var build_16 = build.inflate;
	var build_17 = build.is;
	var build_18 = build.keyOf;
	var build_19 = build.keys;
	var build_20 = build.map;
	var build_21 = build.merge;
	var build_22 = build.set;
	var build_23 = build.size;
	var build_24 = build.slice;
	var build_25 = build.some;
	var build_26 = build.sort;
	var build_27 = build.values;

	exports.clean = build_1;
	exports.clone = build_2;
	exports.deepEqual = build_3;
	exports.default = index;
	exports.deflate = build_4;
	exports.del = build_5;
	exports.each = build_6;
	exports.empty = build_7;
	exports.equal = build_9;
	exports.every = build_8;
	exports.filter = build_10;
	exports.find = build_11;
	exports.flip = build_12;
	exports.get = build_13;
	exports.has = build_14;
	exports.includes = build_15;
	exports.inflate = build_16;
	exports.is = build_17;
	exports.keyOf = build_18;
	exports.keys = build_19;
	exports.map = build_20;
	exports.merge = build_21;
	exports.set = build_22;
	exports.size = build_23;
	exports.slice = build_24;
	exports.some = build_25;
	exports.sort = build_26;
	exports.values = build_27;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=o.js.map

// npm
import circleAssign from 'circle-assign';

// o
import { valid } from './util';
import is from './is';

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
function merge(target: OObject, ...sources: OObject[]): OObject {
  // check if the arg specified is an object
  if (!valid(target)) throw new Error('The argument `target` is not an object');

  // check if all the compare values are objects
  if (!sources.every(object => is(object))) {
    throw new Error('The arguments `sources` are not objects');
  }

  return circleAssign(target, ...sources);
}

export default merge;

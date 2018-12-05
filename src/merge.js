// npm
import circleAssign from 'circle-assign';

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
export default circleAssign;

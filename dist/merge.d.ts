import { OObject } from './types';
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
declare function merge(target: OObject, ...sources: OObject[]): OObject;
export default merge;

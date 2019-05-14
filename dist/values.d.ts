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
declare function values(obj: OObject, follow?: boolean): any[];
export default values;

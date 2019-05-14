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
declare function equal(obj: OObject, ...compareWith: OObject[]): boolean;
export default equal;

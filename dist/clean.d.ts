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
declare function clean(obj: OObject, follow?: boolean): OObject;
export default clean;

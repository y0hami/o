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
declare function get(obj: OObject, path: string, defaultValue?: any): any;
export default get;

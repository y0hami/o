export interface OSomeCallback {
    (key: string, value: any, index: number): boolean;
}
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
declare function some(obj: OObject, cb: OSomeCallback, follow?: boolean): boolean;
export default some;

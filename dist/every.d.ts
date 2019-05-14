export interface OEveryCallback {
    (key: string, value: any, index: number): boolean;
}
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
 * }, true); // => true
 * ```
 *
 * @throws Error
 *
 * @since 1.0.0
 * @version 2.0.0
 */
declare function every(obj: OObject, cb: OEveryCallback, follow?: boolean): boolean;
export default every;

export interface OEachCallback {
    (key: string, value: any, index: number): void;
}
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
 * }, true);
 * ```
 *
 * @throws Error
 *
 * @since 1.0.0
 * @version 2.0.0
 */
declare function each(obj: OObject, cb: OEachCallback, follow?: boolean): void;
export default each;

export interface OFindCallback {
    (key: string, value: any, index: number): boolean;
}
/**
 * Find the key matching the callback evaluation
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 2 } };
 *
 * find(a, (key, value) => {
 *   return value === 2;
 * }); // => undefined
 *
 * find(a, (key, value) => {
 *   return value === 2;
 * }, true); // => 'b.c'
 * ```
 *
 * @throws Error
 *
 * @since 1.0.0
 * @version 2.0.0
 */
declare function find(obj: OObject, cb: OFindCallback, follow?: boolean): string | undefined;
export default find;

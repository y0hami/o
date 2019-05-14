export interface OSortElement {
    key: string;
    value: any;
}
export interface OSortCallback {
    (firstEl: OSortElement, secondEl: OSortElement): number;
}
/**
 * Sort an object via the callback evaluation
 *
 * @example
 * ```
 * const a = { a: 3, b: 7, c: 5, d: 9 };
 * const b = { a: 3, b: 7, c: 5, d: { e: 1 }, f: 9 };
 *
 * sort(a, (a, b) => {
 *  if (a.value < b.value) return -1;
 *  if (a.value > b.value) return 1;
 *  return 0;
 * }); // => { a: 3, c: 5, b: 7, d: 9 }
 *
 * sort(b, (a, b) => {
 *  if (a.value < b.value) return -1;
 *  if (a.value > b.value) return 1;
 *  return 0;
 * }, true); // => { d: { e: 1 }, a: 3, c: 5, b: 7, f: 9 }
 * ```
 *
 * @throws Error
 *
 * @since 1.0.0
 * @version 2.0.0
 */
declare function sort(obj: OObject, cb: OSortCallback, follow?: boolean): OObject;
export default sort;

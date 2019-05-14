/**
 * Get the key to the specified value in dot notation
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 2 } };
 *
 * keyOf(a, 2); // => undefined
 * keyOf(a, 2, true); // => 'b.c'
 * ```
 *
 * @throws Error
 *
 * @since 1.0.0
 * @version 2.0.0
 */
declare function keyOf(obj: OObject, value: any, follow?: boolean): string | undefined;
export default keyOf;

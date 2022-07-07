/**
 * Check if the specified arguments are objects.
 * Returns `true` only if ALL arguments assert true.
 *
 * @param args - The values to check
 * @returns Returns true if all values are objects and false if one or more are not
 *
 * @since 1.0.0
 * @version 3.0.0
 */
export default function is (...args: any[]): boolean {
  return args.every(obj =>
    typeof obj === 'object' &&
    obj instanceof Object &&
    obj.constructor === Object &&
    !Array.isArray(obj) &&
    obj !== null
  )
}

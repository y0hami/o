import { tokenize } from 'dot-notation-tokenizer'
import { ArgumentTypeError, GenericObject } from '../../utils/src'
import is from '../../is/src'
import empty from '../../empty/src'
import clone from '../../clone/src'

/**
 * Get the value from the path in the specified object
 *
 * @param object - The object to get from
 * @param path - The path to the key you want to get. Can use dot notation
 * @param defaultValue - The default value to return when no key exists
 * @returns The value at the key or default value if provided else undefined
 *
 * @throws ArgumentTypeError
 *
 * @since 1.0.0
 * @version 3.0.0
 */

export default function get <T extends GenericObject, Result extends any> (object: T, path: string, defaultValue: any = undefined): Result {
  // Check if arguments are correct types
  if (!is(object)) throw new ArgumentTypeError('Object', object)
  if (typeof path !== 'string') throw new ArgumentTypeError('String', path)
  if (path === '') throw new ArgumentTypeError('non empty String', path)

  if (empty(object)) return defaultValue

  const tokens = tokenize(path)
  let currentValue: any = clone(object)

  tokens.forEach(token => {
    if (currentValue === undefined) return

    if (token.kind === 'PROPERTY') {
      currentValue = currentValue[token.value] ?? undefined
    } else if (token.kind === 'ARRAY_INDEX') {
      if (Array.isArray(currentValue)) {
        currentValue = currentValue[token.value]
      } else {
        currentValue = undefined
      }
    }
  })

  return currentValue ?? defaultValue
}

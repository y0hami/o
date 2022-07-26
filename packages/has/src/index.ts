import { tokenize } from 'dot-notation-tokenizer'
import { ArgumentTypeError, GenericObject } from '../../utils/src'
import is from '../../is/src'
import empty from '../../empty/src'
import clone from '../../clone/src'

/**
 * Check if an object has the specified path.
 * If the path exists but the value is undefined it
 * will still return true.
 *
 * @param object - The object to check
 * @param path - The path to the key you want to check. Can use dot notation
 * @returns Whether the path exists
 *
 * @throws ArgumentTypeError
 *
 * @since 1.0.0
 * @version 3.0.0
 */

export default function has <T extends GenericObject> (object: T, path: string): boolean {
  // Check if arguments are correct types
  if (!is(object)) throw new ArgumentTypeError('Object', object)
  if (typeof path !== 'string') throw new ArgumentTypeError('String', path)
  if (path === '') throw new ArgumentTypeError('non empty String', path)

  if (empty(object)) return false

  const tokens = tokenize(path)
  let hasKey = true
  let currentValue: any = clone(object)

  tokens.forEach(token => {
    if (!hasKey) return

    if (token.kind === 'PROPERTY') {
      if (Object.keys(currentValue).includes(token.value)) {
        currentValue = currentValue[token.value]
      } else {
        hasKey = false
      }
    } else if (token.kind === 'ARRAY_INDEX') {
      if (Array.isArray(currentValue)) {
        if (currentValue[token.value] !== undefined) {
          currentValue = currentValue[token.value]
        } else {
          hasKey = false
        }
      } else {
        hasKey = false
      }
    }
  })

  return hasKey
}

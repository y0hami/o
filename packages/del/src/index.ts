import { tokenize } from 'dot-notation-tokenizer'
import { ArgumentTypeError, GenericObject } from '../../utils/src'
import is from '../../is/src'
import clone from '../../clone/src'

/**
 * Delete the value at the specified path from the object.
 * Path is dot notation
 *
 * @param object - The object to delete from
 * @param path - The path to the key you want to delete. Can use dot notation
 * @returns The object with the property of path removed
 *
 * @throws ArgumentTypeError
 *
 * @since 1.0.0
 * @version 3.0.0
 */

export default function del <T extends GenericObject, Result extends Partial<T>> (object: T, path: string): Result {
  // Check if arguments are correct types
  if (!is(object)) throw new ArgumentTypeError('Object', object)
  if (typeof path !== 'string') throw new ArgumentTypeError('String', path)

  const cloned = clone(object)
  const tokens = tokenize(path)
  let currentValue: any = cloned
  let invalidPath = false

  tokens.forEach((token, index) => {
    if (invalidPath) return

    const key = token.value

    if (token.kind === 'PROPERTY' && !is(currentValue)) {
      invalidPath = true
      return
    }
    if (token.kind === 'ARRAY_INDEX' && !Array.isArray(currentValue)) {
      invalidPath = true
      return
    }

    if (index === tokens.length - 1) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete currentValue[key]
    } else {
      currentValue = currentValue[key]
    }
  })

  return cloned
}

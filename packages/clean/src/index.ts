import { GenericObject, ArgumentTypeError } from '../../utils/src'
import is from '../../is/src'
import clone from '../../clone/src'

export type CleanObject<T> = Omit<T, {
  [Key in keyof T]: T[Key] extends undefined | null
    ? Key
    : never
}[keyof T]>

export type DeepCleanObject<T> = CleanObject<{
  [Key in keyof T]: T[Key] extends GenericObject
    ? CleanObject<T[Key]>
    : Key
}>

/**
 * It recursively removes all keys with null or undefined values from an object.
 *
 * @param object - The object to clean
 * @returns The object without null and undefined properties
 *
 * @throws ArgumentTypeError
 *
 * @since 1.0.0
 * @version 3.0.0
 */
export default function clean <T extends GenericObject> (object: T): DeepCleanObject<T> {
  if (!is(object)) throw new ArgumentTypeError('Object', object)

  const result: any = clone(object)

  Object.keys(result).forEach(key => {
    const value = result[key]
    if (is(value)) result[key] = clean(value)
    else if (value === null || value === undefined) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete result[key]
    }
  })

  return result
}

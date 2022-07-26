import { GenericObject, ArgumentTypeError } from '../../utils/src'
import is from '../../is/src'
import clone from '../../clone/src'

export type ShallowMerged<T, S> = {
  [Key in keyof Omit<T, keyof S>]: T[Key]
} & {
  [Key in keyof S]: S[Key]
}

/**
 * Merge two or more objects into one with the most right having
 * the highest priority.
 *
 * @param target - The object to merge into
 * @param source - The object to merge into the target
 * @returns The objects merged together
 *
 * @throws ArgumentTypeError
 *
 * @since 2.1.0
 * @version 3.0.0
 */
export default function shallowMerge <T extends GenericObject, S extends GenericObject> (target: T, source: S): ShallowMerged<T, S> {
  // Check if all arguments provided are objects
  if (!is(target)) throw new ArgumentTypeError('Object', target)
  if (!is(source)) throw new ArgumentTypeError('Object', source)

  // Use the built in Object.assign function
  return Object.assign(clone(target), clone(source))
}

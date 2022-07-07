import { GenericObject, IsObject, ArgumentTypeError } from 'o.utils'
import is from 'o.is'
import shallowMerge from 'o.shallowmerge'
import deflate from 'o.deflate'
import inflate from 'o.inflate'
import clone from 'o.clone'

type DeepMerge<T, S> = {
  [Key in keyof T]: Key extends keyof S
    ? (IsObject<T[Key]> & IsObject<S[Key]>) extends true
        ? DeepMerge<T[Key], S[Key]>
        : S[Key]
    : T[Key]
} & S

/**
 * Merge source into target with source having the highest priority.
 * If you want a shallow merge (1 deep) use o.shallowMerge
 *
 * @see {@link o.shallowMerge}
 *
 * @param target - The object to merge into
 * @param source - The object to merge into the target
 * @returns The objects merged together
 *
 * @throws ArgumentTypeError
 *
 * @since 1.0.0
 * @version 3.0.0
 */
export default function merge <T extends GenericObject, S extends GenericObject> (target: T, source: S): DeepMerge<T, S> {
  // Check all arguments are objects
  if (!is(target)) throw new ArgumentTypeError('Object', target)
  if (!is(source)) throw new ArgumentTypeError('Object', source)

  // Deflate each object so they are only one deep, this skips the process of looping over keys
  // and checking for objects etc. We can then just use the shallowMerge function and then inflate
  // the resulting object which will result with our deep merged object
  return inflate(shallowMerge(
    deflate(clone(target)),
    deflate(clone(source))
  ))
}

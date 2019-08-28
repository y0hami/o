// o
import { valid, defaults } from './util'
import clone from './clone'
import deflate from './deflate'
import { KeysOptions, OObject } from './types'

// default options
export const DefaultOptions: KeysOptions = {
  follow: false
}

/**
 * Get the keys of the specified object (different to Object.keys
 * because Object.keys can't follow deep objects)
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 2, d: { e: 3 } } };
 *
 * keys(a); // => [ 'a', 'b' ]
 * keys(a, true); // => [ 'a', 'b.c', 'b.d.e' ]
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function keys (obj: OObject, options: KeysOptions = DefaultOptions): string[] {
  // extract options
  const {
    follow
  } = (defaults(DefaultOptions, options) as KeysOptions)

  // check if the args specified are the correct type
  if (!valid(obj)) throw new TypeError(`Expected Object, got ${typeof obj} ${obj}`)
  if (typeof follow !== 'boolean') throw new TypeError(`Expected Boolean, got ${typeof follow} ${follow}`)

  // clone the object so we can deflate it if we need to
  let cloned = clone(obj)

  // if follow is true
  if (follow) {
    // set the cloned object as the object but deflated
    cloned = deflate(cloned)
  }

  // use the native Object.keys function so its fast and return the result
  return Object.keys(cloned)
}

export default keys

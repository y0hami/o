// o
import { valid, defaults } from './util'
import empty from './empty'
import deflate from './deflate'
import { EachOptions, OObject, EachCallback } from './types'

// default options
export const DefaultOptions: EachOptions = {
  follow: false
}

/**
 * Foreach over an objects keys
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 2 } };
 *
 * each(a, (key, value) => {
 *   console.log(key, value);
 *   // => a  1
 *   // => b  { c: 2 }
 * });
 *
 * each(a, (key, value) => {
 *   console.log(key, value);
 *   // => a  1
 *   // => b.c  2
 * }, {
 *   follow: true,
 * });
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function each (obj: OObject, cb: EachCallback, options: EachOptions = DefaultOptions): void {
  // extract options
  const {
    follow
  } = (defaults(DefaultOptions, options) as EachOptions)

  // check if the args specified are the correct type
  if (!valid(obj)) throw new TypeError(`Expected Object, got ${typeof obj} ${obj}`)
  if (typeof cb !== 'function') throw new TypeError(`Expected Function, got ${typeof cb} ${cb}`)
  if (typeof follow !== 'boolean') throw new TypeError(`Expected Boolean, got ${typeof follow} ${follow}`)

  // if the object is empty just return false because it doesn't have anything
  if (empty(obj)) return

  // if follow is true deflate the object so we can simply
  // iterate over 1 layer of keys
  const iterableObject = follow
    ? deflate(obj)
    : obj

  // for each key run the callback function
  Object.keys(iterableObject)
    .forEach((key, index): void => cb(key, iterableObject[key], index))
}

export default each

// o
import { valid } from './util'
import shallowMerge from './shallowMerge'
import { DefaultsFunction, OObject } from './types'

/**
 * Same as `defaults` however the function returned will do a
 * shallow merge instead of a deep merge.
 *
 * @example
 * ```
 * const getDefaults = shallowDefaults({ a: 1, b: { c: 2, d: 3 } })
 *
 * getDefaults({ a: 2, b: { c: 3 } }) // => { a: 2, b: { c: 3 } }
 * ```
 *
 * @throws TypeError
 *
 * @since 2.3.0
 * @version 2.3.0
 */
function shallowDefaults (obj: OObject): DefaultsFunction {
  // check if the object specified is an object
  if (!valid(obj)) throw new TypeError(`Expected Object, got ${typeof obj} ${obj}`)

  // return the defaults user function
  return (...objects) => shallowMerge(obj, ...objects)
}

export default shallowDefaults

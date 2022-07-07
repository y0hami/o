import { GenericObject, ArgumentTypeError, isAsync } from 'o.utils'
import is from 'o.is'
import each from 'o.each'
import { FindCallback, FindResult } from './types'

/**
 * Return the first key/value which satisfies the callback evaluation.
 *
 * This is shallow keys only, for all keys includng deep use o.deepFind.
 *
 * For asynchronous callbacks use o.findAsync.
 *
 * @see {@link Array.find}
 * @see {@link o.deepFind}
 * @see {@link o.findAsync}
 *
 * @param object - The object to loop over
 * @param callback - The function to execute on all keys
 *
 * @throws ArgumentTypeError
 *
 * @since 1.0.0
 * @version 3.0.0
 */
export function find <T extends GenericObject, Result extends any> (object: T, callback: FindCallback): FindResult<Result> {
  // Check all arguments are the correct type
  if (!is(object)) throw new ArgumentTypeError('Object', object)
  if (typeof callback !== 'function') throw new ArgumentTypeError('Function', callback)
  if (isAsync(callback)) throw new ArgumentTypeError('Function', callback)

  let result: FindResult<Result> = { key: undefined, value: undefined, index: undefined, found: false }
  let found = false

  each(object, (key, value, index) => {
    if (!found && callback(key, value, index) as any === true) {
      result = { key, value, index, found: true }
      found = true
    }
  })

  return result
}

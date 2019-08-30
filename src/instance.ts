// o
import { valid } from './util'
import { OObject } from './types'
import OInstance from './OInstance'

/**
 * Create a new OInstance with the specified object
 *
 * @example
 * ```
 * const obj = instance({ a: 1, b: 2, c: 3, d: 4, e: 5 });
 *
 * obj.has('a'); // => true
 *
 * obj.set('a', 2)
 *  .get('a'); // => 2
 *
 * obj.del('b')
 *  .del('b');
 *  .del('c');
 *  .del('d');
 *
 * obj.object(); // => { a: 2, e: 5 }
 * obj.original(); // => { a: 1, b: 2, c: 3, d: 4, e: 5 }
 * ```
 *
 * @throws TypeError
 *
 * @since 2.2.1
 * @version 2.2.1
 */
function instance (obj: OObject): OInstance {
  // check if the args specified are the correct type
  if (!valid(obj)) throw new TypeError(`Expected Object, got ${typeof obj} ${obj}`)

  return new OInstance(obj)
}

export default instance

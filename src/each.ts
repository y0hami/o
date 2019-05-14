// o
import { valid } from './util';
import empty from './empty';
import deflate from './deflate';

export interface OEachCallback {
  (key: string, value: any, index: number): void;
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
 * }, true);
 * ```
 *
 * @throws Error
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function each(obj: OObject, cb: OEachCallback, follow: boolean = false): void {
  // check if the args specified are the correct type
  if (!valid(obj)) throw new Error('The argument `obj` is not an object');
  if (typeof cb !== 'function') throw new Error('The argument `cb` is not a function');
  if (typeof follow !== 'boolean') throw new Error('The argument `follow` is not a boolean');

  // if the object is empty just return false because it doesn't have anything
  if (empty(obj)) return;

  // if follow is true deflate the object so we can simply
  // iterate over 1 layer of keys
  const iterableObject = follow
    ? deflate(obj)
    : obj;

  // for each key run the callback function
  Object.keys(iterableObject)
    .forEach((key, index) => cb(key, iterableObject[key], index));
}

export default each;

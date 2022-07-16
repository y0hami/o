import { ArgumentTypeError } from '../../utils/src'

/**
 * Convert a dot notation string to an array of keys
 *
 * @param notation - The notation to convert
 * @returns Array of the notation keys
 *
 * @throws ArgumentTypeError
 *
 * @since 3.0.0
 * @version 1.0.0
 */
export function from (notation: string): string[] {
  if (typeof notation !== 'string') throw new ArgumentTypeError('String', notation)

  return notation.split(/\.(?<!\\\.)/g)
    .map(path => path.replace('\\.', '.'))
}

/**
 * Convert an array of keys to a dot notation string
 *
 * @param paths - Array of path keys
 * @returns The keys as a dot notation string
 *
 * @throws ArgumentTypeError
 *
 * @since 3.0.0
 * @version 1.0.0
 */
export function to (paths: string[]): string {
  if (!Array.isArray(paths)) throw new ArgumentTypeError('String[]', paths)
  if (!paths.every(key => typeof key === 'string')) throw new ArgumentTypeError('String[]', paths)

  return paths
    .map(path => path.replace(/\./g, '\\.'))
    .join('.')
}

export default {
  from,
  to
}

export {
  /* istanbul ignore next */ getProperty as get,
  /* istanbul ignore next */ setProperty as set,
  /* istanbul ignore next */ deleteProperty as del,
  /* istanbul ignore next */ hasProperty as has
} from 'dot-prop'

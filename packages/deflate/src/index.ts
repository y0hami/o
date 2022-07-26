import { tokensFromPropertyKeys, notationFromTokens } from 'dot-notation-tokenizer'
import { GenericObject, ArgumentTypeError } from '../../utils/src'
import is from '../../is/src'
import clean from '../../clean/src'

// https://stackoverflow.com/questions/66614528/flatten-object-with-custom-keys-in-typescript
type DeflatedObject<T extends GenericObject> = object extends T ? object : {
  [K in keyof T]-?: (x: NonNullable<T[K]> extends infer V ? V extends object ?
    V extends readonly any[] ? Pick<T, K> : DeflatedObject<V> extends infer FV ? ({
      [P in keyof FV as `${Extract<K, string | number>}.${Extract<P, string | number>}`]:
      FV[P] }) : never : Pick<T, K> : never
  ) => void } extends Record<keyof T, (y: infer O) => void> ?
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  O extends infer _U ? { [K in keyof O]: O[K] } : never : never

/*
 * Currently using GenericObject or user specified type
 * for return type as a TypeScript error prevents us using
 * the type defined above. Will change to a auto generated
 * type once the issue below is fixed.
 *
 * https://github.com/microsoft/TypeScript/issues/34933
 */

/**
 * Deflate the specified object into a one key deep object.
 * Like Array.flat but for objects. Deep object keys will be
 * converted to dot notation.
 *
 * @param object - The object to deflate
 * @returns The deflated object
 *
 * @throws ArgumentTypeError
 *
 * @since 1.0.0
 * @version 3.0.0
 */
export default function deflate <T extends GenericObject, DeflatedResult extends GenericObject> (object: T): DeflatedResult {
  if (!is(object)) throw new ArgumentTypeError('Object', object)

  // If the object is empty just return a new empty object
  if (Object.keys(object).length === 0) return {} as any as DeflatedResult

  const result: any = {}
  const burst = (obj: GenericObject, paths: string[] = []): void => {
    Object.keys(obj).forEach(key => {
      const currentPath = [...paths, key]
      const value = obj[key]

      // If the value is an object and the object is not empty
      if (is(value)) {
        if (Object.keys(value).length > 0) burst(value, currentPath)
      } else {
        // Set the value onto the result object with the key as dot notation
        const tokens = tokensFromPropertyKeys(currentPath)
        result[notationFromTokens(tokens)] = value
      }
    })
  }

  // Burst the specified object
  burst(clean(object))

  // Return the resulting deflated object
  return result
}

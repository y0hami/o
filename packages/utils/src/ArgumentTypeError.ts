import is from '../../is/src'
import { isAsync } from './IsAsync'

const typeName = (type: any): string => {
  if (Array.isArray(type)) return 'array'
  else if (typeof type === 'function') {
    if (isAsync(type)) return 'async function'
    return 'function'
  }
  return typeof type
}

const stringifyType = (type: any): string => {
  if (is(type)) return JSON.stringify(type)
  else if (Array.isArray(type)) return JSON.stringify(type)
  else if (typeof type === 'function') {
    if (isAsync(type)) return '(AsyncFunction)'
    return '(Function)'
  }
  return String(type)
}

export class ArgumentTypeError extends TypeError {
  constructor (expectedType: string, receivedType: any) {
    // istanbul ignore next
    super(`Expected ${expectedType}, got ${typeName(receivedType)} '${stringifyType(receivedType)}'`)
  }
}

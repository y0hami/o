---
---

# o.some
Loop over an object and evaluate each key/value like [`Array.some()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some). Returns `true` if at least 1 evaluates to `true`.

## Installation

```bash npm2yarn
npm install o.some
```

## Example
```typescript
const object = { a: 1, b: 'string', c: 3 }

const result1 = every(object, (key, value, index) => {
  return typeof value === 'number'
})
console.log(result1)

const result2 = every(object, (key, value, index) => {
  return typeof value === 'boolean'
})
console.log(result2)
```

```typescript title="Output"
true
false
```

## Usage

```typescript
import { some, someAsync, deepSome, deepSomeAsync } from 'o'

// or

import some from 'o.some'
import { some, someAsync, deepSome, deepSomeAsync } from 'o.some'

// Callback types
import { SomeCallback, AsyncSomeCallback } from 'o.some'
```

### some
`some` only loops over shallow keys, if you want to loop over deep objects use [`deepSome`](#deepsome).

#### Syntax
```typescript
some<T extends GenericObject>(object: T, callback: SomeCallback): boolean
```

#### Parameters
| Parameter  | Type          | Description                            | Required |
|------------|---------------|----------------------------------------|----------|
| object     | GenericObject | The object to loop over                | Yes      |
| callback   | SomeCallback  | The callback to call on each key/value | Yes      |

#### Return value
`true` if at least 1 evaluations return `true`, returns `false` if all evaluate to `false`

### someAsync
`someAsync` is used when you want to run async callback functions synchronously.

#### Syntax
```typescript
someAsync<T extends GenericObject>(object: T, callback: AsyncSomeCallback): Promise<boolean>
```

#### Parameters
| Parameter  | Type              | Description                            | Required |
|------------|-------------------|----------------------------------------|----------|
| object     | GenericObject     | The object to loop over                | Yes      |
| callback   | AsyncSomeCallback | The callback to call on each key/value | Yes      |

#### Return value
`true` if at least 1 evaluations return `true`, returns `false` if all evaluate to `false`

### deepSome
`deepSome` loops all keys including deep keys, if you want to loop over only shallow keys use [`some`](#some).

#### Syntax
```typescript
deepSome<T extends GenericObject>(object: T, callback: SomeCallback): boolean
```

#### Parameters
| Parameter  | Type          | Description                            | Required |
|------------|---------------|----------------------------------------|----------|
| object     | GenericObject | The object to loop over                | Yes      |
| callback   | SomeCallback  | The callback to call on each key/value | Yes      |

#### Return value
`true` if at least 1 evaluations return `true`, returns `false` if all evaluate to `false`

### deepSomeAsync
`deepSomeAsync` is used when you want to run async callback functions synchronously.

#### Syntax
```typescript
deepSomeAsync<T extends GenericObject>(object: T, callback: AsyncSomeCallback): Promise<boolean>
```

#### Parameters
| Parameter  | Type              | Description                            | Required |
|------------|-------------------|----------------------------------------|----------|
| object     | GenericObject     | The object to loop over                | Yes      |
| callback   | AsyncSomeCallback | The callback to call on each key/value | Yes      |

#### Return value
`true` if at least 1 evaluations return `true`, returns `false` if all evaluate to `false`

---
---

# o.every
Loop over an object and evaluate each key/value like [`Array.every()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every). If 1 or more key/values evaluates to `false` the return value will be `false`. All evaluations must be `true` to return `true`.

## Installation

```bash npm2yarn
npm install o.every
```

## Example
```typescript
const object = { a: 1, b: 2, c: 3 }

const result1 = every(object, (key, value, index) => {
  return typeof value === 'number'
})
console.log(result1)

const result2 = every(object, (key, value, index) => {
  return typeof value < 3
})
console.log(result2)
```

```typescript title="Output"
true
false
```

## Usage

```typescript
import { every, everyAsync, deepEvery, deepEveryAsync } from 'o'

// or

import every from 'o.every'
import { every, everyAsync, deepEvery, deepEveryAsync } from 'o.every'

// Callback types
import { EveryCallback, AsyncEveryCallback } from 'o.every'
```

### every
`every` only loops over shallow keys, if you want to loop over deep objects use [`deepEvery`](#deepevery).

#### Syntax
```typescript
every<T extends GenericObject>(object: T, callback: EveryCallback): boolean
```

#### Parameters
| Parameter  | Type          | Description                            | Required |
|------------|---------------|----------------------------------------|----------|
| object     | GenericObject | The object to loop over                | Yes      |
| callback   | EveryCallback | The callback to call on each key/value | Yes      |

#### Return value
`true` if all evaluations return `true`, if 1 or more return `false` then the return value will be `false`.

### everyAsync
`everyAsync` is used when you want to run async callback functions synchronously.

#### Syntax
```typescript
everyAsync<T extends GenericObject>(object: T, callback: AsyncEveryCallback): Promise<boolean>
```

#### Parameters
| Parameter  | Type               | Description                            | Required |
|------------|--------------------|----------------------------------------|----------|
| object     | GenericObject      | The object to loop over                | Yes      |
| callback   | AsyncEveryCallback | The callback to call on each key/value | Yes      |

#### Return value
`true` if all evaluations return `true`, if 1 or more return `false` then the return value will be `false`.

### deepEvery
`deepEvery` loops all keys including deep keys, if you want to loop over only shallow keys use [`every`](#every).

#### Syntax
```typescript
deepEvery<T extends GenericObject>(object: T, callback: EveryCallback): boolean
```

#### Parameters
| Parameter  | Type          | Description                            | Required |
|------------|---------------|----------------------------------------|----------|
| object     | GenericObject | The object to loop over                | Yes      |
| callback   | EveryCallback | The callback to call on each key/value | Yes      |

#### Return value
`true` if all evaluations return `true`, if 1 or more return `false` then the return value will be `false`.

### deepEveryAsync
`deepEveryAsync` is used when you want to run async callback functions synchronously.

#### Syntax
```typescript
deepEveryAsync<T extends GenericObject>(object: T, callback: AsyncEveryCallback): Promise<boolean>
```

#### Parameters
| Parameter  | Type               | Description                            | Required |
|------------|--------------------|----------------------------------------|----------|
| object     | GenericObject      | The object to loop over                | Yes      |
| callback   | AsyncEveryCallback | The callback to call on each key/value | Yes      |

#### Return value
`true` if all evaluations return `true`, if 1 or more return `false` then the return value will be `false`.

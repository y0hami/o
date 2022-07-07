---
---

# o.find
Loop over an object and evaluate each key/value like [`Array.find()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find). If the evaluation is `true` return the key/value.

## Installation

```bash npm2yarn
npm install o.find
```

## Example
```typescript
const object = { a: 1, b: 2, c: 3, d: 3 }

const result = find(object, (key, value, index) => {
  return value === 3
})
console.log(result)
```

```typescript title="Output"
{
  key: 'c',
  value: 3,
  index: 2,
  found: true
}
```

## Usage

```typescript
import { find, findAsync, deepFind, deepFindAsync } from 'o'

// or

import find from 'o.find'
import { find, findAsync, deepFind, deepFindAsync } from 'o.find'

// Callback types
import { FindCallback, AsyncFindCallback, FindResult } from 'o.find'
```

### find
`find` only loops over shallow keys, if you want to loop over deep objects use [`deepFind`](#deepfind).

#### Syntax
```typescript
find<T extends GenericObject, Result extends any>(object: T, callback: FindCallback): FindResult<Result>
```

#### Parameters
| Parameter  | Type          | Description                            | Required |
|------------|---------------|----------------------------------------|----------|
| object     | GenericObject | The object to loop over                | Yes      |
| callback   | FindCallback  | The callback to call on each key/value | Yes      |

#### Return value
`FindResult` which contains the key, value and index of the result and a useful `found` property which is `false` if no result is found.

### findAsync
`filterAsync` is used when you want to run async callback functions synchronously.

#### Syntax
```typescript
findAsync<T extends GenericObject, Result extends any>(object: T, callback: AsyncFindCallback): Promise<FindResult<Result>>
```

#### Parameters
| Parameter  | Type              | Description                            | Required |
|------------|-------------------|----------------------------------------|----------|
| object     | GenericObject     | The object to loop over                | Yes      |
| callback   | AsyncFindCallback | The callback to call on each key/value | Yes      |

#### Return value
`FindResult` which contains the key, value and index of the result and a useful `found` property which is `false` if no result is found.

### deepFind
`deepFind` loops all keys including deep keys, if you want to loop over only shallow keys use [`find`](#find).

#### Syntax
```typescript
deepFind<T extends GenericObject, Result extends any>(object: T, callback: FindCallback): FindResult<Result>
```

#### Parameters
| Parameter  | Type          | Description                            | Required |
|------------|---------------|----------------------------------------|----------|
| object     | GenericObject | The object to loop over                | Yes      |
| callback   | FindCallback  | The callback to call on each key/value | Yes      |

#### Return value
`FindResult` which contains the key, value and index of the result and a useful `found` property which is `false` if no result is found.

### deepFindAsync
`deepFindAsync` is used when you want to run async callback functions synchronously.

#### Syntax
```typescript
deepFindAsync<T extends GenericObject, Result extends any>(object: T, callback: AsyncFindCallback): Promise<FindResult<Result>>
```

#### Parameters
| Parameter  | Type              | Description                            | Required |
|------------|-------------------|----------------------------------------|----------|
| object     | GenericObject     | The object to loop over                | Yes      |
| callback   | AsyncFindCallback | The callback to call on each key/value | Yes      |

#### Return value
`FindResult` which contains the key, value and index of the result and a useful `found` property which is `false` if no result is found.

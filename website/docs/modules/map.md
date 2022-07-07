---
---

# o.map
Loop over an object and return an array of values produced by the callback like [`Array.map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map).

## Installation

```bash npm2yarn
npm install o.map
```

## Example
```typescript
const a = { a: 1, b: 2, c: 3 }
const resultA = map(a, (key, value, index) => {
  return value * index
})
console.log(resultA)

const b = { a: 1, b: { c: 2, d: 3 e: 4 } }
const resultB = map(a, (key, value, index) => {
  return value * index
})
console.log(resultB)

```

```typescript title="Output"
[0, 2, 6]
[0, 2, 6, 12]
```

## Usage

```typescript
import { map, mapAsync, deepMap, deepMapAsync } from 'o'

// or

import map from 'o.map'
import { map, mapAsync, deepMap, deepMapAsync } from 'o.map'

// Callback types
import { MapCallback, AsyncMapCallback } from 'o.map'
```

### map
`map` only loops over shallow keys, if you want to loop over deep objects use [`deepMap`](#deepmap).

#### Syntax
```typescript
map<T extends GenericObject, Return extends any>(object: T, callback: MapCallback<Return>): Return[]
```

#### Parameters
| Parameter  | Type          | Description                            | Required |
|------------|---------------|----------------------------------------|----------|
| object     | GenericObject | The object to loop over                | Yes      |
| callback   | MapCallback   | The callback to call on each key/value | Yes      |

#### Return value
An array of `Result` (defaults to `any`) which is returned from each callback.

### mapAsync
`mapAsync` is used when you want to run async callback functions synchronously.

#### Syntax
```typescript
mapAsync<T extends GenericObject, Return extends any>(object: T, callback: AsyncMapCallback<Return>): Promise<Return[]>
```

#### Parameters
| Parameter  | Type             | Description                            | Required |
|------------|------------------|----------------------------------------|----------|
| object     | GenericObject    | The object to loop over                | Yes      |
| callback   | AsyncMapCallback | The callback to call on each key/value | Yes      |

#### Return value
An array of `Result` (defaults to `any`) which is returned from each callback.

### deepMap
`deepMap` loops all keys including deep keys, if you want to loop over only shallow keys use [`map`](#map).

#### Syntax
```typescript
deepMap<T extends GenericObject, Return extends any>(object: T, callback: MapCallback<Return>): Return[]
```

#### Parameters
| Parameter  | Type          | Description                            | Required |
|------------|---------------|----------------------------------------|----------|
| object     | GenericObject | The object to loop over                | Yes      |
| callback   | MapCallback   | The callback to call on each key/value | Yes      |

#### Return value
An array of `Result` (defaults to `any`) which is returned from each callback.

### deepMapAsync
`deepMapAsync` is used when you want to run async callback functions synchronously.

#### Syntax
```typescript
deepMapAsync<T extends GenericObject, Return extends any>(object: T, callback: AsyncMapCallback<Return>): Promise<Return[]>
```

#### Parameters
| Parameter  | Type             | Description                            | Required |
|------------|------------------|----------------------------------------|----------|
| object     | GenericObject    | The object to loop over                | Yes      |
| callback   | AsyncMapCallback | The callback to call on each key/value | Yes      |

#### Return value
An array of `Result` (defaults to `any`) which is returned from each callback.

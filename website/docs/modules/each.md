---
---

# o.each
Loop over an object like [`Array.forEach()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

## Installation

```bash npm2yarn
npm install o.each
```

## Example
```typescript
const object = { a: 1, b: 2, c: 3 }

each(object, (key, value, index) => {
  console.log(key, value, index)
})
```

```typescript title="Output"
'a' 1 0
'b' 2 1
'c' 3 2
```

## Usage

```typescript
import { each, eachAsync, deepEach, deepEachAsync } from 'o'

// or

import each from 'o.each'
import { each, eachAsync, deepEach, deepEachAsync } from 'o.each'

// Callback types
import { EachCallback, AsyncEachCallback } from 'o.each'
```

### each
`each` only loops over shallow keys, if you want to loop over deep objects use [`deepEach`](#deepeach).

#### Syntax
```typescript
each<T extends GenericObject>(object: T, callback: EachCallback): void
```

#### Parameters
| Parameter  | Type          | Description                            | Required |
|------------|---------------|----------------------------------------|----------|
| object     | GenericObject | The object to loop over                | Yes      |
| callback   | EachCallback  | The callback to call on each key/value | Yes      |

#### Return value
Nothing, if you want a return value try [o.map](/modules/map).

### eachAsync
`eachAsync` is used when you want to run async callback functions synchronously.

#### Syntax
```typescript
eachAsync<T extends GenericObject>(object: T, callback: AsyncEachCallback): Promise<void>
```

#### Parameters
| Parameter  | Type              | Description                            | Required |
|------------|-------------------|----------------------------------------|----------|
| object     | GenericObject     | The object to loop over                | Yes      |
| callback   | AsyncEachCallback | The callback to call on each key/value | Yes      |

#### Return value
Nothing, if you want a return value try [o.mapAsync](/modules/map#mapasync).

### deepEach
`deepEach` loops all keys including deep keys, if you want to loop over only shallow keys use [`each`](#each).

#### Syntax
```typescript
deepEach<T extends GenericObject>(object: T, callback: EachCallback): void
```

#### Parameters
| Parameter  | Type          | Description                            | Required |
|------------|---------------|----------------------------------------|----------|
| object     | GenericObject | The object to loop over                | Yes      |
| callback   | EachCallback  | The callback to call on each key/value | Yes      |

#### Return value
Nothing, if you want a return value try [o.deepMap](/modules/map#deepmap).

### deepEachAsync
`deepEachAsync` is used when you want to run async callback functions synchronously.

#### Syntax
```typescript
deepEachAsync<T extends GenericObject>(object: T, callback: AsyncEachCallback): Promise<void>
```

#### Parameters
| Parameter  | Type              | Description                            | Required |
|------------|-------------------|----------------------------------------|----------|
| object     | GenericObject     | The object to loop over                | Yes      |
| callback   | AsyncEachCallback | The callback to call on each key/value | Yes      |

#### Return value
Nothing, if you want a return value try [o.deepMapAsync](/modules/map#deepmapasync).

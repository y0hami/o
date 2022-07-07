---
---

# o.filter
Loop over an object and evaluate each key/value like [`Array.filter()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter). If the evaluation is `false` the key/value will be removed from the return value.

## Installation

```bash npm2yarn
npm install o.filter
```

## Example
```typescript
const object = { a: 1, b: 2, c: 3 }

const result = filter(object, (key, value, index) => {
  return value < 3
})
console.log(result)
```

```typescript title="Output"
{ a: 1, b: 2 }
```

## Usage

```typescript
import { filter, filterAsync, deepFilter, deepFilterAsync } from 'o'

// or

import filter from 'o.filter'
import { filter, filterAsync, deepFilter, deepFilterAsync } from 'o.filter'

// Callback types
import { FilterCallback, AsyncFilterCallback } from 'o.filter'
```

### filter
`filter` only loops over shallow keys, if you want to loop over deep objects use [`deepFilter`](#deepfilter).

#### Syntax
```typescript
filter<T extends GenericObject, Result extends Partial<T>>(object: T, callback: FilterCallback): Result
```

#### Parameters
| Parameter  | Type           | Description                            | Required |
|------------|----------------|----------------------------------------|----------|
| object     | GenericObject  | The object to loop over                | Yes      |
| callback   | FilterCallback | The callback to call on each key/value | Yes      |

#### Return value
An object with any key/value which evaluated to `false` removed.

### filterAsync
`filterAsync` is used when you want to run async callback functions synchronously.

#### Syntax
```typescript
filterAsync<T extends GenericObject, Result extends Partial<T>>(object: T, callback: AsyncFilterCallback): Promise<Result>
```

#### Parameters
| Parameter  | Type                | Description                            | Required |
|------------|---------------------|----------------------------------------|----------|
| object     | GenericObject       | The object to loop over                | Yes      |
| callback   | AsyncFilterCallback | The callback to call on each key/value | Yes      |

#### Return value
An object with any key/value which evaluated to `false` removed.

### deepFilter
`deepFilter` loops all keys including deep keys, if you want to loop over only shallow keys use [`filter`](#filter).

#### Syntax
```typescript
deepFilter<T extends GenericObject, Result extends Partial<T>>(object: T, callback: FilterCallback): Result
```

#### Parameters
| Parameter  | Type           | Description                            | Required |
|------------|----------------|----------------------------------------|----------|
| object     | GenericObject  | The object to loop over                | Yes      |
| callback   | FilterCallback | The callback to call on each key/value | Yes      |

#### Return value
An object with any key/value which evaluated to `false` removed.

### deepFilterAsync
`deepFilterAsync` is used when you want to run async callback functions synchronously.

#### Syntax
```typescript
deepFilterAsync<T extends GenericObject, Result extends Partial<T>>(object: T, callback: AsyncFilterCallback): Promise<Result>
```

#### Parameters
| Parameter  | Type                | Description                            | Required |
|------------|---------------------|----------------------------------------|----------|
| object     | GenericObject       | The object to loop over                | Yes      |
| callback   | AsyncFilterCallback | The callback to call on each key/value | Yes      |

#### Return value
An object with any key/value which evaluated to `false` removed.

---
---

# o.deflate
Deflate an object into a one key deep object. Like [`Array.flat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) but for objects.

Deep object keys will be converted to dot notation.

To reverse this aka "inflate" the object back to its original use [`o.inflate`](/modules/inflate)

## Installation

```bash npm2yarn
npm install o.deflate
```

## Example
```typescript
const object = {
  a: {
    b: {
      c: 1,
      d: 2,
      e: 3
    }
  },
  f: 4,
  g: 5
}

const deflated = deflate(object)
console.log(deflated)
```

```typescript title="Output"
{
  'a.b.c': 1,
  'a.b.d': 2,
  'a.b.e': 3,
  f: 4,
  g: 5
}
```

## Usage

```typescript
import { deflate } from 'o'

// or

import deflate from 'o.deflate'
```

### deflate

#### Syntax
```typescript
deflate<T extends GenericObject, DeflatedResult extends GenericObject>(object: T): DeflatedResult
```

#### Parameters
| Parameter | Type          | Description           | Required |
|-----------|---------------|-----------------------|----------|
| object    | GenericObject | The object to deflate | Yes      |


#### Return value
The deflated (one deep) object.

---
---

# o.inflate
Inflate an object into a deep object. This is the reverse of [`o.deflate`](/modules/deflate).

## Installation

```bash npm2yarn
npm install o.inflate
```

## Example
```typescript
const object = {
  'a.b.c': 1,
  'a.b.d': 2,
  'a.b.e': 3,
  f: 4,
  g: 5
}

const inflated = inflate(object)
console.log(inflated)
```

```typescript title="Output"
{
  a: {
    b: {
      c: 2,
      d: 2,
      e: 3
    }
  },
  f: 4,
  g: 5
}
```

## Usage

```typescript
import { inflate } from 'o'

// or

import inflate from 'o.inflate'
```

### inflate

#### Syntax
```typescript
inflate<T extends GenericObject, InflatedResult extends GenericObject>(object: T): InflatedResult
```

#### Parameters
| Parameter | Type          | Description           | Required |
|-----------|---------------|-----------------------|----------|
| object    | GenericObject | The object to inflate | Yes      |


#### Return value
The inflated object

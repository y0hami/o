---
---

# o.deepkeys
Get an array of the objects keys. Same as [`Object.keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) however as the name suggests it includes all deep objects.

## Installation

```bash npm2yarn
npm install o.deepkeys
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

const keys = deepKeys(object)
console.log(keys)
```

```typescript title="Output"
['a.b.c', 'a.b.d', 'a.b.e', 'f', 'g']
```

## Usage

```typescript
import { deepKeys } from 'o'

// or

import deepKeys from 'o.deepkeys'
```

### deepKeys

#### Syntax
```typescript
deepKeys(object: GenericObject): ObjectKey[]
```

#### Parameters
| Parameter | Type          | Description                 | Required |
|-----------|---------------|-----------------------------|----------|
| object    | GenericObject | The object to get keys from | Yes      |

#### Return value
An array of the objects keys including all deep objects keys.

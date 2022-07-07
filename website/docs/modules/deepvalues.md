---
---

# o.deepvalues
Get an array of the objects values. Same as [`Object.values()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values) however as the name suggests it includes all deep objects.

## Installation

```bash npm2yarn
npm install o.deepvalues
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

const values = deepValues(object)
console.log(values)
```

```typescript title="Output"
[1, 2, 3, 4, 5]
```

## Usage

```typescript
import { deepValues } from 'o'

// or

import deepValues from 'o.deepvalues'
```

### deepKeys

#### Syntax
```typescript
deepValues(object: GenericObject): any[]
```

#### Parameters
| Parameter | Type          | Description                       | Required |
|-----------|---------------|-----------------------------------|----------|
| object    | GenericObject | The object to get the values from | Yes      |

#### Return value
An array of the objects values including all deep objects values.

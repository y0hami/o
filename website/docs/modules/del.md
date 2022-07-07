---
---

# o.del
Delete the value at the specified path from the object.

Path is dot notation

## Installation

```bash npm2yarn
npm install o.del
```

## Example
```typescript
const object = { a: 1, b: { c: { d: 2, e: 3 } } }

const result = del(object, 'b.c.d')
console.log(result)
```

```typescript title="Output"
{
  a: 1,
  b: {
    c: {
      e: 3
    }
  }
}
```

## Usage

```typescript
import { del } from 'o'

// or

import del from 'o.del'
```

### del

#### Syntax
```typescript
del<T extends GenericObject, Result extends Partial<T>>(object: T, path: string): Result
```

#### Parameters
| Parameter  | Type          | Description                        | Required |
|------------|---------------|------------------------------------|----------|
| object     | GenericObject | The object to delete from          | Yes      |
| path       | string        | Path to the key you want to delete | Yes      |

#### Return value
The object without the deleted key.

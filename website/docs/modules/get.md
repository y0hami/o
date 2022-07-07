---
---

# o.get
Get the value from the path in the specified object.

Path is dot notation.

## Installation

```bash npm2yarn
npm install o.get
```

## Example
```typescript
const object = { a: 1, b: { c: { d: 2 } } }

const a = get(object, 'a')
console.log(a)

const b = get(object, 'b')
console.log(b)

const d = get(object, 'b.c.d')
console.log(d)

const e = get(object, 'b.c.e')
console.log(e)
```

```typescript title="Output"
1
{ c: { d: 2 } }
2
undefined
```

## Usage

```typescript
import { get } from 'o'

// or

import get from 'o.get'
```

### from

#### Syntax
```typescript
get<T extends GenericObject, Result extends any>(object: T, path: string, defaultValue: any = undefined): Result
```

#### Parameters
| Parameter    | Type          | Description                              | Required |
|--------------|---------------|------------------------------------------|----------|
| object       | GenericObject | The object fetch from                    | Yes      |
| path         | string        | Path to the key you want to get          | Yes      |
| defaultValue | any           | The value to return if key doesn't exist | No       |

#### Return value
The value at the specified key path or the `defaultValue`

---
---

# o.set
Set the value at the path in the specified object.

Path is dot notation.

## Installation

```bash npm2yarn
npm install o.set
```

## Example
```typescript
const object = { a: 1, b: 2, c: { d: 3 } }

const a = set(object, 'a', 2)
console.log(a)

const b = set(object, 'c.d', 4)
console.log(b)

console.log(object)
```

```typescript title="Output"
{ a: 2, b: 2, c: { d: 3 } }
{ a: 1, b: 2, c: { d: 4 } }
{ a: 1, b: 2, c: { d: 3 } }
```

## Usage

```typescript
import { set } from 'o'

// or

import set from 'o.set'
```

### set

#### Syntax
```typescript
set<T extends GenericObject, Result extends T>(object: T, path: string, value: any): Result
```

#### Parameters
| Parameter | Type          | Description                     | Required |
|-----------|---------------|---------------------------------|----------|
| object    | GenericObject | The object set in               | Yes      |
| path      | string        | Path to the key you want to set | Yes      |
| value     | any           | The value to set                | Yes      |

#### Return value
The object with the new set property

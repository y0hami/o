---
---

# o.has
Check if an object has a value at the specified key.

Path is dot notation.

## Installation

```bash npm2yarn
npm install o.has
```

## Example
```typescript
const object = { a: 1, b: { c: { d: 2 } } }

const a = has(object, 'a')
console.log(a)

const b = has(object, 'b')
console.log(b)

const e = has(object, 'b.c.e')
console.log(e)
```

```typescript title="Output"
true
true
false
```

## Usage

```typescript
import { has } from 'o'

// or

import has from 'o.has'
```

### from

#### Syntax
```typescript
has<T extends GenericObject>(object: T, path: string): boolean
```

#### Parameters
| Parameter    | Type          | Description                       | Required |
|--------------|---------------|-----------------------------------|----------|
| object       | GenericObject | The object check                  | Yes      |
| path         | string        | Path to the key you want to check | Yes      |

#### Return value
`true` if the key exists, `false` if the key does not exist

---
---

# o.empty
Check if an object is empty.

## Installation

```bash npm2yarn
npm install o.empty
```

## Example
```typescript
const a = empty({})
const b = empty({ a: 1 })

console.log(a)
console.log(b)
```

```typescript title="Output"
true
false
```

## Usage

```typescript
import { empty } from 'o'

// or

import empty from 'o.empty'
```

### empty

#### Syntax
```typescript
empty(object: GenericObject): boolean
```

#### Parameters
| Parameter | Type          | Description         | Required |
|-----------|---------------|---------------------|----------|
| object    | GenericObject | The object to check | Yes      |

#### Return value
`true` when the object is empty, `false` when the object is not empty.

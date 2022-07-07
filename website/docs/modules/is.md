---
---

# o.is
Check if a value is an object.

## Installation

```bash npm2yarn
npm install o.is
```

## Example
```typescript
const a = is({})
console.log(a)

const b = is(1)
console.log(b)

const c = is('test')
console.log(c)

const d = is(new Error())
console.log(d)
```

```typescript title="Output"
true
false
false
false
```

## Usage

```typescript
import { is } from 'o'

// or

import is from 'o.is'
```

### is

#### Syntax
```typescript
is(...args: any[]): boolean
```

#### Parameters
| Parameter | Type  | Description     | Required |
|-----------|-------|-----------------|----------|
| args      | any[] | Values to check | Yes      |

#### Return value
`true` if all values are objects, `false` if 1 or more is not an object.

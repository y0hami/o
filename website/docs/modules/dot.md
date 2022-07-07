---
---

# o.dot
Delete the value at the specified path from the object.

Path is dot notation

## Installation

```bash npm2yarn
npm install o.dot
```

## Example
```typescript
const keys = from('a.b.c\.d.e')
console.log(keys)

const path = to(keys)
console.log(path)
```

```typescript title="Output"
['a', 'b', 'c.d', 'e']
'a.b.c\.d.e'
```

## Usage

```typescript
import { dot } from 'o'

// or

import dot from 'o.dot'
import { from, to } from 'o.dot'
```

### from

#### Syntax
```typescript
from(notation: string): string[]
```

#### Parameters
| Parameter  | Type          | Description                                                | Required |
|------------|---------------|------------------------------------------------------------|----------|
| notation   | string        | The dot notation string you want to convert to a key array | Yes      |

#### Return value
An array of the path keys.

### to

#### Syntax
```typescript
to(paths: string[]): string
```

#### Parameters
#### Parameters
| Parameter  | Type          | Description                                                | Required |
|------------|---------------|------------------------------------------------------------|----------|
| paths      | string[]      | The path keys you want to convert to a dot notation string | Yes      |

#### Return value
The dot notation string of the keys provided.

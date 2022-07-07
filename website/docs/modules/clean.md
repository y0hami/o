---
---

# o.clean
Remove all keys with `null` or `undefined` values from an object.

## Installation

```bash npm2yarn
npm install o.clean
```

## Example
```typescript
const object = { a: 1, b: 2, c: null, d: 4, e: undefined }

const cleaned = clean(object)
console.log(cleaned)
```

```typescript title="Output"
{ a: 1, b: 2, d: 4 }
```

## Usage

```typescript
import { clean } from 'o'

// or

import clean from 'o.clean'
```

### clean

#### Syntax
```typescript
clean(object: GenericObject): CleanObject
```

#### Parameters
| Parameter | Type          | Description         | Required |
|-----------|---------------|---------------------|----------|
| object    | GenericObject | The object to clean | Yes      |

#### Return value
The object without null or undefined values.

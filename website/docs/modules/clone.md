---
---

# o.clone
Create a copy of an object. Modifying the original object will not manipulate the cloned returned value and vice versa.

## Installation

```bash npm2yarn
npm install o.clone
```

## Example
```typescript
const object = { a: 'object', b: 'object' }
const cloned = clone(object)

cloned.a = 'changed'

console.log(object)
console.log(cloned)
```

```typescript title="Output"
{ a: 'object', b: 'object' }
{ a: 'changed', b: 'object' }
```

## Usage

```typescript
import { clone } from 'o'

// or

import clone from 'o.clone'
```

### clone

#### Syntax
```typescript
clone(object: GenericObject): typeof object
```

#### Parameters
| Parameter | Type          | Description         | Required |
|-----------|---------------|---------------------|----------|
| object    | GenericObject | The object to clone | Yes      |

#### Return value
The same object but without reference.

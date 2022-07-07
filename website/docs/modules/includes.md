---
---

# o.includes
Check if the object contains the specified value.

## Installation

```bash npm2yarn
npm install o.includes
```

## Example
```typescript
const object = { a: 1, b: 'test', c: { d: 2 } }

const has1 = includes(object, 1)
console.log(has1)

const has2 = includes(object, 2)
console.log(has2)

const has2deep = deepIncludes(object, 2)
console.log(has2deep)

const hastest = includes(object, 'test')
console.log(hastest)
```

```typescript title="Output"
true
false
true
true
```

## Usage

```typescript
import { includes, deepIncludes } from 'o'

// or

import includes from 'o.includes'
import { includes, deepIncludes } from 'o.includes'
```

### includes
`includes` will only check shallow key/values, if you want to also check deep objects use [`deepIncludes`](#deepincludes).

#### Syntax
```typescript
includes<T extends GenericObject>(object: T, value: any): boolean
```

#### Parameters
| Parameter  | Type          | Description            | Required |
|------------|---------------|------------------------|----------|
| object     | GenericObject | Object to check        | Yes      |
| value      | any           | The value to check for | Yes      |

#### Return value
`true` if the object contains the specified value and `false` if not

### deepIncludes
`deepIncludes` will check deep objects, if you only want to check shallow keys use [`includes`](#includes).

#### Syntax
```typescript
deepIncludes<T extends GenericObject>(object: T, value: any): boolean
```

#### Parameters
| Parameter  | Type          | Description            | Required |
|------------|---------------|------------------------|----------|
| object     | GenericObject | Object to check        | Yes      |
| value      | any           | The value to check for | Yes      |

#### Return value
`true` if the object contains the specified value and `false` if not

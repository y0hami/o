---
---

# o.keyof
Get the key of which a value resides.

## Installation

```bash npm2yarn
npm install o.keyof
```

## Example
```typescript
const object = { a: 1, b: { c: 2 } }

const a = keyOf(object, 1)
console.log(a)

const b = keyOf(object, 2)
console.log(b)

const c = deepKeyOf(object, 2)
console.log(c)
```

```typescript title="Output"
'a'
undefined
'b.c'
```

## Usage

```typescript
import { keyOf, deepKeyOf } from 'o'

// or

import keyOf from 'o.keyof'
import { keyOf, deepKeyOf } from 'o.keyof'
```

### keyOf
`keyOf` will only check shallow key/values, if you want to also check deep objects use [`deepKeyOf`](#deepkeyof).

#### Syntax
```typescript
keyOf<T extends GenericObject>(object: T, value: any): string | undefined
```

#### Parameters
| Parameter  | Type          | Description            | Required |
|------------|---------------|------------------------|----------|
| object     | GenericObject | Object to check        | Yes      |
| value      | any           | The value to check for | Yes      |

#### Return value
If the value is found the key will be returned else `undefined`

### deepKeyOf
`deepKeyOf` will check deep objects, if you only want to check shallow keys use [`keyOf`](#keyof).

#### Syntax
```typescript
deepKeyOf<T extends GenericObject>(object: T, value: any): string | undefined
```

#### Parameters
| Parameter  | Type          | Description            | Required |
|------------|---------------|------------------------|----------|
| object     | GenericObject | Object to check        | Yes      |
| value      | any           | The value to check for | Yes      |

#### Return value
If the value is found the key will be returned else `undefined`

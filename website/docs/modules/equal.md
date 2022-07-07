---
---

# o.equal
Check if multiple objects are equal to each other.

## Installation

```bash npm2yarn
npm install o.equal
```

## Example
```typescript
const a = { a: 1, b: 2, c: 3 }
const b = { a: 1, b: 2, c: 3 }
const c = { a: 2, b: 2, c: 2 }
const d = { a: 1, b: { c: 1 } }
const e = { a: 1, b: { c: 2 } }

const abEqual = equal(a, b)
console.log(abEqual)

const abcEqual = equal(a, b, c)
console.log(abcEqual)

const deEqual = equal(de)
console.log(deEqual)

const deDeepEqual = deepEqual(de)
console.log(deDeepEqual)
```

```typescript title="Output"
true
false
true
false
```

## Usage

```typescript
import { equal, deepEqual } from 'o'

// or

import equal from 'o.equal'
import { equal, deepEqual } from 'o.equal'
```

### equal
`equal` will only check shallow key/values, if you want to also check deep objects use [`deepEqual`](#deepequal).

#### Syntax
```typescript
equal(...objects: GenericObject[]): boolean
```

#### Parameters
| Parameter  | Type            | Description      | Required |
|------------|-----------------|------------------|----------|
| objects    | GenericObject[] | Objects to check | Yes      |

#### Return value
`true` if all objects are equal, `false` if 1 or more are not equal.

### deepEqual
`deepEqual` will check deep objects, if you only want to check shallow keys use [`equal`](#equal).

#### Syntax
```typescript
deepEqual(...objects: GenericObject[]): boolean
```

#### Parameters
| Parameter  | Type            | Description      | Required |
|------------|-----------------|------------------|----------|
| objects    | GenericObject[] | Objects to check | Yes      |

#### Return value
`true` if all objects are equal, `false` if 1 or more are not equal.

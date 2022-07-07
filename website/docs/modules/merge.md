---
---

# o.merge
Merge 2 objects together. Like [`Object.assign`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) but merges deep objects too.

## Installation

```bash npm2yarn
npm install o.merge
```

## Example
```typescript
const a = { a: 1, b: 2, c: { d: 3 } }
const b = { a: 2, e: 4, c: { f: 5 } }

const merged = merge(a, b)
console.log(merged)

a.a = 3
b.d = 5

console.log(merged)
```

```typescript title="Output"
{ a: 2, b: 2, c: { d: 3, f: 5 }, e: 4 }
{ a: 2, b: 2, c: { d: 3, f: 5 }, e: 4 }
```

## Usage

```typescript
import { merge } from 'o'

// or

import merge from 'o.merge'
```

### merge

#### Syntax
```typescript
merge<T extends GenericObject, S extends GenericObject>(target: T, source: S): DeepMerge<T, S>
```

#### Parameters
| Parameter | Type          | Description       | Required |
|-----------|---------------|-------------------|----------|
| target    | GenericObject | The target object | Yes      |
| source    | GenericObject | The source object | Yes      |

#### Return value
An object with the source object merged onto the target

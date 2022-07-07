---
---

# o.shallowmerge
Merge 2 objects together. This is an alias of [`Object.assign`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) however it also clones both the target and source so they will not be modified.

This only merges shallow key/values if you want to also merge deep objects use [`o.merge`](/modules/merge).

## Installation

```bash npm2yarn
npm install o.shallowmerge
```

## Example
```typescript
const a = { a: 1, b: 2, c: { d: 3 } }
const b = { a: 2, e: 4, c: { f: 5 } }

const merged = shallowMerge(a, b)
console.log(merged)

a.a = 3
b.d = 5

console.log(merged)
```

```typescript title="Output"
{ a: 2, b: 2, c: { f: 5 }, e: 4 }
{ a: 2, b: 2, c: { f: 5 }, e: 4 }
```

## Usage

```typescript
import { shallowMerge } from 'o'

// or

import shallowMerge from 'o.shallowmerge'
```

### shallowMerge

#### Syntax
```typescript
shallowMerge<T extends GenericObject, S extends GenericObject>(target: T, source: S): ShallowMerged<T, S>
```

#### Parameters
| Parameter | Type          | Description       | Required |
|-----------|---------------|-------------------|----------|
| target    | GenericObject | The target object | Yes      |
| source    | GenericObject | The source object | Yes      |

#### Return value
An object with the source object merged onto the target

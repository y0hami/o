---
sidebar_position: 1
slug: /
---

# Introduction

ojs is a utility library with a collection of modules to make working with objects easier.

We've attempted to strictly type all module functions as best as we can. We will improve these as new type features are introduced to TypeScript.

## Getting Started

You can use ojs as one package which exports all modules allowing you to use all functions or you can install each module individually so you only install what you need.

### Installing all modules

```bash npm2yarn
npm install o
```

### Installing individual modules

```bash npm2yarn
npm install o.merge o.each ...
```
You can find a list of all modules [here](/modules).

## Basic Usage

You can use ojs in JavaScript or TypeScript however you will get full benefits via TypeScript.

### NodeJS

#### JavaScript (CJS)
```javascript
const o = require('o')

// Specific functions
const { each, merge, is } = require('o')
```

#### TypeScript / JavaScript (ESM)
```typescript
import * as o from 'o'

// Specific functions
import { each, merge, is } from 'o'
```

### Browser

#### ES6

```html
<script type="module" src="./o.min.js" />
```
or
```html
<script type="text/javascript">
  import './o.min.js';
</script>
```

#### CDN
```html
<script
  type="application/javascript"
  src="https://cdn.jsdelivr.net/npm/o@3.0.0/dist/index.min.js"
/>
```

Now you're setup you can learn about all of the modules and their useful functions.

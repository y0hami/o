# o

### Syntax
o(target: any)

### Methods
- **.empty(): boolean** check if the object is empty
- **.is(): boolean** check whether the specified value is an object
- **.has(...path: string): boolean** check if the object has the properties (supports dot notation)
- **.get(path: string[, defaultValue: any = undefined]): any** get the value at the specified path. Will return default value if it doesn't exist (supports dot notation)
- **.set(path: string, value: any)** *object* set the object path with the new value provided
- **.each(iterator: function[, follow: boolean = false]): object** foreach over each key (if follow is true follow objects)
- **.map(iterator: function[, follow: boolean = false]): object** array.map but for objects (if follow is true follow objects)
- **.find(iterator: function[, follow: boolean = false]): object** array.find but for objects (if follow is true follow objects)
- **.filter(iterator: function[, follow: boolean = false]): object** array.filter but for objects (if follow is true follow objects)
- **.every(iterator: function[, follow: boolean = false]): boolean** array.every but for objects (if follow is true follow objects)
- **.some(iterator: function[, follow: boolean = false]): boolean** array.some but for objects (if follow is true follow objects)
- **.includes(key: string[, follow: boolean = false]): boolean** array.includes but for objects (if follow is true follow objects)
- **.sort([iterator: function, follow: boolean = false]): object** array.sort but for objects (if follow is true follow objects)
- **.size(): number** the size of the array
- **.keys([follow: boolean = false]): array** an array of the object keys (if follow is true it will follow objects and return the path in dot notation)
- **.values(): array** an array of values
- **.merge(...sources): object** merge all the provided objects into one with the most right having the most priority
- **.clone(): object** clone the object
- **.flip([follow: boolean = false]): object** flip the values for the keys (where possible)
- **.keyOf(value: any[, follow: boolean = false]): string** get the key (in dot notation) to the specified value (if follow is true follow objects)
- **.prepend(key: string, value: any): object** prepend a new key (can be dot notation) value to the start of an object (similar to array.push)
- **.append(key: string, value: any): object** append a new key (can be dot notation) value to the end of an object
- **.del(keyOrIndex: string|number): object** delete the specified key (can be dot notation)
- **.slice(start: number[, end: number = o.size()]): object** slice the object with the specified indexes
- **.clean([follow: boolean = false]): object** remove all null and undefined values (if follow is true follow objects)

### Example
```javascript
import * as o from 'o';

const a = {
  username: 'hammy2899',
  skills: {
    javascript: true,
  },
};

const b = 'test string';

const c = {};

o(a).is() // => true
o(b).is() // => false
o(c).isEmpty() // => true

o(a).has('username') // => true
o(a).has('skills.javascript') // => true
o(a).has('skills.cpp') // => false
```

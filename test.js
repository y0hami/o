const { values } = require('./dist/o.cjs');

const a = { a: 1, b: 2, c: 3, d: 4, e: 5 };
const b = { a: 1, b: { c: 2, d: 3 } };

console.log(values(a)); // => [ 1, 2, 3, 4, 5 ]
console.log(values(b, true)); // => [ 1, 2, 3 ]

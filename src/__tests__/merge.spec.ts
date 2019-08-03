import merge from '../merge';
import { OObject } from '../types';

describe('merge', () => {
  test('should return a new object not a reference', () => {
    const obj = {
      a: 1,
      b: 2,
    };

    const result = merge(obj, {});
    result.a = 2;

    expect(obj.a).toBe(1);
  });

  test('should return an object with the properties of the sources merged on top', () => {
    const target = {
      a: 1,
      b: 2,
    };
    const sourceA = {
      a: 2,
    };
    const sourceB = {
      b: 3,
    };

    const resultA = merge(target, sourceA);
    const resultB = merge(target, sourceA, sourceB);

    expect(resultA.a).toBe(2);
    expect(resultB.a).toBe(2);
    expect(resultB.b).toBe(3);
  });

  test('should merge deep objects', () => {
    const target = {
      a: 1,
      b: {
        c: 2,
      },
    };
    const source = {
      b: {
        c: 3,
      },
    };

    const result = merge(target, source);

    expect(result.a).toBe(1);
    expect(result.b.c).toBe(3);
  });

  test('should merge deep objects', () => {
    const target = {
      a: 1,
      b: {
        c: {
          d: 2,
          e: 3,
        },
      },
    };
    const sourceA = {
      b: {
        c: {
          d: 3,
        },
      },
    };
    const sourceB = {
      b: {
        f: 4,
      },
    };

    const result = merge(target, sourceA, sourceB);

    expect(result.a).toBe(1);
    expect(result.b.c.d).toBe(3);
    expect(result.b.c.e).toBe(3);
  });

  test('should override target values with source values respectively', () => {
    const targetA = {
      a: 1,
      b: {
        c: 2,
      },
    };
    const sourceA = {
      b: 2,
    };

    const targetB = {
      a: 1,
      b: 2,
    };
    const sourceB = {
      b: {
        c: 2,
      },
    };

    const resultA = merge(targetA, sourceA);
    const resultB = merge(targetB, sourceB);

    expect(resultA.a).toBe(1);
    expect(resultA.b).toBe(2);
    expect(resultB.a).toBe(1);
    expect(resultB.b.c).toBe(2);
  });

  test('should throw TypeError for invalid arguments', () => {
    const invalidObj: unknown = 'testing';

    expect(() => merge(invalidObj as OObject, {}))
      .toThrow(new TypeError('Expected Object, got string testing'));
    expect(() => merge({}, invalidObj as OObject))
      .toThrow(new TypeError('Expected Object[], got object testing'));
    expect(() => merge({}, {}, invalidObj as OObject))
      .toThrow(new TypeError('Expected Object[], got object [object Object],testing'));
  });
});

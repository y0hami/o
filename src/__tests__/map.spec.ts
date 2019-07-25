import map from '../map';
import { OObject, MapCallback } from '../types';

describe('map', () => {
  test('should run the callback on all keys in the object', () => {
    const obj = {
      a: 1,
      b: 2,
    };
    const cb = jest.fn();

    map(obj, cb);

    expect(cb.mock.calls).toHaveLength(2);
  });

  test('should return a new object not a reference', () => {
    const obj = {
      a: 1,
      b: 2,
    };

    const result = map(obj, jest.fn());
    result.a = 5;

    expect(typeof result).toBe('object');
    expect(obj.a).toBe(1);
  });

  test('returned object values should be computed using the callback', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3,
    };

    const result = map(obj, (k, v) => v * 2);

    expect(result.a).toBe(2);
    expect(result.b).toBe(4);
    expect(result.c).toBe(6);
  });

  test('should compute deep object values when follow is true', () => {
    const obj = {
      a: 1,
      b: {
        c: 2,
        d: 3,
      },
    };

    const resultA = map(obj, (k, v) => v * 2, {
      follow: false,
    });
    const resultB = map(obj, (k, v) => v * 2, {
      follow: true,
    });

    expect(resultA.a).toBe(2);
    expect(resultA.b).toBe(NaN);
    expect(resultB.a).toBe(2);
    expect(typeof resultB.b).toBe('object');
    expect(resultB.b.c).toBe(4);
    expect(resultB.b.d).toBe(6);
  });

  test('', () => {
    const invalidObj: unknown = 'testing';
    const invalidCallback: unknown = 'testing';
    const invalidFollow: unknown = 'testing';

    expect(() => map(invalidObj as OObject, jest.fn()))
      .toThrow(new TypeError('Expected Object, got string testing'));
    expect(() => map({}, invalidCallback as MapCallback))
      .toThrow(new TypeError('Expected Function, got string testing'));
    expect(() => map({}, jest.fn(), {
      follow: invalidFollow as boolean,
    }))
      .toThrow(new TypeError('Expected Boolean, got string testing'));
  });
});

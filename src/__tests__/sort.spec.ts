import sort from '../sort';
import { OObject, SortCallback } from '../types';

describe('sort', () => {
  test('should return a new object not a reference', () => {
    const obj = {
      a: 1,
      b: 2,
    };

    const result = sort(obj, () => 1);
    result.a = 2;

    expect(typeof result).toBe('object');
    expect(obj.a).toBe(1);
  });

  test('should evaluate all key/values', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3,
    };

    const cb = jest.fn();

    sort(obj, cb);

    expect(cb.mock.calls).toHaveLength(2);
  });

  test('should sort the object via the callback evaluation', () => {
    const obj = {
      e: 1,
      d: 2,
      b: 3,
      a: 4,
      c: 5,
    };

    const result = sort(obj, (a, b) => {
      if (a.key < b.key) return -1;
      if (a.key > b.key) return 1;
      return 0;
    });
    const keys = Object.keys(result);

    expect(keys[0]).toBe('a');
    expect(keys[1]).toBe('b');
    expect(keys[2]).toBe('c');
    expect(keys[3]).toBe('d');
    expect(keys[4]).toBe('e');
  });

  test('should throw TypeError for invalid arguments', () => {
    const invalidObj: unknown = 'testing';
    const invalidCallback: unknown = 'testing';
    const invalidFollow: unknown = 'testing';

    expect(() => sort(invalidObj as OObject, jest.fn()))
      .toThrow(new TypeError('Expected Object, got string testing'));
    expect(() => sort({}, invalidCallback as SortCallback))
      .toThrow(new TypeError('Expected Function, got string testing'));
    expect(() => sort({}, jest.fn(), {
      follow: invalidFollow as boolean,
    }))
      .toThrow(new TypeError('Expected Boolean, got string testing'));
  });
});

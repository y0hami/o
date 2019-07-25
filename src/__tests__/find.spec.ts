import find from '../find';
import { OObject, FindCallback } from '../types';

describe('find', () => {
  test('should return the first key which matches the callback evaluation', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3,
    };

    expect(find(obj, (k, v) => k === 'a' && v === 1)).toBe('a');
    expect(find(obj, (k, v) => k === 'b' && v === 2)).toBe('b');
    expect(find(obj, (k, v) => k === 'c' && v === 3)).toBe('c');
  });

  test('should the key of a deep object when follow is true', () => {
    const obj = {
      a: 1,
      b: {
        c: 2,
        d: {
          e: 3,
        },
      },
    };

    expect(find(obj, (k, v) => k === 'b.c' && v === 2, {
      follow: true,
    })).toBe('b.c');
    expect(find(obj, (k, v) => k === 'b.d.e' && v === 3, {
      follow: true,
    })).toBe('b.d.e');
  });

  test('if all callbacks evaluate to false return undefined', () => {
    expect(find({}, () => false)).toBe(undefined);
    expect(find({}, () => false, {
      follow: true,
    })).toBe(undefined);
  });

  test('should throw TypeError for invalid arguments', () => {
    const invalidObj: unknown = 'testing';
    const invalidCallback: unknown = 'testing';
    const invalidFollow: unknown = 'testing';

    expect(() => find(invalidObj as OObject, jest.fn()))
      .toThrow(new TypeError('Expected Object, got string testing'));
    expect(() => find({}, invalidCallback as FindCallback))
      .toThrow(new TypeError('Expected Function, got string testing'));
    expect(() => find({}, jest.fn(), {
      follow: invalidFollow as boolean,
    }))
      .toThrow(new TypeError('Expected Boolean, got string testing'));
  });
});

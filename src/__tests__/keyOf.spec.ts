import keyOf from '../keyOf';
import { OObject } from '../types';

describe('keyOf', () => {
  test('should return the key of the first value matched', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3,
    };

    expect(keyOf(obj, 1)).toBe('a');
    expect(keyOf(obj, 2)).toBe('b');
    expect(keyOf(obj, 3)).toBe('c');
  });

  test('should return undefined if the value is not matched', () => {
    const obj = {
      a: 1,
    };

    expect(keyOf(obj, 2)).toBeUndefined();
  });

  test('should throw TypeError for invalid arguments', () => {
    const invalidObj: unknown = 'testing';
    const invalidFollow: unknown = 'testing';

    expect(() => keyOf(invalidObj as OObject, 'test'))
      .toThrow(new TypeError('Expected Object, got string testing'));
    expect(() => keyOf({}, 'test', {
      follow: invalidFollow as boolean,
    }))
      .toThrow(new TypeError('Expected Boolean, got string testing'));
  });
});

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

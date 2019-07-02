import deepEqual from '../deepEqual';

describe('deepEqual', () => {
  const objA = {
    a: 1,
    b: {
      c: 2,
      d: {
        e: 3,
      },
    },
  };

  const objB = {
    a: 1,
    b: {
      c: 2,
      d: {
        e: 3,
      },
    },
  };

  const objC = {
    a: 1,
    b: {
      c: 2,
      d: {
        e: 3,
      },
    },
  };

  const objNotEqual = {
    a: 1,
    b: {
      c: 2,
      d: {
        e: 4,
      },
    },
  };

  test('should check if two objects deeply equal', () => {
    expect(deepEqual(objA, objB)).toBe(true);
    expect(deepEqual(objA, objNotEqual)).toBe(false);
  });

  test('should check if multiple objects equal', () => {
    expect(deepEqual(objA, objB, objC)).toBe(true);
  });

  test('should return false if one value is different in any object when checking multiple objects', () => {
    expect(deepEqual(objA, objB, objC, objNotEqual)).toBe(false);
  });

  test('should throw TypeError if compareWith argument is invalid', () => {
    const invalidObj: unknown = 'testing';

    expect(() => deepEqual(invalidObj as OObject, objA))
      .toThrow(new TypeError('Expected Object, got string testing'));
    expect(() => deepEqual(objA, objB, invalidObj as OObject))
      .toThrow(new TypeError('Expected Object[], got object [object Object],testing'));
  });
});
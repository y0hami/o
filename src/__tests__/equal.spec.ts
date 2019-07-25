import equal from '../equal';
import { OObject } from '../types';

describe('equal', () => {
  const objA = {
    a: 1,
    b: 2,
  };

  const objB = {
    a: 1,
    b: 2,
  };

  const objC = {
    a: 1,
    b: {
      c: 2,
    },
  };

  const objD = {
    a: 1,
    b: {
      c: 3,
    },
  };

  const objE = {
    string: 'string',
    number: 1,
    bool: true,
    array: [1, 2],
    object: {},
    func: () => true,
  };

  const objF = {
    string: 'string',
    number: 1,
    bool: true,
    array: [1, 2],
    object: {},
    func: () => true,
  };

  const objG = {
    func: () => 1,
  };

  const objH = {
    func: () => 1,
  };

  const objI = {
    func: () => 2,
  };

  const objJ = {
    a: 1,
    c: 2,
  };

  const objK = {
    func: 'test',
  };

  const objNotEqual = {
    a: 1,
    b: 3,
  };

  test('should check if two objects equal', () => {
    expect(equal(objA, objB)).toBe(true);
    expect(equal(objA, objNotEqual)).toBe(false);
  });

  test('child objects should not affect return value', () => {
    expect(equal(objC, objD)).toBe(true);
  });

  test('all value types should be checked', () => {
    expect(equal(objE, objF)).toBe(true);
  });

  test('should check if functions match', () => {
    expect(equal(objG, objH)).toBe(true);
    expect(equal(objG, objI)).toBe(false);
    expect(equal(objG, objK)).toBe(false);
  });

  test('should skip checking if one object doesn\'t have same amount of keys', () => {
    expect(equal(objA, objE)).toBe(false);
  });

  test('should skip checking if one object doesn\'t have same keys', () => {
    expect(equal(objA, objJ)).toBe(false);
  });

  test('should throw TypeError for invalid arguments', () => {
    const invalidObj: unknown = 'testing';

    expect(() => equal(invalidObj as OObject, objA))
      .toThrow(new TypeError('Expected Object, got string testing'));
    expect(() => equal(objA, objB, invalidObj as OObject))
      .toThrow(new TypeError('Expected Object[], got object [object Object],testing'));
  });
});

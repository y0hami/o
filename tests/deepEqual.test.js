import deepEqual from '../src/deepEqual';

describe('deepEqual', () => {
  test('should return true when objects are equal deeply', () => {
    const a = { a: { b: 1 } };
    const b = { a: { b: 1 } };

    expect(deepEqual(a, b)).toBe(true);
  });

  test('should return false when objects are not equal deeply', () => {
    const a = { a: { b: 1 } };
    const b = { a: { b: 2 } };

    expect(deepEqual(a, b)).toBe(false);
  });

  test('should return false when invalid object is provided', () => {
    const a = 'invalid object';
    const b = {};

    expect(deepEqual(a, b)).toBe(false);
  });

  test('should return false when invalid compare objects are provided', () => {
    const a = { a: () => true };
    const b = 'invalid object';

    expect(deepEqual(a, b)).toBe(false);
  });

  test('should skip multiple objects if previous fail', () => {
    const a = { a: 1, b: 2 };
    const b = { a: 2, b: 2 };
    const c = { a: 1, b: 2 };

    expect(deepEqual(a, b, c)).toBe(false);
  });

  test('should skip multiple objects if previous fail', () => {
    const a = { a: 1, b: 2 };
    const b = { a: 2, b: 2 };
    const c = { a: 1, b: 2 };

    expect(deepEqual(a, b, c)).toBe(false);
  });
});

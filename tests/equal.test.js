import equal from '../src/equal';

describe('equal', () => {
  test('should return true when objects are equal', () => {
    const a = { a: 1 };
    const b = { a: 1 };

    expect(equal(a, b)).toBe(true);
  });

  test('should return false when objects are not equal', () => {
    const a = { a: 1 };
    const b = { a: 2 };

    expect(equal(a, b)).toBe(false);
  });

  test('should return false when objects contain different keys', () => {
    const a = { a: 1 };
    const b = { b: 2 };

    expect(equal(a, b)).toBe(false);
  });

  test('should return false when objects contain different amount of keys', () => {
    const a = { a: 1 };
    const b = { a: 1, b: 2 };

    expect(equal(a, b)).toBe(false);
  });

  test('should return false when key values are different types', () => {
    const a = { a: {}, b: () => {} };
    const b = { a: [], b: 'test' };

    expect(equal(a, b)).toBe(false);
  });

  test('should return true when key values are both objects', () => {
    const a = { a: {} };
    const b = { a: {} };

    expect(equal(a, b)).toBe(true);
  });

  test('should return true when key values are both arrays', () => {
    const a = { a: [] };
    const b = { a: [] };

    expect(equal(a, b)).toBe(true);
  });

  test('should return true when key values are both functions', () => {
    const a = { a: () => {} };
    const b = { a: () => {} };

    expect(equal(a, b)).toBe(true);
  });

  test('should return false when key values functions are different', () => {
    const a = { a: () => true };
    const b = { a: () => false };

    expect(equal(a, b)).toBe(false);
  });

  test('should return false when one of the key value types is different', () => {
    const a = { a: {} };
    const b = { a: 'test' };

    expect(equal(a, b)).toBe(false);
  });

  test('should return false when one of the key value types is different', () => {
    const a = { a: [] };
    const b = { a: 'test' };

    expect(equal(a, b)).toBe(false);
  });

  test('should return false when one of the key value types is different', () => {
    const a = { a: () => {} };
    const b = { a: 'test' };

    expect(equal(a, b)).toBe(false);
  });

  test('should return false when invalid object is provided', () => {
    const a = 'invalid object';
    const b = {};

    expect(equal(a, b)).toBe(false);
  });

  test('should return false when invalid compare objects are provided', () => {
    const a = { a: () => true };
    const b = 'invalid object';

    expect(equal(a, b)).toBe(false);
  });

  test('should check multiple objects when specified', () => {
    const a = { a: 1, b: 2 };
    const b = { a: 1, b: 2 };
    const c = { a: 1, b: 2 };

    expect(equal(a, b, c)).toBe(true);
  });

  test('should skip multiple objects if previous fail', () => {
    const a = { a: 1, b: 2 };
    const b = { a: 2, b: 2 };
    const c = { a: 1, b: 2 };

    expect(equal(a, b, c)).toBe(false);
  });
});

import is from '../src/is';

describe('is', () => {
  test('should return false for strings', () => {
    expect(is('test')).toBe(false);
  });

  test('should return false for integers', () => {
    expect(is(1)).toBe(false);
  });

  test('should return false for floats', () => {
    expect(is(1.5)).toBe(false);
  });

  test('should return false for arrays', () => {
    expect(is([1, 2, 3])).toBe(false);
  });

  test('should return false for arrow functions', () => {
    expect(is(() => {})).toBe(false);
  });

  test('should return false for named functions', () => {
    function test() {}
    expect(is(test)).toBe(false);
  });

  test('should return false for booleans (true)', () => {
    expect(is(true)).toBe(false);
  });

  test('should return false for booleans (false)', () => {
    expect(is(false)).toBe(false);
  });

  test('should return false for Date', () => {
    expect(is(new Date())).toBe(false);
  });

  test('should return false for Infinity', () => {
    expect(is(Infinity)).toBe(false);
  });

  test('should return false for Symbol', () => {
    expect(is(Symbol)).toBe(false);
  });

  test('should return false for null', () => {
    expect(is(null)).toBe(false);
  });

  test('should return false for undefined', () => {
    expect(is(undefined)).toBe(false);
  });

  test('should return true for empty objects', () => {
    expect(is({})).toBe(true);
  });

  test('should return true for objects', () => {
    expect(is({ a: 1 })).toBe(true);
  });
});

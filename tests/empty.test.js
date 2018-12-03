import empty from '../src/empty';

describe('empty', () => {
  test('should return false if the specified object is not an object', () => {
    expect(empty('test')).toBe(false);
  });

  test('should return true if the specified object is empty', () => {
    expect(empty({})).toBe(true);
  });

  test('should return false if the specified object is not empty', () => {
    expect(empty({ a: 1 })).toBe(false);
  });
});

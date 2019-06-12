import empty from '../empty';

describe('empty', () => {
  test('should check if an object is empty', () => {
    const emptyObj = {};
    const obj = {
      a: 1,
      b: 2,
    };

    expect(empty(emptyObj)).toBe(true);
    expect(empty(obj)).toBe(false);
  });

  test('should throw TypeError for invalid arguments', () => {
    const invalidObj: unknown = 'testing';

    expect(() => empty(invalidObj as OObject))
      .toThrow(new TypeError('Expected Object, got string testing'));
  });
});

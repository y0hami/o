import size from '../size';

describe('size', () => {
  test('should return a number', () => {
    expect(typeof size({})).toBe('number');
  });

  test('should return the size of the object (number of keys)', () => {
    const objA = {
      a: 1,
      b: 2,
    };
    const objB = {
      a: 1,
      b: 2,
      c: 3,
    };

    expect(size(objA)).toBe(2);
    expect(size(objB)).toBe(3);
  });

  test('should throw TypeError for invalid arguments', () => {
    const invalidObj: unknown = 'testing';

    expect(() => size(invalidObj as OObject))
      .toThrow(new TypeError('Expected Object, got string testing'));
  });
});

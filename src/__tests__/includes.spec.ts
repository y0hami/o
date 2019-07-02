import includes from '../includes';

describe('includes', () => {
  test('should return true or false whether or not the object has the specified value', () => {
    const obj = {
      a: 1,
      b: 2,
    };

    expect(includes(obj, 1)).toBe(true);
    expect(includes(obj, 2)).toBe(true);
    expect(includes(obj, 3)).toBe(false);
  });

  test('should check within deep objects with follow is true', () => {
    const obj = {
      a: 1,
      b: {
        c: {
          d: 2,
        },
      },
    };

    expect(includes(obj, 2)).toBe(false);
    expect(includes(obj, 2, {
      follow: true,
    })).toBe(true);
  });

  test('should throw TypeError for invalid arguments', () => {
    const invalidObj: unknown = 'testing';
    const invalidFollow: unknown = 'testing';

    expect(() => includes(invalidObj as OObject, 'test'))
      .toThrow(new TypeError('Expected Object, got string testing'));
    expect(() => includes({}, 'test', {
      follow: invalidFollow as boolean,
    }))
      .toThrow(new TypeError('Expected Boolean, got string testing'));
  });
});

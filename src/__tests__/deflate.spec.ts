import deflate from '../deflate';

describe('deflate', () => {
  test('should deflate objects to equal 1 depth', () => {
    const obj = {
      a: 1,
      b: {
        c: 2,
        d: {
          e: 3,
        },
      },
      f: {
        g: 4,
      },
    };

    const deflated = deflate(obj);
    const deflatedKeys = Object.keys(deflated);
    const hasNoObjects = deflatedKeys.every(key => typeof deflated[key] !== 'object');

    expect(hasNoObjects).toBe(true);
  });

  test('converts child object paths to dot notation in keys', () => {
    const obj = {
      a: 1,
      b: {
        c: 2,
      },
    };

    const deflated = deflate(obj);
    const deflatedKeys = Object.keys(deflated);

    expect(deflatedKeys[1]).toBe('b.c');
  });

  test('should throw TypeError if obj argument is invalid', () => {
    const invalidObj: unknown = 'testing';

    expect(() => deflate(invalidObj as OObject))
      .toThrow(new TypeError('Expected Object, got string testing'));
  });
});

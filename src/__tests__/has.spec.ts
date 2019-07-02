import has from '../has';

describe('has', () => {
  test('return true if the object has the path', () => {
    const obj = {
      a: 1,
      b: 2,
    };

    expect(has(obj, 'a')).toBe(true);
    expect(has(obj, 'b')).toBe(true);
    expect(has(obj, 'c')).toBe(false);
  });

  test('path should allow dot notation for deep objects', () => {
    const obj = {
      a: {
        b: {
          c: 1,
        },
      },
    };

    expect(has(obj, 'a')).toBe(true);
    expect(has(obj, 'a.b')).toBe(true);
    expect(has(obj, 'a.b.c')).toBe(true);
    expect(has(obj, 'a.b.d')).toBe(false);
  });

  test('return false if the object is empty', () => {
    const obj = {};

    expect(has(obj, 'test')).toBe(false);
  });

  test('should check if all specified paths exist', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3,
      d: {
        e: 4,
      },
    };

    expect(has(obj, 'a', 'b', 'c')).toBe(true);
    expect(has(obj, 'a', 'b', 'e')).toBe(false);
    expect(has(obj, 'a', 'd.e')).toBe(true);
    expect(has(obj, 'a', 'd.f')).toBe(false);
    expect(has(obj, 'e', 'a')).toBe(false);
  });

  test('should throw TypeError for invalid arguments', () => {
    const invalidObj: unknown = 'testing';
    const invalidPath: unknown = 1;

    expect(() => has(invalidObj as OObject, 'test'))
      .toThrow(new TypeError('Expected Object, got string testing'));
    expect(() => has({}, invalidPath as string))
      .toThrow(new TypeError('Expected String[], got object 1'));
    expect(() => has({}, 'test', invalidPath as string))
      .toThrow(new TypeError('Expected String[], got object test,1'));
  });
});
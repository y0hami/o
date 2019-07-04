import some from '../some';

describe('some', () => {
  test('should evaluate all key/values', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3,
    };
    const cb = jest.fn();

    some(obj, cb);

    expect(cb.mock.calls).toHaveLength(3);
  });

  test('should only return true of at least one evaluation is true', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3,
    };

    expect(some(obj, (k, v) => v === 1)).toBe(true);
    expect(some(obj, (k, v) => v === 2)).toBe(true);
    expect(some(obj, (k, v) => v === 4)).toBe(false);
  });

  test('should evaluate deep objects when follow is true', () => {
    const obj = {
      a: 1,
      b: {
        c: 2,
        d: 3,
      },
    };

    expect(some(obj, (k, v) => v === 2, {
      follow: true,
    })).toBe(true);
  });

  test('should throw TypeError for invalid arguments', () => {
    const invalidObj: unknown = 'testing';
    const invalidCallback: unknown = 'testing';
    const invalidFollow: unknown = 'testing';

    expect(() => some(invalidObj as OObject, jest.fn()))
      .toThrow(new TypeError('Expected Object, got string testing'));
    expect(() => some({}, invalidCallback as SomeCallback))
      .toThrow(new TypeError('Expected Function, got string testing'));
    expect(() => some({}, jest.fn(), {
      follow: invalidFollow as boolean,
    }))
      .toThrow(new TypeError('Expected Boolean, got string testing'));
  });
});

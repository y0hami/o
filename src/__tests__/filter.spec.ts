import filter from '../filter';

describe('filter', () => {
  test('should only return key/values which the callback evaluates as true', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 'testing',
    };

    const resultA = filter(obj, (k, v) => typeof v === 'number');
    const resultB = filter(obj, (k, v) => typeof v === 'string');

    expect(Object.keys(resultA)).toHaveLength(2);
    expect(Object.keys(resultB)).toHaveLength(1);
  });

  test('should evaluate all key/values', () => {
    const obj = {
      a: 1,
      b: 2,
    };
    const cb = jest.fn(() => true);

    filter(obj, cb);

    expect(cb.mock.calls).toHaveLength(2);
  });

  test('should follow deep objects if follow is true', () => {
    const obj = {
      a: 1,
      b: 2,
      c: {
        d: 3,
        e: 'testing',
      },
    };

    const cbA: FilterCallback = (k, v) => typeof v === 'number';
    const cbB: FilterCallback = (k, v) => typeof v === 'string';

    const resultA = filter(obj, cbA, {
      follow: false,
    });
    const resultB = filter(obj, cbA, {
      follow: true,
    });
    const resultC = filter(obj, cbB, {
      follow: true,
    });

    expect(resultA.a + resultA.b).toBe(3);
    expect(resultB.a + resultB.b + resultB.c.d).toBe(6);
    expect(resultC.c.e).toBe('testing');
  });

  test('should throw TypeError for invalid arguments', () => {
    const invalidObj: unknown = 'testing';
    const invalidCallback: unknown = 'testing';
    const invalidFollow: unknown = 'testing';

    expect(() => filter(invalidObj as OObject, jest.fn()))
      .toThrow(new TypeError('Expected Object, got string testing'));
    expect(() => filter({}, invalidCallback as FilterCallback))
      .toThrow(new TypeError('Expected Function, got string testing'));
    expect(() => filter({}, jest.fn(), {
      follow: invalidFollow as boolean,
    }))
      .toThrow(new TypeError('Expected Boolean, got string testing'));
  });
});

import every from '../every';

describe('every', () => {
  test('should run for all keys', () => {
    const obj = {
      a: 1,
      b: {
        c: 2,
        d: 3,
      },
    };
    const mockCallback1 = jest.fn();
    const mockCallback2 = jest.fn();

    every(obj, mockCallback1);
    every(obj, mockCallback2, {
      follow: true,
    });

    expect(mockCallback1.mock.calls).toHaveLength(2);
    expect(mockCallback2.mock.calls).toHaveLength(3);
  });

  test('return value should be true only if all callbacks return true', () => {
    const objA = {
      a: 1,
      b: 2,
    };

    const objB = {
      a: 1,
      b: '2',
    };

    const callback: EveryCallback = (key, value) => typeof value === 'number';

    expect(every(objA, callback)).toBe(true);
    expect(every(objB, callback)).toBe(false);
  });

  test('should throw TypeError for invalid arguments', () => {
    const invalidObj: unknown = 'testing';
    const invalidCallback: unknown = 'testing';
    const invalidFollow: unknown = 'testing';

    expect(() => every(invalidObj as OObject, jest.fn()))
      .toThrow(new TypeError('Expected Object, got string testing'));
    expect(() => every({}, invalidCallback as EveryCallback))
      .toThrow(new TypeError('Expected Function, got string testing'));
    expect(() => every({}, jest.fn(), {
      follow: invalidFollow as boolean,
    }))
      .toThrow(new TypeError('Expected Boolean, got string testing'));
  });
});

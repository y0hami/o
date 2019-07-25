import each from '../each';
import { OObject, EachCallback } from '../types';

describe('each', () => {
  const obj = {
    a: 1,
    b: 2,
    c: {
      d: 3,
      e: {
        f: 4,
      },
    },
  };

  test('should foreach over object keys', () => {
    const mockCallback = jest.fn();

    each(obj, mockCallback);

    expect(mockCallback.mock.calls).toHaveLength(3);
  });

  test('should foreach over object deeply when follow is true', () => {
    const mockCallback = jest.fn();

    each(obj, mockCallback, {
      follow: true,
    });

    expect(mockCallback.mock.calls).toHaveLength(4);
  });

  test('should not run callback if object is empty', () => {
    const mockCallback = jest.fn();

    each({}, mockCallback);

    expect(mockCallback.mock.calls).toHaveLength(0);
  });

  test('should throw TypeError for invalid arguments', () => {
    const invalidObj: unknown = 'testing';
    const invalidCallback: unknown = 'testing';
    const invalidFollow: unknown = 'testing';

    expect(() => each(invalidObj as OObject, jest.fn()))
      .toThrow(new TypeError('Expected Object, got string testing'));
    expect(() => each({}, invalidCallback as EachCallback))
      .toThrow(new TypeError('Expected Function, got string testing'));
    expect(() => each({}, jest.fn(), {
      follow: invalidFollow as boolean,
    }))
      .toThrow(new TypeError('Expected Boolean, got string testing'));
  });
});

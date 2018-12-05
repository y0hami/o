import keyOf from '../src/keyOf';

describe('keyOf', () => {
  test('should return undefined if the one specified isn\'t an object', () => {
    const key = keyOf('test');

    expect(key).toBeUndefined();
  });

  test('should return undefined if the one specified is empty', () => {
    const key = keyOf({});

    expect(key).toBeUndefined();
  });

  test('should return undefined if not key is found', () => {
    const a = {
      a: 1,
      b: 2,
    };
    const key = keyOf(a, 3);

    expect(key).toBeUndefined();
  });

  test('should return the key to the value specified', () => {
    const a = {
      a: 1,
      b: 2,
    };
    const key = keyOf(a, 2);

    expect(key).toBe('b');
  });

  test('should return the first key which matches the specified value', () => {
    const a = {
      a: 1,
      b: 2,
      c: {
        d: 3,
      },
    };
    const key = keyOf(a, 1, true);

    expect(key).toBe('a');
  });
});

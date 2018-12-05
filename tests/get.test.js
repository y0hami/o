import get from '../src/get';

describe('get', () => {
  test('should return the default value (undefined) if the object specified isn\'t an object', () => {
    const got = get('test');

    expect(got).toBeUndefined();
  });

  test('should return the default value (undefined) if the object specified is empty', () => {
    const got = get({});

    expect(got).toBeUndefined();
  });

  test('should return the default value when the object doesn\'t have the path specified', () => {
    const a = {
      a: 1,
    };
    const got = get(a, 'b');

    expect(got).toBeUndefined();
  });

  test('should return the specified default value', () => {
    const a = {
      a: 1,
    };
    const got = get(a, 'b', 'default');

    expect(got).toBe('default');
  });

  test('should return the specified default value when the path is dot notation', () => {
    const a = {
      a: {
        b: 1,
      },
    };
    const got = get(a, 'a.b');

    expect(got).toBe(1);
  });
});

import includes from '../src/includes';

describe('includes', () => {
  test('should return false if the object specified isn\'t an object', () => {
    const got = includes('test');

    expect(got).toBe(false);
  });

  test('should return false if the object specified is empty', () => {
    const got = includes({});

    expect(got).toBe(false);
  });

  test('should return false if value doesn\'t exist', () => {
    const a = {
      a: 1,
    };
    const got = includes(a, 2);

    expect(got).toBe(false);
  });

  test('should return true if value exists', () => {
    const a = {
      a: 1,
      b: 2,
    };
    const got = includes(a, 2);

    expect(got).toBe(true);
  });

  test('should return true if value exists in inner objects when follow is true', () => {
    const a = {
      a: 1,
      b: 2,
      c: {
        d: 3,
      },
    };
    const got = includes(a, 3, true);

    expect(got).toBe(true);
  });

  test('should return false if value doesn\'t exist in the base object when follow is false', () => {
    const a = {
      a: 1,
      b: 2,
      c: {
        d: 3,
      },
    };
    const got = includes(a, 3, false);

    expect(got).toBe(false);
  });

  test('should return true once it matches the first value', () => {
    const a = {
      a: 1,
      b: 2,
      c: {
        d: 3,
      },
    };
    const got = includes(a, 1);

    expect(got).toBe(true);
  });
});

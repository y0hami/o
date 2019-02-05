import has from '../src/has';

describe('has', () => {
  test('should return false if the object specified isn\'t an object', () => {
    const got = has('test');

    expect(got).toBe(false);
  });

  test('should return false if the object specified is empty', () => {
    const got = has({});

    expect(got).toBe(false);
  });

  test('should return true if the path exists', () => {
    const a = {
      a: 1,
    };
    const got = has(a, 'a');

    expect(got).toBe(true);
  });

  test('should return false if the path doesn\'t exist', () => {
    const a = {
      a: 1,
    };
    const got = has(a, 'b');

    expect(got).toBe(false);
  });

  test('should return true if the path exists with dot notation', () => {
    const a = {
      a: {
        b: 1,
      },
    };
    const got = has(a, 'a.b');

    expect(got).toBe(true);
  });

  test('should return true if all specified paths exist', () => {
    const a = {
      a: {
        b: 1,
      },
    };
    const got = has(a, 'a', 'a.b');

    expect(got).toBe(true);
  });

  test('should return false if one of the specified paths doesn\'t exist', () => {
    const a = {
      a: {},
    };
    const got = has(a, 'a', 'a.b');

    expect(got).toBe(false);
  });

  test('should return false path equals undefined', () => {
    const a = {
      a: undefined,
    };
    const got = has(a, 'a');

    expect(got).toBe(false);
  });

  test('should return false path equals undefined', () => {
    const a = {
      a: {
        b: undefined,
      },
    };
    const got = has(a, 'a.b.c');

    expect(got).toBe(false);
  });
});

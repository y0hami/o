import every from '../src/every';

describe('every', () => {
  test('should return false if the object specified isn\'t an object', () => {
    const equal = every('test', () => {});

    expect(equal).toBe(false);
  });

  test('should return false if the object specified is empty', () => {
    const equal = every({}, () => {});

    expect(equal).toBe(false);
  });

  test('should return false if the iterator isn\'t provided', () => {
    const equal = every({});

    expect(equal).toBe(false);
  });

  test('should return false if the iterator isn\'t a function', () => {
    const equal = every({}, 'test');

    expect(equal).toBe(false);
  });

  test('should return true if all values evaluate to true', () => {
    const equal = every({ a: 1, b: 1, c: 1 }, (key, value) => value === 1);

    expect(equal).toBe(true);
  });

  test('should return false if one or more values evaluate to false', () => {
    const equal = every({ a: 1, b: 1, c: 2 }, (key, value) => value === 1);

    expect(equal).toBe(false);
  });

  test('should return true if all values including deep object values evaluate to true when follow is true', () => {
    const obj = {
      a: 1,
      b: 1,
      c: 1,
      d: {
        e: 1,
      },
    };

    const equal = every(obj, (key, value) => value === 1, true);

    expect(equal).toBe(true);
  });

  test('should return false if one or more values including deep object values evaluate to false when follow is true', () => {
    const obj = {
      a: 1,
      b: 1,
      c: 1,
      d: {
        e: 2,
      },
    };

    const equal = every(obj, (key, value) => value === 1, true);

    expect(equal).toBe(false);
  });
});

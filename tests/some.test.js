import some from '../src/some';

describe('some', () => {
  test('should return false if the object specified isn\'t an object', () => {
    const result = some('test');

    expect(result).toBe(false);
  });

  test('should return false if the object specified is empty', () => {
    const result = some({});

    expect(result).toBe(false);
  });

  test('should return false if the iterator isn\'t a function', () => {
    const result = some({}, 'test');

    expect(result).toBe(false);
  });

  test('should return true if at least 1 key/value evaluates to true', () => {
    const a = {
      a: 1,
      b: 2,
      c: 3,
    };

    const result = some(a, (k, v) => v > 1);

    expect(result).toBe(true);
  });

  test('should return false if all key/values evaluates to false', () => {
    const a = {
      a: 1,
      b: 2,
      c: 3,
    };

    const result = some(a, (k, v) => v > 5);

    expect(result).toBe(false);
  });
});

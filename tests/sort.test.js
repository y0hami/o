import sort from '../src/sort';

describe('sort', () => {
  test('should return an object if the object specified isn\'t an object', () => {
    const result = sort('test');

    expect(typeof result).toBe('object');
  });

  test('should return an object if the object specified is empty', () => {
    const result = sort({});

    expect(typeof result).toBe('object');
  });

  test('should return an object if the iterator isn\'t a function', () => {
    const result = sort({}, 'test');

    expect(typeof result).toBe('object');
  });

  test('should return the object without the key/values which don\'t evaluate to true', () => {
    const a = {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
    };

    const result = sort(a, (k, v) => v > 1);

    expect(Object.keys(result)).toHaveLength(3);
  });

  test('should return the sorted object with inner objects sorted when follow is true', () => {
    const a = {
      a: 1,
      b: 2,
      c: {
        d: 1,
        e: 2,
      },
    };

    const result = sort(a, (k, v) => v > 1, true);

    expect(Object.keys(result.c)).toHaveLength(1);
  });
});

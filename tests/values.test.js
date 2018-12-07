import values from '../src/values';

describe('values', () => {
  test('should return an array if the object specified isn\'t an object', () => {
    const result = values('test');

    expect(Array.isArray(result)).toBe(true);
  });

  test('should return an array if the object specified is empty', () => {
    const result = values({});

    expect(Array.isArray(result)).toBe(true);
  });

  test('should return only the base values if follow is false', () => {
    const a = {
      a: 1,
      b: {
        c: 2,
      },
    };

    const result = values(a);

    expect(typeof result[1]).toBe('object');
  });

  test('should return all values including inner objects when follow is true', () => {
    const a = {
      a: 1,
      b: {
        c: 2,
      },
    };

    const result = values(a, true);

    expect(typeof result[1]).toBe('number');
  });
});

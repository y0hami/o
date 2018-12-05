import map from '../src/map';

describe('map', () => {
  test('should return an object if the object specified isn\'t an object', () => {
    const mapped = map('test');

    expect(typeof mapped).toBe('object');
  });

  test('should return an object if the object specified is empty', () => {
    const mapped = map({});

    expect(typeof mapped).toBe('object');
  });

  test('should return an empty object if the iterator isn\'t provided', () => {
    const mapped = map({});

    expect(typeof mapped).toBe('object');
  });

  test('should return an empty object if the iterator isn\'t a function', () => {
    const mapped = map({}, 'test');

    expect(typeof mapped).toBe('object');
  });

  test('should return an object with the values computed to the iterator evaluation', () => {
    const a = {
      a: 1,
      b: 1,
      c: 1,
    };
    const mapped = map(a, (k, v) => v + 1);

    expect(mapped.a + mapped.b + mapped.c).toBe(6);
  });

  test('should return an object with the values for inner objects if follow is true', () => {
    const a = {
      a: 1,
      b: {
        c: 1,
      },
    };
    const mapped = map(a, (k, v) => v + 1, true);

    expect(mapped.a + mapped.b.c).toBe(4);
  });
});

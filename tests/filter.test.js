import filter from '../src/filter';

describe('every', () => {
  test('should return an empty object if the object specified isn\'t an object', () => {
    const filtered = filter('test', () => {});

    expect(typeof filtered).toBe('object');
  });

  test('should return an empty object if the object specified is empty', () => {
    const filtered = filter({}, () => {});

    expect(typeof filtered).toBe('object');
  });

  test('should return an empty object if the iterator isn\'t provided', () => {
    const filtered = filter({});

    expect(typeof filtered).toBe('object');
  });

  test('should return an empty object if the iterator isn\'t a function', () => {
    const filtered = filter({}, 'test');

    expect(typeof filtered).toBe('object');
  });

  test('should return the filtered values', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3,
    };
    const filtered = filter(obj, (key, value) => value > 2);

    expect(Object.keys(filtered).length).toBe(1);
  });

  test('should return the filtered values including deep object values when follow is true', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3,
      d: {
        e: 4,
        f: 5,
      },
    };
    const filtered = filter(obj, (key, value) => value > 2, true);

    expect(Object.keys(filtered).length).toBe(2);
  });

  test('should return the filtered values without filtering deep object values when follow is false', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3,
      d: {
        e: 4,
        f: 5,
      },
    };
    const filtered = filter(obj, (key, value) => value > 2, false);

    expect(Object.keys(filtered).length).toBe(1);
  });
});

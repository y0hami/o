import find from '../src/find';

describe('find', () => {
  test('should return undefined if the object specified isn\'t an object', () => {
    const key = find('test');

    expect(key).toBeUndefined();
  });

  test('should return undefined if the object specified is empty', () => {
    const key = find({});

    expect(key).toBeUndefined();
  });

  test('should return undefined if the iterator isn\'t provided', () => {
    const a = {
      a: 1,
      b: 2,
      c: {
        d: 2,
        e: 3,
      },
    };
    const key = find(a);

    expect(key).toBeUndefined();
  });

  test('should return undefined if the iterator isn\'t a function', () => {
    const key = find({}, 'test');

    expect(key).toBeUndefined();
  });

  test('should return the first key to match iterator evaluation', () => {
    const a = {
      a: 1,
      b: 2,
      c: {
        d: 2,
        e: 3,
      },
    };
    const key = find(a, (k, v) => v > 1);

    expect(key).toBe('b');
  });

  test('should return the first key in inner objects when follow is true', () => {
    const a = {
      a: 1,
      b: 2,
      c: {
        d: 2,
        e: 3,
      },
    };
    const key = find(a, (k, v) => v > 2, true);

    expect(key).toBeDefined();
  });

  test('should return the first key in dot notation', () => {
    const a = {
      a: 1,
      b: 2,
      c: {
        d: 2,
        e: 3,
      },
    };
    const key = find(a, (k, v) => v > 2, true);

    expect(key).toBe('c.e');
  });

  test('should return undefined if the key is not found', () => {
    const a = {
      a: 1,
      b: 2,
    };
    const key = find(a, (k, v) => v > 2, true);

    expect(key).toBeUndefined();
  });
});

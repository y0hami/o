import set from '../src/set';

describe('set', () => {
  test('should return an object if the object specified isn\'t an object', () => {
    const result = set('test');

    expect(typeof result).toBe('object');
  });

  test('should set the key as the value on an empty object', () => {
    const a = {};
    const result = set(a, 'a', 1);

    expect(result.a).toBe(1);
  });

  test('should set the key as the value on a populated object', () => {
    const a = {
      a: 1,
    };
    const result = set(a, 'b', 2);

    expect(result.b).toBe(2);
  });

  test('should set the key as the value with dot notation', () => {
    const a = {
      a: 1,
    };
    const result = set(a, 'b.c', 2);

    expect(result.b.c).toBe(2);
  });

  test('should set the key as the value on an empty inner object', () => {
    const a = {
      a: 1,
      b: {},
    };
    const result = set(a, 'b.c', 2);

    expect(result.b.c).toBe(2);
  });

  test('should set the key as the value on a populated inner object', () => {
    const a = {
      a: 1,
      b: {
        c: 2,
      },
    };
    const result = set(a, 'b.d', 3);

    expect(result.b.d).toBe(3);
  });
});

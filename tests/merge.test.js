import merge from '../src/merge';

describe('merge', () => {
  test('should return an object if the object specified isn\'t an object', () => {
    const merged = merge('test');

    expect(typeof merged).toBe('object');
  });

  test('should return an object if the object specified is empty', () => {
    const merged = merge({});

    expect(typeof merged).toBe('object');
  });

  test('should return the merged object', () => {
    const a = {
      a: 1,
    };

    const b = {
      b: 2,
    };

    const merged = merge(a, b);

    expect(typeof merged).toBe('object');
  });
});

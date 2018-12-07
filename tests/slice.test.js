import slice from '../src/slice';

describe('slice', () => {
  test('should return an object if the object specified isn\'t an object', () => {
    const sliced = slice('test');

    expect(typeof sliced).toBe('object');
  });

  test('should return an object if the object specified is empty', () => {
    const sliced = slice({});

    expect(typeof sliced).toBe('object');
  });

  test('start index 1 should remove the first key (object has 3 keys)', () => {
    const a = {
      a: 1,
      b: 2,
      c: 3,
    };

    const sliced = slice(a, 1);

    expect(Object.keys(sliced)).toHaveLength(2);
  });

  test('start index 2 should remove the first two keys (object has 3 keys)', () => {
    const a = {
      a: 1,
      b: 2,
      c: 3,
    };

    const sliced = slice(a, 2);

    expect(Object.keys(sliced)).toHaveLength(1);
  });

  test('start index -1 should remove the first two keys (object has 3 keys)', () => {
    const a = {
      a: 1,
      b: 2,
      c: 3,
    };

    const sliced = slice(a, -1);

    expect(Object.keys(sliced)).toHaveLength(1);
  });

  test('start index 1 and end index 5 should return the 4 middle keys (object has 6 keys)', () => {
    const a = {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
      e: 5,
      f: 6,
    };

    const sliced = slice(a, 1, 5);

    expect(Object.keys(sliced)).toHaveLength(4);
  });
});

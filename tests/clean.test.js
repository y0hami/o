import clean from '../src/clean';

describe('clean', () => {
  test('should return an empty object if the one specified is not one', () => {
    expect(typeof clean('test')).toBe('object');
  });

  test('should return an empty object if the one specified is empty', () => {
    expect(typeof clean({})).toBe('object');
  });

  test('should return the same object if it doesn\'t need cleaning', () => {
    const obj = {
      a: 1,
    };

    expect(Object.keys(clean(obj)).length).toBe(1);
  });

  test('should remove undefined values', () => {
    const obj = {
      a: 1,
      b: undefined,
    };

    expect(Object.keys(clean(obj)).length).toBe(1);
  });

  test('should remove null values', () => {
    const obj = {
      a: 1,
      b: null,
    };

    expect(Object.keys(clean(obj)).length).toBe(1);
  });

  test('should remove undefined and null values', () => {
    const obj = {
      a: 1,
      b: undefined,
      c: null,
    };

    expect(Object.keys(clean(obj)).length).toBe(1);
  });

  test('should leave inner objects when follow is false', () => {
    const obj = {
      a: 1,
      b: undefined,
      c: {
        d: undefined,
      },
    };

    expect(Object.keys(clean(obj)).length).toBe(2);
  });

  test('should clean inner objects when follow is true', () => {
    const obj = {
      a: 1,
      b: undefined,
      c: {
        d: undefined,
        e: 1,
      },
    };

    expect(Object.keys(clean(obj, true).c).length).toBe(1);
  });
});

import keys from '../src/keys';

describe('keys', () => {
  test('should return an empty array if the object specified isn\'t an object', () => {
    const objKeys = keys('test');

    expect(objKeys).toHaveLength(0);
  });

  test('should return an empty array if the object specified is empty', () => {
    const objKeys = keys({});

    expect(objKeys).toHaveLength(0);
  });

  test('should return an empty array if the object specified is empty', () => {
    const objKeys = keys({});

    expect(objKeys).toHaveLength(0);
  });

  test('should only return base keys of follow is false', () => {
    const a = {
      a: 1,
      b: {
        c: 2,
      },
    };
    const objKeys = keys(a);

    expect(objKeys).toHaveLength(2);
  });

  test('should return all keys including inner objects if follow is true', () => {
    const a = {
      a: 1,
      b: {
        c: 2,
      },
    };
    const objKeys = keys(a, true);

    expect(objKeys).toHaveLength(3);
  });

  test('should return keys in dot notation for inner objects if follow is true', () => {
    const a = {
      a: 1,
      b: {
        c: 2,
        d: {
          e: 3,
        },
      },
    };
    const objKeys = keys(a, true);

    expect(objKeys).toHaveLength(5);
  });
});

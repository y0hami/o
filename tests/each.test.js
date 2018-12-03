import each from '../src/each';

describe('each', () => {
  test('should return false if the object specified isn\'t an object', () => {
    const ran = each('test', () => {});

    expect(ran).toBe(false);
  });

  test('should return false if the object specified is empty', () => {
    const ran = each({}, () => {});

    expect(ran).toBe(false);
  });

  test('should return false if the iterator isn\'t provided', () => {
    const ran = each({});

    expect(ran).toBe(false);
  });

  test('should return false if the iterator isn\'t a function', () => {
    const ran = each({}, 'test');

    expect(ran).toBe(false);
  });

  test('should return the correct object after executing the iterator', () => {
    const a = {
      a: 1,
      b: 2,
      c: 3,
      d: {
        e: 1,
      },
    };

    let result = 0;

    each(a, (key, value) => {
      if (typeof value !== 'number') return;
      result += value;
    });

    expect(result).toBe(6);
  });

  test('should return the correct object after executing the iterator while following objects', () => {
    const a = {
      a: 1,
      b: 2,
      c: 3,
      d: {
        e: 1,
      },
    };

    let result = 0;

    each(a, (key, value) => {
      if (typeof value !== 'number') return;
      result += value;
    }, true);

    expect(result).toBe(7);
  });
});

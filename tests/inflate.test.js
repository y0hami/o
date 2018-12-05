import inflate from '../src/inflate';

describe('inflate', () => {
  test('should return an empty object if the one specified isn\'t an object', () => {
    const inflated = inflate('test');

    expect(typeof inflated).toBe('object');
  });

  test('should return an empty object if the one specified is empty', () => {
    const inflated = inflate({});

    expect(typeof inflated).toBe('object');
  });

  test('should return an object with no changes if no dot notation keys are present', () => {
    const a = {
      a: 1,
    };

    const inflated = inflate(a);

    expect(inflated.a).toBe(1);
  });

  test('should return an object with dot notation keys inflated to objects', () => {
    const a = {
      'a.b': {
        c: 1,
      },
    };

    const inflated = inflate(a);

    expect(inflated.a.b.c).toBe(1);
  });

  test('should return an object with all dot notation keys inflated to objects', () => {
    const a = {
      'a.b': {
        c: 1,
      },
      'd.e': {
        f: 1,
      },
    };

    const inflated = inflate(a);

    expect(inflated.a.b.c + inflated.d.e.f).toBe(2);
  });
});

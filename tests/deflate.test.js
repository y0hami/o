import deflate from '../src/deflate';

describe('deflate', () => {
  test('should return an empty object if the one specified is not one', () => {
    expect(typeof deflate('test')).toBe('object');
  });

  test('should return an empty object if the one specified is empty', () => {
    expect(typeof deflate({})).toBe('object');
  });

  test('should do nothing if no inner objects are in the object', () => {
    const obj = {
      a: 1,
    };

    expect(deflate(obj).a).toBe(1);
  });

  test('the return should be immutable', () => {
    const obj = {
      a: 1,
    };

    const deflated = deflate(obj);

    deflated.a = 2;

    expect(obj.a).toBe(1);
  });

  test('should deflate inner objects to dot notation', () => {
    const obj = {
      a: 1,
      b: {
        c: 2,
      },
    };

    expect(deflate(obj)['b.c']).toBe(2);
  });
});

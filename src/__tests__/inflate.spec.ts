import inflate from '../inflate';

describe('inflate', () => {
  test('should inflate object using dot notation in keys', () => {
    const obj = {
      a: 1,
      'b.c': 1,
      'd.e.f': 2,
      'd.e.g': 3,
    };

    const result = inflate(obj);

    expect(result.a + result.b.c + result.d.e.f + result.d.e.g).toBe(7);
  });

  test('should throw TypeError for invalid arguments', () => {
    const invalidObj: unknown = 'testing';

    expect(() => inflate(invalidObj as OObject))
      .toThrow(new TypeError('Expected Object, got string testing'));
  });
});

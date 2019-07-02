import set from '../set';

describe('set', () => {
  test('should return a new object not a reference', () => {
    const obj = {};
    const result = set(obj, 'a', 1);

    expect(result.a).toBe(1);
    expect(Object.keys(obj)).toHaveLength(0);
  });

  test('should set the specified value on the object', () => {
    const obj = {};
    const result = set(obj, 'a', 1);

    expect(result.a).toBe(1);
  });

  test('should use dot notation for the path', () => {
    const obj = {};
    const result = set(obj, 'a.b', 1);

    expect(result.a.b).toBe(1);
  });

  test('should throw TypeError for invalid arguments', () => {
    const invalidObj: unknown = 'testing';
    const invalidPath: unknown = 1;

    expect(() => set(invalidObj as OObject, 'test', 'test'))
      .toThrow(new TypeError('Expected Object, got string testing'));
    expect(() => set({}, invalidPath as string, 'test'))
      .toThrow(new TypeError('Expected String, got number 1'));
  });
});

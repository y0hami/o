import clone from '../src/clone';

describe('clone', () => {
  test('should return an empty object if the one specified is not one', () => {
    expect(typeof clone('test')).toBe('object');
  });

  test('should return an empty object if the one specified is empty', () => {
    expect(typeof clone({})).toBe('object');
  });

  test('should copy the values from the specified object', () => {
    const obj = {
      a: 1,
    };

    expect(clone(obj).a).toBe(1);
  });

  test('should be immutable to the specified object', () => {
    const obj = {
      a: 1,
    };

    const cloned = clone(obj);

    cloned.a = 2;

    expect(obj.a).toBe(1);
  });
});

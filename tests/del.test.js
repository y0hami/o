import del from '../src/del';

describe('del', () => {
  test('should return an empty object if the one specified is not one', () => {
    expect(typeof del('test')).toBe('object');
  });

  test('should return an empty object if the one specified is empty', () => {
    expect(typeof del({})).toBe('object');
  });

  test('should return an empty object if the path specified is invalid', () => {
    expect(typeof del({}, 1)).toBe('object');
  });

  test('should return the same object if the path doesn\'t exist', () => {
    const obj = {
      a: 1,
    };

    expect(Object.keys(del(obj, 'b')).length).toBe(1);
  });

  test('should delete the specified key from the object', () => {
    const obj = {
      a: 1,
      b: 2,
    };

    expect(Object.keys(del(obj, 'b')).length).toBe(1);
  });

  test('return should be an immutable object', () => {
    const obj = {
      a: 1,
      b: 2,
    };

    const deleted = del(obj, 'b');

    deleted.a = 2;

    expect(obj.a).toBe(1);
  });
});

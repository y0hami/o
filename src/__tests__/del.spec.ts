import del from '../del';
import { OObject } from '../types';

describe('del', () => {
  test('should delete the specified path from an object', () => {
    const obj = {
      a: 1,
      b: 2,
    };

    const newObj = del(obj, 'a');

    expect(Object.keys(newObj)).toHaveLength(1);
  });

  test('should use dot notation for deletion path', () => {
    const obj = {
      a: 1,
      b: {
        c: 2,
      },
    };

    const newObj = del(obj, 'b.c');

    expect(Object.keys(newObj)).toHaveLength(2);
    expect(Object.keys(newObj.b)).toHaveLength(0);
  });

  test('should return new object not a reference', () => {
    const obj = {
      a: 1,
      b: 2,
    };

    const newObj = del(obj, 'a');

    newObj.b = 1;

    expect(obj.b).toBe(2);
  });

  test('should throw TypeError if path argument is invalid', () => {
    const invalidObj: unknown = 'testing';
    const invalidPath: unknown = 5;

    expect(() => del(invalidObj as OObject, 'testing'))
      .toThrow(new TypeError('Expected Object, got string testing'));
    expect(() => del({}, invalidPath as string))
      .toThrow(new TypeError('Expected String, got number 5'));
  });
});

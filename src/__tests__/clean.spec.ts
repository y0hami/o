import clean from '../clean';

describe('clean', () => {
  test('should remove all null values', () => {
    const obj = {
      a: 'a',
      b: null,
      c: 'c',
      d: null,
    };

    expect(Object.keys(clean(obj)))
      .toHaveLength(2);
  });

  test('should remove all undefined values', () => {
    const obj = {
      a: 'a',
      b: undefined,
      c: 'c',
      d: undefined,
    };

    expect(Object.keys(clean(obj)))
      .toHaveLength(2);
  });

  test('should clean objects deeply when follow is true', () => {
    const obj = {
      a: 'a',
      b: {
        c: undefined,
        d: 'd',
      },
    };

    expect(Object.keys(clean(obj, {
      follow: true,
    }).b))
      .toHaveLength(1);
  });

  test('should throw TypeError if obj argument is invalid', () => {
    const obj: unknown = 'testing';

    expect(() => clean(obj as OObject))
      .toThrow(new TypeError('Expected Object, got string testing'));
  });

  test('should throw TypeError if follow argument is invalid', () => {
    const obj = {};
    const follow: unknown = 'testing';

    expect(() => clean(obj, {
      follow: (follow as boolean),
    }))
      .toThrow(new TypeError('Expected Boolean, got string testing'));
  });
});

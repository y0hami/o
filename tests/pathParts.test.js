import pathParts from '../src/pathParts';

describe('pathParts', () => {
  test('should return an array', () => {
    const paths = pathParts('test');

    expect(Array.isArray(paths)).toBe(true);
  });

  test('should return an array for objects', () => {
    const paths = pathParts({});

    expect(Array.isArray(paths)).toBe(true);
  });

  test('should return an array for arrays', () => {
    const paths = pathParts([]);

    expect(Array.isArray(paths)).toBe(true);
  });

  test('should return an array for numbers', () => {
    const paths = pathParts(1);

    expect(Array.isArray(paths)).toBe(true);
  });

  test('should return an array of strings split by `.`', () => {
    const paths = pathParts('test.test');

    expect(paths).toHaveLength(2);
  });

  test('should not split `\\\\.`', () => {
    const paths = pathParts('test\\.test');

    expect(paths).toHaveLength(1);
  });

  test('should return an array of the path from dot notation', () => {
    const paths = pathParts('a.b.c\\.d');

    expect(paths).toHaveLength(3);
  });
});

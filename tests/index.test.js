import * as o from '../src/index';

describe('index', () => {
  test('should return 24 functions', () => {
    expect(Object.keys(o).length).toBe(25);
  });

  test('all functions are typeof function', () => {
    const reducer = (last, current) => last && typeof current === 'function';
    expect(Object.values(o).reduce(reducer)).toBe(true);
  });
});

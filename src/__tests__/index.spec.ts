import * as o from '../index';

describe('index', () => {
  test('should have 27 functions (+ default)', () => {
    expect(Object.keys(o)).toHaveLength(28);
  });

  test('all key values should be functions', () => {
    const funcs = Object.assign({}, o);
    delete funcs.default;

    expect(Object.values(funcs)
      .every(v => typeof v === 'function')).toBe(true);
  });
});

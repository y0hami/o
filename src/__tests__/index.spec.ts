import * as o from '../index';

describe('index', () => {
  test('should have 27 functions', () => {
    expect(Object.keys(o)).toHaveLength(27);
  });

  test('all key values should be functions', () => {
    expect(Object.values(o)
      .every(v => typeof v === 'function')).toBe(true);
  });
});

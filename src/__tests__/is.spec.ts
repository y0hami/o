import is from '../is';

describe('is', () => {
  test('should only return true if all specified values are objects', () => {
    expect(is({})).toBe(true);
    expect(is('1')).toBe(false);
    expect(is(1)).toBe(false);
    expect(is(false)).toBe(false);
    expect(is(() => {})).toBe(false);
  });

  test('should evaluate all values specified', () => {
    expect(is({}, {}, {})).toBe(true);
    expect(is({}, {}, 'b')).toBe(false);
  });
});

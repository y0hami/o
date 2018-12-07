import size from '../src/size';

describe('size', () => {
  test('should return -1 if the object specified isn\'t an object', () => {
    const result = size('test');

    expect(result).toBe(-1);
  });

  test('should return 0 if the object specified is empty', () => {
    const result = size({});

    expect(result).toBe(0);
  });

  test('should return the correct size of the object keys', () => {
    const a = {
      a: 1,
      b: 2,
    };

    const result = size(a);

    expect(result).toBe(2);
  });
});

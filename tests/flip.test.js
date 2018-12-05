import flip from '../src/flip';

describe('flip', () => {
  test('should return an empty object if the object specified isn\'t an object', () => {
    const flipped = flip('test');

    expect(typeof flipped).toBe('object');
  });

  test('should return an empty object if the object specified is empty', () => {
    const flipped = flip({});

    expect(typeof flipped).toBe('object');
  });

  test('should return an object with the keys and values swapped', () => {
    const a = {
      key: 'value',
    };
    const flipped = flip(a);

    expect(flipped.value).toBe('key');
  });

  test('should return an object without the keys if values aren\'t strings', () => {
    const a = {
      number: 1,
    };
    const flipped = flip(a);

    expect(Object.keys(flipped)).toHaveLength(0);
  });

  test('should return an object with the keys if values aren\'t strings but useToString is true', () => {
    const a = {
      number: 1,
    };
    const flipped = flip(a, false, true);

    expect(Object.keys(flipped)).toHaveLength(1);
  });

  test('should return an object with the keys as the value.toString when useToString is true', () => {
    const a = {
      number: 1,
    };
    const flipped = flip(a, false, true);

    expect(flipped['1']).toBe('number');
  });

  test('should an object with the values being the key in dot notation when follow is true', () => {
    const a = {
      obj: {
        key: 'value',
      },
    };
    const flipped = flip(a, true);

    expect(flipped.value).toBe('obj.key');
  });
});

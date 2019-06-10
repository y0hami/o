import clone from '../clone';

describe('clone', () => {
  test('should return an exact copy of the object', () => {
    const obj = {
      a: 1,
      b: 2,
    };
    const cloned = clone(obj);

    const total = obj.a + obj.b;
    const clonedTotal = cloned.a + cloned.b;

    expect(total).toEqual(clonedTotal);
  });
});

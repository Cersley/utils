import round from './round';

describe('round', () => {
  it('[in] should return rounded value by exponent', () => {
    expect(round('0.339', 2, 'in')).toBe('0.34');
    expect(round(0.7290083, 2, 'in')).toBe('0.73');
    expect(round(101, 2, 'in')).toBe('101');
    expect(round('1000.05', 2, 'in')).toBe('1000.05');
    expect(round('105.9', 2, 'in')).toBe('105.90');
    expect(round('105.99', 2, 'in')).toBe('105.99');
    expect(round('105.999', 2, 'in')).toBe('106');
    expect(round('105.9999', 2, 'in')).toBe('106');

    expect(round('2020.99999999', 8, 'in')).toBe('2020.99999999');
    expect(round('2020.999999999', 8, 'in')).toBe('2021');
    expect(round(0.3699990191, 8, 'in')).toBe('0.36999902');
  });
  it('[out] should return rounded value by exponent', () => {
    expect(round('0.339', 2, 'out')).toBe('0.33');
    expect(round(0.7290083, 2, 'out')).toBe('0.72');
    expect(round(101, 2, 'out')).toBe('101');
    expect(round('1000.05', 2, 'out')).toBe('1000.05');
    expect(round('105.9', 2, 'out')).toBe('105.90');
    expect(round('105.99', 2, 'out')).toBe('105.99');
    expect(round('105.999', 2, 'out')).toBe('105.99');
    expect(round('105.9999', 2, 'out')).toBe('105.99');

    expect(round('2020.99999999', 8, 'out')).toBe('2020.99999999');
    expect(round('2020.999999999', 8, 'out')).toBe('2020.99999999');
    expect(round(0.3699990191, 8, 'out')).toBe('0.36999901');
  });
});

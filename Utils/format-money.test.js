import { formatMoney } from './format-money';

describe('formatMoney', () => {
  it('should parse amounts', () => {
    expect(formatMoney(0)).toBe('0');
    expect(formatMoney(1)).toBe('1');
    expect(formatMoney(100)).toBe('100');
    expect(formatMoney(1000)).toBe('1 000');
    expect(formatMoney(100000)).toBe('100 000');
    expect(formatMoney(1000000)).toBe('1 000 000');
    expect(formatMoney(5.0, true)).toBe('5.00');
    expect(formatMoney(5.4)).toBe('5.40');
    expect(formatMoney(5.43)).toBe('5.43');
    expect(formatMoney(1000.54)).toBe('1 000.54');
  });
});

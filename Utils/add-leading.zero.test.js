import { addLeadingZero } from './add-leading-zero';

describe('addLeadingZero', () => {
  it('should add zeros', () => {
    expect(addLeadingZero(1)).toBe('01');
    expect(addLeadingZero(11)).toBe('11');
    expect(addLeadingZero(111)).toBe('111');

    expect(addLeadingZero(1, 3)).toBe('001');
    expect(addLeadingZero(12, 3)).toBe('012');
    expect(addLeadingZero(1234, 3)).toBe('1234');
  });
});

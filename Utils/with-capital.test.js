import { withCapital } from './with-capital';

describe('withCapital', () => {
  it('capitalize strings', () => {
    expect(withCapital(' ')).toBe(' ');
    expect(withCapital('kek')).toBe('Kek');
    expect(withCapital('Kek')).toBe('Kek');
  });
});

import { emailRegex } from './email-regex';

describe('emailRegex', () => {
  it('validate email', () => {
    expect(emailRegex.test('email@mail.com')).toBe(true);
    expect(emailRegex.test('email#mail.com')).toBe(false);
    expect(emailRegex.test('email.kek@mail.com.kek')).toBe(true);
    expect(emailRegex.test('email.kek.mail.com.kek')).toBe(false);
  });
});

import Form, { minLength, required } from './form';

describe('Form module', () => {
  let form;

  beforeEach(() => {
    form = new Form({
      email: [
        [required, 'email_not_empty'],
        [minLength(5), 'email_min_length'],
      ],
      password: [
        [required, 'password_not_empty'],
        [minLength(5), 'password_min_length'],
      ],
    });
  });

  it('should correct initialize', () => {
    expect(form.fields)
      .toEqual({
        email: '',
        password: '',
      });

    expect(form.rules.email).toBeDefined();
    expect(form.rules.password).toBeDefined();
    expect(form.errors.email).toBeDefined();
    expect(form.errors.password).toBeDefined();
  });

  it('should setup error when validation failed', () => {
    form.fields.email = '';
    form.fields.password = '';

    expect(form.validate()).toBe(false);

    expect(form.errors.email.length).toBe(1);
    expect(form.errors.email[0]).toBe('email_not_empty');
    expect(form.errors.password.length).toBe(1);
    expect(form.errors.password[0]).toBe('password_not_empty');

    form.fields.email = 'correct@email.com';
    form.fields.password = '123';

    expect(form.validate()).toBe(false);

    expect(form.errors.email.length).toBe(0);
    expect(form.errors.password.length).toBe(1);
    expect(form.errors.password[0]).toBe('password_min_length');
  });

  it('should correct validate fields', () => {
    form.fields.email = 'correct@email.com';
    form.fields.password = '123456';

    expect(form.validate()).toBe(true);

    expect(form.errors.email.length).toBe(0);
    expect(form.errors.password.length).toBe(0);
  });
});

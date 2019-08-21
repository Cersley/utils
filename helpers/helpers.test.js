import {
  addLeadingZero, withCapital, emailRegex, formatDate, formatMoney, decodeString, fromUTCtoLocalTime,
} from './helpers';

describe('Helpers: ', () => {
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
  describe('withCapital', () => {
    it('capitalize strings', () => {
      expect(withCapital(' ')).toBe(' ');
      expect(withCapital('kek')).toBe('Kek');
      expect(withCapital('Kek')).toBe('Kek');
    });
  });
  describe('emailRegex', () => {
    it('validate email', () => {
      expect(emailRegex.test('email@mail.com')).toBe(true);
      expect(emailRegex.test('email#mail.com')).toBe(false);
      expect(emailRegex.test('email.kek@mail.com.kek')).toBe(true);
      expect(emailRegex.test('email.kek.mail.com.kek')).toBe(false);
    });
  });
  describe('formatDate', () => {
    it('format date', () => {
      expect(formatDate('2018-11-23 15:19:55')).toBe('23.11.2018 15:19');
      expect(formatDate('2018-9-3 15:19:55')).toBe('03.09.2018 15:19');
    });
  });
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
  describe('decodeString', () => {
    it('should decode unsafe characters', () => {
      expect(decodeString('')).toBe('');
      expect(decodeString('&quot;kek&quot;')).toBe('"kek"');
      expect(decodeString('kek &amp; kek')).toBe('kek & kek');
      expect(decodeString('&lt;kek&gt;')).toBe('<kek>');
    });
  });
  describe('fromUTCtoLocalTime', () => {
    it('format UTC time to local time', () => {
      const time = new Date();
      expect(fromUTCtoLocalTime(time)).toBe(time);

      const UTCString = '2019-08-03 18:25:54';
      const UTCTime = new Date(UTCString);
      const LocalTime = new Date(UTCTime.getTime() - UTCTime.getTimezoneOffset() * 60000);

      expect(fromUTCtoLocalTime(UTCString).toString()).toBe(LocalTime.toString());
    });
  });
});

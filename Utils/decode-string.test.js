import { decodeString } from './decode-string';

describe('decodeString', () => {
  it('should decode unsafe characters', () => {
    expect(decodeString('')).toBe('');
    expect(decodeString('&quot;kek&quot;')).toBe('"kek"');
    expect(decodeString('kek &amp; kek')).toBe('kek & kek');
    expect(decodeString('&lt;kek&gt;')).toBe('<kek>');
  });
});

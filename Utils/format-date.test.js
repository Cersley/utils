import { formatDate } from './format-date';

describe('formatDate', () => {
  it('format date', () => {
    expect(formatDate('2018-11-23 15:19:55')).toBe('23.11.2018 15:19');
    expect(formatDate('2018-9-3 15:19:55')).toBe('03.09.2018 15:19');
  });
});

import { fromUTCtoLocalTime } from './from-utc-to-local-time';

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

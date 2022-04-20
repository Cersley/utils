export const fromUTCtoLocalTime = (date) => {
  if (typeof date === 'string') {
    const timeObject = new Date(date);
    return new Date(timeObject.getTime() - timeObject.getTimezoneOffset() * 60000);
  }

  return date;
};

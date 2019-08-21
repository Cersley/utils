export const addLeadingZero = (number, length = 2) => {
  const result = number.toString();

  if (result.length > length) {
    return result;
  }

  const zeroCount = length - result.length;
  const leadingZeros = Array(zeroCount).fill(0).join('');

  return `${leadingZeros}${result}`;
};

export const withCapital = string => `${string[0].toUpperCase() + string.slice(1)}`;

export const emailRegex = new RegExp('^[^@]+@[^@]+.[^@]+$', 'i');

// ios formated date
export const formatDate = (date, htmlDate) => {
  const iosFormatedDate = date.split(/[- :]/);
  const formatedDate = new Date(
    iosFormatedDate[0],
    iosFormatedDate[1] - 1, // back returns date in iso format
    iosFormatedDate[2],
    iosFormatedDate[3],
    iosFormatedDate[4],
    iosFormatedDate[5],
  );

  const year = `${new Date(formatedDate).getFullYear()}`;

  const month = `${new Date(formatedDate).getMonth() + 1}`;
  const formatedMonth = month < 10 ? `0${month}` : month;

  const day = `${new Date(formatedDate).getDate()}`;
  const formatedDay = day < 10 ? `0${day}` : day;

  const hour = `${new Date(formatedDate).getHours()}`;
  const formatedHours = hour < 10 ? `0${hour}` : hour;

  const minutes = `${new Date(formatedDate).getMinutes()}`;
  const formatedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  if (htmlDate === true) {
    return `<span class="date">${formatedDay}.${formatedMonth}.${year} </span><span class="time">${formatedHours}:${formatedMinutes}</span>`;
  }

  return `${formatedDay}.${formatedMonth}.${year} ${formatedHours}:${formatedMinutes}`;
};

export const formatMoney = (number, tralingZeros = false) => {
  const parts = number.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  if (parts[1]) {
    parts[1] = parts[1].length === 1 ? `${parts[1]}0` : parts[1];
  } else if (tralingZeros === true) {
    parts.push('00');
  }

  return parts.join('.');
};

/**
 * on back end side every response escapes this symbols
 */
const regexEscape = /&(quot|amp|#x27|lt|gt);/g;
const escapeMap = {
  '&quot;': '"',
  '&amp;': '&',
  '&#x27;': "'",
  '&lt;': '<',
  '&gt;': '>',
};

export const decodeString = string => string.replace(regexEscape, $0 => escapeMap[$0]);

export const fromUTCtoLocalTime = (date) => {
  if (typeof date === 'string') {
    const timeObject = new Date(date);
    return new Date(timeObject.getTime() - timeObject.getTimezoneOffset() * 60000);
  }

  return date;
};

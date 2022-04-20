export const addLeadingZero = (number, length = 2) => {
  const result = number.toString();

  if (result.length > length) {
    return result;
  }

  const zeroCount = length - result.length;
  const leadingZeros = Array(zeroCount).fill(0).join('');

  return `${leadingZeros}${result}`;
};

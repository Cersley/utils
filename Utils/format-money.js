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

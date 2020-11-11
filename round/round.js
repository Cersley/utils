/**
 * example1: exponent = 2; amount = 10.586; direction: 'out'; calculatedAmount = 10.58
 * example2: exponent = 1; amount = 12.391; direction: 'out'; calculatedAmount = 12.3
 *
 * example3: exponent = 2; amount = 10.586; direction: 'in'; calculatedAmount = 10.59
 * example4: exponent = 1; amount = 12.391; direction: 'in'; calculatedAmount = 12.4
 * */
const round = (amount, exponent, direction) => {
  const amountAsNumber = parseFloat(amount);

  if (Number.isInteger(amountAsNumber) === true) {
    return `${amountAsNumber}`;
  }

  const [decimalPart, fractionalPart] = amountAsNumber.toString().split('.');

  /**
   * fix js precision
   *
   * example:
   * - in js: 101*0.15=15.4999999999
   * - in math: 101*0.15=15.15
   *
   * to fix this problem make toPrecision of fractional part
   * (more then exponent by 1 in 'out' case to save banking rounding logic)
   * and merge that value with decimal part as string
   */
  if (direction === 'out') {
    const precision = exponent + 1;
    // delete excess fractional part for correct toPrecision(precision)
    const clearedFractionalPart = fractionalPart.substring(0, precision);
    const fractionalPartWithRightPrecision = parseFloat(`0.${clearedFractionalPart}`)
      .toPrecision(precision)
      .split('.')[1];
    // делаем округление в минус(банковское) обрезая по значению exponent
    return `${parseInt(decimalPart, 10)}.${fractionalPartWithRightPrecision.substring(0, exponent)}`;
  }

  // direction === 'in'
  const precision = exponent;
  const fractionalPartWithRightPrecision = parseFloat(`0.${fractionalPart}`).toPrecision(precision).split('.')[1];
  /**
   * in case, when fractionalPart is 0.999 or 0.99999999
   *
   * .toPrecision(2) equals "0" or "0000000"
   */
  if (fractionalPartWithRightPrecision.split('').every((char) => char === '0')) {
    return `${parseFloat(decimalPart) + 1}`;
  }

  // substring final value to trim trailing zeros after .toPrecision()
  return `${parseInt(decimalPart, 10)}.${fractionalPartWithRightPrecision.substring(0, exponent)}`;
};

export default round;

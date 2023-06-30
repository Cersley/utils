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

export const decodeString = (string) => string.replace(regexEscape, ($0) => escapeMap[$0]);

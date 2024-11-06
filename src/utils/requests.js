/**
 * A function for converting a string to be used in an URL search parameter
 *
 * @param {*} inputString - The input string
 * @returns - The normalized string
 */
export function normalizeSearchString(inputString) {
  // Convert numbers to words
  let normalizedString = inputString.replace(
    /(\d+(\.\d+)?)/g,
    function (match, p1) {
      return p1.replace(".", ""); // Remove dots from numbers
    },
  );

  // Remove punctuation and convert to lowercase
  normalizedString = normalizedString.toLowerCase().replace(/[^\w\s]/g, "");

  return normalizedString;
}

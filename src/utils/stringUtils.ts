/**
 * Capitalize the first letter of a string
 * @param string
 * @returns the string with the first letter capitalized
 */
export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * Replace underscores with spaces
 * @param string
 * @returns the string with underscores replaced with spaces
 */
export const replaceUnderscores = (string: string) => {
  return string.replace(/_/g, ' ');
};

/**
 * Transform to 2 decimal with toFixed
 * @param num
 */
export const to2Decimal = (num: number) => {
  return num.toFixed(2);
};

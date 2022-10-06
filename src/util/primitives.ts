export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const roundToTens = (n: number) => Math.floor(n / 10) * 10;

/**
 *
 * Poor man's calculator. I don't want to use eval on unrestricted strings.
 * Checks if string contains + or -
 * Processes the string until it's a series of positive and negative numbers
 * Adds them up.
 *
 * Dry run:
 * Input: "10"
 * Step 1: Doesn't have +/-, return value as a Number
 * Output: 10
 *
 * Input: "10 + 12 - 6"
 * Step 1: "10+12-6"         // remove spaces
 * Step 2: "10!+12!-6"       // mark all operators with a preceding '!'
 * Step 3: ["10","+12","-6"] // split by '!'
 * Step 4: 16                // add all items of array
 * Output: 16
 */
export const computeArithmeticExpression = (expression: string) => {
  if (!expression.match(/[/+/-]/gi)) {
    return Number(expression.replaceAll(" ", ""));
  }

  return expression
    .replaceAll(" ", "")
    .replaceAll("+", "!+")
    .replaceAll("-", "!-")
    .split("!")
    .reduce((total, x) => total + Number(x), 0);
};
